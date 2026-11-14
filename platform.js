// SDK contract: GameSDK IIFE v2, documentation v2.7.2 / rev43.
// Cloud failures stay in memory; the standalone edition has a separate local save.
const SAVE_KEY = 'save:evening-breeze:v1';
const LOCAL_KEY = 'evening-breeze:standalone:v1';
const HINT_TARGET = 'memory_hint';
const SAVE_LIMIT_BYTES = 512 * 1024;
const MAX_REWARD_ORDERS = 100;
const SAVE_DEBOUNCE_MS = 250;

export function createPlatform(root = globalThis.window) {
  let sdk = null;
  let initPromise = null;
  let status = { mode: 'local', label: '本机存档', adsAvailable: false };
  let cloud = false;
  let readReady = false;
  let latestData = null;
  let rewards = { hintCredits: 0, orders: [] };
  let adItem = null;
  let adBusy = false;
  let adUncertain = false;
  let pending = null;
  let timer = null;
  let serial = Promise.resolve();
  let sequence = 0;
  let waiters = [];
  let identity = null;

  const clone = value => JSON.parse(JSON.stringify(value));
  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const isEmbedded = () => Boolean(root && ((root.parent && root.parent !== root) || (root.top && root.top !== root)));
  const getIdentity = () => String(sdk?.context?.user?.id ?? 'guest');
  const emptyRewards = () => ({ hintCredits: 0, orders: [] });

  function codeOf(error) {
    const guard = root?.GameSDK?.isPlatformSDKError;
    return typeof guard === 'function' && guard(error) ? error.code : 'UNKNOWN_ERROR';
  }

  function notice(error, action) {
    const messages = {
      STORAGE_REQUIRE_LOGIN: '请登录后使用云存档',
      PERMISSION_DENIED: '云存档未获授权',
      STORAGE_READ_UNAVAILABLE: '云存档暂时读不到，尚未创建或覆盖存档',
      STORAGE_RATE_LIMITED: '保存过于频繁，请稍后重试',
      STORAGE_BUSY: '云存档繁忙，请稍后保存',
      STORAGE_VALUE_TOO_LARGE: '存档超过容量限制',
      STORAGE_QUOTA_EXCEEDED: '云存档配额不足',
      STORAGE_INVALID_REQUEST: '存档格式暂不可用',
      STORAGE_WRITE_LOCK_HELD: '另一页面正在保存，请关闭重复页面',
      STORAGE_WRITE_GENERATION_STALE: '请重新打开游戏再保存',
      STORAGE_CONFLICT: '云存档状态已改变，请重新打开游戏',
      NOT_IMPLEMENTED: '平台暂未开放所需能力',
    };
    return messages[codeOf(error)] || `${action}失败，当前进度仍在本次页面中`;
  }

  function updateStatus(mode, label) {
    status = { mode, label, adsAvailable: Boolean(cloud && mode === 'platform' && adItem && !adBusy && !adUncertain && rewards.orders.length < MAX_REWARD_ORDERS) };
  }

  function getStatus() {
    return { ...status, hintCredits: rewards.hintCredits };
  }

  function normalizeRewards(value) {
    if (value == null) return emptyRewards();
    if (!isObject(value) || !Array.isArray(value.orders) || !Number.isSafeInteger(value.hintCredits) || value.hintCredits < 0 || value.orders.length > MAX_REWARD_ORDERS) {
      throw new Error('INVALID_REWARD_SAVE');
    }
    const ids = new Set();
    for (const order of value.orders) {
      if (!isObject(order) || typeof order.key !== 'string' || !order.key || ids.has(order.key)) throw new Error('INVALID_REWARD_SAVE');
      ids.add(order.key);
    }
    return clone(value);
  }

  function prepare(data, rewardData = rewards) {
    if (!isObject(data)) throw new TypeError('存档必须是 JSON 对象');
    const snapshot = clone(data);
    snapshot.schema ??= 1;
    snapshot.platformRewards = clone(rewardData);
    if (new TextEncoder().encode(JSON.stringify(snapshot)).length > SAVE_LIMIT_BYTES) throw new Error('存档超过本作 512KB 保存预算');
    return snapshot;
  }

  function migrate(data) {
    if (data === null) return null;
    if (!isObject(data)) throw new Error('INVALID_SAVE');
    // The only pre-release shape had no schema (or schema 0). Its field
    // meanings are unchanged; future schemas must never be reset as new games.
    const version = data.schema ?? 0;
    if (version !== 0 && version !== 1) throw new Error('UNSUPPORTED_SAVE_VERSION');
    return { ...data, schema: 1 };
  }

  function assertIdentity() {
    if (cloud && getIdentity() !== identity) {
      readReady = false;
      adItem = null;
      updateStatus('error', '登录账号已改变，请重新打开游戏后继续');
      throw new Error('PLAYER_CHANGED');
    }
  }

  async function refreshAdItem() {
    adItem = null;
    if (!cloud || !sdk?.exchange || typeof sdk.exchange.listItems !== 'function' || typeof sdk.exchange.exchange !== 'function') return;
    try {
      const result = await sdk.exchange.listItems();
      assertIdentity();
      adItem = result?.items?.find(item => item.targetType === HINT_TARGET && item.targetAmount === 1 && item.adWatchCount >= 1 && Number.isSafeInteger(item.id)) || null;
    } catch (error) {
      // An unavailable optional ad never interrupts the story or storage.
      codeOf(error);
    }
  }

  async function init() {
    if (initPromise) { await initPromise; return getStatus(); }
    initPromise = (async () => {
      if (!root?.GameSDK || typeof root.GameSDK.init !== 'function') {
        cloud = isEmbedded();
        updateStatus(cloud ? 'error' : 'local', cloud ? '平台连接尚未建立，请重新打开游戏' : '本机存档');
        return getStatus();
      }
      try {
        const candidate = await root.GameSDK.init();
        // A top-level page may never masquerade as a real ad host.
        if (!isEmbedded()) {
          updateStatus('local', '本机存档');
          return getStatus();
        }
        cloud = true;
        sdk = candidate;
        identity = getIdentity();
        if (!sdk?.storage || typeof sdk.storage.get !== 'function' || typeof sdk.storage.set !== 'function') throw new Error('STORAGE_UNAVAILABLE');
        await refreshAdItem();
        updateStatus('platform', '云存档已连接');
      } catch (error) {
        cloud = isEmbedded();
        sdk = null;
        updateStatus(cloud ? 'error' : 'local', cloud ? '平台连接失败，进度仅保留在本次页面中' : '本机存档');
        codeOf(error);
      }
      return getStatus();
    })();
    await initPromise;
    // A delayed IIFE (or a temporary handshake failure) may recover on the next
    // explicit attempt. Never retain a missing-runtime result forever.
    if (!sdk && isEmbedded()) initPromise = null;
    return getStatus();
  }

  async function load() {
    await init();
    if (pending || waiters.length) await flush();
    try {
      assertIdentity();
      if (cloud && !sdk) throw new Error('PLATFORM_UNAVAILABLE');
      const result = cloud ? await sdk.storage.get({ key: SAVE_KEY, scope: 'user' }) : null;
      assertIdentity();
      const raw = cloud ? result?.value : root?.localStorage?.getItem(LOCAL_KEY);
      if (cloud && (!isObject(result) || !Object.hasOwn(result, 'value'))) throw new Error('INVALID_STORAGE_RESPONSE');
      const value = migrate(cloud ? raw : raw ? JSON.parse(raw) : null);
      rewards = normalizeRewards(value?.platformRewards);
      latestData = value === null ? null : prepare(value);
      readReady = true;
      updateStatus(cloud ? 'platform' : 'local', cloud ? '云存档已同步' : '本机存档');
      return latestData === null ? null : clone(latestData);
    } catch (error) {
      readReady = false;
      updateStatus('error', cloud ? notice(error, '读取云存档') : '本机存档读取失败，尚未覆盖原档');
      throw error;
    }
  }

  function metadata(data) {
    return {
      label: '再赴晚风',
      progress: `第 ${Math.max(1, Number(data.meta?.loop) || 1)} 次重来`,
      gameVersion: '1.0.0',
      playedTime: Math.max(0, Number(data.meta?.playSeconds) || 0) * 1000,
    };
  }

  async function persist(snapshot) {
    assertIdentity();
    if (!readReady) throw new Error('请先成功读取存档，再保存当前进度');
    try {
      if (cloud) {
        if (!sdk) throw new Error('PLATFORM_UNAVAILABLE');
        const result = await sdk.storage.set({ key: SAVE_KEY, value: snapshot, scope: 'user', saveMeta: metadata(snapshot) });
        assertIdentity();
        if (!result?.ok || result.outcome === 'pending' || result.outcome === 'superseded') throw new Error('SAVE_NOT_CONFIRMED');
      } else {
        if (!root?.localStorage) throw new Error('LOCAL_STORAGE_UNAVAILABLE');
        root.localStorage.setItem(LOCAL_KEY, JSON.stringify(snapshot));
      }
      updateStatus(cloud ? 'platform' : 'local', cloud ? '云存档已保存' : '本机存档');
    } catch (error) {
      updateStatus('error', cloud ? notice(error, '保存云存档') : '本机存档保存失败，进度仍在本次页面中');
      throw error;
    }
  }

  function dispatchPending() {
    if (timer !== null) { clearTimeout(timer); timer = null; }
    if (!pending) return serial;
    const batch = pending;
    pending = null;
    const operation = serial.catch(() => {}).then(async () => {
      // Never let an older app snapshot overwrite a completed ad delivery.
      const snapshot = prepare(batch.data);
      await persist(snapshot);
      if (!pending || pending.sequence <= batch.sequence) latestData = snapshot;
    });
    serial = operation;
    operation.then(() => settleBatch(batch.sequence), error => settleBatch(batch.sequence, error));
    return operation;
  }

  function settleBatch(batchSequence, error) {
    const completed = waiters.filter(waiter => waiter.sequence <= batchSequence);
    waiters = waiters.filter(waiter => waiter.sequence > batchSequence);
    for (const waiter of completed) error ? waiter.reject(error) : waiter.resolve(getStatus());
  }

  async function flush() {
    await dispatchPending();
    if (pending) await flush();
  }

  async function save(data) {
    await init();
    assertIdentity();
    if (!readReady) throw new Error('存档尚未读取成功，未覆盖原档');
    const snapshot = prepare(data);
    latestData = snapshot;
    const currentSequence = ++sequence;
    pending = { data: snapshot, sequence: currentSequence };
    const completion = new Promise((resolve, reject) => waiters.push({ sequence: currentSequence, resolve, reject }));
    if (timer !== null) clearTimeout(timer);
    // This is event coalescing, not periodic autosave.
    timer = setTimeout(() => { void dispatchPending().catch(() => {}); }, SAVE_DEBOUNCE_MS);
    return completion;
  }

  function adReason(error) {
    const code = codeOf(error);
    if (code === 'AD_USER_CANCELLED' || code === 'EXCHANGE_CANCELLED') return 'closed';
    if (code === 'EXCHANGE_PATH_NOT_AVAILABLE' || code === 'ITEM_NOT_FOUND' || code === 'NOT_IMPLEMENTED') return 'unavailable';
    if (code === 'AD_FAILED' || code === 'AD_TIMEOUT' || code === 'AD_WATCH_CONFIRM_TIMEOUT' || code === 'EXCHANGE_TIMEOUT') return 'error';
    return 'uncertain';
  }

  async function rewardedHint() {
    await init();
    const no = reason => ({ rewarded: false, reason, hintCredits: rewards.hintCredits });
    if (!cloud || !sdk || !isEmbedded()) return no('unavailable');
    if (adBusy) return no('busy');
    if (adUncertain) return no('uncertain');
    if (!readReady || !latestData) return no('save_required');
    if (rewards.orders.length >= MAX_REWARD_ORDERS) return no('limit');
    adBusy = true;
    updateStatus('platform', '广告确认中');
    let delivered = false;
    try {
      await flush();
      assertIdentity();
      await refreshAdItem();
      if (!adItem) return no('unavailable');
      await sdk.exchange.exchange({
        exchangeItemId: adItem.id,
        via: 'ad',
        deliver: async order => {
          assertIdentity();
          if (order.targetType !== HINT_TARGET || order.targetAmount !== 1 || typeof order.adOrderId !== 'string' || !order.adOrderId || typeof order.bizId !== 'string' || !order.bizId) throw new Error('INVALID_AD_DELIVERY');
          const key = `ad:${order.adOrderId}`;
          if (rewards.orders.some(entry => entry.key === key)) return;
          // Finish all earlier app saves before preparing the authoritative ledger.
          await flush();
          const nextRewards = {
            hintCredits: rewards.hintCredits + 1,
            orders: [...rewards.orders, { key, adOrderId: order.adOrderId, bizId: order.bizId }],
          };
          const snapshot = prepare(latestData, nextRewards);
          const operation = serial.catch(() => {}).then(() => persist(snapshot));
          serial = operation;
          await operation;
          rewards = nextRewards;
          latestData = snapshot;
          delivered = true;
        },
      });
      // The public API has no completed/verified flags: successful SDK delivery
      // after an ad order and confirmed save is its documented reward boundary.
      return delivered ? { rewarded: true, hintCredits: rewards.hintCredits } : no('not_completed');
    } catch (error) {
      const reason = adReason(error);
      if (reason === 'uncertain') adUncertain = true;
      return no(reason);
    } finally {
      adBusy = false;
      if (adUncertain) updateStatus('error', '广告结果待确认，请重新打开游戏核对提示额度');
      else if (status.mode !== 'error') updateStatus(cloud && sdk ? 'platform' : 'error', cloud && sdk ? '云存档已连接' : '平台连接失败');
    }
  }

  return { init, load, save, getStatus, rewardedHint };
}

export const platform = createPlatform();
