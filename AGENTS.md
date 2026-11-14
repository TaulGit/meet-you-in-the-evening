# 再赴晚风

## 项目事实

- 独立原创中文循环叙事游戏，机制灵感来自 Paper Dino 的 Save the Date；不是授权汉化，不包含原作脚本或素材。
- `story.js` 是剧情与跨周目条件的权威来源；当前 127 节点、12 记忆、8 结局。
- `docs/story-design.md` 包含伏笔、条件与无广告真结局路线。
- 正式美术位于 `assets/`，全部是生成 WebP。禁止以 SVG、Emoji、Unicode 装饰图标或程序几何图形替代游戏美术；正文、按钮文字仍使用可读 HTML 中文。
- `docs/art-prompts.md` 记录全部生成提示词。声音由 `sound.js` 原创实时合成。

## 开发与验证

- Node.js >=20，无第三方运行时依赖。
- `npm run dev`：本地 127.0.0.1:7417。
- `npm test`、`npm run check`、`npm run build` 是交付检查。仅有新改动、失败或未解决疑点时重跑。
- `scripts/build.mjs` 生成 `dist/`，不得把测试、mock、文档、凭据或 Node 脚本打进游戏包。
- 重开保留全部全局记忆与落幕，但清除本轮 flags。读书签不能抹掉后来取得的记忆或提示账本。
- 全部主线和结局免费可达；广告只能提供玩家主动选择的可选提示。

## 星匣合同

- 游戏 ID 11640，交付为草稿，未正式发布。除非用户明确要求，不执行正式 `star-letter publish`（不带 --draft）。
- 官方 SDK 只用 v2 IIFE。实现依据 v2.7.2 / docsRev43；更改调用前按 star-letter-game-sdk skill 拉对应官方文档。
- 仅启用 storage/exchange。SDK 的 gameId 由宿主注入，不在 init 中写死。
- 云档一个 key：`save:evening-breeze:v1`；平台内读失败禁止当作空档覆盖，也禁止用本机档替代云端失败。
- 独立顶层本机版使用 `evening-breeze:standalone:v1`，明确显示本机存档。
- 广告通过 `sdk.exchange.exchange({via:'ad',deliver})`；targetType=memory_hint、targetAmount=1，兑换项7519已审上架。运行时从 listItems 按合同选择，不硬编码兑换项ID。
- 只有 deliver 中持久化成功才发奖；ledger按adOrderId幂等。累计发放与累计消费在同一存档，普通剧情保存不得抹掉平台最后账本。
- 详见 `docs/platform-integration.md` 与 `docs/validation.md`。真实平台视频和跨设备云档尚未由创作者确认，不把模拟测试说成真实播放。

## GitHub

- 公开仓库：https://github.com/TaulGit/meet-you-in-the-evening
- 保留中文 README、灵感说明、代码和素材许可、素材提示词及验收记录。
