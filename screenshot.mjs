/**
 * screenshot.mjs — AlerGica screenshot utility
 *
 * Usage:
 *   node screenshot.mjs <url> [label]
 *
 * Examples:
 *   node screenshot.mjs http://localhost:3000
 *   node screenshot.mjs http://localhost:3000 dashboard
 *
 * Screenshots are saved to: ./temporary screenshots/screenshot-N.png
 * or: ./temporary screenshots/screenshot-N-label.png
 *
 * Requires Puppeteer. Install with:
 *   npm install puppeteer --save-dev
 * Or install globally in the temp test location:
 *   mkdir -p "C:/Users/srluk/AppData/Local/Temp/puppeteer-test"
 *   cd "C:/Users/srluk/AppData/Local/Temp/puppeteer-test" && npm init -y && npm i puppeteer
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, "temporary screenshots");

// Try to find puppeteer
async function loadPuppeteer() {
  // Try local node_modules first
  try {
    const { default: puppeteer } = await import("puppeteer");
    return puppeteer;
  } catch {}

  // Try the project temp location
  const tempPath = "C:/Users/srluk/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js";
  try {
    const { default: puppeteer } = await import(tempPath);
    return puppeteer;
  } catch {}

  console.error(`
ERROR: Puppeteer not found.

Install it with one of:
  npm install puppeteer --save-dev

Or in the temp test location:
  mkdir -p "C:/Users/srluk/AppData/Local/Temp/puppeteer-test"
  cd "C:/Users/srluk/AppData/Local/Temp/puppeteer-test" && npm init -y && npm i puppeteer
`);
  process.exit(1);
}

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Find the next available screenshot number
function nextScreenshotNumber(label) {
  const files = fs.existsSync(SCREENSHOTS_DIR) ? fs.readdirSync(SCREENSHOTS_DIR) : [];
  let max = 0;
  for (const f of files) {
    const match = f.match(/^screenshot-(\d+)/);
    if (match) max = Math.max(max, parseInt(match[1], 10));
  }
  const n = max + 1;
  const filename = label
    ? `screenshot-${n}-${label}.png`
    : `screenshot-${n}.png`;
  return path.join(SCREENSHOTS_DIR, filename);
}

const url = process.argv[2];
const label = process.argv[3] || "";

if (!url) {
  console.error("Usage: node screenshot.mjs <url> [label]");
  process.exit(1);
}

const puppeteer = await loadPuppeteer();
const outPath = nextScreenshotNumber(label);

const browser = await puppeteer.launch({
  headless: "new",
  executablePath:
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    "C:/Users/srluk/.cache/puppeteer/chrome/win64-*/chrome-win64/chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
