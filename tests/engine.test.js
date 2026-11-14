import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, visit, acquire, choose, choiceStatus, inspect, rewind, finish, saveSlot, loadSlot, snapshot, findHint, STORY, MEMORIES, ENDINGS } from '../engine.js';

test('every scene, memory and ending is reachable through legitimate repeated play', () => {
  const known = new Set();
  const nodes = new Set();
  const endings = new Set();
  for (let round = 0; round <= Object.keys(MEMORIES).length + 1; round++) {
    const before = known.size;
    const queue = [{ id:STORY.start, flags:[] }];
    const visited = new Set();
    for (let i = 0; i < queue.length; i++) {
      assert.ok(i < 30000,'Story should not have unbounded flag-state exploration');
      const {id,flags} = queue[i];
      const key = id + ':' + [...flags].sort().join(',');
      if (visited.has(key)) continue;
      visited.add(key); nodes.add(id);
      const node = STORY.nodes[id]; assert.ok(node,`Broken story target: ${id}`);
      for (const memory of node.memory || []) known.add(memory);
      for (const item of node.inspect || []) for (const memory of item.memory || []) known.add(memory);
      if (node.ending) { assert.ok(ENDINGS[node.ending]); endings.add(node.ending); continue; }
      const unlocked = (node.choices || []).filter(c => (c.requires || []).every(x => known.has(x)) && (c.hideUnless || []).every(x => known.has(x)) && (c.requiresFlags || []).every(x => flags.includes(x)));
      assert.ok(unlocked.length,`Softlock at ${id} with flags ${flags}`);
      for (const choice of unlocked) {
        for (const memory of choice.memory || []) known.add(memory);
        queue.push({id:choice.to, flags:[...new Set([...flags,...(choice.flags || [])])]});
      }
    }
    if (known.size === before) break;
  }
  assert.deepEqual([...known].sort(),Object.keys(MEMORIES).sort(),'All memories must be discoverable without ads');
  assert.deepEqual([...endings].sort(),Object.keys(ENDINGS).sort(),'All endings must be reachable');
  assert.deepEqual([...nodes].sort(),Object.keys(STORY.nodes).sort(),'All story nodes must be reachable');
});

test('rewinding resets preparations but retains earned knowledge and endings', () => {
  const state = createState();
  acquire(state,[Object.keys(MEMORIES)[0]]);
  state.meta.endings = [Object.keys(ENDINGS)[0]];
  state.current.flags = ['a-temporary-preparation'];
  state.current.paragraph = 1;
  rewind(state);
  assert.equal(state.meta.loop,2);
  assert.equal(state.current.node,STORY.start);
  assert.equal(state.current.paragraph,0);
  assert.deepEqual(state.current.flags,[]);
  assert.ok(state.meta.memories.includes(Object.keys(MEMORIES)[0]));
  assert.deepEqual(state.meta.endings,[Object.keys(ENDINGS)[0]]);
});

test('a locked remembered option cannot be chosen by bypassing its UI', () => {
  const found = Object.entries(STORY.nodes).find(([,node]) => node.choices?.some(c => c.requires?.length));
  assert.ok(found);
  const [id,node] = found;
  const index = node.choices.findIndex(c => c.requires?.length);
  const state = createState(); visit(state,id);
  state.meta.memories = [];
  const before = snapshot(state);
  assert.equal(choose(state,index).ok,false);
  assert.deepEqual(state,before);
});

test('manual bookmark load restores route without erasing memories earned later', () => {
  const state = createState();
  saveSlot(state,0);
  const remembered = Object.keys(MEMORIES).at(-1);
  acquire(state,[remembered]);
  state.meta.hintsUsed = 3;
  state.platformRewards = {hintCredits:4,orders:[]};
  rewind(state);
  assert.equal(loadSlot(state,0),true);
  assert.equal(state.current.node,STORY.start);
  assert.ok(state.meta.memories.includes(remembered));
  assert.equal(state.meta.hintsUsed,3);
  assert.equal(state.platformRewards.hintCredits,4);
});

test('all three bookmarks and the exact paragraph survive serialization', () => {
  const state = createState();
  const node = Object.keys(STORY.nodes).find(id => STORY.nodes[id].text.length > 1);
  visit(state,node); state.current.paragraph = 1;
  for (let i = 0; i < 3; i++) saveSlot(state,i);
  const restored = createState(JSON.parse(JSON.stringify(snapshot(state))));
  assert.equal(restored.current.node,node);
  assert.equal(restored.current.paragraph,1);
  assert.equal(restored.slots.filter(Boolean).length,3);
});

test('the first optional hint points to real reachable information', () => {
  const hint = findHint(createState());
  assert.ok(hint && hint.text && hint.target);
  assert.ok(MEMORIES[hint.target] || ENDINGS[hint.target] || hint.target === 'observe');
});

test('observations award only declared memories and remain idempotent', () => {
  const entry = Object.entries(STORY.nodes).find(([,node]) => node.inspect?.some(item => item.memory?.length));
  assert.ok(entry,'At least one scene should contain an interactive observation');
  const [id,node] = entry;
  const index = node.inspect.findIndex(item => item.memory?.length);
  const state = createState(); visit(state,id);
  state.meta.memories = [];
  assert.ok(inspect(state,index).added.length);
  assert.equal(inspect(state,index).added.length,0);
});

test('finishing a chapter records its ending once, including the true ending', () => {
  const state = createState();
  const [id,node] = Object.entries(STORY.nodes).find(([,n]) => ENDINGS[n.ending]?.type === 'true');
  assert.ok(id && node);
  visit(state,id);
  assert.equal(finish(state).type,'true');
  finish(state);
  assert.equal(state.meta.endings.filter(e => e === node.ending).length,1);
});

test('the complete two-loop story reaches the true ending without any ad or injected knowledge', () => {
  const state = createState();
  const first = 'message message_changed meet_reply cafe_arrive old_order ask_now her_goal agree_companion route_brief station_arrive station_history station_index station_remote locker_open locker_door station_letter letter_read letter_after camera_manual two_releases blank_talk station_pack rendezvous ask_again proof_check proof_ready route_check route_learn tower_east mechanism_check manual_learn team_plan letter_check before_bell bell_rehearsal take_ready take_success after_rescue photo_offer exposure_learn end_promise'.split(' ');
  const second = 'message meet_reply cafe_arrive ask_drink ask_now her_goal agree_companion route_brief remembered_archive remembered_walk remembered_letter rendezvous ask_again proof_check proof_ready route_check tower_east mechanism_check team_plan letter_check before_bell take_ready take_success after_rescue photo_offer joint_offer joint_get_cable joint_setup joint_wait exposure night_after dawn_platform end_dawn'.split(' ');
  function play(route) {
    for (const target of route) {
      const node = STORY.nodes[state.current.node];
      const index = node.choices.findIndex(c => c.to === target && choiceStatus(state,c).unlocked && !choiceStatus(state,c).hidden);
      assert.notEqual(index,-1,`Cannot legitimately move from ${state.current.node} to ${target}`);
      assert.equal(choose(state,index).ok,true);
    }
  }
  play(first);
  assert.equal(finish(state).id,'promise');
  assert.equal(state.meta.memories.length,12);
  rewind(state);
  play(second);
  assert.equal(finish(state).id,'dawn');
  assert.equal(state.meta.loop,2);
  assert.equal(state.meta.hintsUsed,0);
  assert.equal(state.platformRewards.hintCredits,0);
});

test('story time never moves backward on a choice, with dawn interpreted as the next day', () => {
  const minute = node => {
    const [h,m] = node.time.split(':').map(Number);
    return h * 60 + m + (node.scene === 'dawn' ? 24 * 60 : 0);
  };
  for (const [id,node] of Object.entries(STORY.nodes)) {
    for (const choice of node.choices || []) assert.ok(minute(STORY.nodes[choice.to]) >= minute(node),`${id} → ${choice.to} moves backward in time`);
  }
});
