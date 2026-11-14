import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlatform } from '../platform.js';

const cloudKey = 'save:evening-breeze:v1';
const copy = value => JSON.parse(JSON.stringify(value));
const gameSave = () => ({ schema: 1, current: { node: 'opening', flags: {}, history: [] }, meta: { loop: 1, memories: [], endings: [], seen: [], hintsUsed: 0 }, slots: [null, null, null], settings: { music: true } });
const adOrder = { adOrderId: 'ad-100', bizId: 'biz-100', targetType: 'memory_hint', targetAmount: 1 };
const sdkError = code => Object.assign(new Error(code), { code, retryable: false });

function fixture(options = {}) {
  const store = options.store || new Map([[cloudKey, { value: gameSave(), version: 1 }]]);
  const local = new Map();
  const writes = [];
  let initCalls = 0;
  const sdk = {
    context: { user: { id: 'player-1' }, env: 'prod' },
    storage: {
      get: options.get || (async ({ key }) => copy(store.get(key) || { value: null, version: 0 })),
      set: options.set || (async input => {
        writes.push(copy(input));
        const version = (store.get(input.key)?.version || 0) + 1;
        store.set(input.key, { value: copy(input.value), version });
        return { ok: true, version };
      }),
    },
    exchange: {
      listItems: async () => ({ items: options.noAds ? [] : [{ id: 5, targetType: 'memory_hint', targetAmount: 1, adWatchCount: 1 }] }),
      exchange: options.exchange || (async input => { await input.deliver(adOrder); return adOrder; }),
    },
  };
  const root = {
    parent: {},
    localStorage: { getItem: key => local.get(key) ?? null, setItem: (key, value) => local.set(key, value) },
    GameSDK: {
      init: async (...args) => { initCalls++; assert.equal(args.length, 0, 'platform injects the gameId'); if (options.initError) throw options.initError; return sdk; },
      isPlatformSDKError: error => Boolean(error?.code),
    },
  };
  if (options.standalone) root.parent = root;
  return { platform: createPlatform(root), root, sdk, store, local, writes, get initCalls() { return initCalls; } };
}

test('cloud read returns parsed game state and preserves three manual slots', async () => {
  const f = fixture();
  assert.equal((await f.platform.init()).mode, 'platform');
  const save = await f.platform.load();
  assert.equal(save.current.node, 'opening');
  assert.equal(save.slots.length, 3);
  assert.equal(save.platformRewards.hintCredits, 0);
  save.current.node = 'not-persisted';
  assert.equal(f.store.get(cloudKey).value.current.node, 'opening');
  assert.equal(f.initCalls, 1);
});

test('only confirmed absent cloud data becomes a new game', async () => {
  const f = fixture({ store: new Map() });
  assert.equal(await f.platform.load(), null);
  await f.platform.save(gameSave());
  assert.equal(f.store.get(cloudKey).value.schema, 1);
});

test('rapid state changes coalesce into one complete cloud save', async () => {
  const f = fixture();
  await f.platform.load();
  const older = gameSave();
  older.current.node = 'old';
  const newer = gameSave();
  newer.current.node = 'new';
  await Promise.all([f.platform.save(older), f.platform.save(newer)]);
  assert.equal(f.writes.length, 1);
  assert.equal(f.writes[0].value.current.node, 'new');
  assert.equal(f.writes[0].scope, 'user');
  assert.deepEqual(Object.keys(f.writes[0].saveMeta).sort(), ['gameVersion', 'label', 'playedTime', 'progress']);
});

test('in-flight saves are serialized so an old request cannot finish last', async () => {
  let release;
  let began;
  const started = new Promise(resolve => { began = resolve; });
  const blocked = new Promise(resolve => { release = resolve; });
  const snapshots = [];
  let active = 0;
  let maximum = 0;
  const f = fixture({ set: async input => {
    active++;
    maximum = Math.max(maximum, active);
    if (snapshots.length === 0) { began(); await blocked; }
    snapshots.push(input.value.current.node);
    active--;
    return { ok: true, version: snapshots.length };
  } });
  await f.platform.load();
  const first = gameSave();
  first.current.node = 'first';
  const firstSave = f.platform.save(first);
  await started;
  const second = gameSave();
  second.current.node = 'second';
  const secondSave = f.platform.save(second);
  release();
  await Promise.all([firstSave, secondSave]);
  assert.deepEqual(snapshots, ['first', 'second']);
  assert.equal(maximum, 1);
});

test('cloud read failure neither reads local fallback nor overwrites the original', async () => {
  const f = fixture({ get: async () => { throw sdkError('STORAGE_READ_UNAVAILABLE'); } });
  f.local.set('evening-breeze:standalone:v1', JSON.stringify(gameSave()));
  await assert.rejects(f.platform.load(), { code: 'STORAGE_READ_UNAVAILABLE' });
  await assert.rejects(f.platform.save(gameSave()), /未覆盖原档/);
  assert.equal(f.writes.length, 0);
  assert.equal(f.platform.getStatus().mode, 'error');
});

test('cloud write failure stays in memory without a local save', async () => {
  const f = fixture({ set: async () => { throw sdkError('STORAGE_NETWORK_ERROR'); } });
  await f.platform.load();
  await assert.rejects(f.platform.save(gameSave()), { code: 'STORAGE_NETWORK_ERROR' });
  assert.equal(f.local.size, 0);
  assert.equal(f.platform.getStatus().mode, 'error');
});

test('standalone SDK init failure uses clearly labeled local saving and never rewards an ad', async () => {
  const f = fixture({ standalone: true, initError: sdkError('SDK_NOT_EMBEDDED') });
  assert.equal((await f.platform.init()).label, '本机存档');
  assert.equal(await f.platform.load(), null);
  await f.platform.save(gameSave());
  assert.equal(f.local.size, 1);
  assert.equal(f.writes.length, 0);
  assert.deepEqual(await f.platform.rewardedHint(), { rewarded: false, reason: 'unavailable', hintCredits: 0 });
});

test('an embedded host init failure never silently creates a local save', async () => {
  const f = fixture({ initError: sdkError('SDK_HANDSHAKE_TIMEOUT') });
  assert.equal((await f.platform.init()).mode, 'error');
  await assert.rejects(f.platform.load());
  await assert.rejects(f.platform.save(gameSave()));
  assert.equal(f.local.size, 0);
});

test('a complete ad grants one credit only after confirmed storage, and survives reload', async () => {
  const f = fixture();
  const stale = await f.platform.load();
  assert.deepEqual(await f.platform.rewardedHint(), { rewarded: true, hintCredits: 1 });
  assert.equal(f.store.get(cloudKey).value.platformRewards.orders[0].adOrderId, adOrder.adOrderId);
  await f.platform.save(stale);
  assert.equal(f.store.get(cloudKey).value.platformRewards.hintCredits, 1, 'a pre-ad UI snapshot must not erase the reward');
  const reloaded = fixture({ store: f.store });
  assert.equal((await reloaded.platform.load()).platformRewards.hintCredits, 1);
  assert.deepEqual(await reloaded.platform.rewardedHint(), { rewarded: false, reason: 'not_completed', hintCredits: 1 }, 'the same persisted order cannot be granted again');
});

for (const [code, reason] of [['AD_USER_CANCELLED', 'closed'], ['EXCHANGE_PATH_NOT_AVAILABLE', 'unavailable'], ['AD_FAILED', 'error'], ['AD_WATCH_CONFIRM_TIMEOUT', 'error'], ['EXCHANGE_TIMEOUT', 'error']]) {
  test(`${code} never grants a hint`, async () => {
    const f = fixture({ exchange: async () => { throw sdkError(code); } });
    await f.platform.load();
    assert.deepEqual(await f.platform.rewardedHint(), { rewarded: false, reason, hintCredits: 0 });
    assert.equal(f.writes.length, 0);
  });
}

test('a resolved exchange without a delivery callback is not a completed ad', async () => {
  const f = fixture({ exchange: async () => adOrder });
  await f.platform.load();
  assert.equal((await f.platform.rewardedHint()).rewarded, false);
  assert.equal(f.writes.length, 0);
});

test('ad delivery must persist successfully before it can return rewarded', async () => {
  const f = fixture({ set: async () => { throw sdkError('STORAGE_BUSY'); } });
  await f.platform.load();
  const result = await f.platform.rewardedHint();
  assert.equal(result.rewarded, false);
  assert.equal(result.hintCredits, 0);
});

test('unknown exchange failure blocks a second attempt instead of auto-retrying', async () => {
  let calls = 0;
  const f = fixture({ exchange: async () => { calls++; throw sdkError('EXCHANGE_NETWORK_ERROR'); } });
  await f.platform.load();
  assert.equal((await f.platform.rewardedHint()).reason, 'uncertain');
  assert.equal((await f.platform.rewardedHint()).reason, 'uncertain');
  assert.equal(calls, 1);
});

test('optional unavailable ad items leave cloud saving operational', async () => {
  const f = fixture({ noAds: true });
  await f.platform.load();
  assert.equal(f.platform.getStatus().adsAvailable, false);
  assert.equal((await f.platform.rewardedHint()).reason, 'unavailable');
  await f.platform.save(gameSave());
  assert.equal(f.writes.length, 1);
});

test('a login identity change blocks stale writes', async () => {
  const f = fixture();
  await f.platform.load();
  f.sdk.context.user = { id: 'another-player' };
  await assert.rejects(f.platform.save(gameSave()), /PLAYER_CHANGED/);
  assert.equal(f.writes.length, 0);
});

test('a future save schema is rejected rather than reset and overwritten', async () => {
  const future = gameSave();
  future.schema = 2;
  const f = fixture({ store: new Map([[cloudKey, { value: future, version: 10 }]]) });
  await assert.rejects(f.platform.load(), /UNSUPPORTED_SAVE_VERSION/);
  await assert.rejects(f.platform.save(gameSave()), /未覆盖原档/);
  assert.equal(f.store.get(cloudKey).version, 10);
});

test('the bounded reward ledger stops before opening another advertisement', async () => {
  const full = gameSave();
  full.platformRewards = { hintCredits: 100, orders: Array.from({ length: 100 }, (_, i) => ({ key: `ad:${i}` })) };
  let calls = 0;
  const f = fixture({ store: new Map([[cloudKey, { value: full, version: 100 }]]), exchange: async () => { calls++; } });
  await f.platform.load();
  assert.deepEqual(await f.platform.rewardedHint(), { rewarded: false, reason: 'limit', hintCredits: 100 });
  assert.equal(calls, 0);
});

test('an IIFE that loads late can recover without permanently caching the missing runtime', async () => {
  const f = fixture();
  const runtime = f.root.GameSDK;
  delete f.root.GameSDK;
  assert.equal((await f.platform.init()).mode, 'error');
  f.root.GameSDK = runtime;
  assert.equal((await f.platform.init()).mode, 'platform');
  assert.equal((await f.platform.load()).current.node, 'opening');
});
