import { STORY, MEMORIES, ENDINGS } from './story.js';

const clone = value => JSON.parse(JSON.stringify(value));
const unique = values => [...new Set(values)];
const known = (values, table) => unique((Array.isArray(values) ? values : []).filter(id => Object.hasOwn(table, id)));
const flagIds = new Set(Object.values(STORY.nodes).flatMap(n => (n.choices || []).flatMap(c => c.flags || [])));
const safeFlags = flags => unique((Array.isArray(flags) ? flags : []).filter(f => flagIds.has(f)));

export function createState(raw = null) {
  const state = {
    schema: 1,
    current: { node: STORY.start, flags: [], history: [], paragraph: 0 },
    meta: { memories: [], endings: [], seen: [], read: [], loop: 1, hintsUsed: 0, playSeconds: 0, inspections: [] },
    slots: [null, null, null],
    settings: { music: true, typing: true, fontSize: 20, auto: false, reduceMotion: false },
    platformRewards: { hintCredits: 0, orders: [] }
  };
  if (raw && raw.schema === 1) {
    const meta = raw.meta || {};
    state.meta = {
      memories: known(meta.memories, MEMORIES), endings: known(meta.endings, ENDINGS),
      seen: known(meta.seen, STORY.nodes), read: known(meta.read, STORY.nodes),
      loop: Math.min(99999, Math.max(1, Math.trunc(Number(meta.loop) || 1))),
      hintsUsed: Math.max(0, Math.trunc(Number(meta.hintsUsed) || 0)),
      playSeconds: Math.max(0, Math.trunc(Number(meta.playSeconds) || 0)),
      inspections: Array.isArray(meta.inspections) ? meta.inspections.filter(x => typeof x === 'string').slice(-300) : []
    };
    state.current = normalizeCurrent(raw.current);
    state.slots = [0, 1, 2].map(i => {
      const slot = raw.slots?.[i];
      if (!slot || !STORY.nodes[slot.current?.node]) return null;
      return { current: normalizeCurrent(slot.current), savedAt: String(slot.savedAt || ''), loop: Math.max(1, Number(slot.loop) || 1) };
    });
    const settings = raw.settings || {};
    for (const key of ['music', 'typing', 'reduceMotion']) if (typeof settings[key] === 'boolean') state.settings[key] = settings[key];
    state.settings.fontSize = [18,20,22,24].includes(settings.fontSize) ? settings.fontSize : 20;
    state.settings.auto = false;
    if (raw.platformRewards && typeof raw.platformRewards === 'object') state.platformRewards = clone(raw.platformRewards);
  }
  visit(state, state.current.node, false);
  return state;
}

function normalizeCurrent(raw = {}) {
  const node = STORY.nodes[raw?.node] ? raw.node : STORY.start;
  const history = (Array.isArray(raw?.history) ? raw.history : []).filter(x => x && STORY.nodes[x.node]).slice(-180).map(x => ({node:x.node, label:String(x.label || '').slice(0,100)}));
  return { node, flags: safeFlags(raw?.flags), history, paragraph: Math.min(STORY.nodes[node].text.length - 1, Math.max(0, Math.trunc(Number(raw?.paragraph) || 0))) };
}

export function acquire(state, ids = []) {
  const added = known(ids, MEMORIES).filter(id => !state.meta.memories.includes(id));
  state.meta.memories = unique([...state.meta.memories, ...added]);
  return added;
}

export function visit(state, id, log = true, label = '') {
  const node = STORY.nodes[id];
  if (!node) throw new Error(`Unknown story node: ${id}`);
  state.current.node = id;
  if (log) {
    state.current.paragraph = 0;
    state.current.history.push({ node: id, label });
    state.current.history = state.current.history.slice(-180);
  }
  state.meta.seen = unique([...state.meta.seen, id]);
  return acquire(state, node.memory || []);
}

export function choiceStatus(state, choice) {
  const missing = (choice.requires || []).filter(id => !state.meta.memories.includes(id));
  const missingFlags = (choice.requiresFlags || []).filter(id => !state.current.flags.includes(id));
  const hidden = (choice.hideUnless || []).some(id => !state.meta.memories.includes(id));
  return { unlocked: !missing.length && !missingFlags.length, hidden, missing, missingFlags };
}

export function choose(state, index) {
  const node = STORY.nodes[state.current.node];
  const choice = node.choices?.[index];
  if (!choice || !choiceStatus(state, choice).unlocked || choiceStatus(state, choice).hidden) return { ok:false, added:[] };
  const added = acquire(state, choice.memory || []);
  state.current.flags = unique([...state.current.flags, ...safeFlags(choice.flags)]);
  const nextAdded = visit(state, choice.to, true, choice.label);
  return { ok: true, added: unique([...added, ...nextAdded]) };
}

export function inspect(state, index) {
  const item = STORY.nodes[state.current.node].inspect?.[index];
  if (!item) return { text:'', added:[] };
  const key = `${state.current.node}:${index}`;
  state.meta.inspections = unique([...state.meta.inspections, key]);
  return { text:item.text, added:acquire(state, item.memory || []) };
}

export function markRead(state) { state.meta.read = unique([...state.meta.read, state.current.node]); }
export function finish(state) {
  const id = STORY.nodes[state.current.node].ending;
  if (!ENDINGS[id]) return null;
  state.meta.endings = unique([...state.meta.endings, id]);
  return { id, ...ENDINGS[id] };
}
export function rewind(state) {
  state.meta.loop++;
  state.current = { node:STORY.start, flags:[], history:[], paragraph:0 };
  return visit(state, STORY.start);
}
export function saveSlot(state, index) {
  if (![0,1,2].includes(index)) return;
  state.slots[index] = { current:clone(state.current), savedAt:new Date().toISOString(), loop:state.meta.loop };
}
export function loadSlot(state, index) {
  const slot = state.slots[index];
  if (!slot) return false;
  state.current = normalizeCurrent(slot.current);
  visit(state, state.current.node, false);
  return true;
}
export function snapshot(state) { return clone(state); }
export function progress(state) {
  return { memories:state.meta.memories.length, memoryTotal:Object.keys(MEMORIES).length, endings:state.meta.endings.length, endingTotal:Object.keys(ENDINGS).length, nodes:state.meta.seen.length, nodeTotal:Object.keys(STORY.nodes).length };
}

export const LOCATIONS = { 'rain-street':'雨落旧街', cafe:'晚风咖啡馆', station:'末班电车站', archive:'旧城档案室', clocktower:'旧钟楼', dawn:'雨停之后' };

export function findHint(state) {
  const remembered = new Set(state.meta.memories);
  const search = (start, startingFlags, restart) => {
    const queue = [{ id:start, flags:startingFlags, path:[] }];
    const visited = new Set();
    for (let q = 0; q < queue.length && q < 6000; q++) {
      const step = queue[q];
      const key = step.id + ':' + [...step.flags].sort().join(',');
      if (visited.has(key)) continue;
      visited.add(key);
      const node = STORY.nodes[step.id];
      const missing = (node.memory || []).find(id => !remembered.has(id));
      const observed = (node.inspect || []).find(item => (item.memory || []).some(id => !remembered.has(id)));
      const undiscoveredEnding = remembered.size === Object.keys(MEMORIES).length && node.ending && !state.meta.endings.includes(node.ending);
      if (missing || observed || undiscoveredEnding) {
        const movements = step.path.slice(0,3).map(x => `「${x}」`).join('，然后');
        const place = LOCATIONS[node.scene] || node.scene;
        const action = observed ? `到${place}后，观察「${observed.label}」。` : missing ? `在${place}，留意与「${MEMORIES[missing].title}」有关的细节。` : `这条路线会带你走向一个尚未见过的落幕。`;
        return { text:(restart ? '下一次重来时，' : '这一轮，') + (movements ? `先选择${movements}。` : '') + action, target:missing || node.ending || 'observe', restart };
      }
      if (node.ending) continue;
      for (const choice of node.choices || []) {
        if ((choice.requires || []).some(id => !remembered.has(id)) || (choice.hideUnless || []).some(id => !remembered.has(id)) || (choice.requiresFlags || []).some(flag => !step.flags.includes(flag))) continue;
        const choiceMemory = (choice.memory || []).find(id => !remembered.has(id));
        if (choiceMemory) return { text:(restart ? '下一次重来时，' : '这一轮，') + `在${LOCATIONS[node.scene] || node.scene}选择「${choice.label}」，留意「${MEMORIES[choiceMemory].title}」。`, target:choiceMemory, restart };
        queue.push({ id:choice.to, flags:unique([...step.flags,...(choice.flags || [])]), path:[...step.path,choice.label] });
      }
    }
    return null;
  };
  return search(state.current.node,state.current.flags,false) || search(STORY.start,[],true);
}

export { STORY, MEMORIES, ENDINGS };
