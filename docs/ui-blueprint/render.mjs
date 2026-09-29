// Render every screen in src/screens/*.html to:
//   screens/<name>.png                (app area only, 1920x1080; document pages 1920x1160)
//   MateLive_UI_Blueprint_v3.pdf     (one 1920x1160 page per screen, vector text)
// Usage: node render.mjs [--only 04,05] [--preview]   (--preview also writes full pages to .preview/)
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = join(root, 'src', 'screens');
const pngDir = join(root, 'screens');
const previewDir = join(root, '.preview');
const args = process.argv.slice(2);
const onlyArg = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
const preview = args.includes('--preview');

const files = readdirSync(srcDir).filter((f) => f.endsWith('.html')).sort();
const selected = onlyArg ? files.filter((f) => onlyArg.some((p) => f.startsWith(p))) : files;
mkdirSync(pngDir, { recursive: true });
if (preview) mkdirSync(previewDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1160 } });
const merged = await PDFDocument.create();

for (const file of selected) {
  const name = basename(file, '.html');
  await page.goto(pathToFileURL(join(srcDir, file)).href);
  await page.waitForFunction(() => document.documentElement.dataset.ready === '1');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  const hasApp = await page.$('.app');
  const clip = hasApp ? { x: 0, y: 0, width: 1920, height: 1080 } : { x: 0, y: 0, width: 1920, height: 1160 };
  await page.screenshot({ path: join(pngDir, `${name}.png`), clip });
  if (preview) await page.screenshot({ path: join(previewDir, `${name}.png`) });

  if (!onlyArg) {
    const pdf = await page.pdf({ width: '1920px', height: '1160px', printBackground: true, pageRanges: '1' });
    const doc = await PDFDocument.load(pdf);
    const [p] = await merged.copyPages(doc, [0]);
    merged.addPage(p);
  }
  console.log('rendered', name);
}

if (!onlyArg) {
  merged.setTitle('MateLive AI Live Commerce — UI Blueprint v3');
  merged.setAuthor('MateLive');
  writeFileSync(join(root, 'MateLive_UI_Blueprint_v3.pdf'), await merged.save());
  console.log(`PDF: ${selected.length} pages → MateLive_UI_Blueprint_v3.pdf`);
}
await browser.close();
