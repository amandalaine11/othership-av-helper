import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const out = "/tmp/shots";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/local/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await phone.goto("http://127.0.0.1:43123/", { waitUntil: "networkidle" });
await phone.evaluate(() => localStorage.setItem("othership-av-ship", "kent"));
await phone.reload({ waitUntil: "networkidle" });
await phone.screenshot({ path: `${out}/phone-home.png` });
await phone.getByTestId("search").fill("logged out");
await phone.locator(".matches button").first().click();
await phone.getByTestId("next-btn").click();
await phone.getByText("Othership2026").first().scrollIntoViewIfNeeded();
await phone.screenshot({ path: `${out}/phone-ctrl.png` });
const text = await phone.locator("body").innerText();
if (!text.includes("Otherhsip") || !text.includes("Othership2026") || !text.includes("Othership")) {
  throw new Error("ctrl login text missing");
}
console.log("ctrl visible in body");

const ipad = await browser.newPage({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2 });
await ipad.goto("http://127.0.0.1:43123/", { waitUntil: "networkidle" });
await ipad.evaluate(() => localStorage.setItem("othership-av-ship", "yorkville"));
await ipad.reload({ waitUntil: "networkidle" });
await ipad.screenshot({ path: `${out}/ipad-home.png` });
await ipad.getByTestId("search").fill("bluetooth");
await ipad.locator(".matches button").first().click();
await ipad.getByTestId("step-title").waitFor();
await ipad.screenshot({ path: `${out}/ipad-step.png` });
const yk = await ipad.locator("body").innerText();
if (!yk.includes("stay away from the AV rack")) throw new Error("rack warning missing");
if (!yk.includes("B06+")) throw new Error("yorkville bluetooth step missing");
console.log("ipad yorkville ok", (await ipad.getByTestId("step-title").innerText()).slice(0, 80));

await ipad.setViewportSize({ width: 1024, height: 768 });
await ipad.screenshot({ path: `${out}/ipad-landscape.png` });
await browser.close();
console.log("ok");
