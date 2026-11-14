import { mkdir, rm, cp, copyFile } from 'node:fs/promises';
const files = ['index.html', 'app.js', 'engine.js', 'story.js', 'platform.js', 'sound.js', 'styles.css'];
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of files) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
console.log('Built dist/ (game files and artwork only).');
