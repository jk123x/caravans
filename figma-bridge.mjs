import WebSocket from 'ws';
import { randomUUID } from 'node:crypto';

const CHANNEL = process.env.FIGMA_CHANNEL || '6wvl2hiw';
const PORT = process.env.FIGMA_PORT || 3055;
const COMMAND = process.argv[2];
const PARAMS = process.argv[3] ? JSON.parse(process.argv[3]) : {};

if (!COMMAND) {
  console.error('Usage: node figma-bridge.mjs <command> [paramsJSON]');
  process.exit(1);
}

const pendingRequests = new Map();
let currentChannel = null;

function connect() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${PORT}`);
    const timeout = setTimeout(() => { ws.terminate(); reject(new Error('Connection timeout')); }, 10000);
    ws.on('open', () => { clearTimeout(timeout); resolve(ws); });
    ws.on('error', (err) => { clearTimeout(timeout); reject(err); });
  });
}

function setupMessageHandler(ws) {
  ws.on('message', (data) => {
    try {
      const json = JSON.parse(data);

      // Join acknowledgment
      if (json.type === 'join_ack') {
        currentChannel = CHANNEL;
        for (const [id, req] of pendingRequests.entries()) {
          if (req._isJoin) {
            clearTimeout(req.timeout);
            pendingRequests.delete(id);
            req.resolve({ type: 'join_ack' });
            return;
          }
        }
        return;
      }

      // Progress updates - extend timeout and log
      if (json.type === 'progress_update') {
        const progressData = json.message?.data || json.data;
        const requestId = json.id || progressData?.commandId || '';
        if (requestId && pendingRequests.has(requestId)) {
          const req = pendingRequests.get(requestId);
          req.lastActivity = Date.now();
          clearTimeout(req.timeout);
          req.timeout = setTimeout(() => {
            pendingRequests.delete(requestId);
            req.reject(new Error('Timeout waiting for chunked response'));
          }, 120000);
          process.stderr.write(`Progress: ${progressData?.progress || 0}% - ${progressData?.message || ''}\n`);
        }
        return;
      }

      const msg = json.message;
      if (!msg) return;

      // Skip command echoes
      if (msg.command) return;

      // Match response by ID
      if (msg.id && pendingRequests.has(msg.id)) {
        const req = pendingRequests.get(msg.id);
        clearTimeout(req.timeout);
        pendingRequests.delete(msg.id);
        const error = msg.error ?? (msg.result && msg.result.error);
        if (error) {
          req.reject(new Error(String(error)));
        } else {
          req.resolve(msg.result ?? msg);
        }
      }
    } catch (e) {
      process.stderr.write(`Parse error: ${e.message}\n`);
    }
  });
}

function sendCommand(ws, command, params = {}, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    const isJoin = command === 'join';

    const request = {
      id,
      type: isJoin ? 'join' : 'message',
      ...(isJoin ? { channel: params.channel } : { channel: currentChannel }),
      message: { id, command, params: { ...params, commandId: id } }
    };

    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error(`Timeout after ${timeoutMs / 1000}s`));
    }, timeoutMs);

    pendingRequests.set(id, { resolve, reject, timeout });
    ws.send(JSON.stringify(request));
  });
}

async function main() {
  const ws = await connect();
  setupMessageHandler(ws);

  // Join channel
  const joinId = randomUUID();
  const joinPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(joinId);
      reject(new Error('Join timeout'));
    }, 12000);
    pendingRequests.set(joinId, { resolve, reject, timeout, _isJoin: true });
  });
  ws.send(JSON.stringify({
    id: joinId,
    type: 'join',
    channel: CHANNEL,
    message: { id: joinId, command: 'join', params: { channel: CHANNEL, commandId: joinId } }
  }));
  await joinPromise;
  currentChannel = CHANNEL;

  // Verify with ping
  await sendCommand(ws, 'ping', {}, 12000);
  process.stderr.write(`Connected on channel ${CHANNEL}\n`);

  // Send actual command
  const result = await sendCommand(ws, COMMAND, PARAMS, 120000);
  console.log(JSON.stringify(result, null, 2));

  ws.close();
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
