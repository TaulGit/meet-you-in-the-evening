# 星匣平台接入

本作接入 `GameSDK IIFE v2`，实现依据是官方 **v2.7.2 / docsRev 43** 快照（manifest 于 2026-11-13 核对）。运行脚本沿用官方推荐的大版本地址，不使用 npm SDK、不传固定 gameId、不自行编排跨窗口消息。

## 官方依据

- [版本 manifest](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/latest.json)
- [接入](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/embedding.md)、[初始化](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/runtime.md)
- [云存档](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/storage.md)、[兑换和激励视频](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/exchange.md)
- [能力声明](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/capability-declaration.md)、[类型](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/types/capabilities.d.ts)、[错误](https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk-docs/v2.7.2/errors.md)

快照中有历史同步托管段落和旧类型残留；以 storage.md 开头的现行规则为准：2026-11 起直读直写云端，后写覆盖前写。不使用已废弃的 CAS、baseVersion、冲突回调、离线托管和自动补传。

## 页面与清单

页面在 app module 之前加载：

```html
<script src="https://gz-vchar-pub.nosdn.127.net/star-letter/game-sdk/v2/sdk.iife.js"></script>
<script type="module" src="./app.js"></script>
```

`platform.js` 调用 `await window.GameSDK.init()`，gameId 由平台注入。清单采用目录发布（`gameFile: "./dist"`），只启用实际使用的能力：

```json
{
  "priceType": 0,
  "gameFile": "./dist",
  "capabilityDeclaration": {
    "schemaVersion": 1,
    "capabilities": {
      "storage": { "enabled": true },
      "exchange": { "enabled": true }
    }
  }
}
```

官方没有 `ads` namespace、`ads.md`、`ads.enabled` 或单独广告后台 enable 开关。广告通过 exchange 的广告路径实现。实际是否可看还取决于兑换项审核上架、平台宿主和广告供给，不能仅以声明保存成功判断广告可用。

## 云存档

- 单个 `user` scope key：`save:evening-breeze:v1`。
- 一个 JSON 对象包含 `schema`、当前剧情 `current`、跨循环记忆和结局 `meta`、三个手动档位 `slots`、`settings`、广告发货账本 `platformRewards`。不保存剧情配置、美术或音频二进制。
- 本作额外限制 JSON UTF-8 大小为 **512KB**，官方单值上限为 **16MB**。不拆分 key。
- 仅对玩家操作、关键节点和设置变化保存；250ms 防抖合并连续事件，写入串行，防止旧请求晚到覆盖新进度。没有周期性自动保存定时器。
- `storage.get({key,scope:'user'})` 的 `value` 已解析，不能再次 `JSON.parse(value)`。`value:null` 才是无档；读取报错会保留原云档并阻止空档写回。
- `storage.set({key,value,scope:'user',saveMeta})` resolve 且 `ok:true` 才标记保存完成。不传 `ifVersion` 或 `baseVersion`。
- 带 `saveMeta.label/progress/gameVersion/playedTime`，游玩秒数转成毫秒。
- SDK 失败、未登录、未授权、频控、容量限制均显示状态并保留当前页面的内存进度；平台运行环境内**不会退回 localStorage**。
- 独立顶层网页使用专属 `evening-breeze:standalone:v1` 本机档，明确标注“本机存档”。本机档不自动导入云端。此独立试玩支持是本项目明确要求，不是平台存档失败时的替代方案。
- `schema:0` 或无 schema 的内部预发行档迁移为 1，当前档为 1；未知未来版本拒绝覆盖。业务字段归 engine 校验，广告账本由平台层校验并保留。
- 登录身份改变后阻止旧会话继续读写，提示重新打开游戏。

## 激励广告提示

本体免费，正常读故事、收集记忆与通关均不要求看广告。可选广告仅提供提示额度。

发货合同：`targetType: "memory_hint"`、`targetAmount: 1`，广告观看数为 1。运行时不写死兑换项 ID，从 `sdk.exchange.listItems()` 中选择该 targetType、targetAmount 和有效 `adWatchCount` 的可用项，始终传 `via:'ad'`，不会调用星光币路径。

官方公开 API **不提供** `completed/verified` 布尔值，也没有游戏侧直接调用的 `sdk.ads.showRewardedAd()`。其奖励资格是：SDK 在广告看满后才调用 `deliver(order)`。本作仅接受带 `adOrderId` 和 `bizId` 且合同匹配的回调，在回调内等待账本云存档写入成功，且 exchange Promise 正常结束，才返回 `rewarded:true`。不能用“弹窗关了”或“Promise resolve 但没有 deliver”代替广告完成。

```js
await platform.save(state);
const result = await platform.rewardedHint();
if (result.rewarded) {
  state.platformRewards.hintCredits = result.hintCredits;
  state.meta.hintsUsed += 1;
  await platform.save(state);
  // 此时展示一条提示。
}
```

`platformRewards.hintCredits` 是累计已发额度，`meta.hintsUsed` 是累计已消费额度；剩余额度为两者之差。刷新发生在发货后、展示前时，仍可从云档恢复额度。

账本用 `ad:${adOrderId}` 幂等，并持久化 `bizId/adOrderId`；同一订单重复回调或刷新后重入不会重复发放。最多接收 100 笔提示广告，达到上限**在广告开始前**停止，保留全部订单，不通过淘汰旧订单破坏去重。普通剧情保存强制合并平台层的最新账本，旧 UI 快照不会抹掉奖励。

提前关闭、无库存、失败、超时、无 host、无已上架兑换项均无奖励。未知结果不自动创建新订单，禁用再次兑换并提示重新打开核对额度。若发货已存档而最终确认异常，返回无即时奖励，重开后以云档额度恢复；不会因前端报错重复发货。

游戏端广告期间应禁用重复点击，并在 `finally` 恢复原来的音画与输入状态。平台层使用独占 `adBusy`，不能同时发起两笔广告。

### 平台配置

CLI 0.1.44 的 `exchange --help` 明确支持 `--adWatchCount N`（N≥1 开广告路径）。开发者 spec 说明 `costAssetType=1` 为星光币，兑换项创建后 `auditStatus=0` 待审核，运营审核通过为 10，上架状态为 1。仅“审核通过＋上架”才出现在运行时 `listItems()`。

**本作当前配置已创建、审核通过并上架。** 2026-11-13 通过 `star-letter exchange list 11640` 读取确认：

| 字段 | 当前值 |
| --- | --- |
| gameId | 11640 |
| exchangeItemId | 7519 |
| name | 回忆提示 |
| costAssetType / costAmount | 1 / 0 |
| adWatchCount | 1 |
| targetType / targetAmount | memory_hint / 1 |
| auditStatus / auditStatusDesc | 10 / 审核通过 |
| status | 1（上架） |

以下记录可复现的配置命令；已有项 **不要重复 create**：

```sh
star-letter exchange asset-types
star-letter exchange create --gameId 11640 --name '回忆提示' --costAssetType 1 --costAmount 0 --adWatchCount 1 --targetType memory_hint --targetAmount 1 --sort 0
star-letter exchange list 11640
# auditStatus=10 后才可上架：
star-letter exchange status 7519 --status 1
```

后端已接受 `costAmount:0`、`adWatchCount:1` 的仅广告配置；游戏始终显式指定 `via:'ad'`。兑换项审核上架是已核实事实，实际设备能否获得视频及播放完成仍须真实环境验收。无广告供给时显示状态说明，核心剧情继续可玩。

平台 create 最初返回 legacy 能力声明；该平台要求迁移 legacy→v1 时保留 storage/oss/ai/exchange 四项，再通过第二次声明更新关闭 ai/oss。目标有效声明仍是 storage、exchange 开启、ai、oss 关闭；这不要求游戏调用未使用的能力。

2026-11-14 已使用 CLI v0.1.47 保存最终草稿：gameId11640、editingVersionId34501、liveVersionId为空。新版发布清单要求填写官方玩法分类，已通过 `star-letter play-category list` 核对并采用互动文游10001和悬疑解谜10002。草稿上传成功，服务端容量预检通过；全部20个上传文件的HTTP、MIME和内容哈希核对通过。未正式发布。

### 取消和异常码

官方广告提前关闭码为 `AD_USER_CANCELLED`；`EXCHANGE_CANCELLED` 对应星光币确认取消，本作同样按取消处理但不会主动进入 coin 路径。`AD_TIMEOUT`、`AD_WATCH_CONFIRM_TIMEOUT`、`AD_FAILED` 和 `EXCHANGE_TIMEOUT` 均不发奖；`EXCHANGE_PATH_NOT_AVAILABLE`、`ITEM_NOT_FOUND`、`NOT_IMPLEMENTED` 表示入口不可用。官方未保证独立 `AD_NO_FILL` 返回码，无填充被平台映射为失败或未知错误时也不会发奖。未知结果禁用当前会话的新兑换，不自动重试。

### 消耗型恢复边界

本作提示是消耗型额度。`hintCredits`、`hintsUsed` 和完整订单去重账本在同一个云 JSON 内原子保存；常规刷新、跨设备读档、广告发货后展示前关闭页面均可恢复未消费额度，不需要重放历史广告。

本作没有接入 `deliveredOrders` 自动恢复。官方明确要求首次接入或独立游标丢失时**不得全量重放消耗型历史订单**：历史订单通常已经发货和消费。若整个游戏云档被清空或回滚，消费次数同样丢失，单凭历史广告订单无法判断还剩多少提示；若 `hintsUsed` 已高于现存 ledger/credits，尤其不能把全部历史广告再加一遍。此时不自动补发、不依据 `ownedItems` 推算余额，可保留平台订单事实供人工对账。这样避免为了恢复而重复发放已消费额度。

将来如增加订单自愈，必须同时引入独立持久化的 ad 游标、首次接入基线、消费事实恢复策略，feature-detect `deliveredOrders` 并使失败不阻断故事，只处理 ad 路径中合同为 memory_hint×1 的成功订单、按 `ad:<orderId>` 幂等且保持100笔上界。不能把广告订单事实当成尚未消费库存。本版不引入第二 key 和跨 key 提交窗口。

## 开发验证

```sh
node --test tests/platform.test.js
npm run build
star-letter check
star-letter dev --open
star-letter publish --draft
```

`star-letter.mock.ts` 只模拟 storage，数据在 CLI 进程内存中，服务重启后清空。exchange 模拟库存故意为空，模拟视频不发奖；真实广告须在平台预览中切真实档，并有审核上架的实际兑换项。mock 不进入 `dist`，不启用生产 dev mock。

自动测试验证存档恢复、三档保留、事件合并、串行写入、云失败不写本机、顶层本机模式、身份变更，以及完整回调、提前关闭、无库存、异常、未回调和存档失败的广告发货边界。测试桩不等于真实广告验证。

真实 host 握手、云端跨设备存档和实际广告播放仍应在平台预览/游戏页验收；按 skill 要求由创作者完成该平台体验确认。正式发布由主工作流在获得用户确认后进行。

## 能力设计评审（CDR）

| 条目 | 结论 | 证据与边界 |
| --- | --- | --- |
| Storage S1 单值容量 | pass | 单 key；序列化后强制≤512KB，远低于16MB。 |
| S2 key数量 | pass | user scope固定一个key，game scope零key。 |
| S3 写入频率 | pass | 操作事件触发＋250ms合并＋串行队列；无setInterval、逐实体写或渲染帧写。 |
| S4 scope | pass | 玩家剧情、记忆、三档、设置、广告账本均user。 |
| S5 多端与并发 | pass（现行直写规则） | 无CAS或冲突重试；会话内写入串行；云失败不本地替代；saveMeta完整。多设备同时游玩仍遵循平台后写覆盖。 |
| S6 错误韧性 | pass | SDK错误守卫、操作边界捕获；读失败禁止空档覆盖，写失败保留内存并提示。 |
| S7 数据设计 | pass | schema1及0→1迁移；未知未来档拒绝覆盖；静态剧情不入档；无已废弃新回调依赖。 |
| Exchange 真实广告路径 | 配置pass，播放待平台验收 | 兑换项7519已核实审核通过、上架、观看数1；单元测试不冒充真实视频。 |
| 星光币确认/余额/取消/超时 | N/A | 仅ad路径，costAmount0，不调用coin。 |
| 取消/失败恢复 | pass（代码），待实际视频验收 | platform使用try/finally解除独占；UI负责恢复音画输入。 |
| deliver等待持久化 | pass | 云存档成功后才完成deliver，存档错误抛出。 |
| 重复发货 | pass | 全量有界订单账本按adOrderId去重，刷新后有效。 |
| 网络未知结果 | pass | 不自动重新exchange，禁用当前会话再买并提示重开核对额度。 |
| 订单标识 | pass | 持久化bizId与adOrderId，仅调用广告路径。 |
| 星光币orderStatus收口 | N/A | 未调用coin路径，不存在星光币冻结或15分钟退款合同。 |
| 历史已购恢复 | N/A（无订单重放） | 累计发放、消费和幂等账本同档可靠保存；整档丢失缺少消费事实，按官方规则不盲目全量重放，不调用deliveredOrders/ownedItems。 |

没有使用 ai、oss、leaderboard、multiplayer，故不配置相关资源，不产生这些能力的计费或配额请求。
