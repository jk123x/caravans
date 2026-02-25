import WebSocket from 'ws';
import { randomUUID } from 'crypto';

// === CONNECTION ===
const CHANNEL = process.env.FIGMA_CHANNEL || 'ich0aklf';
let ws, currentChannel = null;
const pending = new Map();

function connect() {
  return new Promise((resolve, reject) => {
    ws = new WebSocket('ws://localhost:3055');
    ws.on('open', resolve);
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
    const t = setTimeout(() => { pending.delete(id); reject(new Error(`timeout: ${command}`)); }, 30000);
    pending.set(id, { resolve, reject, timeout: t });
    ws.send(JSON.stringify({
      type: 'message', channel: currentChannel,
      message: { id, command, params: { ...params, commandId: id } }
    }));
  });
}

// === DESIGN SYSTEM ===
const c = (r, g, b, a = 1) => ({ r: r / 255, g: g / 255, b: b / 255, a });

const COL = {
  sandstone:  c(242, 237, 228),
  ghostGum:   c(217, 210, 199),
  mutedText:  c(138, 130, 117),  // readable warm grey for secondary text (~#8A8275)
  saltbush:   c(91, 122, 94),
  deepSlate:  c(61, 79, 95),
  terracotta: c(168, 92, 59),
  wattle:     c(212, 160, 23),
  skyBlue:    c(74, 127, 165),
  charcoal:   c(45, 45, 45),
  white:      c(255, 255, 255),
  parchment:  c(237, 230, 216),
  lightGrey:  c(245, 243, 238),
  black:      c(0, 0, 0),
};

const TIER = { weekender: COL.saltbush, tourer: COL.skyBlue, fulltimer: COL.terracotta };

const W = 595, H = 842, M = 50;
const CW = W - 2 * M; // 495
const GAP = 40;

// === TEXT UTILITIES ===
function wrap(text, maxChars) {
  return text.split('\n').flatMap(p => {
    if (!p.trim()) return [''];
    const words = p.split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      if (line.length + w.length + (line ? 1 : 0) > maxChars) {
        if (line) lines.push(line);
        line = w;
      } else {
        line = line ? line + ' ' + w : w;
      }
    }
    if (line) lines.push(line);
    return lines;
  }).join('\n');
}

function cpl(fontSize, width = CW) {
  return Math.floor(width / (fontSize * 0.58));
}

// === PRIMITIVES ===
async function fill(id, color) {
  await cmd('set_fill_color', { nodeId: id, color });
}

async function rect(parent, x, y, w, h, color, opts = {}) {
  const n = await cmd('create_rectangle', { x, y, width: w, height: h, name: opts.name || '' });
  await fill(n.id, color);
  if (opts.radius) try { await cmd('set_corner_radius', { nodeId: n.id, radius: opts.radius }); } catch {}
  if (opts.stroke) try { await cmd('set_stroke_color', { nodeId: n.id, color: opts.stroke, strokeWeight: opts.strokeW || 1.5 }); } catch {}
  await cmd('insert_child', { parentId: parent, childId: n.id });
  return n;
}

async function txt(parent, x, y, content, opts = {}) {
  const { size = 15, family = 'Source Serif 4', style = 'Regular', color = COL.charcoal, spacing = 0, lineH = 0, name } = opts;
  const n = await cmd('create_text', { x, y, text: content, name: name || content.slice(0, 30) });
  await cmd('set_font_size', { nodeId: n.id, fontSize: size });
  try { await cmd('set_font_name', { nodeId: n.id, family, style }); } catch {}
  await fill(n.id, color);
  if (spacing) try { await cmd('set_letter_spacing', { nodeId: n.id, letterSpacing: spacing, unit: 'PIXELS' }); } catch {}
  if (lineH) try { await cmd('set_line_height', { nodeId: n.id, lineHeight: lineH, unit: 'PIXELS' }); } catch {}
  await cmd('insert_child', { parentId: parent, childId: n.id });
  return n;
}

// === COMPONENTS ===

async function makePage(name, index) {
  const f = await cmd('create_frame', { name, x: index * (W + GAP), y: 0, width: W, height: H });
  await fill(f.id, COL.sandstone);
  return f;
}

async function sectionHeader(p, num, title) {
  await rect(p, 0, 0, W, 95, COL.deepSlate);
  await txt(p, M, 20, `SECTION ${num}`, { size: 11, style: 'SemiBold', color: COL.wattle, spacing: 3 });
  await txt(p, M, 44, title, { size: 28, family: 'Playfair Display', style: 'Bold', color: COL.white });
  return 115;
}

async function contHeader(p, title) {
  await rect(p, 0, 0, W, 50, COL.deepSlate);
  await txt(p, M, 16, title, { size: 16, family: 'Playfair Display', style: 'Bold', color: COL.white });
  return 65;
}

async function specialHeader(p, label, title) {
  await rect(p, 0, 0, W, 95, COL.deepSlate);
  await txt(p, M, 20, label, { size: 11, style: 'SemiBold', color: COL.wattle, spacing: 3 });
  await txt(p, M, 44, title, { size: 26, family: 'Playfair Display', style: 'Bold', color: COL.white });
  return 115;
}

async function fieldNote(p, x, y, w, title, bodyText) {
  const chars = cpl(15, w - 40);
  const wrapped = wrap(bodyText, chars);
  const lines = wrapped.split('\n').length;
  const h = 52 + lines * 23;
  await rect(p, x, y, w, h, COL.white, { radius: 6 });
  await rect(p, x, y + 2, 7, h - 4, COL.wattle);
  await txt(p, x + 20, y + 14, title, { size: 11, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  await txt(p, x + w - 90, y + 14, 'SKIP TO THIS', { size: 8, style: 'SemiBold', color: COL.mutedText, spacing: 1 });
  await txt(p, x + 20, y + 38, wrapped, { size: 15, lineH: 23 });
  return h;
}

async function heading(p, x, y, text, opts = {}) {
  const { size = 20, color = COL.deepSlate } = opts;
  await txt(p, x, y, text, { size, family: 'Playfair Display', style: 'Bold', color });
  return size + 10;
}

async function body(p, x, y, text, opts = {}) {
  const { width = CW, size = 15, color = COL.charcoal, bold = false } = opts;
  const wrapped = wrap(text, cpl(size, width));
  const lineH = Math.round(size * 1.54);
  await txt(p, x, y, wrapped, { size, lineH, color, style: bold ? 'SemiBold' : 'Regular' });
  return wrapped.split('\n').length * lineH;
}

async function pageFooter(p, num) {
  await rect(p, 0, H - 44, W, 1, { ...COL.ghostGum, a: 0.4 });
  await txt(p, M, H - 34, 'Caravan Solar', { size: 10, family: 'Playfair Display', style: 'Regular', color: COL.mutedText });
  await txt(p, W / 2 - 30, H - 34, 'caravansolar.au', { size: 9, color: COL.mutedText });
  await txt(p, W - M - 10, H - 34, String(num), { size: 10, color: COL.mutedText });
}

async function progressBar(p, section) {
  const total = 8;
  const barY = H - 16;
  const barW = 180;
  const barX = (W - barW) / 2;
  await rect(p, barX, barY, barW, 1, COL.ghostGum);
  for (let i = 0; i < total; i++) {
    const dx = barX + (barW / (total - 1)) * i;
    const dot = await cmd('create_ellipse', { x: dx - 3, y: barY - 3, width: 6, height: 6, name: `dot${i}` });
    await fill(dot.id, i === section ? COL.wattle : COL.ghostGum);
    await cmd('insert_child', { parentId: p, childId: dot.id });
  }
}

async function checkbox(p, x, y, label, opts = {}) {
  const { width = CW - 30, size = 14 } = opts;
  await rect(p, x, y + 1, 16, 16, COL.white, { stroke: COL.ghostGum, strokeW: 1.5, radius: 2 });
  const wrapped = wrap(label, cpl(size, width));
  await txt(p, x + 26, y, wrapped, { size, lineH: 22 });
  return Math.max(22, wrapped.split('\n').length * 22) + 8;
}

async function zebraTable(p, x, y, config) {
  const { cols, rows, width = CW, rowH = 30, headerH = 36, fontSize = 12,
    headerBg = COL.deepSlate, headerColor = COL.white } = config;
  const colX = [];
  let cx = x;
  for (const col of cols) { colX.push(cx); cx += col.w * width; }
  let cy = y;
  await rect(p, x, cy, width, headerH, headerBg, { radius: 3 });
  for (let i = 0; i < cols.length; i++) {
    await txt(p, colX[i] + 8, cy + 10, cols[i].label, { size: fontSize, style: 'SemiBold', color: headerColor });
  }
  cy += headerH;
  for (let r = 0; r < rows.length; r++) {
    if (r % 2 === 0) await rect(p, x, cy, width, rowH, COL.lightGrey);
    for (let i = 0; i < cols.length; i++) {
      await txt(p, colX[i] + 8, cy + 7, rows[r][i] || '', { size: fontSize, lineH: 16 });
    }
    cy += rowH;
  }
  return cy - y;
}

async function tierColorTable(p, x, y, config) {
  const { labelCol, tierCols, rows, width = CW, rowH = 30, headerH = 36, fontSize = 12 } = config;
  const lw = labelCol.w * width;
  const tw = ((width - lw) / tierCols.length);
  let cy = y;
  await rect(p, x, cy, lw, headerH, COL.deepSlate, { radius: 3 });
  await txt(p, x + 8, cy + 10, labelCol.label, { size: fontSize, style: 'SemiBold', color: COL.white });
  for (let i = 0; i < tierCols.length; i++) {
    await rect(p, x + lw + i * tw, cy, tw, headerH, tierCols[i].color);
    await txt(p, x + lw + i * tw + 8, cy + 10, tierCols[i].label, { size: fontSize, style: 'SemiBold', color: COL.white });
  }
  cy += headerH;
  for (let r = 0; r < rows.length; r++) {
    if (r % 2 === 0) await rect(p, x, cy, width, rowH, COL.lightGrey);
    await txt(p, x + 8, cy + 7, rows[r][0], { size: fontSize, style: 'SemiBold', lineH: 16 });
    for (let i = 0; i < tierCols.length; i++) {
      await txt(p, x + lw + i * tw + 8, cy + 7, rows[r][i + 1] || '', { size: fontSize, lineH: 16 });
    }
    cy += rowH;
  }
  return cy - y;
}

async function tierBadge(p, x, y, name, color) {
  await rect(p, x, y, 130, 36, { ...color, a: 0.12 }, { radius: 5, stroke: color });
  await txt(p, x + 16, y + 9, name, { size: 14, style: 'SemiBold', color });
}

async function divider(p, y, opts = {}) {
  const { x = M, width = CW } = opts;
  await rect(p, x, y, width, 1, COL.ghostGum);
  return 15;
}

async function numberedItem(p, x, y, num, text, opts = {}) {
  const { width = CW - 30 } = opts;
  await txt(p, x, y, `${num}.`, { size: 15, style: 'SemiBold', color: COL.wattle });
  const h = await body(p, x + 22, y, text, { width });
  return Math.max(h, 23) + 6;
}

async function bulletItem(p, x, y, text, opts = {}) {
  const { width = CW - 20, bold = false } = opts;
  await txt(p, x, y + 1, '\u2022', { size: 16, color: COL.wattle });
  const h = await body(p, x + 16, y, text, { width, bold });
  return Math.max(h, 23) + 4;
}

async function costCallout(p, x, y, title, cost, description) {
  const descChars = cpl(14, CW - 36);
  const wrappedDesc = wrap(description, descChars);
  const descLines = wrappedDesc.split('\n').length;
  const cardH = 70 + descLines * 22;
  await rect(p, x, y, CW, cardH, COL.white, { radius: 8 });
  // cost badge
  await rect(p, x + CW - 140, y + 10, 128, 26, { ...COL.terracotta, a: 0.12 }, { radius: 4 });
  await txt(p, x + CW - 132, y + 15, cost, { size: 13, style: 'SemiBold', color: COL.terracotta });
  await txt(p, x + 16, y + 14, title, { size: 15, style: 'SemiBold', color: COL.deepSlate });
  await txt(p, x + 16, y + 44, wrappedDesc, { size: 14, lineH: 22, color: COL.charcoal });
  return cardH + 10;
}

// =================================================================
// PAGE BUILDERS
// =================================================================

async function buildCover(pi) {
  const f = await makePage('Cover', pi);
  await fill(f.id, COL.deepSlate);

  // Top accent bar
  await rect(f.id, 0, 0, W, 5, COL.wattle);

  // Warm gradient wash at top
  await rect(f.id, 0, 5, W, 180, { ...COL.wattle, a: 0.06 });

  // Label
  await rect(f.id, M, 70, 50, 3, COL.wattle);
  await txt(f.id, M, 88, "THE BEGINNER'S GUIDE TO", { size: 13, style: 'SemiBold', color: COL.wattle, spacing: 3 });

  // Title
  await txt(f.id, M, 120, 'Caravan\nSolar', {
    size: 78, family: 'Playfair Display', style: 'Bold', color: COL.white, lineH: 88, name: 'Title'
  });

  // Decorative line
  await rect(f.id, M, 310, 80, 3, COL.wattle);

  // Subtitle
  await txt(f.id, M, 330, wrap(
    "Clear recommendations, brand comparisons, and shopping lists for Australian caravanners who don't want to become electrical engineers.", 48
  ), { size: 16, color: { ...COL.white, a: 0.7 }, lineH: 26, name: 'Subtitle' });

  // Warm landscape section
  const bandY = 460;
  // Graduated warm bands (sunrise feel)
  await rect(f.id, 0, bandY, W, 6, { ...COL.wattle, a: 0.5 });
  await rect(f.id, 0, bandY + 6, W, 6, { ...COL.wattle, a: 0.3 });
  await rect(f.id, 0, bandY + 12, W, 8, COL.terracotta);
  await rect(f.id, 0, bandY + 20, W, 6, { ...COL.terracotta, a: 0.5 });

  // Lower section - sandstone
  await rect(f.id, 0, bandY + 26, W, H - bandY - 26, COL.sandstone);

  // "What's inside" summary
  await txt(f.id, M, bandY + 50, "WHAT'S INSIDE", { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 3 });
  const insideItems = [
    'Your power audit in 10 minutes',
    'Exactly what to buy, component by component',
    'Brand comparisons (REDARC, Victron, Enerdrive, Renogy)',
    'Ready-to-use shopping lists for your tier',
    'Printable checklists and worksheets',
  ];
  let insideY = bandY + 70;
  for (const item of insideItems) {
    await txt(f.id, M + 2, insideY, '\u2022', { size: 12, color: COL.wattle });
    await txt(f.id, M + 16, insideY, item, { size: 13, color: COL.deepSlate });
    insideY += 22;
  }

  // Tier badges - more prominent
  const tierY = insideY + 20;
  await txt(f.id, M, tierY - 4, 'Sized for how you travel:', { size: 12, style: 'SemiBold', color: COL.mutedText });
  await tierBadge(f.id, M, tierY + 18, 'Weekender', TIER.weekender);
  await tierBadge(f.id, M + 155, tierY + 18, 'Tourer', TIER.tourer);
  await tierBadge(f.id, M + 310, tierY + 18, 'Full-timer', TIER.fulltimer);

  // Footer
  await rect(f.id, 0, H - 50, W, 50, { ...COL.deepSlate, a: 0.08 });
  await txt(f.id, M, H - 34, 'caravansolar.au', { size: 11, color: COL.mutedText });
  await txt(f.id, W - M - 130, H - 34, 'PDF GUIDE + WORKSHEETS', { size: 10, style: 'SemiBold', color: COL.mutedText, spacing: 2 });
}

async function buildTOC(pi) {
  const f = await makePage('Table of Contents', pi);
  let y = M;

  await txt(f.id, M, y, "WHAT'S INSIDE", { size: 11, style: 'SemiBold', color: COL.wattle, spacing: 3 });
  y += 28;
  await txt(f.id, M, y, 'Contents', { size: 36, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  y += 55;
  await rect(f.id, M, y, CW, 1, COL.ghostGum);
  y += 20;

  const entries = [
    { n: '01', t: 'The 60-Second Version', d: 'Everything you need to know in one page' },
    { n: '02', t: 'Your Power Audit', d: 'Figure out how much power you actually use' },
    { n: '03', t: 'What to Buy', d: 'Component by component, plain English' },
    { n: '04', t: 'Brand Comparisons & Shopping Lists', d: 'Side-by-side picks with ready-to-use lists' },
    { n: '05', t: 'System Sizing Check', d: 'Make sure the numbers actually work' },
    { n: '06', t: 'Expensive Mistakes', d: '7 mistakes that cost $500 to $2,000' },
    { n: '', t: 'Checklists & Worksheets', d: 'Before You Buy, Installer Brief, First Week' },
  ];

  for (const e of entries) {
    if (e.n) {
      await txt(f.id, M, y, e.n, { size: 28, family: 'Playfair Display', style: 'Bold', color: { ...COL.wattle, a: 0.3 } });
    }
    const tx = e.n ? M + 50 : M;
    await txt(f.id, tx, y + (e.n ? 4 : 0), e.t, { size: 17, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
    await txt(f.id, tx, y + 26, e.d, { size: 13, color: COL.mutedText });
    y += 68;
    if (e.n) await rect(f.id, M, y - 10, CW, 1, { ...COL.ghostGum, a: 0.5 });
  }

  // "Short version" explainer box
  const bxY = H - 180;
  const nh = await fieldNote(f.id, M, bxY, CW, 'LOOK FOR THESE BOXES',
    "Every section has a callout box like this one. Read only these boxes and you'll have your answer in about 5 minutes."
  );
}

// --- SECTION 1: The 60-Second Version ---
async function buildS1(pi) {
  const f = await makePage('S1 - 60-Second Version', pi);
  let y = await sectionHeader(f.id, 1, 'The 60-Second Version');

  y += await fieldNote(f.id, M, y, CW, 'SKIP THIS IF YOU WANT',
    "Just want the \"what to buy\" part? Go straight to Section 3. Otherwise, here's the 60-second version."
  );
  y += 8;

  y += await heading(f.id, M, y, 'The Whole System in Plain English');
  y += 2;

  const parts = [
    'Solar panels sit on your roof and turn sunlight into power.',
    'A battery stores that power. This is the fuel tank.',
    'A charge controller manages charging safely.',
    'A DC-DC charger tops up the battery from your car while you drive.',
    'An inverter lets you plug in normal 240V things (laptop, microwave).',
    'A battery monitor is your fuel gauge.',
  ];
  for (let i = 0; i < parts.length; i++) {
    y += await numberedItem(f.id, M, y, i + 1, parts[i]);
  }

  y += 4;
  y += await body(f.id, M, y, "That's it. Six things. The rest of this guide tells you exactly which ones to buy and what size.", { bold: true });
  y += 8;

  y += await heading(f.id, M, y, 'One Quick Concept');
  y += 2;
  y += await body(f.id, M, y, "Watt-hours measure daily power use. If something uses 60 watts for 10 hours, that's 600 Wh. Your fridge uses about 60W all day: roughly 1,440 Wh.");
  y += 6;
  y += await body(f.id, M, y, "That daily number drives everything: battery size, solar, the lot. Section 2 helps you work out yours in about 10 minutes.");

  await pageFooter(f.id, 1);
  await progressBar(f.id, 0);
}

// --- SECTION 2: Power Audit (page 1) ---
async function buildS2p1(pi) {
  const f = await makePage('S2 - Power Audit', pi);
  let y = await sectionHeader(f.id, 2, 'Your Power Audit');

  y += await body(f.id, M, y, "We need to figure out roughly how much power your caravan uses in a day. Takes about 10 minutes, and it's the one piece of homework in this guide. Everything else flows from it.");
  y += 4;
  y += await body(f.id, M, y, "Don't stress about being exact. Within 20% is plenty. We add a buffer for the stuff you forget.");
  y += 10;

  y += await heading(f.id, M, y, "Walk-Through: Dave and Sarah's Setup");
  y += 2;
  y += await body(f.id, M, y, "Dave and Sarah are tourers. Weeks on the road, mix of parks and free camping. Here's their typical day off-grid:");
  y += 8;

  const items = [
    ['Fridge (all day, all night)', '60W x 24h', '~1,440 Wh'],
    ['LED lights (evening)', '30W x 5h', '~150 Wh'],
    ['TV after dinner', '40W x 3h', '~120 Wh'],
    ['Phones + laptop', '100W x 2h', '~220 Wh'],
    ['Water pump, heater, etc.', 'Various', '~220 Wh'],
  ];
  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'Appliance', w: 0.45 }, { label: 'Usage', w: 0.25 }, { label: 'Daily Wh', w: 0.3 }],
    rows: items, headerBg: COL.ghostGum, headerColor: COL.deepSlate, fontSize: 12
  });
  y += 12;

  y += await body(f.id, M, y, "Daily total: about 2,150 Wh. Add 25% buffer: about 2,700 Wh per day.", { bold: true });
  y += 8;
  y += await body(f.id, M, y, "That's it. No complicated formulas. Just: what do you have, how long is it on, roughly how much does it use?");
  y += 8;
  y += await body(f.id, M, y, "Your turn. Use the Power Audit Worksheet at the back. It lists every common caravan appliance with typical power draws.");

  await pageFooter(f.id, 2);
  await progressBar(f.id, 1);
}

// --- SECTION 2: Power Audit (page 2) ---
async function buildS2p2(pi) {
  const f = await makePage('S2 - Tiers', pi);
  let y = await contHeader(f.id, 'Your Power Audit');

  y += await heading(f.id, M, y, 'Which Tier Are You?');
  y += 4;
  y += await body(f.id, M, y, "Your daily number tells you what kind of system you need:");
  y += 10;

  // Weekender
  await rect(f.id, M, y, CW, 90, { ...TIER.weekender, a: 0.08 }, { radius: 6, stroke: TIER.weekender });
  await txt(f.id, M + 14, y + 10, 'WEEKENDER', { size: 11, style: 'SemiBold', color: TIER.weekender, spacing: 2 });
  await txt(f.id, M + 14, y + 28, 'Under 1,500 Wh/day', { size: 14, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  await txt(f.id, M + 14, y + 48, wrap("Short trips, mostly caravan parks, some free camping. Fridge, lights, phones.", cpl(12, CW - 30)), { size: 12, lineH: 18 });
  await txt(f.id, M + CW - 120, y + 10, '$1,500 - $2,500', { size: 12, style: 'SemiBold', color: TIER.weekender });
  y += 104;

  // Tourer
  await rect(f.id, M, y, CW, 90, { ...TIER.tourer, a: 0.08 }, { radius: 6, stroke: TIER.tourer });
  await txt(f.id, M + 14, y + 10, 'TOURER', { size: 11, style: 'SemiBold', color: TIER.tourer, spacing: 2 });
  await txt(f.id, M + 14, y + 28, '1,500 to 3,000 Wh/day', { size: 14, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  await txt(f.id, M + 14, y + 48, wrap("Weeks on the road, mix of parks and free camping. Fridge, lights, TV, laptops.", cpl(12, CW - 30)), { size: 12, lineH: 18 });
  await txt(f.id, M + CW - 120, y + 10, '$3,000 - $5,000', { size: 12, style: 'SemiBold', color: TIER.tourer });
  y += 104;

  // Full-timer
  await rect(f.id, M, y, CW, 90, { ...TIER.fulltimer, a: 0.08 }, { radius: 6, stroke: TIER.fulltimer });
  await txt(f.id, M + 14, y + 10, 'FULL-TIMER', { size: 11, style: 'SemiBold', color: TIER.fulltimer, spacing: 2 });
  await txt(f.id, M + 14, y + 28, 'Over 3,000 Wh/day', { size: 14, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  await txt(f.id, M + 14, y + 48, wrap("Living on the road. Everything above plus microwave, coffee machine, hair dryer.", cpl(12, CW - 30)), { size: 12, lineH: 18 });
  await txt(f.id, M + CW - 120, y + 10, '$5,000 - $8,000+', { size: 12, style: 'SemiBold', color: TIER.fulltimer });
  y += 114;

  // Air con note
  y += await fieldNote(f.id, M, y, CW, 'A NOTE ON AIR CONDITIONING',
    "Air con off-grid isn't practical on a standard setup. If it's a must-have, you need a 48V system ($10,000+) or a generator. This guide covers standard 12V setups."
  );
  y += 10;

  y += await body(f.id, M, y, "Got your number? Good. From here on, the guide is built around your tier. Every recommendation, every shopping list is matched to Weekender, Tourer, or Full-timer.", { bold: true });

  await pageFooter(f.id, 3);
  await progressBar(f.id, 1);
}

// --- SECTION 3: What to Buy (page 1 - Battery) ---
async function buildS3p1(pi) {
  const f = await makePage('S3 - Battery', pi);
  let y = await sectionHeader(f.id, 3, 'What to Buy');

  y += await body(f.id, M, y, "Each component gets a quick answer at the top. Trust us? Read the callout boxes and move on.");
  y += 10;

  y += await heading(f.id, M, y, 'Battery');
  y += 2;
  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Buy lithium. Not AGM, not gel. Lithium. Costs more upfront but lasts years longer and gives way more usable power. 200Ah lithium is the sweet spot for most people."
  );
  y += 8;

  y += await body(f.id, M, y, "An AGM \"200Ah\" battery only gives about 100Ah usable. A lithium \"200Ah\" gives 160-200Ah usable. You'd need two AGMs to match one lithium, and they weigh twice as much and last 3-5 years vs 10+.");
  y += 6;
  y += await body(f.id, M, y, "The most common beginner mistake is buying AGM now and upgrading to lithium a year later. That's $400-$800 in the bin.", { bold: true });
  y += 10;

  await txt(f.id, M, y, 'What to buy by tier:', { size: 14, style: 'SemiBold', color: COL.deepSlate });
  y += 22;
  y += await bulletItem(f.id, M, y, 'Weekender: 100-200Ah lithium');
  y += await bulletItem(f.id, M, y, 'Tourer: 200Ah lithium (one battery does the job)');
  y += await bulletItem(f.id, M, y, 'Full-timer: 300-400Ah lithium');
  y += 4;
  y += await body(f.id, M, y, "Make sure it has a built-in BMS (Battery Management System). All the brands we recommend include one.", { size: 12 });

  await pageFooter(f.id, 4);
  await progressBar(f.id, 2);
}

// --- SECTION 3: What to Buy (page 2 - Solar + Controller) ---
async function buildS3p2(pi) {
  const f = await makePage('S3 - Solar + Controller', pi);
  let y = await contHeader(f.id, 'What to Buy');

  y += await heading(f.id, M, y, 'Solar Panels');
  y += 2;
  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Fixed panels on the roof PLUS a portable folding panel. Roof panels do daily work; portable is for shade. Go monocrystalline."
  );
  y += 8;
  y += await body(f.id, M, y, "Fixed panels bolt to your roof and work all day. Portable panels fold out at camp and angle toward the sun. Most people get both.");
  y += 4;
  y += await body(f.id, M, y, "A \"400W\" panel produces 200-280W in real conditions. This guide's sizing accounts for that.");
  y += 6;
  await txt(f.id, M, y, 'By tier:', { size: 14, style: 'SemiBold', color: COL.deepSlate });
  y += 20;
  y += await bulletItem(f.id, M, y, 'Weekender: 200W fixed');
  y += await bulletItem(f.id, M, y, 'Tourer: 300-400W fixed + 160-200W portable');
  y += await bulletItem(f.id, M, y, 'Full-timer: 400-600W fixed + 200W+ portable');
  y += 8;

  y += await divider(f.id, y);

  y += await heading(f.id, M, y, 'Charge Controller');
  y += 2;
  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Under 200W solar: PWM is fine. Everyone else: get MPPT. It squeezes 15-30% more power. Size at about 1/3 of your solar wattage in amps."
  );
  y += 6;
  await txt(f.id, M, y, 'By tier:', { size: 14, style: 'SemiBold', color: COL.deepSlate });
  y += 20;
  y += await bulletItem(f.id, M, y, 'Weekender: 20A PWM or MPPT');
  y += await bulletItem(f.id, M, y, 'Tourer: 30-40A MPPT');
  y += await bulletItem(f.id, M, y, 'Full-timer: 40-50A MPPT');

  await pageFooter(f.id, 5);
  await progressBar(f.id, 2);
}

// --- SECTION 3: What to Buy (page 3 - DC-DC + Inverter) ---
async function buildS3p3(pi) {
  const f = await makePage('S3 - DC-DC + Inverter', pi);
  let y = await contHeader(f.id, 'What to Buy');

  y += await heading(f.id, M, y, 'DC-DC Charger');
  y += 2;
  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Charges your battery from the car while you drive. Not optional. A few hours of driving puts a big chunk back in. Buy a REDARC BCDC."
  );
  y += 8;
  y += await body(f.id, M, y, "Modern cars have smart alternators that don't work with a direct connection. A DC-DC charger sorts this out. A 40A unit gives 120-160Ah on a 3-4 hour drive.");
  y += 6;
  await txt(f.id, M, y, 'By tier:', { size: 14, style: 'SemiBold', color: COL.deepSlate });
  y += 20;
  y += await bulletItem(f.id, M, y, 'Weekender: 20A DC-DC charger');
  y += await bulletItem(f.id, M, y, 'Tourer: 40A DC-DC charger');
  y += await bulletItem(f.id, M, y, 'Full-timer: 40-60A DC-DC charger');
  y += 8;

  y += await divider(f.id, y);

  y += await heading(f.id, M, y, 'Inverter');
  y += 2;
  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Pure sine wave inverter. NEVER modified sine wave. Size for your biggest appliance. Weekender: 1000W. Tourer: 2000W. Full-timer: 3000W."
  );
  y += 8;
  y += await body(f.id, M, y, "Your battery is 12V, appliances need 240V. The inverter converts it. Always pure sine wave. Modified sine wave saves $50-$100 but damages laptops and chargers.");
  y += 6;
  y += await body(f.id, M, y, "How big? Biggest single appliance: phones and laptops = 1000W. Microwave = 2000W. Hair dryer = 3000W.");

  await pageFooter(f.id, 6);
  await progressBar(f.id, 2);
}

// --- SECTION 3: What to Buy (page 4 - Monitor + Summary) ---
async function buildS3p4(pi) {
  const f = await makePage('S3 - Monitor + Summary', pi);
  let y = await contHeader(f.id, 'What to Buy');

  y += await heading(f.id, M, y, 'Battery Monitor');
  y += 2;
  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Buy a Victron SmartShunt ($130-$160). Shows battery level on your phone via Bluetooth. Without a monitor, you're driving without a fuel gauge."
  );
  y += 8;
  y += await body(f.id, M, y, "It shows exactly what percentage you're at, how fast you're using power, and how long until full. Without it you'll wear out the battery without realising.");
  y += 10;

  y += await divider(f.id, y);

  y += await heading(f.id, M, y, 'Your Complete System at a Glance');
  y += 2;
  y += await body(f.id, M, y, "All six components. Find your tier:");
  y += 8;

  y += await tierColorTable(f.id, M, y, {
    labelCol: { label: 'Component', w: 0.28 },
    tierCols: [
      { label: 'Weekender', color: TIER.weekender },
      { label: 'Tourer', color: TIER.tourer },
      { label: 'Full-timer', color: TIER.fulltimer },
    ],
    rows: [
      ['Battery', '100-200Ah', '200Ah', '300-400Ah'],
      ['Solar (roof)', '200W', '300-400W', '400-600W'],
      ['Solar (portable)', 'Optional', '160-200W', '200W+'],
      ['Controller', '20A PWM/MPPT', '30-40A MPPT', '40-50A MPPT'],
      ['DC-DC charger', '20A', '40A', '40-60A'],
      ['Inverter', '1000W PSW', '2000W PSW', '3000W PSW'],
      ['Monitor', 'SmartShunt', 'SmartShunt', 'SmartShunt'],
    ],
  });
  y += 16;
  y += await body(f.id, M, y, "That's your whole setup. Six things, sized for how you travel. Next section turns this into a shopping list with specific brands and prices.", { bold: true });

  await pageFooter(f.id, 7);
  await progressBar(f.id, 2);
}

// --- SECTION 4: Brands (page 1) ---
async function buildS4p1(pi) {
  const f = await makePage('S4 - Brands', pi);
  let y = await sectionHeader(f.id, 4, 'Which Brands to Buy');

  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "REDARC for DC-DC chargers. Victron for monitoring. Enerdrive for value. Renogy if budget is tight. Mixing brands is fine."
  );
  y += 8;
  y += await body(f.id, M, y, "This guide isn't sponsored by or affiliated with any brand. Genuine recommendations based on what holds up.", { size: 13, bold: true });
  y += 10;

  y += await heading(f.id, M, y, 'REDARC', { size: 17 });
  y += 2;
  await txt(f.id, M + CW - 80, y - 22, 'The Safe Choice', { size: 11, style: 'SemiBold', color: COL.wattle });
  y += await body(f.id, M, y, "Australian-made, based in Adelaide. Premium price, excellent build quality. Their BCDC DC-DC charger range is the industry standard.");
  y += 4;
  y += await body(f.id, M, y, "Buy REDARC for: DC-DC chargers. Think twice for: monitoring (Victron's app is better), and if budget is tight.", { size: 13 });
  y += 10;

  y += await heading(f.id, M, y, 'Victron', { size: 17 });
  y += 2;
  await txt(f.id, M + CW - 90, y - 22, 'The Smart Choice', { size: 11, style: 'SemiBold', color: COL.wattle });
  y += await body(f.id, M, y, "Dutch company, since 1975. Best app in the business. Battery level on your phone, graphs, alerts. Victron's ecosystem is in a league of its own.");
  y += 4;
  y += await body(f.id, M, y, "Buy Victron for: charge controllers, battery monitors, inverters. Think twice for: more separate components than REDARC or Enerdrive.", { size: 13 });

  await pageFooter(f.id, 8);
  await progressBar(f.id, 3);
}

// --- SECTION 4: Brands (page 2 - Enerdrive, Renogy, Comparison) ---
async function buildS4p2(pi) {
  const f = await makePage('S4 - More Brands', pi);
  let y = await contHeader(f.id, 'Which Brands to Buy');

  y += await heading(f.id, M, y, 'Enerdrive', { size: 17 });
  y += 2;
  await txt(f.id, M + CW - 90, y - 22, 'The Value Choice', { size: 11, style: 'SemiBold', color: COL.wattle });
  y += await body(f.id, M, y, "Australian brand (now Dometic). Good quality at lower price than REDARC, 5-year warranty, lifetime tech support. Their eSystem pre-wired boards are close to plug-and-play.");
  y += 4;
  y += await body(f.id, M, y, "Buy for: batteries, inverters, pre-wired systems. Think twice: narrower product range.", { size: 12 });
  y += 12;

  y += await heading(f.id, M, y, 'Renogy', { size: 17 });
  y += 2;
  await txt(f.id, M + CW - 95, y - 22, 'The Budget Choice', { size: 11, style: 'SemiBold', color: COL.wattle });
  y += await body(f.id, M, y, "Chinese brand with AU warehouse. Significantly cheaper. A 200Ah lithium for under $500 vs $800+ elsewhere. Good for Weekenders on a tight budget.");
  y += 4;
  y += await body(f.id, M, y, "Buy for: panels, batteries, starter kits. Think twice: full-timer daily reliance, slower warranty support.", { size: 12 });
  y += 14;

  y += await heading(f.id, M, y, 'One-Page Comparison');
  y += 6;

  y += await zebraTable(f.id, M, y, {
    cols: [
      { label: '', w: 0.2 }, { label: 'REDARC', w: 0.2 }, { label: 'Victron', w: 0.2 },
      { label: 'Enerdrive', w: 0.2 }, { label: 'Renogy', w: 0.2 }
    ],
    rows: [
      ['Made in', 'Australia', 'Netherlands', 'AU (Dometic)', 'China'],
      ['Price', 'Premium', 'Premium', 'Mid-range', 'Budget'],
      ['Best at', 'DC-DC', 'App + monitor', 'Value + install', 'Price'],
      ['Warranty', '2 years', '5 years', '5yr + lifetime', '5 years'],
      ['App', 'Good', 'Excellent', 'Good', 'Basic'],
      ['AU support', 'Excellent', 'Good', 'Excellent', 'OK'],
    ],
    fontSize: 12, rowH: 28, headerH: 32,
  });

  await pageFooter(f.id, 9);
  await progressBar(f.id, 3);
}

// --- SECTION 4: Shopping (page 3 - Where to Buy + Weekender) ---
async function buildS4p3(pi) {
  const f = await makePage('S4 - Where to Buy', pi);
  let y = await contHeader(f.id, 'Which Brands to Buy');

  y += await heading(f.id, M, y, 'Mixing Brands', { size: 17 });
  y += 2;
  y += await body(f.id, M, y, "You don't have to buy from one brand. Mix and match: REDARC DC-DC, Victron monitoring, Enerdrive battery. Standard connections, not proprietary.");
  y += 8;

  y += await heading(f.id, M, y, 'Where to Buy in Australia', { size: 17 });
  y += 2;
  y += await bulletItem(f.id, M, y, 'Solar 4 RVs, Caravan RV Camping, My Generator (specialist retailers)');
  y += await bulletItem(f.id, M, y, 'REDARC, Enerdrive, Renogy sell direct. Victron via distributors.');
  y += await bulletItem(f.id, M, y, 'Jaycar for cables, fuses, and small bits.');
  y += 2;
  y += await body(f.id, M, y, "Avoid no-name brands on eBay/Amazon with no Australian warranty.", { size: 13, bold: true });
  y += 8;

  y += await fieldNote(f.id, M, y, CW, "DON'T FORGET THE SMALL BITS",
    "Everyone forgets cables, fuses, Anderson plugs, and mounting brackets. Budget $100-$400. The Shopping List Worksheet has a full checklist."
  );
  y += 10;

  // Weekender shopping list
  await rect(f.id, M - 2, y, CW + 4, 26, { ...TIER.weekender, a: 0.12 }, { radius: 4, stroke: TIER.weekender });
  await txt(f.id, M + 10, y + 5, 'WEEKENDER SHOPPING LIST', { size: 11, style: 'SemiBold', color: TIER.weekender, spacing: 2 });
  await txt(f.id, M + CW - 110, y + 5, '$1,500 - $2,500', { size: 11, style: 'SemiBold', color: TIER.weekender });
  y += 32;

  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'What', w: 0.3 }, { label: 'Buy This', w: 0.45 }, { label: 'Cost', w: 0.25 }],
    rows: [
      ['Battery', 'Renogy/Enerdrive 200Ah Li', '$480-$900'],
      ['Solar (roof)', '1x 200W monocrystalline', '$200-$350'],
      ['Controller', '20A MPPT (Renogy/Victron)', '$100-$200'],
      ['DC-DC charger', 'REDARC BCDC1220 (20A)', '$200-$400'],
      ['Inverter', '1000W pure sine wave', '$150-$300'],
      ['Monitor', 'Victron SmartShunt', '$130-$160'],
      ['Wiring + bits', 'Cable, fuses, Anderson', '$100-$200'],
    ],
    headerBg: TIER.weekender, fontSize: 12, rowH: 28,
  });

  await pageFooter(f.id, 10);
  await progressBar(f.id, 3);
}

// --- SECTION 4: Shopping (page 4 - Tourer + Full-timer) ---
async function buildS4p4(pi) {
  const f = await makePage('S4 - Shopping Lists', pi);
  let y = await contHeader(f.id, 'Shopping Lists');

  // Tourer
  await rect(f.id, M - 2, y, CW + 4, 26, { ...TIER.tourer, a: 0.12 }, { radius: 4, stroke: TIER.tourer });
  await txt(f.id, M + 10, y + 5, 'TOURER SHOPPING LIST', { size: 11, style: 'SemiBold', color: TIER.tourer, spacing: 2 });
  await txt(f.id, M + CW - 110, y + 5, '$3,000 - $5,000', { size: 11, style: 'SemiBold', color: TIER.tourer });
  y += 32;

  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'What', w: 0.3 }, { label: 'Buy This', w: 0.45 }, { label: 'Cost', w: 0.25 }],
    rows: [
      ['Battery', '200-300Ah Li (Enerdrive/Victron)', '$900-$1,800'],
      ['Solar (roof)', '2x 200W monocrystalline', '$400-$700'],
      ['Solar (portable)', '1x 160-200W folding', '$300-$500'],
      ['Controller', '30-40A MPPT (Victron)', '$200-$400'],
      ['DC-DC charger', 'REDARC BCDC1240 (40A)', '$400-$600'],
      ['Inverter', '2000W PSW (Enerdrive/Victron)', '$350-$600'],
      ['Monitor', 'Victron SmartShunt', '$130-$160'],
      ['Wiring + bits', 'Cable, fuses, Anderson, ext socket', '$150-$300'],
    ],
    headerBg: TIER.tourer, fontSize: 12, rowH: 28,
  });
  y += 16;

  // Full-timer
  await rect(f.id, M - 2, y, CW + 4, 26, { ...TIER.fulltimer, a: 0.12 }, { radius: 4, stroke: TIER.fulltimer });
  await txt(f.id, M + 10, y + 5, 'FULL-TIMER SHOPPING LIST', { size: 11, style: 'SemiBold', color: TIER.fulltimer, spacing: 2 });
  await txt(f.id, M + CW - 110, y + 5, '$5,000 - $8,000+', { size: 11, style: 'SemiBold', color: TIER.fulltimer });
  y += 32;

  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'What', w: 0.3 }, { label: 'Buy This', w: 0.45 }, { label: 'Cost', w: 0.25 }],
    rows: [
      ['Battery', '300-400Ah Li (Victron/Enerdrive)', '$1,800-$3,000'],
      ['Solar (roof)', '400-600W (2-3 panels)', '$600-$1,200'],
      ['Solar (portable)', '1x 200W+ folding', '$400-$700'],
      ['Controller', '40-50A MPPT (Victron)', '$300-$500'],
      ['DC-DC charger', 'REDARC BCDC1250D (50A)', '$500-$800'],
      ['Inverter', '3000W PSW (Victron/Enerdrive)', '$800-$1,500'],
      ['Monitor', 'Victron SmartShunt/BMV-712', '$130-$300'],
      ['Wiring + bits', 'Heavy cable, fuses, dist. board', '$200-$400'],
    ],
    headerBg: TIER.fulltimer, fontSize: 12, rowH: 28,
  });

  await pageFooter(f.id, 11);
  await progressBar(f.id, 3);
}

// --- SECTION 5: Sizing (page 1) ---
async function buildS5p1(pi) {
  const f = await makePage('S5 - Sizing Check', pi);
  let y = await sectionHeader(f.id, 5, 'Checking Your Sizing');

  y += await fieldNote(f.id, M, y, CW, 'BOTTOM LINE',
    "Buying from the shopping lists in Section 4? Sizing is already done. This is a double-check, or for setups between tiers."
  );
  y += 8;

  y += await heading(f.id, M, y, 'The Quick Sanity Check');
  y += 2;
  y += await body(f.id, M, y, "Run these three checks. If all pass, you're good to go.");
  y += 8;

  // Check 1
  await rect(f.id, M, y, CW, 80, COL.lightGrey, { radius: 6 });
  await txt(f.id, M + 14, y + 10, 'CHECK 1', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  await txt(f.id, M + 14, y + 26, 'Solar vs Battery', { size: 15, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  await txt(f.id, M + 14, y + 46, wrap("Solar watts should be 1.5-2x your battery Ah. E.g. 200Ah battery = 300-400W solar.", cpl(12, CW - 30)), { size: 12, lineH: 18 });
  y += 90;

  // Check 2
  await rect(f.id, M, y, CW, 80, COL.lightGrey, { radius: 6 });
  await txt(f.id, M + 14, y + 10, 'CHECK 2', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  await txt(f.id, M + 14, y + 26, 'Controller vs Solar', { size: 15, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  await txt(f.id, M + 14, y + 46, wrap("Controller amps should be about 1/3 of solar watts. E.g. 400W solar = 30-40A controller.", cpl(12, CW - 30)), { size: 12, lineH: 18 });
  y += 90;

  // Check 3
  await rect(f.id, M, y, CW, 80, COL.lightGrey, { radius: 6 });
  await txt(f.id, M + 14, y + 10, 'CHECK 3', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  await txt(f.id, M + 14, y + 26, 'Inverter vs Biggest Appliance', { size: 15, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  await txt(f.id, M + 14, y + 46, wrap("Inverter should be 2x your biggest appliance. E.g. 1000W microwave = 2000W inverter.", cpl(12, CW - 30)), { size: 12, lineH: 18 });
  y += 90;

  y += await body(f.id, M, y, "All three checks pass? You're done. Go buy it.", { bold: true, size: 14 });

  await pageFooter(f.id, 12);
  await progressBar(f.id, 4);
}

// --- SECTION 5: Sizing (page 2 - Worked Example) ---
async function buildS5p2(pi) {
  const f = await makePage('S5 - Worked Example', pi);
  let y = await contHeader(f.id, 'Checking Your Sizing');

  y += await heading(f.id, M, y, 'Worked Example: Dave and Sarah');
  y += 4;
  y += await body(f.id, M, y, "Daily use: 2,700 Wh (with 25% buffer). Tourers who drive regularly.");
  y += 8;

  y += await body(f.id, M, y, "Battery: 2,700 Wh / 12V = 225Ah minimum. With cloudy-day buffer: 400Ah total (2x 200Ah lithium).", { size: 13 });
  y += 4;
  y += await body(f.id, M, y, "Solar: 2,700 / 5.5h / 0.65 = ~760W needed, but DC-DC helps on driving days. 400W roof + 200W portable (600W total).", { size: 13 });
  y += 4;
  y += await body(f.id, M, y, "Controller: 400W / 12V x 1.25 = 42A. They buy a 50A MPPT.", { size: 13 });
  y += 4;
  y += await body(f.id, M, y, "DC-DC: 40A charger gives ~160Ah on a 4-hour drive.", { size: 13 });
  y += 4;
  y += await body(f.id, M, y, "Inverter: Biggest appliance is 1000W microwave. 2000W pure sine wave.", { size: 13 });
  y += 14;

  y += await heading(f.id, M, y, "Dave and Sarah's Final System", { size: 17 });
  y += 6;

  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'Component', w: 0.4 }, { label: 'What They Bought', w: 0.6 }],
    rows: [
      ['Battery', '2x 200Ah lithium (400Ah total)'],
      ['Solar (roof)', '2x 200W panels (400W)'],
      ['Solar (portable)', '1x 200W folding panel'],
      ['Charge controller', '50A MPPT'],
      ['DC-DC charger', '40A'],
      ['Inverter', '2000W pure sine wave'],
      ['Battery monitor', 'Victron SmartShunt'],
      ['Total cost', '~$4,500 - $5,500'],
    ],
    fontSize: 12,
  });

  await pageFooter(f.id, 13);
  await progressBar(f.id, 4);
}

// --- SECTION 5: Sizing (page 3 - Sun Hours) ---
async function buildS5p3(pi) {
  const f = await makePage('S5 - Sun Hours', pi);
  let y = await contHeader(f.id, 'Checking Your Sizing');

  y += await heading(f.id, M, y, 'Sun Hours by Region');
  y += 4;
  y += await body(f.id, M, y, "If you're doing the longer sizing calculation, here are average daily peak sun hours across Australia:");
  y += 10;

  y += await zebraTable(f.id, M, y, {
    cols: [
      { label: 'Region', w: 0.4 }, { label: 'Good', w: 0.2 },
      { label: 'Poor', w: 0.2 }, { label: 'Avg', w: 0.2 }
    ],
    rows: [
      ['Northern AU (Darwin, Cairns)', '5.5-6.5', '5.0-6.0', '5.5-6.0'],
      ['Central AU (Alice Springs)', '6.5-7.5', '5.0-5.5', '6.0-6.5'],
      ['Eastern (Sydney, Melbourne)', '5.5-6.5', '3.0-3.5', '4.5-5.0'],
      ['Western AU (Perth, Pilbara)', '6.0-7.0', '3.5-4.0', '5.0-5.5'],
      ['South AU (Adelaide, Flinders)', '6.0-7.0', '3.5-4.0', '5.0-5.5'],
      ['Tasmania', '5.0-5.5', '2.5-3.0', '3.5-4.0'],
    ],
    fontSize: 12,
  });
  y += 14;

  y += await body(f.id, M, y, "If you travel up north in winter (like most caravanners do), you get excellent sun year-round. Staying in the southeast through winter means less output. Worth sizing up slightly if that's the plan.");
  y += 14;
  y += await divider(f.id, y);
  y += await body(f.id, M, y, "Use the System Sizing Worksheet at the back to run through these calculations with your own numbers.");

  await pageFooter(f.id, 14);
  await progressBar(f.id, 4);
}

// --- SECTION 6: Expensive Mistakes (page 1) ---
async function buildS6p1(pi) {
  const f = await makePage('S6 - Mistakes', pi);
  let y = await sectionHeader(f.id, 6, 'Expensive Mistakes');

  y += await body(f.id, M, y, "If you've followed this guide, you've already avoided all of these. Read through anyway.");
  y += 8;

  // Mistake 1
  y += await costCallout(f.id, M, y,
    'Mistake 1: Buying AGM Now, Lithium Later', '$400-$800 wasted',
    "You buy AGM because it's cheaper upfront. Within a year you upgrade to lithium. The AGMs go in the bin. Buy lithium from the start."
  );

  // Mistake 2
  y += await costCallout(f.id, M, y,
    'Mistake 2: Not Enough Solar for Your Battery', '$300-$1,000+',
    "Big battery, not enough solar. It sits undercharged day after day, wearing out years early. Solar should be 1.5-2x your battery Ah."
  );

  // Mistake 3
  y += await costCallout(f.id, M, y,
    'Mistake 3: Trusting the Number on the Box', '$500-$1,500',
    "Your \"400W\" panels produce 200-280W in real conditions. People who don't know this buy too little and wonder why the battery never fills."
  );

  // Mistake 4
  y += await costCallout(f.id, M, y,
    'Mistake 4: Thin Cables', '$200-$500 to rewire',
    "12V systems need thicker cables than house wiring. Thin cables waste power. Going DIY? One size thicker than you think you need."
  );

  await pageFooter(f.id, 15);
  await progressBar(f.id, 5);
}

// --- SECTION 6: Expensive Mistakes (page 2) ---
async function buildS6p2(pi) {
  const f = await makePage('S6 - More Mistakes', pi);
  let y = await contHeader(f.id, 'Expensive Mistakes');

  // Mistake 5
  y += await costCallout(f.id, M, y,
    'Mistake 5: No Battery Monitor', '$500-$1,500',
    "Without a monitor, you guess how much charge is left. You run it down too far, it wears out faster. A SmartShunt costs $130-$160."
  );

  // Mistake 6
  y += await costCallout(f.id, M, y,
    'Mistake 6: Modified Sine Wave Inverter', '$200-$500',
    "You save $50-$100 on a cheaper inverter that produces rough power. Laptops and chargers stop working properly. Always buy pure sine wave."
  );

  // Mistake 7
  y += await costCallout(f.id, M, y,
    'Mistake 7: No External Anderson Plug', '$300-$500 wasted',
    "You buy a portable panel but there's nowhere to plug it in outside. An external Anderson socket costs $20-$40 and takes 30 minutes to install."
  );

  y += 6;
  y += await divider(f.id, y);

  y += await heading(f.id, M, y, 'The Pattern');
  y += 2;
  y += await body(f.id, M, y, "Every mistake comes from one of three places:");
  y += 4;
  y += await bulletItem(f.id, M, y, "Buying cheap and replacing later. The right gear once is cheaper than the wrong gear twice.", { bold: true });
  y += await bulletItem(f.id, M, y, "Not knowing real-world performance. Lab specs differ from reality. This guide accounts for that.", { bold: true });
  y += await bulletItem(f.id, M, y, "Skipping the small stuff. Cables, monitors, and Anderson plugs are cheap. The problems they prevent aren't.", { bold: true });
  y += 8;
  y += await body(f.id, M, y, "If you bought from the shopping lists in Section 4, you've avoided all seven.", { bold: true });

  await pageFooter(f.id, 16);
  await progressBar(f.id, 5);
}

// --- CHECKLIST: Before You Buy ---
async function buildCheckBYB(pi) {
  const f = await makePage('CL - Before You Buy', pi);
  let y = await specialHeader(f.id, 'CHECKLIST', 'Before You Buy');

  await txt(f.id, M, y, 'THE BASICS', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await checkbox(f.id, M, y, 'Completed the Power Audit (Section 2 or worksheet)');
  y += await checkbox(f.id, M, y, 'Know your daily watt-hours number');
  y += await checkbox(f.id, M, y, 'Identified your tier: Weekender / Tourer / Full-timer');
  y += 6;

  await txt(f.id, M, y, 'YOUR GEAR', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await checkbox(f.id, M, y, 'Shopping List worksheet filled in with specific products');
  y += await checkbox(f.id, M, y, 'Battery is lithium with built-in BMS');
  y += await checkbox(f.id, M, y, 'Inverter is pure sine wave');
  y += await checkbox(f.id, M, y, 'Battery monitor included (e.g. Victron SmartShunt)');
  y += await checkbox(f.id, M, y, 'External Anderson plug socket included');
  y += await checkbox(f.id, M, y, 'Cables, fuses, and connectors in your budget');
  y += 6;

  await txt(f.id, M, y, 'WILL IT FIT?', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await checkbox(f.id, M, y, 'Measured roof space for panels (clear of A/C, antenna, hatches)');
  y += await checkbox(f.id, M, y, 'Checked battery box dimensions');
  y += await checkbox(f.id, M, y, 'Confirmed weight (lithium is usually lighter than AGM)');
  y += 6;

  await txt(f.id, M, y, 'QUICK SIZING CHECK', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await checkbox(f.id, M, y, 'Solar watts = 1.5-2x battery Ah?');
  y += await checkbox(f.id, M, y, 'Controller amps = ~1/3 of solar watts?');
  y += await checkbox(f.id, M, y, 'Inverter handles biggest appliance with room to spare?');
  y += 6;

  await txt(f.id, M, y, 'INSTALLATION', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await checkbox(f.id, M, y, 'Got an installer? Hand them the Installer Brief.');
  y += await checkbox(f.id, M, y, 'Going DIY? Grab manufacturer install guides for each component.');

  await pageFooter(f.id, 17);
  await progressBar(f.id, 6);
}

// --- CHECKLIST: Installer Brief (page 1) ---
async function buildCheckInstall1(pi) {
  const f = await makePage('CL - Installer Brief', pi);
  let y = await specialHeader(f.id, 'CHECKLIST', 'What to Tell Your Installer');

  y += await body(f.id, M, y, "Print this page and hand it to your installer.", { bold: true });
  y += 8;

  y += await heading(f.id, M, y, 'My System Specs', { size: 17 });
  y += 4;

  const specRows = [
    ['Battery', '_______ Ah lithium (Brand: _______)'],
    ['Solar (roof)', '_______ W total (___ x ___ W panels)'],
    ['Portable panel', '_______ W (with ext. Anderson socket)'],
    ['Charge controller', '_______ A MPPT (Brand: _______)'],
    ['DC-DC charger', '_______ A (Brand: _______)'],
    ['Inverter', '_______ W pure sine wave (Brand: _______)'],
    ['Battery monitor', 'Brand: _______'],
  ];
  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'Component', w: 0.3 }, { label: 'What I Want', w: 0.7 }],
    rows: specRows, fontSize: 12, rowH: 30,
  });
  y += 14;

  await txt(f.id, M, y, 'PLEASE MAKE SURE', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 18;
  y += await checkbox(f.id, M, y, 'External Anderson plug socket is installed for portable panel');
  y += await checkbox(f.id, M, y, 'Battery monitor is set up and working before you leave');
  y += await checkbox(f.id, M, y, 'All wiring is correctly sized for the system');
  y += await checkbox(f.id, M, y, 'I get a walk-through of the system when done (see next page)');

  await pageFooter(f.id, 18);
  await progressBar(f.id, 6);
}

// --- CHECKLIST: Installer Brief (page 2) ---
async function buildCheckInstall2(pi) {
  const f = await makePage('CL - Installer Questions', pi);
  let y = await contHeader(f.id, 'What to Tell Your Installer');

  y += await heading(f.id, M, y, 'Questions to Ask', { size: 17 });
  y += 4;

  y += await numberedItem(f.id, M, y, 1, '"Have you installed this brand/setup before?"');
  y += await numberedItem(f.id, M, y, 2, '"Is there anything in my spec list you\'d change, and why?"');
  y += await numberedItem(f.id, M, y, 3, '"What\'s included in the quote and what\'s extra?"');
  y += await numberedItem(f.id, M, y, 4, '"How long will it take?" (standard tourer = ~1 day)');
  y += await numberedItem(f.id, M, y, 5, '"What warranty do I get on the installation work?"');
  y += 8;

  y += await heading(f.id, M, y, 'After Installation Walk-Through', { size: 17 });
  y += 2;
  y += await body(f.id, M, y, "Before the installer leaves, get them to show you:");
  y += 6;
  y += await checkbox(f.id, M, y, 'How to read the battery monitor (percentage, charging)');
  y += await checkbox(f.id, M, y, 'Where the main fuse/isolator is');
  y += await checkbox(f.id, M, y, 'How to connect the portable panel via Anderson plug');
  y += await checkbox(f.id, M, y, 'System is working: solar charging, battery level going up');
  y += await checkbox(f.id, M, y, 'Test a 240V appliance through the inverter');
  y += await checkbox(f.id, M, y, "Their contact number for roadside issues");

  y += 8;
  y += await fieldNote(f.id, M, y, CW, 'WHY THIS PAGE EXISTS',
    "Installers are busy. Walk in with just \"I want solar\" and you'll get whatever they normally install. This page makes sure you get what you planned for."
  );

  await pageFooter(f.id, 19);
  await progressBar(f.id, 6);
}

// --- CHECKLIST: First Week (page 1) ---
async function buildCheckWeek1(pi) {
  const f = await makePage('CL - First Week p1', pi);
  let y = await specialHeader(f.id, 'CHECKLIST', 'Your First Week With Solar');

  y += await body(f.id, M, y, "Your system is in. Here's how to get familiar with it. After a week it'll be second nature.");
  y += 8;

  y += await heading(f.id, M, y, 'Day 1: Get to Know Your Monitor', { size: 17 });
  y += 4;
  y += await checkbox(f.id, M, y, 'Find the battery monitor. Should show a percentage.');
  y += await checkbox(f.id, M, y, 'Turn on your usual stuff (fridge, lights). Watch the monitor.');
  y += await checkbox(f.id, M, y, 'Test the inverter. Phone charger first, then biggest appliance.');
  y += await checkbox(f.id, M, y, 'Plug in portable panel via Anderson socket. Confirm charging.');
  y += 8;

  y += await heading(f.id, M, y, 'Day 2-3: Learn the Pattern', { size: 17 });
  y += 4;
  y += await checkbox(f.id, M, y, 'Check monitor in the morning. 100% to 85% overnight is normal.');
  y += await checkbox(f.id, M, y, 'Check late afternoon. Back near 95-100%? System is keeping up.');
  y += await checkbox(f.id, M, y, 'Notice the rhythm: drops overnight, fills during the day.');
  y += 8;

  y += await fieldNote(f.id, M, y, CW, 'THE DAILY RHYTHM',
    "Battery drops overnight (fridge), solar fills it during the day. If the top-up roughly matches drawdown, you're golden. Hovering around 80% by afternoon? Set up the portable panel."
  );

  await pageFooter(f.id, 20);
  await progressBar(f.id, 6);
}

// --- CHECKLIST: First Week (page 2) ---
async function buildCheckWeek2(pi) {
  const f = await makePage('CL - First Week p2', pi);
  let y = await contHeader(f.id, 'Your First Week With Solar');

  y += await heading(f.id, M, y, 'What You\'ll See (All Normal)', { size: 17 });
  y += 4;
  y += await bulletItem(f.id, M, y, 'Battery sits between 70-100% on a typical day');
  y += await bulletItem(f.id, M, y, 'Solar output is high midday, low morning/evening, zero at night');
  y += await bulletItem(f.id, M, y, 'Fridge draws power in bursts (compressor cycling on/off)');
  y += await bulletItem(f.id, M, y, 'Inverter hums quietly when switched on');
  y += await bulletItem(f.id, M, y, 'Cloudy days produce less solar (1-2 cloudy days is fine)');
  y += 8;

  y += await heading(f.id, M, y, 'If Something Seems Off', { size: 17 });
  y += 4;
  y += await body(f.id, M, y, "Battery dropping even though it's sunny?", { bold: true, size: 13 });
  y += await body(f.id, M, y, "Check for shade on panels. Move the van or set up portable panel.");
  y += 6;
  y += await body(f.id, M, y, "Inverter switches off when you plug something in?", { bold: true, size: 13 });
  y += await body(f.id, M, y, "Too much at once. Use one big appliance at a time.");
  y += 6;
  y += await body(f.id, M, y, "Battery low after a few overcast days?", { bold: true, size: 13 });
  y += await body(f.id, M, y, "Drive for a couple of hours. The DC-DC charger will handle it.");
  y += 10;

  y += await heading(f.id, M, y, 'After a Week', { size: 17 });
  y += 2;
  y += await body(f.id, M, y, "You'll barely think about it. A quick glance at the monitor becomes like checking the fuel gauge. If it stays above 60-70% most of the time, your system is well sized.");
  y += 8;
  y += await body(f.id, M, y, "That's it. You've got solar on your caravan and you know how to use it.", { bold: true });

  await pageFooter(f.id, 21);
  await progressBar(f.id, 6);
}

// --- WORKSHEET: Power Audit (page 1) ---
async function buildWSPower1(pi) {
  const f = await makePage('WS - Power Audit p1', pi);
  let y = await specialHeader(f.id, 'WORKSHEET', 'Power Audit');

  y += await body(f.id, M, y, "List every electrical appliance you plan to run off-grid. Check the label for wattage. If it shows amps, multiply by 12 to get watts.");
  y += 10;

  y += await zebraTable(f.id, M, y, {
    cols: [
      { label: 'Appliance', w: 0.35 }, { label: 'Watts', w: 0.15 },
      { label: 'Hrs/Day', w: 0.2 }, { label: 'Daily Wh', w: 0.3 }
    ],
    rows: [
      ['Compressor fridge', '50-70', '24', '_____________'],
      ['LED lights (all)', '20-40', '____', '_____________'],
      ['TV (12V)', '30-60', '____', '_____________'],
      ['Phone charger x ___', '10-20 ea', '____', '_____________'],
      ['Laptop charger', '45-65', '____', '_____________'],
      ['Tablet charger', '10-15', '____', '_____________'],
      ['Water pump', '50-70', '____', '_____________'],
      ['Diesel heater fan', '20-40', '____', '_____________'],
      ['Range hood fan', '20-30', '____', '_____________'],
      ['Radio/speakers', '10-20', '____', '_____________'],
      ['CPAP machine', '30-60', '____', '_____________'],
      ['Electric blanket', '40-60', '____', '_____________'],
    ],
    fontSize: 12, rowH: 28, headerH: 32,
  });

  await pageFooter(f.id, 22);
  await progressBar(f.id, 7);
}

// --- WORKSHEET: Power Audit (page 2) ---
async function buildWSPower2(pi) {
  const f = await makePage('WS - Power Audit p2', pi);
  let y = await contHeader(f.id, 'Power Audit Worksheet');

  y += await zebraTable(f.id, M, y, {
    cols: [
      { label: 'Appliance', w: 0.35 }, { label: 'Watts', w: 0.15 },
      { label: 'Hrs/Day', w: 0.2 }, { label: 'Daily Wh', w: 0.3 }
    ],
    rows: [
      ['Hair dryer (inverter)', '1200-2000', '____', '_____________'],
      ['Microwave (inverter)', '800-1200', '____', '_____________'],
      ['Coffee machine (inv.)', '800-1500', '____', '_____________'],
      ['Toaster (inverter)', '800-1200', '____', '_____________'],
      ['_______________', '_____', '____', '_____________'],
      ['_______________', '_____', '____', '_____________'],
      ['_______________', '_____', '____', '_____________'],
    ],
    fontSize: 12, rowH: 28, headerH: 32,
  });
  y += 10;

  await rect(f.id, M, y, CW, 70, COL.parchment, { radius: 6 });
  await txt(f.id, M + 14, y + 10, 'Subtotal:', { size: 14, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + CW - 150, y + 10, '_____________ Wh', { size: 14, color: COL.deepSlate });
  await txt(f.id, M + 14, y + 34, '+ 25% buffer (x 1.25):', { size: 14, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + CW - 150, y + 34, '_____________ Wh', { size: 14, style: 'SemiBold', color: COL.wattle });
  y += 86;

  y += await heading(f.id, M, y, 'Your Traveller Tier', { size: 17 });
  y += 6;

  // Tier boxes
  await rect(f.id, M, y, CW / 3 - 6, 60, { ...TIER.weekender, a: 0.08 }, { radius: 6, stroke: TIER.weekender });
  await txt(f.id, M + 10, y + 8, 'Under 1,500 Wh', { size: 11, style: 'SemiBold', color: TIER.weekender });
  await txt(f.id, M + 10, y + 28, 'Weekender', { size: 14, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });

  const t2x = M + CW / 3 + 3;
  await rect(f.id, t2x, y, CW / 3 - 6, 60, { ...TIER.tourer, a: 0.08 }, { radius: 6, stroke: TIER.tourer });
  await txt(f.id, t2x + 10, y + 8, '1,500-3,000 Wh', { size: 11, style: 'SemiBold', color: TIER.tourer });
  await txt(f.id, t2x + 10, y + 28, 'Tourer', { size: 14, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });

  const t3x = M + 2 * CW / 3 + 6;
  await rect(f.id, t3x, y, CW / 3 - 6, 60, { ...TIER.fulltimer, a: 0.08 }, { radius: 6, stroke: TIER.fulltimer });
  await txt(f.id, t3x + 10, y + 8, 'Over 3,000 Wh', { size: 11, style: 'SemiBold', color: TIER.fulltimer });
  await txt(f.id, t3x + 10, y + 28, 'Full-timer', { size: 14, family: 'Playfair Display', style: 'Bold', color: COL.deepSlate });
  y += 76;

  await rect(f.id, M, y, CW, 50, COL.parchment, { radius: 6 });
  await txt(f.id, M + 14, y + 8, 'My tier:', { size: 13, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + 100, y + 8, '______________________', { size: 13, color: COL.mutedText });
  await txt(f.id, M + 14, y + 28, 'My daily total:', { size: 13, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + 130, y + 28, '_____________ Wh', { size: 13, color: COL.mutedText });

  await pageFooter(f.id, 23);
  await progressBar(f.id, 7);
}

// --- WORKSHEET: System Sizing (page 1) ---
async function buildWSSizing1(pi) {
  const f = await makePage('WS - System Sizing p1', pi);
  let y = await specialHeader(f.id, 'WORKSHEET', 'System Sizing');

  await rect(f.id, M, y, CW, 36, COL.parchment, { radius: 4 });
  await txt(f.id, M + 14, y + 10, 'Daily power use (from Power Audit):', { size: 12, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + CW - 140, y + 10, '_____________ Wh', { size: 12, color: COL.mutedText });
  y += 48;

  // Step 1
  await txt(f.id, M, y, 'STEP 1', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await heading(f.id, M, y, 'Battery Size', { size: 17 });
  y += 4;
  y += await body(f.id, M, y, "Daily Wh / 12V / 0.85 (lithium usable) = minimum Ah", { size: 12 });
  y += 6;
  await rect(f.id, M, y, CW, 60, COL.lightGrey, { radius: 4 });
  await txt(f.id, M + 14, y + 8, '_______ Wh / 12 / 0.85 = _______ Ah (minimum)', { size: 12, color: COL.deepSlate });
  await txt(f.id, M + 14, y + 30, '_______ Ah x 1.5 = _______ Ah (with 1 day reserve)', { size: 12, color: COL.deepSlate });
  y += 72;
  await txt(f.id, M, y, 'Your battery choice:', { size: 12, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + 150, y, '_______ Ah lithium', { size: 12, color: COL.mutedText });
  y += 24;

  // Step 2
  await txt(f.id, M, y, 'STEP 2', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await heading(f.id, M, y, 'Solar Panel Wattage', { size: 17 });
  y += 4;
  y += await body(f.id, M, y, "Daily Wh / peak sun hours / 0.65 (real-world efficiency) = total solar watts", { size: 12 });
  y += 6;
  await rect(f.id, M, y, CW, 40, COL.lightGrey, { radius: 4 });
  await txt(f.id, M + 14, y + 12, '_______ Wh / _______ hours / 0.65 = _______ W', { size: 12, color: COL.deepSlate });
  y += 52;
  await txt(f.id, M, y, 'Fixed panels:', { size: 12, style: 'SemiBold' });
  await txt(f.id, M + 100, y, '_______ W', { size: 12, color: COL.mutedText });
  await txt(f.id, M + 200, y, 'Portable:', { size: 12, style: 'SemiBold' });
  await txt(f.id, M + 270, y, '_______ W', { size: 12, color: COL.mutedText });
  y += 24;

  // Step 3
  await txt(f.id, M, y, 'STEP 3', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await heading(f.id, M, y, 'Charge Controller Size', { size: 17 });
  y += 4;
  y += await body(f.id, M, y, "Fixed panel wattage / 12V x 1.25 (safety margin) = controller amps", { size: 12 });
  y += 6;
  await rect(f.id, M, y, CW, 40, COL.lightGrey, { radius: 4 });
  await txt(f.id, M + 14, y + 12, '_______ W / 12 x 1.25 = _______ A', { size: 12, color: COL.deepSlate });
  y += 52;
  await txt(f.id, M, y, 'Your charge controller:', { size: 12, style: 'SemiBold' });
  await txt(f.id, M + 170, y, '_______ A MPPT', { size: 12, color: COL.mutedText });

  await pageFooter(f.id, 24);
  await progressBar(f.id, 7);
}

// --- WORKSHEET: System Sizing (page 2) ---
async function buildWSSizing2(pi) {
  const f = await makePage('WS - System Sizing p2', pi);
  let y = await contHeader(f.id, 'System Sizing Worksheet');

  // Step 4
  await txt(f.id, M, y, 'STEP 4', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await heading(f.id, M, y, 'Inverter Size', { size: 17 });
  y += 4;
  y += await body(f.id, M, y, "Add up 240V appliances you'd run simultaneously, multiply by 1.2 for surge.", { size: 12 });
  y += 6;
  await rect(f.id, M, y, CW, 40, COL.lightGrey, { radius: 4 });
  await txt(f.id, M + 14, y + 12, 'Total simultaneous: _______ W x 1.2 = _______ W', { size: 12, color: COL.deepSlate });
  y += 52;
  await txt(f.id, M, y, 'Your inverter:', { size: 12, style: 'SemiBold' });
  await txt(f.id, M + 110, y, '_______ W pure sine wave', { size: 12, color: COL.mutedText });
  y += 24;

  // Step 5
  await txt(f.id, M, y, 'STEP 5', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 16;
  y += await heading(f.id, M, y, 'DC-DC Charger', { size: 17 });
  y += 4;
  y += await body(f.id, M, y, "Weekender: 20A. Tourer: 40A. Full-timer: 40-60A.");
  y += 4;
  await txt(f.id, M, y, 'Your DC-DC charger:', { size: 12, style: 'SemiBold' });
  await txt(f.id, M + 150, y, '_______ A', { size: 12, color: COL.mutedText });
  y += 26;

  y += await divider(f.id, y);

  y += await heading(f.id, M, y, 'Complete System Summary', { size: 17 });
  y += 6;

  y += await zebraTable(f.id, M, y, {
    cols: [
      { label: 'Component', w: 0.28 }, { label: 'Spec', w: 0.22 },
      { label: 'Brand/Model', w: 0.28 }, { label: 'Est. Cost', w: 0.22 }
    ],
    rows: [
      ['Battery', '___Ah Li', '____________', '$_______'],
      ['Solar (fixed)', '___W', '____________', '$_______'],
      ['Solar (portable)', '___W', '____________', '$_______'],
      ['Controller', '___A MPPT', '____________', '$_______'],
      ['DC-DC charger', '___A', '____________', '$_______'],
      ['Inverter', '___W PSW', '____________', '$_______'],
      ['Monitor', '________', '____________', '$_______'],
      ['Wiring + fuses', '________', '____________', '$_______'],
      ['TOTAL', '', '', '$_______'],
    ],
    fontSize: 12, rowH: 28,
  });
  y += 12;

  await txt(f.id, M, y, 'QUICK CROSS-CHECK', { size: 10, style: 'SemiBold', color: COL.wattle, spacing: 2 });
  y += 18;
  y += await checkbox(f.id, M, y, 'Solar watts = 1.5-2x battery Ah?');
  y += await checkbox(f.id, M, y, 'Controller amps = ~1/3 of solar watts?');
  y += await checkbox(f.id, M, y, 'Inverter = 2-3x biggest 240V appliance?');
  y += await checkbox(f.id, M, y, 'All three pass? System is balanced. Go buy it.');

  await pageFooter(f.id, 25);
  await progressBar(f.id, 7);
}

// --- WORKSHEET: Shopping List (page 1) ---
async function buildWSShopping1(pi) {
  const f = await makePage('WS - Shopping List p1', pi);
  let y = await specialHeader(f.id, 'WORKSHEET', 'Shopping List');

  await rect(f.id, M, y, CW, 36, COL.parchment, { radius: 4 });
  await txt(f.id, M + 14, y + 10, 'My tier:', { size: 12, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + 80, y + 10, '____________', { size: 12, color: COL.mutedText });
  await txt(f.id, M + 240, y + 10, 'Budget range:', { size: 12, style: 'SemiBold', color: COL.deepSlate });
  await txt(f.id, M + 340, y + 10, '$____________', { size: 12, color: COL.mutedText });
  y += 50;

  const components = [
    { name: 'Battery', spec: '_______ Ah lithium (LiFePO4)', note: 'Must have built-in BMS. Check dimensions fit battery box.' },
    { name: 'Solar (Fixed)', spec: '_______ W total (___ panels x ___ W)', note: 'Monocrystalline. Check physical size fits roof.' },
    { name: 'Solar (Portable)', spec: '_______ W folding panel', note: 'Check it comes with Anderson plug connector.' },
    { name: 'Charge Controller', spec: '_______ A MPPT', note: 'Check max input voltage matches panel config.' },
    { name: 'DC-DC Charger', spec: '_______ A', note: 'Check compatibility with vehicle alternator.' },
    { name: 'Inverter', spec: '_______ W pure sine wave', note: 'Must be PSW. Check outlet types (GPO, USB).' },
    { name: 'Battery Monitor', spec: 'Shunt-based with Bluetooth', note: '' },
  ];

  for (const comp of components) {
    await rect(f.id, M, y, CW, 60, COL.lightGrey, { radius: 4 });
    await txt(f.id, M + 10, y + 6, comp.name, { size: 12, style: 'SemiBold', color: COL.deepSlate });
    await txt(f.id, M + 10, y + 24, comp.spec, { size: 12, color: COL.charcoal });
    if (comp.note) {
      await txt(f.id, M + 10, y + 42, comp.note, { size: 12, color: COL.mutedText });
    }
    await txt(f.id, M + CW - 130, y + 6, 'Brand:', { size: 12, color: COL.mutedText });
    await txt(f.id, M + CW - 130, y + 24, 'Price: $', { size: 12, color: COL.mutedText });
    y += 66;
  }

  await pageFooter(f.id, 26);
  await progressBar(f.id, 7);
}

// --- WORKSHEET: Shopping List (page 2) ---
async function buildWSShopping2(pi) {
  const f = await makePage('WS - Shopping List p2', pi);
  let y = await contHeader(f.id, 'Shopping List Worksheet');

  y += await heading(f.id, M, y, 'Wiring and Accessories', { size: 17 });
  y += 6;

  y += await zebraTable(f.id, M, y, {
    cols: [
      { label: 'Item', w: 0.4 }, { label: 'Spec', w: 0.3 },
      { label: 'Qty', w: 0.12 }, { label: 'Price', w: 0.18 }
    ],
    rows: [
      ['Battery cable (pos)', '___ mm\u00B2', '___ m', '$_____'],
      ['Battery cable (neg)', '___ mm\u00B2', '___ m', '$_____'],
      ['Solar cable', '4mm\u00B2 twin', '___ m', '$_____'],
      ['Anderson plugs (50A)', 'Standard', '___ pairs', '$_____'],
      ['Ext. Anderson socket', 'Weatherproof', '1', '$_____'],
      ['Bus bars (+/-)', 'Rated for system', '2', '$_____'],
      ['ANL fuse + holder', 'Rated for battery', '1', '$_____'],
      ['Blade fuses (assorted)', 'Fuse box or individual', '___', '$_____'],
      ['MC4 connectors', 'For solar panels', '___ pairs', '$_____'],
      ['Cable ties + clips', 'Assorted', '1 pack', '$_____'],
      ['Mounting brackets', 'For panels', '___ sets', '$_____'],
    ],
    fontSize: 12, rowH: 26, headerH: 30,
  });
  y += 14;

  y += await heading(f.id, M, y, 'Total Budget', { size: 17 });
  y += 6;

  y += await zebraTable(f.id, M, y, {
    cols: [{ label: 'Category', w: 0.6 }, { label: 'Estimated Cost', w: 0.4 }],
    rows: [
      ['Battery', '$_____________'],
      ['Solar (fixed + portable)', '$_____________'],
      ['Charge controller', '$_____________'],
      ['DC-DC charger', '$_____________'],
      ['Inverter', '$_____________'],
      ['Battery monitor', '$_____________'],
      ['Wiring + accessories', '$_____________'],
      ['Total components', '$_____________'],
      ['Installation (if applicable)', '$_____________'],
      ['GRAND TOTAL', '$_____________'],
    ],
    fontSize: 12, rowH: 26, headerH: 30,
  });
  y += 14;

  y += await body(f.id, M, y, "Use the Before You Buy checklist to make sure you haven't missed anything.", { size: 13, bold: true });

  await pageFooter(f.id, 27);
  await progressBar(f.id, 7);
}

// --- BACK COVER ---
async function buildBackCover(pi) {
  const f = await makePage('Back Cover', pi);
  await fill(f.id, COL.deepSlate);

  // Top accent
  await rect(f.id, 0, 0, W, 5, COL.wattle);

  // Thank you
  await txt(f.id, M, 120, "You're all set.", {
    size: 36, family: 'Playfair Display', style: 'Bold', color: COL.white, lineH: 44
  });

  await rect(f.id, M, 175, 60, 3, COL.wattle);

  await txt(f.id, M, 200, wrap(
    "You've got your tier, your shopping list, and your checklists. Everything you need to get solar on your caravan without second-guessing yourself.", 46
  ), { size: 16, color: { ...COL.white, a: 0.75 }, lineH: 26 });

  // Resources recap
  let y = 310;
  await txt(f.id, M, y, 'YOUR RESOURCES', { size: 11, style: 'SemiBold', color: COL.wattle, spacing: 3 });
  y += 28;

  const resources = [
    ['Power Audit Worksheet', 'Work out your daily watt-hours'],
    ['System Sizing Worksheet', 'Size every component to your usage'],
    ['Shopping List Worksheet', 'Track brands, specs, and costs'],
    ['Before You Buy Checklist', 'Final check before you spend'],
    ['Installer Brief', 'Hand this to your installer'],
    ['First Week Checklist', 'Get comfortable with your system'],
  ];

  for (const [title, desc] of resources) {
    await txt(f.id, M + 2, y, '\u2022', { size: 14, color: COL.wattle });
    await txt(f.id, M + 18, y, title, { size: 14, style: 'SemiBold', color: COL.white });
    await txt(f.id, M + 18, y + 20, desc, { size: 13, color: { ...COL.white, a: 0.55 } });
    y += 46;
  }

  // CTA section
  y += 20;
  await rect(f.id, M, y, CW, 1, { ...COL.wattle, a: 0.3 });
  y += 24;

  await txt(f.id, M, y, 'WHAT TO DO NEXT', { size: 11, style: 'SemiBold', color: COL.wattle, spacing: 3 });
  y += 28;
  await txt(f.id, M, y, wrap(
    "1. Complete your Power Audit worksheet\n2. Identify your tier (Weekender, Tourer, Full-timer)\n3. Fill in your Shopping List from Section 4\n4. Run through the Before You Buy checklist\n5. Hand your installer the Installer Brief, or order online", 50
  ), { size: 14, color: { ...COL.white, a: 0.8 }, lineH: 24 });

  // Footer
  await rect(f.id, 0, H - 80, W, 80, { ...COL.black, a: 0.15 });
  await txt(f.id, M, H - 60, 'Caravan Solar', { size: 18, family: 'Playfair Display', style: 'Bold', color: COL.white });
  await txt(f.id, M, H - 38, 'caravansolar.au', { size: 12, color: COL.wattle });
  await txt(f.id, W - M - 180, H - 50, wrap("Questions? Updates? New versions?\nVisit caravansolar.au", 35), {
    size: 12, color: { ...COL.white, a: 0.5 }, lineH: 18
  });
}

// =================================================================
// MAIN ORCHESTRATOR
// =================================================================

async function main() {
  console.log('Connecting to Figma...');
  await connect();
  await join(CHANNEL);
  currentChannel = CHANNEL;
  console.log('[connected] Building 30 pages...\n');

  // Ensure Playfair Display + Source Serif 4 are loaded in Figma
  console.log('NOTE: Make sure Playfair Display and Source Serif 4 fonts are loaded in Figma.\n');

  const builders = [
    ['Cover', buildCover],
    ['Table of Contents', buildTOC],
    ['S1: 60-Second Version', buildS1],
    ['S2: Power Audit (1/2)', buildS2p1],
    ['S2: Power Audit (2/2)', buildS2p2],
    ['S3: Battery', buildS3p1],
    ['S3: Solar + Controller', buildS3p2],
    ['S3: DC-DC + Inverter', buildS3p3],
    ['S3: Monitor + Summary', buildS3p4],
    ['S4: Brands (1/4)', buildS4p1],
    ['S4: Brands (2/4)', buildS4p2],
    ['S4: Where to Buy (3/4)', buildS4p3],
    ['S4: Shopping Lists (4/4)', buildS4p4],
    ['S5: Sizing Check (1/3)', buildS5p1],
    ['S5: Worked Example (2/3)', buildS5p2],
    ['S5: Sun Hours (3/3)', buildS5p3],
    ['S6: Mistakes (1/2)', buildS6p1],
    ['S6: Mistakes (2/2)', buildS6p2],
    ['Checklist: Before You Buy', buildCheckBYB],
    ['Checklist: Installer Brief (1/2)', buildCheckInstall1],
    ['Checklist: Installer Brief (2/2)', buildCheckInstall2],
    ['Checklist: First Week (1/2)', buildCheckWeek1],
    ['Checklist: First Week (2/2)', buildCheckWeek2],
    ['Worksheet: Power Audit (1/2)', buildWSPower1],
    ['Worksheet: Power Audit (2/2)', buildWSPower2],
    ['Worksheet: System Sizing (1/2)', buildWSSizing1],
    ['Worksheet: System Sizing (2/2)', buildWSSizing2],
    ['Worksheet: Shopping List (1/2)', buildWSShopping1],
    ['Worksheet: Shopping List (2/2)', buildWSShopping2],
    ['Back Cover', buildBackCover],
  ];

  for (let i = 0; i < builders.length; i++) {
    const [label, fn] = builders[i];
    const start = Date.now();
    try {
      await fn(i);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  [${i + 1}/${builders.length}] ${label} (${elapsed}s)`);
    } catch (err) {
      console.error(`  [FAIL] ${label}: ${err.message}`);
    }
  }

  console.log('\nAll pages built. Check Figma.');
  ws.close();
  process.exit(0);
}

main().catch(err => { console.error('[fatal]', err.message); process.exit(1); });
