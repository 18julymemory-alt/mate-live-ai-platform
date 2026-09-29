// Crop reusable images (host, products, backgrounds, avatars) out of the v2 page renders.
// Run `python3 scripts/extract_v2_pages.py` first, then `node scripts/crop-assets.mjs`.
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = join(root, '.v2-pages');
const out = join(root, 'assets', 'img');
mkdirSync(out, { recursive: true });

// [name, page, x, y, w, h]
const crops = JSON.parse(readFileSync(join(root, 'scripts', 'crops.json'), 'utf8'));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1672, height: 941 } });
for (let p = 1; p <= 9; p++) {
  const items = crops.filter((c) => c[1] === p);
  if (!items.length) continue;
  const png = readFileSync(join(pages, `page${p}.png`)).toString('base64');
  await page.setContent(`<body style="margin:0"><img src="data:image/png;base64,${png}" style="display:block"></body>`);
  await page.waitForLoadState('load');
  for (const [name, , x, y, w, h] of items) {
    await page.screenshot({ path: join(out, `${name}.jpg`), type: 'jpeg', quality: 90, clip: { x, y, width: w, height: h } });
  }
}
// Small thumbnails of each v2 page for the review page.
for (let p = 1; p <= 9; p++) {
  const png = readFileSync(join(pages, `page${p}.png`)).toString('base64');
  await page.setContent(`<body style="margin:0"><img src="data:image/png;base64,${png}" style="display:block;width:480px"></body>`);
  await page.waitForLoadState('load');
  await page.screenshot({ path: join(out, `v2-page-${p}.jpg`), type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 480, height: 270 } });
}
await browser.close();
console.log(`cropped ${crops.length} images + 9 v2 thumbnails into assets/img`);
