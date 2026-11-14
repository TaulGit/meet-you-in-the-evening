import test from 'node:test';
import assert from 'node:assert/strict';
import { createSoundPlayer, TRACKS, trackForScene } from '../sound.js';

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

class FakeAudio {
  constructor(src, key) {
    this.src = src;
    this.key = key;
    this.currentTime = 0;
    this.volume = 1;
    this.loop = false;
    this.paused = true;
    this.ended = false;
    this.playCalls = 0;
    this.pauseCalls = 0;
    this.playPlans = [];
  }

  play() {
    this.playCalls++;
    if (this.ended) { this.currentTime = 0; this.ended = false; }
    this.paused = false;
    return this.playPlans.shift() || Promise.resolve();
  }

  pause() { this.paused = true; this.pauseCalls++; }

  finish(seconds = 90) {
    this.currentTime = seconds;
    this.ended = true;
    this.paused = true;
  }
}

function harness() {
  let time = 0;
  let nextFrame = 0;
  const frames = new Map();
  const audios = new Map();
  const plans = new Map();
  const player = createSoundPlayer({
    createAudio(src, key) {
      assert.equal(audios.has(key), false, 'reuse a track instead of constructing a second player');
      const audio = new FakeAudio(src, key);
      audio.playPlans.push(...(plans.get(key) || []));
      audios.set(key, audio);
      return audio;
    },
    now: () => time,
    requestFrame(callback) { const id = ++nextFrame; frames.set(id, callback); return id; },
    cancelFrame: id => frames.delete(id),
    fadeDuration: 1000,
  });
  return {
    player,
    audios,
    frames,
    queuePlay(key, promise) {
      if (audios.has(key)) audios.get(key).playPlans.push(promise);
      else plans.set(key, [...(plans.get(key) || []), promise]);
    },
    advance(milliseconds) {
      time += milliseconds;
      const callbacks = [...frames.values()];
      frames.clear();
      for (const callback of callbacks) callback(time);
    },
  };
}

async function settle() {
  // setScene starts activate() synchronously; two microtasks settle the
  // already-resolved FakeAudio.play() without real timers or audio devices.
  await Promise.resolve();
  await Promise.resolve();
}

function near(actual, expected) {
  assert.ok(Math.abs(actual - expected) < 1e-10, `expected ${expected}, got ${actual}`);
}

test('scene mapping keeps ordinary story locations on the main score', () => {
  for (const scene of ['cover', 'rain-street', 'cafe', 'station', 'archive']) assert.equal(trackForScene(scene), 'main');
  assert.equal(trackForScene('clocktower'), 'clocktower');
  assert.equal(trackForScene('dawn'), 'dawn');
  assert.equal(TRACKS.main.loop, true);
  assert.equal(TRACKS.clocktower.loop, true);
  assert.equal(TRACKS.dawn.loop, false);
});

test('moving among main-score locations does not restart or recreate the recording', async () => {
  const h = harness();
  assert.equal(await h.player.start(), true);
  h.advance(1000);
  const main = h.audios.get('main');
  main.currentTime = 47.25;
  for (const scene of ['rain-street', 'cafe', 'station', 'archive', 'cover']) h.player.setScene(scene);
  await settle();
  assert.equal(main.playCalls, 1);
  assert.equal(main.currentTime, 47.25);
  assert.equal(main.paused, false);
  assert.equal(h.audios.size, 1);
  near(main.volume, TRACKS.main.volume);
});

test('crossfade pauses the old track at its end and returning main music resumes its position', async () => {
  const h = harness();
  await h.player.start();
  h.advance(1000);
  const main = h.audios.get('main');
  main.currentTime = 35.25;
  h.player.setScene('clocktower');
  await settle();
  const clock = h.audios.get('clocktower');
  assert.equal(main.paused, false, 'the outgoing track remains audible during the fade');
  h.advance(500);
  near(main.volume, TRACKS.main.volume / 2);
  near(clock.volume, TRACKS.clocktower.volume / 2);
  h.advance(500);
  assert.equal(main.paused, true);
  assert.equal(clock.paused, false);
  near(main.volume, 0);
  near(clock.volume, TRACKS.clocktower.volume);

  clock.currentTime = 12.5;
  h.player.setScene('cafe');
  await settle();
  assert.equal(main.playCalls, 2);
  assert.equal(main.currentTime, 35.25);
  h.advance(1000);
  assert.equal(main.paused, false);
  assert.equal(clock.paused, true);
  assert.equal(clock.currentTime, 12.5);
  near(main.volume, TRACKS.main.volume);
});

test('stop synchronously silences every created track and resume retains the current position', async () => {
  const h = harness();
  await h.player.start();
  h.advance(1000);
  const main = h.audios.get('main');
  main.currentTime = 43;
  h.player.setScene('clocktower');
  await settle();
  h.advance(250);
  const clock = h.audios.get('clocktower');
  clock.currentTime = 21.5;
  h.player.stop();
  assert.equal(h.player.musicOn, false);
  assert.equal(h.frames.size, 0);
  for (const audio of h.audios.values()) { assert.equal(audio.paused, true); assert.equal(audio.volume, 0); }
  assert.equal(clock.currentTime, 21.5);
  assert.equal(await h.player.start(), true);
  assert.equal(h.player.musicOn, true);
  assert.equal(clock.currentTime, 21.5);
  assert.equal(clock.playCalls, 2);
  assert.equal(main.playCalls, 1);
  h.advance(1000);
  assert.equal(clock.paused, false);
  assert.equal(main.paused, true);
});

test('start(false) immediately disables playback without discarding its position', async () => {
  const h = harness();
  await h.player.start();
  const main = h.audios.get('main');
  main.currentTime = 16;
  const result = h.player.start(false);
  assert.equal(h.player.musicOn, false);
  assert.equal(main.paused, true);
  assert.equal(main.currentTime, 16);
  assert.equal(await result, false);
});

test('dawn plays once per visit, survives pauses, and restarts only after a new visit', async () => {
  const h = harness();
  h.player.setScene('dawn');
  await h.player.start();
  h.advance(1000);
  const dawn = h.audios.get('dawn');
  assert.equal(dawn.loop, false);
  dawn.currentTime = 32;
  h.player.stop();
  await h.player.start();
  assert.equal(dawn.currentTime, 32);
  assert.equal(dawn.playCalls, 2);
  dawn.finish();
  assert.equal(await h.player.start(), true);
  h.player.stop();
  assert.equal(await h.player.start(), true);
  assert.equal(dawn.playCalls, 2, 'a finished epilogue must not replay after an ad or background pause');
  h.player.setScene('cafe');
  await settle();
  h.player.setScene('dawn');
  await settle();
  assert.equal(dawn.currentTime, 0);
  assert.equal(dawn.playCalls, 3);
  assert.equal(dawn.ended, false);
});

test('a new dawn visit entered while music is disabled must restart the finished epilogue', async () => {
  const h = harness();
  h.player.setScene('dawn');
  await h.player.start();
  const dawn = h.audios.get('dawn');
  dawn.finish();
  h.player.stop();
  h.player.setScene('cafe');
  h.player.setScene('dawn');
  await h.player.start();
  assert.equal(dawn.playCalls, 2, 'new scene visits must be tracked even while playback is muted');
  assert.equal(dawn.currentTime, 0);
  assert.equal(dawn.ended, false);
});

test('a new dawn visit entered while muted does not resume the previous visit midway', async () => {
  const h = harness();
  h.player.setScene('dawn');
  await h.player.start();
  const dawn = h.audios.get('dawn');
  dawn.currentTime = 42;
  h.player.stop();
  h.player.setScene('rain-street');
  h.player.setScene('dawn');
  await h.player.start();
  assert.equal(dawn.currentTime, 0, 'a new epilogue visit starts at its beginning');
  assert.equal(dawn.playCalls, 2);
});

test('rapid main to clocktower to dawn transitions leave only the final track playing', async () => {
  const h = harness();
  await h.player.start();
  h.advance(1000);
  h.player.setScene('clocktower');
  h.player.setScene('dawn');
  await settle();
  h.advance(1000);
  for (const [key, audio] of h.audios) {
    assert.equal(audio.paused, key !== 'dawn', key);
    near(audio.volume, key === 'dawn' ? TRACKS.dawn.volume : 0);
  }
  assert.equal(h.frames.size, 0);
});

for (const outcome of ['resolve', 'reject']) {
  test(`a delayed old play ${outcome} cannot silence a newer session of the same track`, async () => {
    const h = harness();
    const old = deferred();
    h.queuePlay('main', old.promise);
    const firstStart = h.player.start();
    const main = h.audios.get('main');
    main.currentTime = 24;
    h.player.stop();
    assert.equal(await h.player.start(), true);
    h.advance(1000);
    const pausesBeforeOldCompletion = main.pauseCalls;
    if (outcome === 'resolve') old.resolve();
    else old.reject(new Error('old session interrupted'));
    assert.equal(await firstStart, false);
    assert.equal(main.paused, false);
    assert.equal(main.pauseCalls, pausesBeforeOldCompletion);
    assert.equal(main.currentTime, 24);
    near(main.volume, TRACKS.main.volume);
  });
}

test('an old play rejection after leaving and returning to the same track preserves the new visit', async () => {
  const h = harness();
  const old = deferred();
  h.queuePlay('main', old.promise);
  const firstStart = h.player.start();
  h.player.setScene('clocktower');
  await settle();
  h.advance(1000);
  h.player.setScene('cafe');
  await settle();
  h.advance(1000);
  const main = h.audios.get('main');
  const pauses = main.pauseCalls;
  old.reject(new Error('obsolete play rejected'));
  assert.equal(await firstStart, false);
  assert.equal(main.paused, false);
  assert.equal(main.pauseCalls, pauses);
  near(main.volume, TRACKS.main.volume);
});

test('autoplay denial resolves false without throwing and a later user attempt can retry', async () => {
  const h = harness();
  const blocked = deferred();
  h.queuePlay('main', blocked.promise);
  const firstStart = h.player.start();
  blocked.reject(Object.assign(new Error('user gesture required'), { name: 'NotAllowedError' }));
  assert.equal(await firstStart, false);
  const main = h.audios.get('main');
  assert.equal(main.paused, true);
  assert.equal(main.volume, 0);
  assert.equal(h.frames.size, 0);
  assert.equal(await h.player.start(), true);
  h.advance(1000);
  assert.equal(main.playCalls, 2);
  assert.equal(main.paused, false);
  near(main.volume, TRACKS.main.volume);
});
