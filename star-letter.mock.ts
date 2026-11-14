// Development storage only. CLI retains this Map until the dev service restarts.
// Ads deliberately have no mock inventory: a simulated video never grants hints.
const store = new Map<string, { value: unknown; version: number }>();
const copy = (value: unknown) => JSON.parse(JSON.stringify(value));

export default {
  'storage.get': async ({ key }: { key: string }) => store.has(key)
    ? copy(store.get(key))
    : { value: null, version: 0 },
  'storage.set': async ({ key, value }: { key: string; value: unknown }) => {
    const version = (store.get(key)?.version ?? 0) + 1;
    store.set(key, { value: copy(value), version });
    return { ok: true, version };
  },
  'exchange.listItems': async () => ({ items: [] }),
};
