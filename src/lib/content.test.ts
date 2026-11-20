import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CTRL_ALT_NOTE,
  CTRL_LOGIN,
  DATA,
  DISCORD_TAGS,
  GOOD_TO_KNOW,
  HEADSET_PACK_STEP,
  HEADSET_POINTER,
  discordMentions,
  discordTagNames,
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
  "Mic crackling or cutting out (headset)",
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

  it("opens the #tech-sos message with that ship's Discord tags", () => {
    expect(discordMentions("kent")).toBe("<@1387440214254944307> <@763495866396180540>");
    expect(discordMentions("flatiron")).toBe("<@1346220153758552239> <@763495866396180540>");
    expect(discordMentions("yorkville")).toBe("<@1048366277477011486>");
    expect(discordMentions("adelaide")).toBe("<@851253248073793537>");
    expect(discordTagNames("kent")).toBe("LaShae and Eltion");
    expect(discordTagNames("yorkville")).toBe("Cynthia");
    expect(DISCORD_TAGS.flatiron.map((person) => person.name)).toEqual(["Muriel", "Eltion"]);
    const msg = sosTemplate(
      "Kent / Williamsburg (NYC)",
      "Mic has no sound",
      ["Turn the mute switch off"],
      discordMentions("kent"),
    );
    expect(msg.startsWith(`${discordMentions("kent")}\n`)).toBe(true);
    expect(msg).toContain("Ship: Kent / Williamsburg (NYC)");
    expect(msg).toContain("Problem: Mic has no sound");
    expect(msg).toContain("Steps tried (still broken):");
    expect(msg).toContain("- Turn the mute switch off");
    expect(msg).toContain("MOD on site: no");
  });

  it("adds the headset crackle steps on every ship and points the older mic problems at them", () => {
    for (const loc of ["kent", "flatiron", "yorkville", "adelaide"] as const) {
      const parts = splitSteps(DATA[loc]["mic-headset"]);
      expect(parts.guide.map((step) => step.t)).toEqual([
        "Check the easy stuff",
        "Is it the mic or the room?",
        "Ask for help with the headset swap",
        "Test a new headset before you unthread anything",
        "Thread the new headset into the belt",
        "Label the broken headset (never throw it out)",
        "Tell the team",
      ]);
      expect(parts.guide[3].note).toBe("Fixed? Keep going to finish the swap properly.");
      expect(parts.guide[3].continueIfFixed).toBe(true);
      expect(parts.guide[3].brokenGoesTo).toBe("headset-pack");
      expect(parts.mod.some((step) => step.t === "Swap the mic pack")).toBe(true);
      expect(parts.mod.some((step) => step.t.startsWith("Yorkville"))).toBe(loc === "yorkville");
      expect(DATA[loc]["mic-none"]?.note).toContain(HEADSET_POINTER);
    }
    expect(DATA.kent["mic-crackle"]?.note).toContain("Mic crackling or cutting out (headset)");
    expect(DATA.yorkville["mic-crackle"]?.note).toContain("Mic crackling or cutting out (headset)");
    expect(HEADSET_PACK_STEP.t).toBe("New headset didn't fix it?");
    expect(HEADSET_PACK_STEP.bullets.join(" ")).toContain("Don't swap the pack yourself.");
  });

  it("gives every step and tip a short title plus 2 to 4 bullets", () => {
    for (const loc of Object.values(DATA)) {
      for (const entry of Object.values(loc)) {
        for (const step of entry?.steps ?? []) {
          expect(step.t.trim().length).toBeGreaterThan(0);
          expect(step.bullets.length).toBeGreaterThanOrEqual(2);
          expect(step.bullets.length).toBeLessThanOrEqual(4);
        }
      }
    }
    for (const tips of Object.values(GOOD_TO_KNOW)) {
      for (const tip of tips) {
        expect(tip.bullets.length).toBeGreaterThanOrEqual(2);
        expect(tip.bullets.length).toBeLessThanOrEqual(4);
      }
    }
  });

  it("does not publish rack PINs, AnyDesk IDs, phone numbers, or other logins", () => {
    const src = ["App.tsx", "index.css", "main.tsx", "lib/content.ts", "lib/search.ts"]
      .map((f) => readFileSync(join(process.cwd(), "src", f), "utf8"))
      .join("\n");
    expect(src).not.toMatch(/PIN[^.\n]{0,40}\d{4,}/i);
    expect(src).not.toMatch(/\b\d{9,12}\b/);
    expect(src).not.toMatch(/@gmail\.com|@othership\.us/i);
    expect(src).not.toMatch(/\b\d{3}[- ]\d{3}[- ]\d{4}\b/);
    expect(src).not.toMatch(/anydesk[^.\n]{0,40}\d{6,}/i);
  });
});

describe("search", () => {
  it("matches everyday words to the right problem", () => {
    expect(matchSymptoms("no sound")[0].id).toBe("no-sound");
    expect(matchSymptoms("music too quiet")[0].id).toBe("quiet");
    expect(matchSymptoms("lights flickering")[0].id).toBe("flicker");
    expect(matchSymptoms("mic crackling")[0].id).toBe("mic-crackle");
    expect(matchSymptoms("poof")[0].id).toBe("mic-headset");
    expect(matchSymptoms("headset")[0].id).toBe("mic-headset");
    expect(matchSymptoms("ipad logged out")[0].id).toBe("ctrl-logout");
    expect(matchSymptoms("flickring")[0].id).toBe("flicker");
    expect(matchSymptoms("zzzzqqq")).toEqual([]);
  });
});
