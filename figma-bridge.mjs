import WebSocket from 'ws';
import { randomUUID } from 'crypto';
import { createInterface } from 'readline';

const CHANNEL = process.env.FIGMA_CHANNEL || 'ggbybgir';
const WS_URL = 'ws://localhost:3055';

let ws;
let currentChannel = null;
const pending = new Map();

function connect() {
  return new Promise((resolve, reject) => {
    ws = new WebSocket(WS_URL);
    ws.on('open', () => resolve());
    ws.on('error', (err) => reject(err));
    ws.on('message', (raw) => {
      const data = JSON.parse(raw);

      // Ignore our own echoed messages
      if (data.type === 'broadcast' && data.sender === 'You') return;

      // Handle responses from Figma (sender is "User")
      if (data.type === 'broadcast' && data.sender === 'User') {
        const msg = data.message;
        if (msg?.id && pending.has(msg.id)) {
          const req = pending.get(msg.id);
          clearTimeout(req.timeout);
          pending.delete(msg.id);
          if (msg.error) {
            req.reject(new Error(msg.error));
          } else {
            req.resolve(msg.result ?? msg);
          }
          return;
        }
      }

      // Handle system messages (join confirmations)
      if (data.type === 'system' && data.message?.id && pending.has(data.message.id)) {
        const req = pending.get(data.message.id);
        clearTimeout(req.timeout);
        pending.delete(data.message.id);
        req.resolve(data.message.result ?? data.message);
      }
    });
  });
}

function joinChannel(channel) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error('join timeout')); }, 10000);
    pending.set(id, { resolve, reject, timeout });
    ws.send(JSON.stringify({ type: 'join', channel, id }));
  });
}

function sendCommand(command, params = {}, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`timeout: ${command}`)); }, timeoutMs);
    pending.set(id, { resolve, reject, timeout });
    ws.send(JSON.stringify({
      type: 'message',
      channel: currentChannel,
      message: { id, command, params: { ...params, commandId: id } }
    }));
  });
}

async function main() {
  await connect();
  console.error('[bridge] Connected to relay');

  await joinChannel(CHANNEL);
  currentChannel = CHANNEL;
  console.error(`[bridge] Joined channel: ${CHANNEL}`);

  const rl = createInterface({ input: process.stdin });

  for await (const line of rl) {
    try {
      const { command, params, timeout } = JSON.parse(line);
      const result = await sendCommand(command, params || {}, timeout || 60000);
      console.log(JSON.stringify({ ok: true, result }));
    } catch (err) {
      console.log(JSON.stringify({ ok: false, error: err.message }));
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
