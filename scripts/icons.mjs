import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const svg = readFileSync(new URL("../public/symbol.svg", import.meta.url));
const bg = "#372338";

async function tile(size, out, mark) {
  const icon = await sharp(svg).resize(mark, mark).png().toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: icon, gravity: "centre" }])
    .png()
    .toFile(fileURLToPath(new URL(`../public/${out}`, import.meta.url)));
}

await tile(32, "favicon-32.png", 24);
await tile(180, "apple-touch-icon.png", 132);
await tile(192, "icon-192.png", 140);
await tile(512, "icon-512.png", 380);
console.log("icons written");
