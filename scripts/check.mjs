import { readFile, access, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { STORY, MEMORIES, ENDINGS } from '../story.js';
import { TRACKS } from '../sound.js';
const issues = [];
const scenes = new Set(['rain-street','cafe','station','archive','clocktower','dawn']);
for (const [id,node] of Object.entries(STORY.nodes)) {
  if (!scenes.has(node.scene)) issues.push(`${id}: invalid scene ${node.scene}`);
  if (!Array.isArray(node.text) || !node.text.length || node.text.some(p => typeof p !== 'string' || !p.trim())) issues.push(`${id}: empty dialogue`);
  if (!node.ending && !node.choices?.length) issues.push(`${id}: missing exit`);
  if (node.ending && !ENDINGS[node.ending]) issues.push(`${id}: unknown ending`);
  const checkMemories = ids => { for (const memory of ids || []) if (!MEMORIES[memory]) issues.push(`${id}: unknown memory ${memory}`); };
  checkMemories(node.memory);
  for (const item of node.inspect || []) checkMemories(item.memory);
  for (const choice of node.choices || []) {
    if (!STORY.nodes[choice.to]) issues.push(`${id}: broken target ${choice.to}`);
    checkMemories(choice.memory); checkMemories(choice.requires); checkMemories(choice.hideUnless);
  }
}
for (const file of ['index.html','styles.css','app.js','engine.js','story.js','platform.js','sound.js']) {
  const source = await readFile(file,'utf8');
  if (/<svg\b|data:image\/svg|\.svg(?:["')?]|$)/i.test(source)) issues.push(`${file}: SVG artwork is not allowed`);
  if (/\p{Extended_Pictographic}/u.test(source)) issues.push(`${file}: emoji artwork is not allowed`);
  for (const match of source.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const ref = match[1];
    if (/^(?:https?:|#|\$|data:)/.test(ref) || ref.includes('${')) continue;
    try { await access(resolve(ref)); } catch { issues.push(`${file}: missing asset ${ref}`); }
  }
}
for (const file of ['cover','rain-street','cafe','station','archive','clocktower','dawn','linxia','linxia-worried','linxia-smile','linxia-determined','paper','ui']) {
  try {
    const buffer = await readFile(`assets/${file}.webp`);
    if (buffer.toString('ascii',0,4) !== 'RIFF' || buffer.toString('ascii',8,12) !== 'WEBP') issues.push(`assets/${file}.webp: invalid WebP`);
  } catch { issues.push(`assets/${file}.webp: missing`); }
}
const manifest = JSON.parse(await readFile('star-letter.json','utf8'));
for (const track of Object.values(TRACKS)) {
  try {
    const buffer = await readFile(track.src);
    if (buffer.toString('ascii',4,8) !== 'ftyp') issues.push(`${track.src}: invalid MP4 audio container`);
    if (buffer.length > 6 * 1024 * 1024) issues.push(`${track.src}: audio exceeds the per-track web budget`);
  } catch { issues.push(`${track.src}: missing soundtrack`); }
}
if (manifest.gameFile !== './dist') issues.push('Star-letter must upload the complete dist/ directory');
if (!manifest.capabilityDeclaration?.capabilities?.storage?.enabled || !manifest.capabilityDeclaration?.capabilities?.exchange?.enabled) issues.push('Storage and rewarded-ad exchange must be declared');
if (manifest.priceType !== 0) issues.push('The complete main story must remain free');
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${Object.keys(STORY.nodes).length} story nodes, ${Object.keys(MEMORIES).length} memories, ${Object.keys(ENDINGS).length} endings, 3 soundtracks and all referenced game assets.`);
