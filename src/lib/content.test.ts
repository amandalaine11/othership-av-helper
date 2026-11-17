import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CTRL_ALT_NOTE,
  CTRL_LOGIN,
  DATA,
  GOOD_TO_KNOW,
  QUICK_CONNECT,
  SOURCES,
  SYMPTOMS,
  WHO_GUIDES,
  WHO_NEVER,
  WHO_STOP,
  WHO_WHEN_DONE,
  fallbackFor,
  sosTemplate,
  splitSteps,
} from "./content";
import { matchSymptoms } from "./search";

const TITLES = [
  "No music / app won't connect",
  "Too quiet / time bar moving but no sound",
  "Two things playing at once",
  "Music pausing, skipping or switching",
  "Music in one area but not another",
  "AV mastered class has no sound",
  "Mic has no sound",
  "Mic crackling or cutting in and out",
  "iPad plugged in (cable/dongle), no sound",
  "Bluetooth won't connect",
  "Lighting app won't connect / iPad frozen",
  "CTRL Player logged out on the iPad",
  "Lights flickering, flashing or one strip wrong",
  "Sauna lights completely off",
  "Lights stuck on one colour",
  "Light remote not responding",
  "AV rack battery (UPS) beeping",
  "Nothing works and class is starting",
];

describe("approved content", () => {
  it("lists every problem title", () => {
    expect(SYMPTOMS.map((s) => s.label)).toEqual(TITLES);
  });

  it("keeps the CTRL Player login and the backup username spelling", () => {
    expect(CTRL_LOGIN.kent).toEqual({ addr: "10.0.12.104", user: "Otherhsip", pw: "Othership2026" });
    expect(CTRL_LOGIN.flatiron).toEqual({ addr: "10.0.12.208", user: "Otherhsip", pw: "Othership2026" });
    expect(CTRL_LOGIN.yorkville).toEqual({ addr: "10.10.10.69", user: "Otherhsip", pw: "Othership2026" });
    expect(CTRL_LOGIN.adelaide).toBeUndefined();
    expect(CTRL_ALT_NOTE).toContain("Othership");
    expect(CTRL_ALT_NOTE).toContain("Two fails = stop and get the MOD.");
  });

  it("does not add any other credential", () => {
    const blob = JSON.stringify({ DATA, CTRL_LOGIN, GOOD_TO_KNOW, WHO_GUIDES, WHO_NEVER });
    const passwords = blob.match(/Othership\d+/g) ?? [];
    expect(new Set(passwords)).toEqual(new Set(["Othership2026"]));
    expect(blob).not.toMatch(/\bPIN\s*[:=]\s*\d/);
    expect(blob).not.toMatch(/anydesk\s*(id)?\s*[:=]\s*\d/i);
  });

  it("drops the two-tries rule and keeps the CTRL login fail guardrail", () => {
    const src = ["App.tsx", "index.css", "main.tsx", "lib/content.ts", "lib/search.ts"]
      .map((f) => readFileSync(join(process.cwd(), "src", f), "utf8"))
      .join("\n");
    expect(src.toLowerCase()).not.toContain("two tries");
    expect(src.toLowerCase()).not.toContain("two guide steps");
    expect(WHO_WHEN_DONE.startsWith("When the guide steps are done, stop.")).toBe(true);
    expect(WHO_STOP[0]).toContain("Plex Media Server");
    expect(src).toContain("Login failed twice? Stop — get the MOD");
    expect(src).toContain("Two fails = get the MOD.");
  });

  it("splits guide steps from MOD steps", () => {
    const kentSound = splitSteps(DATA.kent["no-sound"]);
    expect(kentSound.guide).toHaveLength(8);
    expect(kentSound.mod).toHaveLength(2);
    expect(kentSound.guide[2].t).toContain("OTHERSHIP-WMB");
    expect(splitSteps(DATA.flatiron["no-sound"]).guide[2].t).toContain("OTHERSHIP-NYC");
    expect(splitSteps(DATA.kent.ups).guide).toHaveLength(0);
    expect(splitSteps(DATA.kent.ups).mod).toHaveLength(2);
    expect(splitSteps(DATA.yorkville["mic-crackle"]).guide).toHaveLength(0);
    expect(DATA.yorkville.bluetooth?.video?.href).toContain("notion.com");
    expect(DATA.adelaide["ctrl-logout"]?.note).toContain("doesn't use CTRL Player");
    expect(fallbackFor("adelaide", DATA.adelaide["ctrl-logout"])).toContain("#tech-sos");
    expect(GOOD_TO_KNOW.kent.length).toBeGreaterThan(GOOD_TO_KNOW.flatiron.length);
    expect(QUICK_CONNECT).toHaveLength(4);
    expect(SOURCES.length).toBeGreaterThan(3);
  });

  it("builds the #tech-sos message with the MOD line", () => {
    const msg = sosTemplate("Kent / Williamsburg (NYC)", "Mic has no sound");
    expect(msg).toContain("TECH SOS – Kent / Williamsburg (NYC)");
    expect(msg).toContain("MOD on site? yes / no");
    expect(msg).toContain("Problem: Mic has no sound");
    expect(msg).toContain("Photo / video: attached");
  });
});

describe("search", () => {
  it("matches everyday words to the right problem", () => {
    expect(matchSymptoms("no sound")[0].id).toBe("no-sound");
    expect(matchSymptoms("music too quiet")[0].id).toBe("quiet");
    expect(matchSymptoms("lights flickering")[0].id).toBe("flicker");
    expect(matchSymptoms("mic crackling")[0].id).toBe("mic-crackle");
    expect(matchSymptoms("ipad logged out")[0].id).toBe("ctrl-logout");
    expect(matchSymptoms("flickring")[0].id).toBe("flicker");
    expect(matchSymptoms("zzzzqqq")).toEqual([]);
  });
});
