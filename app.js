import { createState, choiceStatus, choose, inspect, rewind, finish, saveSlot, loadSlot, snapshot, progress, markRead, findHint, STORY, MEMORIES, ENDINGS, LOCATIONS } from './engine.js';
import { platform } from './platform.js';
import { sound } from './sound.js';

const $ = id => document.getElementById(id);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let state = createState();
let hasSave = false;
let storageReady = false;
let inGame = false;
let busy = false;
let typingTimer = null;
let autoTimer = null;
let toastTimer = null;
let saveTimer = null;
let fullText = '';
let typing = false;
let lastScene = 'cover';
let currentPanel = '';
let currentHint = null;
let playTick = Date.now();
let lastSaveError = '';

function toast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').hidden = false;
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3600);
}

function syncSettings() {
  document.documentElement.style.setProperty('--reading-size', `${state.settings.fontSize}px`);
  document.body.classList.toggle('reduced', state.settings.reduceMotion);
  $('auto-button').textContent = `自动：${state.settings.auto ? '开' : '关'}`;
  $('auto-button').setAttribute('aria-pressed', String(state.settings.auto));
}

function updateSaveStatus() {
  const status = platform.getStatus();
  $('save-status').textContent = status.label;
  $('save-status').classList.toggle('error', status.mode === 'error');
}

async function persist(immediate = false) {
  if (!storageReady) return false;
  hasSave = true;
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  const save = async () => {
    $('save-status').textContent = '正在收好这一页';
    try {
      await platform.save(snapshot(state));
      updateSaveStatus(); lastSaveError = '';
      return true;
    } catch (error) {
      updateSaveStatus();
      const message = platform.getStatus().label;
      if (message !== lastSaveError) toast(message);
      lastSaveError = message;
      return false;
    }
  };
  if (immediate) return save();
  saveTimer = setTimeout(save, 650);
  return true;
}

function setScene(scene) {
  if (scene === lastScene) return;
  $('scene').style.backgroundImage = `url("assets/${scene}.webp")`;
  lastScene = scene;
}

function showMemories(ids) {
  if (!ids.length) return;
  sound.memory();
  toast(`记住了：${ids.map(id => MEMORIES[id].title).join('、')}`);
}

function stopReading() {
  if (typingTimer) clearInterval(typingTimer);
  if (autoTimer) clearTimeout(autoTimer);
  typingTimer = autoTimer = null;
  typing = false;
}

function renderTitle() {
  stopReading();
  inGame = false;
  setScene('cover');
  $('title-screen').hidden = false;
  $('game-screen').hidden = true;
  $('continue-game').hidden = !hasSave;
  $('continue-time').textContent = `${STORY.nodes[state.current.node].time} · 第 ${state.meta.loop} 次`;
  $('start-game').classList.toggle('primary', !hasSave);
  $('start-game').textContent = hasSave ? '重新赴约' : '赴约';
  if (!hasSave) {
    const small = document.createElement('small'); small.textContent = '从 19:07 开始'; $('start-game').append(small);
  }
  if (hasSave) $('start-game').classList.add('new-loop-title');
}

async function startGame(continueRun = false) {
  if (busy) return;
  if (!continueRun && hasSave) {
    confirmPanel('重新赴约', '回到 19:07，重新走过这一夜。已经记住的线索、见过的落幕和手动存档都会保留。', () => { const added = rewind(state); showMemories(added); enterGame(); }, '带着记忆重来');
    return;
  }
  if (!hasSave) state.current.history = [{node:STORY.start,label:''}];
  enterGame();
}

function enterGame() {
  closePanel();
  inGame = true;
  $('title-screen').hidden = true;
  $('game-screen').hidden = false;
  syncSettings();
  void sound.start(state.settings.music);
  playTick = Date.now();
  renderNode();
  void persist();
}

function renderNode() {
  stopReading();
  const node = STORY.nodes[state.current.node];
  setScene(node.scene);
  $('location-label').textContent = LOCATIONS[node.scene] || '晚风来处';
  $('time-label').textContent = node.time;
  $('loop-label').textContent = `第 ${String(state.meta.loop).padStart(2,'0')} 次重来`;
  $('memory-count').textContent = `${state.meta.memories.length}/${Object.keys(MEMORIES).length}`;
  $('speaker').textContent = node.speaker || '旁白';
  $('scene-caption').textContent = node.scene === 'dawn' ? '天亮之前，再听你说一次。' : '那些没说完的话，风还记得。';
  $('portrait').hidden = node.speaker !== '林夏' || node.scene === 'dawn';
  $('portrait').src = `assets/linxia${['worried','smile','determined'].includes(node.mood) ? `-${node.mood}` : ''}.webp`;
  $('portrait').style.opacity = node.mood === 'worried' ? '.91' : '1';
  $('inspect-tools').replaceChildren();
  (node.inspect || []).forEach((item, index) => {
    const button = document.createElement('button');
    button.textContent = `观察 · ${item.label}`;
    button.addEventListener('click', () => {
      if (busy) return;
      const result = inspect(state,index);
      showMemories(result.added); void persist();
      openPanel('observe', item.label, `<p class="ending-description">${escapeHTML(Array.isArray(result.text) ? result.text.join('\n') : result.text)}</p><p class="muted">细节会留在记忆里，下一次重来也不会消失。</p>`, '在场景里多看一眼');
    });
    $('inspect-tools').append(button);
  });
  const count = node.text.length;
  state.current.paragraph = Math.min(state.current.paragraph,count - 1);
  $('paragraph-label').textContent = `${state.current.paragraph + 1} / ${count}`;
  $('choices').replaceChildren();
  $('choices').hidden = true;
  $('next-button').hidden = false;
  $('next-button').textContent = '继续';
  fullText = node.text[state.current.paragraph];
  $('dialog-text').classList.remove('fade-in');
  void $('dialog-text').offsetWidth;
  $('dialog-text').classList.add('fade-in');
  if (state.settings.typing && !state.settings.reduceMotion && fullText.length > 5) {
    typing = true;
    let chars = [...fullText], cursor = 0;
    $('dialog-text').textContent = '';
    $('dialog-text').setAttribute('aria-label',fullText);
    typingTimer = setInterval(() => {
      cursor = Math.min(chars.length,cursor + 2);
      $('dialog-text').textContent = chars.slice(0,cursor).join('');
      if (cursor >= chars.length) revealText();
    },28);
  } else revealText();
  updateSaveStatus();
}

function revealText() {
  if (typingTimer) clearInterval(typingTimer);
  typingTimer = null; typing = false;
  $('dialog-text').textContent = fullText;
  $('dialog-text').removeAttribute('aria-label');
  $('dialog-text').scrollTop = 0;
  const node = STORY.nodes[state.current.node];
  const isLast = state.current.paragraph >= node.text.length - 1;
  if (isLast) {
    markRead(state);
    if (node.ending) { $('next-button').hidden = false; $('next-button').textContent = '记下这一夜'; }
    else renderChoices();
  }
  if (state.settings.auto && !isLast && !$('panel').open) autoTimer = setTimeout(advance,Math.max(2200,fullText.length * 85));
}

function renderChoices() {
  const node = STORY.nodes[state.current.node];
  $('choices').replaceChildren();
  let visibleIndex = 0;
  for (let index = 0; index < (node.choices || []).length; index++) {
    const choice = node.choices[index];
    const status = choiceStatus(state,choice);
    if (status.hidden) continue;
    visibleIndex++;
    const button = document.createElement('button');
    button.className = `choice${status.unlocked ? '' : ' locked'}`;
    button.dataset.choiceIndex = String(index);
    const number = document.createElement('span'); number.className = 'number'; number.textContent = String(visibleIndex).padStart(2,'0');
    const label = document.createElement('span'); label.textContent = choice.label;
    button.append(number,label);
    if (!status.unlocked) {
      button.setAttribute('aria-disabled','true');
      const reason = status.missing.length ? `需要记忆：${status.missing.map(id => MEMORIES[id]?.title || id).join('、')}` : choice.note || '需要在这一轮提前做好准备';
      const note = document.createElement('small'); note.className = 'choice-note'; note.textContent = reason; label.append(note);
      button.addEventListener('click',() => toast(reason));
    } else {
      button.addEventListener('click',() => makeChoice(index));
      if (choice.note) button.title = choice.note;
    }
    $('choices').append(button);
  }
  $('choices').hidden = false;
  $('next-button').hidden = true;
}

function advance() {
  if (!inGame || busy || document.hidden || $('panel').open) return;
  if (typing) { revealText(); return; }
  const node = STORY.nodes[state.current.node];
  if (state.current.paragraph < node.text.length - 1) {
    state.current.paragraph++; renderNode(); void persist();
  } else if (node.ending) {
    const ending = finish(state); void persist(true); showEnding(ending);
  }
}

function makeChoice(index) {
  if (busy || $('panel').open) return;
  const result = choose(state,index);
  if (!result.ok) return;
  renderNode(); showMemories(result.added); void persist();
}

function openPanel(name,title,html,kicker = '收好这一页，再继续向前') {
  if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  currentPanel = name;
  $('panel-title').textContent = title;
  $('panel-kicker').textContent = kicker;
  $('panel-content').innerHTML = html;
  if (!$('panel').open) $('panel').showModal();
  $('panel').scrollTop = 0;
}

function closePanel() {
  if (busy) return;
  if ($('panel').open) $('panel').close();
  currentPanel = '';
  if (inGame && !typing && state.settings.auto) {
    const node = STORY.nodes[state.current.node];
    if (state.current.paragraph < node.text.length - 1) autoTimer = setTimeout(advance,2300);
  }
}

function confirmPanel(title,text,action,label = '确定') {
  openPanel('confirm',title,`<p class="intro">${escapeHTML(text)}</p><div class="button-row"><button class="paper-button" id="confirm-action">${escapeHTML(label)}</button><button class="paper-button secondary" id="cancel-action">再想一想</button></div>`);
  $('confirm-action').addEventListener('click',() => { closePanel(); action(); });
  $('cancel-action').addEventListener('click',closePanel);
}

function showJournal() {
  const p = progress(state);
  const cards = Object.entries(MEMORIES).map(([id,memory],i) => state.meta.memories.includes(id)
    ? `<article class="memory-card"><span class="category">${escapeHTML(memory.category)} · ${String(i+1).padStart(2,'0')}</span><h3>${escapeHTML(memory.title)}</h3><p>${escapeHTML(memory.body)}</p></article>`
    : `<article class="memory-card unknown"><span class="category">尚未拾起的记忆 · ${String(i+1).padStart(2,'0')}</span><h3>有些事，还没被听见。</h3></article>`).join('');
  const hint = findHint(state);
  openPanel('journal','记忆手帐',`<div class="progress-copy"><span>已记住 ${p.memories} / ${p.memoryTotal} 件事</span><span>已经走过 ${p.endings} / ${p.endingTotal} 种落幕</span></div><p class="intro">时间会重置，记住的事情不会。带着它们回到同一个路口，你会拥有新的选择。</p><div class="memory-grid">${cards}</div><div class="button-row"><button class="paper-button" id="hint-open" ${!hint ? 'disabled' : ''}>给下一步一点提示</button><button class="paper-button secondary" id="journal-endings">看看不同的落幕</button></div><p class="muted">所有线索都可在故事中免费找到。可选提示只指路，不代替你的选择。</p>`,'那些记得的，都会回来');
  $('hint-open').addEventListener('click',showHintPanel);
  $('journal-endings').addEventListener('click',showEndings);
}

function showEndings() {
  const cards = Object.entries(ENDINGS).map(([id,ending],i) => state.meta.endings.includes(id)
    ? `<article class="ending-card" style="background-image:url('assets/${escapeHTML(ending.scene || 'dawn')}.webp')"><small>${ending.type === 'true' ? '真正的明天' : ending.type === 'hope' ? '另一种可能' : '未尽之夜'} · ${String(i+1).padStart(2,'0')}</small><h3>${escapeHTML(ending.title)}</h3><p>${escapeHTML(ending.subtitle)}</p></article>`
    : `<article class="ending-card unknown"><small>未曾到达 · ${String(i+1).padStart(2,'0')}</small><h3>未写下的落幕</h3></article>`).join('');
  openPanel('endings','落幕收藏',`<p class="intro">有些夜晚教你告别，有些夜晚教你倾听。走过的每一个结局，都是下一次相逢的来路。</p><div class="ending-grid">${cards}</div>`,'同一阵晚风，不同的回答');
}

function showEnding(ending) {
  if (!ending) return;
  openPanel('ending',ending.title,`<div class="ending-feature" style="background-image:url('assets/${escapeHTML(ending.scene || 'dawn')}.webp')"></div><p class="ending-subtitle">${escapeHTML(ending.subtitle)}</p><p class="ending-description">${escapeHTML(ending.description)}</p><div class="progress-copy"><span>第 ${state.meta.loop} 次重来</span><span>记忆 ${state.meta.memories.length} / ${Object.keys(MEMORIES).length} · 落幕 ${state.meta.endings.length} / ${Object.keys(ENDINGS).length}</span></div><div class="button-row"><button class="paper-button" id="ending-rewind">${ending.type === 'true' ? '带着明天，再赴一次约' : '带着记忆，再来一次'}</button><button class="paper-button secondary" id="ending-journal">翻开记忆手帐</button><button class="paper-button secondary" id="ending-title">回到标题</button></div>`,ending.type === 'true' ? '这一次，晚风终于吹向明天' : '这一夜落幕了，记忆还在');
  $('ending-rewind').addEventListener('click',() => { rewind(state); enterGame(); });
  $('ending-journal').addEventListener('click',showJournal);
  $('ending-title').addEventListener('click',() => { closePanel(); renderTitle(); });
}

function showSaves() {
  const node = STORY.nodes[state.current.node];
  const cards = state.slots.map((slot,i) => `<article class="save-slot"><div><h3>书签 ${String(i+1).padStart(2,'0')}${slot ? ` · ${escapeHTML(LOCATIONS[STORY.nodes[slot.current.node].scene])}` : ' · 尚未落笔'}</h3><p>${slot ? `第 ${slot.loop} 次 · ${escapeHTML(STORY.nodes[slot.current.node].time)} · ${escapeHTML(new Date(slot.savedAt).toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}))}` : '存下当前的时间、选择与准备。'}</p></div><div class="button-row"><button class="paper-button secondary slot-save" data-slot="${i}" ${!inGame ? 'disabled' : ''}>存到这里</button><button class="paper-button slot-load" data-slot="${i}" ${!slot ? 'disabled' : ''}>回到此处</button></div></article>`).join('');
  openPanel('saves','夜晚书签',`<p class="intro">${inGame ? `此刻在${escapeHTML(LOCATIONS[node.scene])}，时间是 ${escapeHTML(node.time)}。` : ''}进度会自动保存。书签让你回到这一轮的某个时刻，已经获得的记忆始终保留。</p><div class="save-list">${cards}</div><p class="muted">${escapeHTML(platform.getStatus().label)}。手动书签与自动进度保存在同一份档案中。</p><div class="button-row"><button class="paper-button secondary" id="save-retry">现在同步一次</button></div>`,'为未说完的话，留一个位置');
  document.querySelectorAll('.slot-save').forEach(button => button.addEventListener('click',() => {
    const index = Number(button.dataset.slot);
    const save = async () => { saveSlot(state,index); const ok = await persist(true); showSaves(); if (ok) toast('已把这一刻夹进书页。'); };
    if (state.slots[index]) confirmPanel('覆盖这张书签', '将用此刻的路线替换这张书签。其他书签和所有记忆会保留。',save,'存下此刻');
    else void save();
  }));
  document.querySelectorAll('.slot-load').forEach(button => button.addEventListener('click',() => {
    confirmPanel('回到书签', '当前路线将回到这张书签的位置；已经记住的线索和见过的落幕会保留。',() => { loadSlot(state,Number(button.dataset.slot)); enterGame(); },'回到那一刻');
  }));
  $('save-retry').addEventListener('click',async () => {
    if (!storageReady) { await recoverStorage(); return; }
    if (await persist(true)) toast('这一夜，已经收好。');
  });
}

async function recoverStorage() {
  if (busy) return;
  busy = true;
  $('close-panel').disabled = true;
  try {
    await platform.init();
    const saved = await platform.load();
    storageReady = true;
    if (saved && hasSave) {
      openPanel('recover','找回一页旧的记忆','<p class="intro">已经重新连接，也找到了原来的存档。你可以回到原记录，或保存本次页面已经读过的路线。</p><p>保存本次路线时，会合并已获得的记忆与落幕，保留已领取的提示记录。</p><div class="button-row"><button class="paper-button" id="recover-current">保存本次路线</button><button class="paper-button secondary" id="recover-remote">恢复原来的存档</button></div>','先决定，把哪一刻留作书签');
      $('recover-current').addEventListener('click',async () => {
        const remote = createState(saved);
        for (const key of ['memories','endings','seen','read']) state.meta[key] = [...new Set([...state.meta[key],...remote.meta[key]])];
        state.meta.hintsUsed = Math.max(state.meta.hintsUsed,remote.meta.hintsUsed);
        state.meta.loop = Math.max(state.meta.loop,remote.meta.loop);
        state.platformRewards = remote.platformRewards;
        state.slots = state.slots.map((slot,i) => slot || remote.slots[i]);
        if (await persist(true)) { toast('两份记忆已收好，继续这一轮的故事。'); showSaves(); }
      });
      $('recover-remote').addEventListener('click',() => { state = createState(saved); hasSave = true; enterGame(); });
    } else {
      if (await persist(true)) { toast('连接已经恢复，这一夜已经收好。'); showSaves(); }
    }
  } catch {
    storageReady = false;
    toast(platform.getStatus().label);
  } finally { busy = false; $('close-panel').disabled = false; updateSaveStatus(); }
}

function showSettings() {
  const boolRow = (key,title,description) => `<div class="setting-row"><span>${title}<small>${description}</small></span><button data-setting="${key}" aria-pressed="${state.settings[key]}">${state.settings[key] ? '开启' : '关闭'}</button></div>`;
  openPanel('settings','阅读设置',`${boolRow('music','晚风与琴声','原创合成钢琴与雨声；首次点击后开始播放')}${boolRow('typing','逐字阅读','关闭后立即显示整段文字')}${boolRow('reduceMotion','减少动态','关闭渐入与转场效果，立即显示文字')}<div class="setting-row"><span>文字大小<small>对话文字可随时调整</small></span><select id="font-size" aria-label="文字大小">${[18,20,22,24].map(n => `<option value="${n}" ${state.settings.fontSize === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div><p class="muted">键盘：空格或 Enter 继续，数字键选择，Esc 合上窗口。自动阅读会在需要选择时停下；略过已读只跳过当前已读段落，不替你做选择。</p><div class="button-row"><button class="paper-button secondary" id="settings-saves">打开夜晚书签</button><button class="paper-button secondary" id="settings-credits">关于这封信</button></div>`,'让这一夜，按你的节奏流动');
  document.querySelectorAll('[data-setting]').forEach(button => button.addEventListener('click',() => {
    const key = button.dataset.setting; state.settings[key] = !state.settings[key]; syncSettings();
    if (key === 'music') void sound.start(state.settings.music);
    if (key === 'typing' || key === 'reduceMotion') { if (inGame) revealText(); }
    button.textContent = state.settings[key] ? '开启' : '关闭'; button.setAttribute('aria-pressed',String(state.settings[key])); void persist();
  }));
  $('font-size').addEventListener('change',event => { state.settings.fontSize = Number(event.target.value); syncSettings(); void persist(); });
  $('settings-saves').addEventListener('click',showSaves);
  $('settings-credits').addEventListener('click',showCredits);
}

function showHistory() {
  const entries = state.current.history.map(entry => {
    const node = STORY.nodes[entry.node];
    return `<article class="history-entry"><small>${escapeHTML(node.time)} · ${escapeHTML(LOCATIONS[node.scene])}${entry.label ? ` · ${escapeHTML(entry.label)}` : ''}</small><h3>${escapeHTML(node.speaker || '旁白')}</h3><p>${escapeHTML(node.text.join('\n\n'))}</p></article>`;
  }).join('');
  openPanel('history','这一轮的回声',entries || '<p class="intro">故事还没有开始。赴约之后，这里会留下你走过的文字。</p>','说过的话，不必再错过');
  $('panel').scrollTop = $('panel').scrollHeight;
}

function showCredits() {
  openPanel('credits','关于这封信',`<p class="intro">《再赴晚风》是一部中文原创循环叙事游戏。献给那些曾想过“如果当时多听一句”的人。</p><h3>玩法的来处</h3><p>从 Paper Dino 的《Save the Date》获得“反复赴约、记忆打开新选择”的机制灵感。本作人物、故事、对话、结局、代码、美术与音乐均重新创作，未收录原作脚本或素材。</p><h3>画面与声音</h3><p>场景、封面、人物与纸张材质使用 AI 生成位图，并做尺寸与格式处理。配乐与雨声由本作原创程序实时合成。没有使用 Emoji 或 SVG 图标作为游戏美术。</p><h3>关于提示与存档</h3><p>完整主线和所有结局均可免费探索。星匣版可主动观看激励广告获取一条可选提示；关闭或观看失败不发奖励。独立运行版使用本机存档，星匣版使用平台云存档。</p><p class="muted">版本 1.0.0 · 2026<br>代码与素材说明见公开仓库 README。</p><div class="button-row"><button class="paper-button secondary" id="credits-settings">阅读设置</button></div>`,'一夜，六处旧地，一次重新听见');
  $('credits-settings').addEventListener('click',showSettings);
}

function showHintPanel() {
  currentHint = findHint(state);
  const status = platform.getStatus();
  const remaining = Math.max(0,(status.hintCredits || 0) - state.meta.hintsUsed);
  const text = !currentHint ? '你已经读懂了这一夜。可以回到落幕收藏，看看走过的不同结局。' : remaining > 0 ? '你还有一张未使用的提示笺。打开后，会得到当前路线的下一步方向。' : '如果想让晚风替你指一次路，可以主动观看一次激励广告。成功看完后获得一张提示笺；主线和结局始终可以免费探索。';
  openPanel('hint','晚风提示笺',`<p class="intro">${text}</p><p class="muted">未使用的提示笺：${remaining}。提示只给方向，不直接获得剧情记忆。</p><div class="button-row"><button class="paper-button" id="hint-action" ${!currentHint || (!remaining && !status.adsAvailable) ? 'disabled' : ''}>${remaining > 0 ? '打开一张提示笺' : '观看广告，得到一条提示'}</button><button class="paper-button secondary" id="hint-back">回到手帐</button></div>${!remaining && !status.adsAvailable && currentHint ? `<p class="muted">${status.mode === 'local' ? '本机版不展示平台广告。你可以继续观察场景、尝试不同选择，找到全部线索。' : '此刻暂时没有可观看的广告，稍后可以再来。探索故事不受影响。'}</p>` : ''}`,'只给方向，把选择留给你');
  $('hint-action').addEventListener('click',() => remaining > 0 ? useHint() : watchAd());
  $('hint-back').addEventListener('click',showJournal);
}

async function useHint() {
  if (busy || !currentHint) return;
  busy = true;
  const button = $('hint-action');
  if (button) button.disabled = true;
  $('close-panel').disabled = true;
  try { await consumeHint(); }
  finally { busy = false; $('close-panel').disabled = false; }
}

async function consumeHint() {
  const credits = platform.getStatus().hintCredits || 0;
  if (credits <= state.meta.hintsUsed) { showHintPanel(); return; }
  state.meta.hintsUsed++;
  const ok = await persist(true);
  if (!ok) { state.meta.hintsUsed--; toast('提示笺尚未使用，请先同步存档。'); return; }
  openPanel('hint-result','晚风捎来的话',`<div class="hint-box">${escapeHTML(currentHint.text)}</div><p class="muted">记住这个方向。提示不会替你解锁情报，也不替你改变结局。</p><div class="button-row"><button class="paper-button" id="hint-read-done">收好，继续赴约</button><button class="paper-button secondary" id="hint-read-journal">回到手帐</button></div>`,'给下一次选择，一点光');
  $('hint-read-done').addEventListener('click',closePanel);
  $('hint-read-journal').addEventListener('click',showJournal);
}

async function watchAd() {
  if (busy || !currentHint) return;
  busy = true;
  $('hint-action').disabled = true;
  $('hint-action').textContent = '广告确认中，请稍候';
  $('close-panel').disabled = true;
  try {
    const saved = await persist(true);
    if (!saved) { toast('请先同步当前进度，再领取提示笺。'); showHintPanel(); return; }
    if (typing) revealText();
    stopReading();
    sound.stop();
    const result = await platform.rewardedHint();
    if (result.rewarded) {
      state.platformRewards.hintCredits = result.hintCredits;
      currentHint = findHint(state);
      await consumeHint();
    } else {
      const messages = { closed:'广告已关闭，未使用提示笺。',unavailable:'此刻没有可观看的广告，探索故事不受影响。',busy:'上一条广告仍在确认中。',error:'广告暂时未能完成，没有扣除提示额度。',uncertain:'广告结果待确认，请重新打开游戏核对提示笺。',save_required:'请先同步进度，再领取提示笺。',limit:'这部故事的提示额度已用完，可以继续免费探索。',not_completed:'本次未获得提示笺，可以继续探索故事。' };
      showHintPanel(); toast(messages[result.reason] || '本次未获得提示笺。');
    }
  } catch {
    showHintPanel(); toast('广告连接暂时中断，探索故事不受影响。');
  } finally {
    busy = false; $('close-panel').disabled = false;
    if (state.settings.music) void sound.start(true);
    if (inGame && !$('panel').open) renderNode();
    updateSaveStatus();
  }
}

const panels = { journal:showJournal, endings:showEndings, saves:showSaves, settings:showSettings, history:showHistory, credits:showCredits };
document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click',() => { if (!busy) panels[button.dataset.panel]?.(); }));
$('start-game').addEventListener('click',() => startGame(false));
$('continue-game').addEventListener('click',() => startGame(true));
$('next-button').addEventListener('click',advance);
$('dialog-text').addEventListener('click',advance);
$('close-panel').addEventListener('click',closePanel);
$('panel').addEventListener('cancel',event => { event.preventDefault(); closePanel(); });
$('return-title').addEventListener('click',() => { if (!busy) { void persist(true); renderTitle(); } });
$('rewind-button').addEventListener('click',() => {
  if (busy) return;
  confirmPanel('让晚风再吹一次', '回到19:07，保留全部记忆与结局，重新选择这一夜的路线。',() => { rewind(state); enterGame(); },'带着记忆重来');
});
$('auto-button').addEventListener('click',() => {
  state.settings.auto = !state.settings.auto; syncSettings();
  if (!state.settings.auto && autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  else if (state.settings.auto && !typing && state.current.paragraph < STORY.nodes[state.current.node].text.length-1) autoTimer = setTimeout(advance,2000);
});
$('skip-read').addEventListener('click',() => {
  if (busy) return;
  if (!state.meta.read.includes(state.current.node)) { toast('这一段还没有读过。先听她把话说完。'); return; }
  state.current.paragraph = STORY.nodes[state.current.node].text.length - 1; renderNode(); revealText(); void persist();
});
document.addEventListener('keydown',event => {
  if (busy || event.ctrlKey || event.metaKey || event.altKey || ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
  if (event.key === 'Escape' && $('panel').open) { event.preventDefault(); closePanel(); return; }
  if ((event.code === 'Space' || event.key === 'Enter') && document.activeElement?.closest('button,a,summary,[role="button"]')) return;
  if ($('panel').open || !inGame) return;
  if (event.code === 'Space' || event.key === 'Enter') { event.preventDefault(); advance(); }
  if (/^[1-9]$/.test(event.key) && !typing && !$('choices').hidden) {
    const button = $('choices').querySelectorAll('button')[Number(event.key)-1];
    if (button) { event.preventDefault(); button.click(); }
  }
});
document.addEventListener('visibilitychange',() => {
  if (document.hidden) {
    sound.stop();
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    if (inGame) void persist(true);
  } else {
    playTick = Date.now();
    if (inGame && state.settings.music && !busy) void sound.start(true);
    if (inGame && !busy && !typing && !$('panel').open && state.settings.auto && state.current.paragraph < STORY.nodes[state.current.node].text.length-1) autoTimer = setTimeout(advance,2300);
  }
});
setInterval(() => {
  const now = Date.now();
  if (inGame && !document.hidden && !busy) state.meta.playSeconds += Math.max(0,Math.min(10,Math.round((now-playTick)/1000)));
  playTick = now;
},5000);

async function bootstrap() {
  try {
    // Wait for the versioned IIFE when hosted; its load order must not race init().
    if (!window.GameSDK) {
      const script = document.querySelector('script[src*="game-sdk/"]');
      if (script) await Promise.race([new Promise(resolve => { script.addEventListener('load',resolve,{once:true}); script.addEventListener('error',resolve,{once:true}); }),new Promise(resolve => setTimeout(resolve,6000))]);
    }
    await platform.init();
    const saved = await platform.load();
    storageReady = true;
    if (saved) { state = createState(saved); hasSave = true; }
    syncSettings(); renderTitle();
  } catch {
    storageReady = false;
    renderTitle();
    openPanel('connection','这一页暂时读不到',`<p class="intro">${escapeHTML(platform.getStatus().label)}。原有存档尚未被覆盖。</p><p>你可以重试同步，也可以先在本次页面阅读。连接恢复前的进度会留在当前页面，关闭页面前请再次同步。</p><div class="button-row"><button class="paper-button" id="retry-bootstrap">重试同步</button><button class="paper-button secondary" id="read-session">先阅读这一夜</button></div>`,'先把原来的记忆妥善留下');
    $('retry-bootstrap').addEventListener('click',() => { closePanel(); void bootstrap(); });
    $('read-session').addEventListener('click',closePanel);
  } finally { $('loading').hidden = true; updateSaveStatus(); }
}

void bootstrap();
