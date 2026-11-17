import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const out = "/tmp/shots";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/local/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shot(page, name) {
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false });
  console.log("shot", name);
}

const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await phone.goto("http://127.0.0.1:43123/", { waitUntil: "networkidle" });
await phone.evaluate(() => localStorage.clear());
await phone.reload({ waitUntil: "networkidle" });
await shot(phone, "phone-pick-ship");

await phone.getByTestId("ship-kent").click();
await shot(phone, "phone-search");

await phone.getByTestId("search").fill("no sound");
await phone.locator(".matches button").first().waitFor();
console.log("matches", await phone.locator(".matches button").allInnerTexts());
await phone.locator(".matches button").first().click();
await phone.getByTestId("step-title").waitFor();
await phone.getByTestId("step-title").scrollIntoViewIfNeeded();
await phone.waitForTimeout(100);
await shot(phone, "phone-step");
const step1 = await phone.getByTestId("step-title").innerText();
console.log("step1", step1);

for (let i = 0; i < 12; i++) {
  const stop = phone.getByRole("heading", { name: "STOP: the next fixes need the MOD on duty" });
  if (await stop.count()) break;
  await phone.getByTestId("next-btn").click();
}
await phone.getByTestId("sos").waitFor();
await phone.getByRole("heading", { name: "STOP: the next fixes need the MOD on duty" }).scrollIntoViewIfNeeded();
await shot(phone, "phone-stop");
const sos = await phone.getByTestId("sos").innerText();
console.log("sos has mod line", sos.includes("MOD on site? yes / no"));
console.log("stop visible", await phone.getByRole("heading", { name: /STOP:/ }).innerText());

await phone.getByRole("button", { name: "New problem" }).click();
await phone.getByTestId("search").fill("ipad logged out");
await phone.locator(".matches button", { hasText: "CTRL Player logged out" }).first().click();
await pageWait(phone);
await phone.getByTestId("next-btn").click();
await phone.getByText("10.0.12.104").first().waitFor();
await shot(phone, "phone-ctrl");
const body = await phone.locator("body").innerText();
if (!body.includes("Otherhsip")) throw new Error("missing backup spelling user");
if (!body.includes("Othership2026")) throw new Error("missing ctrl password");
console.log("ctrl login visible");

await phone.getByRole("button", { name: "Flatiron" }).click();
await pageWait(phone);
const flat = await phone.locator("body").innerText();
if (!flat.includes("10.0.12.208")) throw new Error("flatiron engine missing");
if (flat.includes("10.0.12.104")) console.log("note: kent ip still on page?");
console.log("flatiron engine shown", flat.includes("OTHERSHIP-NYC") || flat.includes("10.0.12.208"));

const ipad = await browser.newPage({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2 });
await ipad.goto("http://127.0.0.1:43123/", { waitUntil: "networkidle" });
await ipad.evaluate(() => localStorage.setItem("othership-av-ship", "yorkville"));
await ipad.reload({ waitUntil: "networkidle" });
await shot(ipad, "ipad-home");
await ipad.getByTestId("search").fill("mic crackling");
await ipad.getByRole("button", { name: "Mic crackling or cutting in and out" }).first().click();
await shot(ipad, "ipad-crackle");
const yk = await ipad.locator("body").innerText();
if (!yk.includes("stay away from the AV rack")) throw new Error("yorkville warning missing");
if (!yk.includes("mic feedback has kept coming back")) throw new Error("yorkville note missing");
console.log("yorkville crackle ok");

await ipad.getByRole("button", { name: "Adelaide" }).click();
await ipad.getByText("CTRL Player login").waitFor({ state: "detached" }).catch(() => {});
const adel = await ipad.locator("body").innerText();
if (adel.includes("Othership2026")) throw new Error("adelaide should not show the ctrl password");
console.log("adelaide hides ctrl login", !adel.includes("CTRL Player login —"));

await browser.close();
console.log("done");

function pageWait(page) {
  return page.waitForTimeout(200);
}
