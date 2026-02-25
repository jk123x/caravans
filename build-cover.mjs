import WebSocket from 'ws';
import { randomUUID } from 'crypto';

const CHANNEL = process.env.FIGMA_CHANNEL || 'ggbybgir';
let ws, currentChannel = null;
const pending = new Map();

function connect() {
  return new Promise((resolve, reject) => {
    ws = new WebSocket('ws://localhost:3055');
    ws.on('open', () => resolve());
    ws.on('error', reject);
    ws.on('message', (raw) => {
      let data;
      try { data = JSON.parse(Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw)); } catch { return; }
      if (data.type === 'broadcast' && data.sender === 'You') return;
      if (data.type === 'broadcast' && data.sender === 'User') {
        const msg = data.message;
        if (msg?.id && pending.has(msg.id)) {
          const req = pending.get(msg.id);
          clearTimeout(req.timeout);
          pending.delete(msg.id);
          if (msg.error) req.reject(new Error(msg.error));
          else req.resolve(msg.result ?? msg);
        }
      }
      if (data.type === 'system' && data.message?.id && pending.has(data.message.id)) {
        const req = pending.get(data.message.id);
        clearTimeout(req.timeout);
        pending.delete(data.message.id);
        req.resolve(data.message.result ?? data.message);
      }
    });
  });
}

function join(channel) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    const t = setTimeout(() => { pending.delete(id); reject(new Error('join timeout')); }, 10000);
    pending.set(id, { resolve, reject, timeout: t });
    ws.send(JSON.stringify({ type: 'join', channel, id }));
  });
}

function cmd(command, params = {}) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    const t = setTimeout(() => { pending.delete(id); reject(new Error(`timeout: ${command} ${JSON.stringify(params).slice(0,100)}`)); }, 30000);
    pending.set(id, { resolve, reject, timeout: t });
    ws.send(JSON.stringify({ type: 'message', channel: currentChannel, message: { id, command, params: { ...params, commandId: id } } }));
  });
}

// Colors as {r,g,b,a} objects for the Figma API
const c = (r, g, b, a = 1) => ({ r, g, b, a });
const NAVY = c(0.102, 0.180, 0.231);
const AMBER = c(0.776, 0.486, 0.106);
const CREAM = c(0.980, 0.973, 0.953);
const WHITE = c(1, 1, 1);
const CHARCOAL = c(0.173, 0.200, 0.220);
const STONE = c(0.929, 0.910, 0.871);
const MUTED = c(0.420, 0.447, 0.502);
const TEAL = c(0.180, 0.600, 0.553);
const BLUE = c(0.220, 0.420, 0.667);
const ORANGE = c(0.824, 0.525, 0.173);

const W = 595, H = 842, M = 50;

async function fill(nodeId, color) {
  await cmd('set_fill_color', { nodeId, color });
}
async function stroke(nodeId, color, weight = 1) {
  await cmd('set_stroke_color', { nodeId, color, strokeWeight: weight });
}

async function text(parentId, x, y, content, opts = {}) {
  const { size = 13, family = 'Inter', style = 'Regular', color = CHARCOAL, spacing = 0, lineH = 0, name } = opts;
  const n = await cmd('create_text', { x, y, text: content, name: name || content.slice(0, 25) });
  await cmd('set_font_size', { nodeId: n.id, fontSize: size });
  try { await cmd('set_font_name', { nodeId: n.id, family, style }); } catch {}
  await fill(n.id, color);
  if (spacing) try { await cmd('set_letter_spacing', { nodeId: n.id, letterSpacing: spacing, unit: 'PIXELS' }); } catch {}
  if (lineH) try { await cmd('set_line_height', { nodeId: n.id, lineHeight: lineH, unit: 'PIXELS' }); } catch {}
  await cmd('insert_child', { parentId, childId: n.id });
  return n;
}

async function rect(parentId, x, y, w, h, color, opts = {}) {
  const { name = '', radius = 0, strokeColor = null, strokeWeight = 1 } = opts;
  const n = await cmd('create_rectangle', { x, y, width: w, height: h, name });
  await fill(n.id, color);
  if (radius) try { await cmd('set_corner_radius', { nodeId: n.id, radius }); } catch {}
  if (strokeColor) try { await stroke(n.id, strokeColor, strokeWeight); } catch {}
  await cmd('insert_child', { parentId, childId: n.id });
  return n;
}

async function main() {
  await connect();
  await join(CHANNEL);
  currentChannel = CHANNEL;
  console.log('[ok] Connected');

  const px = i => i * (W + 40);

  // ========== COVER ==========
  console.log('Building cover...');
  const cover = await cmd('create_frame', { name: 'Cover', x: px(0), y: 0, width: W, height: H });
  await fill(cover.id, NAVY);

  await rect(cover.id, 0, 0, W, 6, AMBER, { name: 'TopBar' });
  await rect(cover.id, M, 80, 60, 3, AMBER);
  await text(cover.id, M, 100, "THE BEGINNER'S GUIDE TO", { size: 14, style: 'Medium', color: AMBER, spacing: 4 });
  await text(cover.id, M, 130, "Caravan\nSolar", { size: 72, style: 'Bold', color: WHITE, lineH: 80, name: 'Title' });
  await rect(cover.id, M, 300, 40, 2, c(AMBER.r, AMBER.g, AMBER.b, 0.4));
  await text(cover.id, M, 320,
    "Clear recommendations, brand comparisons,\nand shopping lists for Australian caravanners\nwho don't want to become electrical engineers.",
    { size: 15, color: c(1, 1, 1, 0.6), lineH: 24, name: 'Desc' });

  const sun = await cmd('create_ellipse', { x: M, y: 580, width: 50, height: 50, name: 'Sun' });
  await fill(sun.id, c(AMBER.r, AMBER.g, AMBER.b, 0.15));
  await stroke(sun.id, AMBER, 1.5);
  await cmd('insert_child', { parentId: cover.id, childId: sun.id });

  for (const t of [
    { n: 'Weekender', col: TEAL, x: M },
    { n: 'Tourer', col: BLUE, x: M + 140 },
    { n: 'Full-timer', col: ORANGE, x: M + 280 },
  ]) {
    await rect(cover.id, t.x, 700, 120, 32, c(t.col.r, t.col.g, t.col.b, 0.15), { radius: 4, strokeColor: t.col });
    await text(cover.id, t.x + 12, 707, t.n, { size: 13, style: 'Medium', color: t.col });
  }

  await rect(cover.id, 0, H - 60, W, 60, c(0, 0, 0, 0.2));
  await text(cover.id, M, H - 42, "PDF GUIDE + WORKSHEETS", { size: 10, style: 'Medium', color: c(1, 1, 1, 0.4), spacing: 2 });
  await text(cover.id, W - M - 50, H - 48, "$49", { size: 22, style: 'Bold', color: AMBER });
  console.log('[ok] Cover done');

  // ========== TABLE OF CONTENTS ==========
  console.log('Building TOC...');
  const toc = await cmd('create_frame', { name: 'Table of Contents', x: px(1), y: 0, width: W, height: H });
  await fill(toc.id, CREAM);

  await text(toc.id, M, M, "WHAT'S INSIDE", { size: 11, style: 'Bold', color: AMBER, spacing: 3 });
  await text(toc.id, M, M + 25, "Contents", { size: 36, style: 'Bold', color: NAVY });
  await rect(toc.id, M, M + 80, W - M * 2, 1, STONE);

  const entries = [
    { n: '01', t: 'The 60-Second Version', d: 'Everything you need to know in one page' },
    { n: '02', t: 'Your Power Audit', d: 'Figure out how much power you actually use' },
    { n: '03', t: 'What to Buy', d: 'Component by component, plain English' },
    { n: '04', t: 'Brand Comparisons & Shopping Lists', d: 'Side-by-side with ready-to-use lists' },
    { n: '05', t: 'System Sizing Check', d: 'Make sure the numbers actually work' },
    { n: '06', t: 'Expensive Mistakes', d: '7 mistakes that cost $500 to $2,000' },
    { n: '', t: 'Checklists & Worksheets', d: 'Before You Buy, Installer Brief, First Week' },
  ];

  let ey = M + 105;
  for (const e of entries) {
    if (e.n) await text(toc.id, M, ey, e.n, { size: 28, style: 'Bold', color: c(AMBER.r, AMBER.g, AMBER.b, 0.3) });
    await text(toc.id, e.n ? M + 50 : M, ey + (e.n ? 2 : 0), e.t, { size: 18, style: 'Semi Bold', color: NAVY });
    await text(toc.id, e.n ? M + 50 : M, ey + 26, e.d, { size: 12, color: MUTED });
    ey += 70;
    if (e !== entries[entries.length - 1]) await rect(toc.id, M, ey - 12, W - M * 2, 1, c(STONE.r, STONE.g, STONE.b, 0.5));
  }

  const tbY = H - 160;
  await rect(toc.id, M, tbY, W - M * 2, 100, c(AMBER.r, AMBER.g, AMBER.b, 0.08), { radius: 8, strokeColor: c(AMBER.r, AMBER.g, AMBER.b, 0.2) });
  await text(toc.id, M + 20, tbY + 16, "THE SHORT VERSION", { size: 10, style: 'Bold', color: AMBER, spacing: 2 });
  await text(toc.id, M + 20, tbY + 36,
    "Every section has a \"short version\" box like this one.\nIf you just want to know what to buy, read only these\nboxes and you'll have your answer in about 5 minutes.",
    { size: 13, color: CHARCOAL, lineH: 20 });
  console.log('[ok] TOC done');

  // ========== SECTION 1 ==========
  console.log('Building Section 1...');
  const s1 = await cmd('create_frame', { name: 'S1 - 60-Second Version', x: px(2), y: 0, width: W, height: H });
  await fill(s1.id, CREAM);

  await rect(s1.id, 0, 0, W, 100, NAVY);
  await text(s1.id, M, 20, "SECTION 1", { size: 11, style: 'Bold', color: AMBER, spacing: 3 });
  await text(s1.id, M, 42, "The 60-Second Version", { size: 32, style: 'Bold', color: WHITE });

  const svY = 120;
  await rect(s1.id, M, svY, W - M * 2, 170, c(AMBER.r, AMBER.g, AMBER.b, 0.08), { radius: 8, strokeColor: c(AMBER.r, AMBER.g, AMBER.b, 0.25) });
  await text(s1.id, M + 20, svY + 16, "THE SHORT VERSION", { size: 10, style: 'Bold', color: AMBER, spacing: 2 });
  await text(s1.id, M + 20, svY + 38,
    "Your caravan solar system has 4 parts: solar panels\nmake power from sunlight, a battery stores it, a charge\ncontroller protects the battery from overcharging, and\nan inverter converts battery power to run your normal\nappliances. That's it.\n\nYou size the system based on how much power you use\nper day (measured in watt-hours). This guide tells you\nexactly what to buy for your usage level.",
    { size: 13, color: CHARCOAL, lineH: 18 });

  let cy = svY + 200;
  await text(s1.id, M, cy, "Here's what a caravan solar system does:", { size: 14, style: 'Semi Bold', color: NAVY });
  cy += 30;

  const items = [
    "Solar panels on your roof collect sunlight and turn it into electricity",
    "That electricity gets stored in a battery",
    "A charge controller sits between panels and battery to prevent overcharging",
    "An inverter converts battery power to normal 240V so your appliances work"
  ];
  for (let i = 0; i < items.length; i++) {
    await text(s1.id, M + 5, cy, `${i + 1}.`, { size: 13, style: 'Bold', color: AMBER });
    await text(s1.id, M + 25, cy, items[i], { size: 13, lineH: 20 });
    cy += 35;
  }

  cy += 10;
  await text(s1.id, M, cy,
    "That's the whole system. Four components.\nEverything else in this guide is about figuring out\nwhat size you need and which brands to buy.",
    { size: 14, style: 'Medium', color: NAVY, lineH: 22 });

  cy += 80;
  await text(s1.id, M, cy, "The Only Number That Matters: Watt-Hours", { size: 20, style: 'Bold', color: NAVY });
  cy += 32;
  await text(s1.id, M, cy,
    "Watt-hours (Wh) is just \"how much power something\nuses in an hour.\"\n\nA 60W light left on for 2 hours = 120Wh. That's it.\nAdd up everything you run in a day, and you've got\nyour daily usage.\n\nSection 2 walks you through this with a worksheet.\nIt takes about 10 minutes and it's the single most\nimportant step in the process.",
    { size: 13, lineH: 19 });

  await text(s1.id, W - M - 10, H - 40, "3", { size: 11, color: MUTED });
  console.log('[ok] Section 1 done');

  console.log('\nAll 3 pages built! Check Figma.');
  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('[fatal]', err.message); process.exit(1); });
