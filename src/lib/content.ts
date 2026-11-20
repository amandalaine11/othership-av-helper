export type Loc = "kent" | "flatiron" | "yorkville" | "adelaide";

export type Sym =
  | "no-sound"
  | "quiet"
  | "both"
  | "pausing"
  | "zone"
  | "av-class"
  | "mic-none"
  | "mic-crackle"
  | "wired"
  | "bluetooth"
  | "light-app"
  | "ctrl-logout"
  | "flicker"
  | "lights-off"
  | "frozen"
  | "remote"
  | "ups"
  | "backup";

export type Step = { t: string; bullets: string[]; mod?: boolean };
export type Entry = {
  steps?: Step[];
  note?: string;
  warn?: string;
  fallback?: string;
  video?: { label: string; href: string };
};
export type Tip = { t: string; bullets: string[]; mod?: boolean };

export const LOCS: { value: Loc; label: string; long: string }[] = [
  { value: "kent", label: "Kent", long: "Kent / Williamsburg (NYC)" },
  { value: "flatiron", label: "Flatiron", long: "Flatiron (NYC)" },
  { value: "yorkville", label: "Yorkville", long: "Yorkville (Toronto)" },
  { value: "adelaide", label: "Adelaide", long: "Adelaide (Toronto)" },
];

export const SYMPTOMS: { id: Sym; label: string; keys: string[] }[] = [
  {
    id: "no-sound",
    label: "No music / app won't connect",
    keys: [
      "no sound",
      "no music",
      "silent",
      "nothing playing",
      "won't connect",
      "wont connect",
      "not connecting",
      "can't connect",
      "cant connect",
      "not showing",
      "computer missing",
      "spotify",
      "plex",
      "plexamp",
      "mastered",
      "music stopped",
      "music off",
      "no audio",
      "breathwork",
    ],
  },
  {
    id: "quiet",
    label: "Too quiet / time bar moving but no sound",
    keys: ["quiet", "low", "volume", "soft", "can't hear", "cant hear", "barely", "time bar", "not loud", "loud"],
  },
  {
    id: "both",
    label: "Two things playing at once",
    keys: ["both", "two songs", "at once", "same time", "double", "overlap", "spotify and plex", "plex and spotify"],
  },
  {
    id: "pausing",
    label: "Music pausing, skipping or switching",
    keys: ["pause", "pausing", "skip", "switch", "switching", "cutting out", "drops", "dropping", "music stopped", "stops", "interrupt", "keeps", "spotify"],
  },
  {
    id: "zone",
    label: "Music in one area but not another",
    keys: ["one room", "commons", "reception", "zone", "area", "other room", "not in", "lounge"],
  },
  {
    id: "av-class",
    label: "AV mastered class has no sound",
    keys: ["av class", "av mastered", "os class", "elm", "video class", "lights but no sound"],
  },
  {
    id: "mic-none",
    label: "Mic has no sound",
    keys: ["mic", "microphone", "headset", "no mic", "mic not working", "mic pack"],
  },
  {
    id: "mic-crackle",
    label: "Mic crackling or cutting in and out",
    keys: ["crackle", "crackling", "static", "cutting in", "in and out", "feedback", "buzz", "mic", "fuzzy"],
  },
  {
    id: "wired",
    label: "iPad plugged in (cable/dongle), no sound",
    keys: ["dongle", "cable", "aux", "wired", "plugged in", "cord"],
  },
  {
    id: "bluetooth",
    label: "Bluetooth won't connect",
    keys: ["bluetooth", "bt", "sauna bt", "b06", "pair", "pairing", "receiver"],
  },
  {
    id: "light-app",
    label: "Lighting app won't connect / iPad frozen",
    keys: ["ctrl", "lighting app", "light app", "ipad frozen", "frozen ipad", "ipad", "not responding", "engine", "hot ipad", "overheat", "app frozen", "app"],
  },
  {
    id: "ctrl-logout",
    label: "CTRL Player logged out on the iPad",
    keys: ["logged out", "log out", "logout", "log in", "login", "sign in", "signed out", "password", "username", "ctrl login", "ctrl password", "engine address"],
  },
  {
    id: "flicker",
    label: "Lights flickering, flashing or one strip wrong",
    keys: ["flicker", "flickering", "flash", "flashing", "strobe", "stutter", "strip", "led", "blinking", "erratic"],
  },
  {
    id: "lights-off",
    label: "Sauna lights completely off",
    keys: ["lights off", "no lights", "dark", "lights out", "won't turn on", "wont turn on", "no light", "blackout"],
  },
  {
    id: "frozen",
    label: "Lights stuck on one colour",
    keys: ["stuck", "one colour", "one color", "frozen", "won't change", "wont change", "same colour", "same color"],
  },
  {
    id: "remote",
    label: "Light remote not responding",
    keys: ["remote", "orb", "clicker", "batteries"],
  },
  {
    id: "ups",
    label: "AV rack battery (UPS) beeping",
    keys: ["beep", "beeping", "ups", "battery low", "alarm"],
  },
  {
    id: "backup",
    label: "Nothing works and class is starting",
    keys: ["nothing works", "nothing", "backup", "class starting", "emergency", "help", "sos", "fire alarm", "7am", "no mod"],
  },
];

const MIC_BASICS: Step[] = [
  {
    t: "Turn the mute switch off",
    bullets: [
      "The switch is on top of the mic pack, near the antenna.",
      "Set it so the pack is not muted.",
      "If it worked: you can hear the mic when you speak.",
    ],
  },
  {
    t: "Put in fresh batteries",
    bullets: [
      "Open the pack and take out the old batteries.",
      "Put in a fresh set the same way they came out.",
      "If it worked: the pack powers on and the mic is audible.",
    ],
  },
  {
    t: "Check the cords in the mic pouch",
    bullets: [
      "Open the pouch and look at the cords.",
      "They should not be pinched, loose, or pulled out.",
      "Push any loose plug back in.",
      "If it worked: the mic stays on without cutting out.",
    ],
  },
  {
    t: "Make sure the zone is not muted",
    bullets: [
      "Look at the zone button in Q-SYS.",
      "Red means muted. It must be green.",
      "Tap it so it turns green.",
      "If it worked: that zone is green and the mic comes through.",
    ],
  },
  {
    t: "Point the mouthpiece at your mouth",
    bullets: [
      "Take off the foam cover (the poof).",
      "Turn the headset mouthpiece so it faces your mouth.",
      "Facing away makes it very quiet or silent.",
      "If it worked: your voice is clear when you speak.",
    ],
  },
];

export const CTRL_LOGIN: Partial<Record<Loc, { addr: string; user: string; pw: string }>> = {
  kent: { addr: "10.0.12.104", user: "Otherhsip", pw: "Othership2026" },
  flatiron: { addr: "10.0.12.208", user: "Otherhsip", pw: "Othership2026" },
  yorkville: { addr: "10.10.10.69", user: "Otherhsip", pw: "Othership2026" },
};

export const CTRL_ALT_USER = "Othership";

export const CTRL_ALT_NOTE = `If login fails, try the username “${CTRL_ALT_USER}”. Two fails = stop and get the MOD.`;

const CTRL_LOGOUT_STEPS: Step[] = [
  {
    t: "Open CTRL Player on the iPad",
    bullets: [
      "Tap CTRL Player on the iPad.",
      "If it was already open, swipe up and open it again.",
      "If it worked: you see the login or the class screen.",
    ],
  },
  {
    t: "Enter this ship's Engine address",
    bullets: [
      "Use the address in “CTRL Player login” on this page.",
      "Type it into the Engine field when CTRL Player asks.",
      "If it worked: the iPad finds this ship's Engine.",
    ],
  },
  {
    t: "Enter the username and password and log in",
    bullets: [
      "Copy them from “CTRL Player login” on this page.",
      "Type the username and password, then log in.",
      "If it fails, try the other username spelling shown there.",
      "If it worked: you are back in CTRL Player.",
    ],
  },
  {
    t: "Pick the scene or class again",
    bullets: [
      "Tap the scene or class you need.",
      "Anything you change in CTRL Player shows in the sauna straight away.",
      "If it worked: the sauna lights follow that scene.",
    ],
  },
  {
    t: "Login failed twice? Stop — get the MOD",
    bullets: [
      "Two fails = stop. Don't try a third time.",
      "Don't touch the computer.",
      "Get the MOD on duty.",
    ],
  },
  {
    t: "Check CTRL Engine on the Lighting PC and reconnect the iPad",
    bullets: [
      "On the Lighting PC, look in the system tray for CTRL Engine.",
      "Not running? Open it. Running? Restart it in CTRL Engine Manager.",
      "Restarting CTRL Engine doesn't turn the lights off.",
      "Then reopen CTRL Player on the iPad and search for the Engine.",
    ],
    mod: true,
  },
];

const NYC_SOUND_FALLBACK =
  "Class about to start? Plug the iPad into the AUX cable in the sauna cabinet (run it under the door) and pick SAUNA CAB or SAUNA INT as the Q-SYS input. Post in #tech-sos. No other fixes.";
const NYC_DEFAULT_FALLBACK = "The SOP has no backup for this. Run class as it is, don't try fixes, and post in #tech-sos.";
const TO_SOUND_FALLBACK = "Use musical instruments, or the DJ speaker (see “Nothing works and class is starting”). Post in #tech-sos.";
const CANDLES = "Use the candles, placed safely on the benches, so guests can see. Post in #tech-sos.";
export const TO_SOP = "https://app.notion.com/p/3d6271660d72802caab6e0b75a419cee";
const FIRE =
  "Fire alarm cut the music and lights? Follow the fire and evacuation procedure first. Only once it's safe to carry on: use these backups and the candles.";

export const QUICK_CONNECT: string[][] = [
  ["Ordinary / free-flow class", "Spotify → ship's computer", "SPOTIFY"],
  ["Mastered class", "PlexAmp → ship's computer, start the INTRO track", "SPOTIFY"],
  ["Breathwork", "PlexAmp → BREATH WORK album", "SPOTIFY"],
  ["AV mastered class", "CTRL Player (class in the app)", "OS CLASS"],
];

const NYC_TIPS: Tip[] = [
  {
    t: "The iPads are remotes",
    bullets: [
      "The music plays from the Sound PC in the back.",
      "The iPad and that computer both need to be ready.",
      "If the iPad looks fine but the room is silent, check the Sound PC next.",
    ],
  },
  {
    t: "One class, one app",
    bullets: [
      "Ordinary class: Spotify. Mastered class and breathwork: PlexAmp.",
      "Never run Spotify and PlexAmp together.",
      "If you hear two things, pause the app you don't want.",
    ],
  },
  {
    t: "AirPlay is no longer used",
    bullets: [
      "Don't try AirPlay for class music.",
      "Bluetooth is a last resort, and the MOD decides to use it.",
      "Normal classes play from the computer in the back.",
    ],
  },
  {
    t: "Most fixes are a volume or zone check",
    bullets: [
      "Check the iPad side buttons and the app slider.",
      "Check the Q-SYS master volume.",
      "The zone must be green. Red means muted.",
    ],
  },
  {
    t: "Bring volume up gradually",
    bullets: [
      "If guests are in the room, don't jump straight to full volume.",
      "Turn it up a little, then listen.",
      "Stop when the room is loud enough.",
    ],
  },
  {
    t: "CTRL Player changes are live",
    bullets: [
      "Anything you change in CTRL Player shows in the sauna straight away.",
      "Tap only the scene or class you mean to run.",
      "If the lights jump, you tapped a live control.",
    ],
  },
  {
    t: "Use the QR code before you post",
    bullets: [
      "The QR code is in the AV cabinet.",
      "Open these steps from it first.",
      "Post in #tech-sos after the guide steps run out.",
    ],
  },
  {
    t: "Be specific in #tech-sos",
    bullets: [
      "Say the ship and the room.",
      "For a mic, say mic 1 or mic 2.",
      "Add the class time and a photo or video.",
    ],
  },
  {
    t: "Keep spares in the AV bin",
    bullets: [
      "Keep a spare light remote and spare mic gear there.",
      "Tell the MOD when spares run low.",
      "Don't wait until the last spare is already in use.",
    ],
  },
  {
    t: "A dead iPad is a MOD job at the rack",
    bullets: [
      "The MOD can run class from the rack.",
      "Use desktop CTRL Player, Q-SYS Viewer, and PlexAmp.",
      "Guides don't take over the computers.",
    ],
    mod: true,
  },
  {
    t: "Restarting CTRL Engine leaves the lights on",
    bullets: [
      "A CTRL Engine restart does not turn the lights off.",
      "The MOD does this on the Lighting PC.",
      "Guides don't restart it.",
    ],
    mod: true,
  },
];

export const GOOD_TO_KNOW: Record<Loc, Tip[]> = {
  kent: [
    ...NYC_TIPS,
    {
      t: "Known at Kent: Q-SYS jumps back to the dashboard",
      bullets: [
        "On the iPad, Q-SYS can return to the dashboard after a few seconds.",
        "That is a known Kent issue.",
        "Report it in #tech-sos.",
      ],
    },
    {
      t: "Known at Kent: mics crackle more often",
      bullets: [
        "Crackle is more common at Kent.",
        "Still follow the mic steps.",
        "Report it each time so it stays tracked.",
      ],
    },
  ],
  flatiron: [
    ...NYC_TIPS,
    {
      t: "Known at Flatiron: the first LED strip can flicker",
      bullets: [
        "The first strip on each segment can flicker at a worn joint.",
        "Take a video of it.",
        "Report the strip in #tech-sos.",
      ],
    },
  ],
  yorkville: [
    {
      t: "Yorkville sound and lights use different paths",
      bullets: [
        "Sauna music: iPad → Bluetooth receiver “B06+” → Q-SYS.",
        "Lights: CTRL Player on the iPad over the LXWL Wi-Fi.",
        "Don't use the NYC Sound PC steps here.",
      ],
    },
    {
      t: "Only one iPad plays Spotify",
      bullets: [
        "A second iPad on Spotify can steal or jump the music.",
        "Turn Wi-Fi and Bluetooth off on the Cold Space iPad.",
        "If it worked: the sauna iPad keeps the track.",
      ],
    },
    {
      t: "Keep the sauna iPad near the sauna",
      bullets: [
        "Bluetooth cuts out when the iPad walks away.",
        "Leave it by the sauna during class.",
        "If it worked: the music stays on while you stay close.",
      ],
    },
    {
      t: "Check cables after DJ nights",
      bullets: [
        "Cables at the sauna control panel can be unplugged after DJ nights.",
        "Check they are pushed in before other fixes.",
        "Don't touch the AV rack.",
      ],
    },
    {
      t: "DJ speaker location",
      bullets: [
        "Behind the curtain near the change rooms, bottom shelf.",
        "It runs on battery.",
        "In the sauna you only need 1 speaker, no stands.",
      ],
    },
    {
      t: "Stay away from the Yorkville AV rack",
      bullets: [
        "The rack is in the Quarters, by the sink.",
        "Don't open it or touch the gear.",
        "MOD steps for this ship are done by AnyDesk.",
      ],
    },
    {
      t: "Mic feedback keeps coming back",
      bullets: [
        "This is a known Yorkville issue, even with new headsets.",
        "Don't keep swapping headsets.",
        "Report it in #tech-sos.",
      ],
    },
    {
      t: "Fire alarm",
      bullets: [
        "Follow the fire and evacuation procedure first.",
        "Only once it is safe to carry on, use the backups.",
        "Use the candles, placed safely on the benches, if the lights are off.",
      ],
    },
    {
      t: "The rack screen switches computers",
      bullets: [
        "One screen switches between the sound PC and the lighting PC.",
        "While the rack is unsafe, use AnyDesk only.",
        "Don't stand at the rack to change over.",
      ],
      mod: true,
    },
  ],
  adelaide: [
    {
      t: "Adelaide is low-tech",
      bullets: [
        "Music: iPad → Bluetooth “SAUNA BT”, or the wired cables.",
        "Volume is on knobs, not a back-room computer.",
        "Sauna lights run from the remote, not CTRL Player.",
      ],
    },
    {
      t: "Commons mic for intros is mandatory",
      bullets: [
        "Use the mic in the Commons for intros.",
        "Quarters volume near max. Only one mic on.",
        "Commons source is SAUNA-IN.",
      ],
    },
    {
      t: "Keep the Reception iPad from grabbing the music",
      bullets: [
        "Airplane Mode on.",
        "Wi-Fi off.",
        "If it worked: the sauna iPad keeps the music.",
      ],
    },
    {
      t: "The light remote can overheat",
      bullets: [
        "If it stops responding, let it cool, then try again.",
        "There should be a spare remote.",
        "Swap batteries if cooling doesn't bring it back.",
      ],
    },
    {
      t: "DJ speaker is in The Crank",
      bullets: [
        "Grab it from The Crank if you need backup music.",
        "It runs on battery.",
        "Pair it or use the aux cord. Steps are under “Nothing works”.",
      ],
    },
    {
      t: "Fire alarm",
      bullets: [
        "Follow the fire and evacuation procedure first.",
        "Only once it is safe to carry on, use the backups.",
        "Use the candles, placed safely on the benches, if the lights are off.",
      ],
    },
    {
      t: "Spares to keep on hand",
      bullets: [
        "2 mic packs, 2 headsets, 1 belt pack.",
        "1 aux cord and 1 light remote.",
        "Tell the MOD when a spare is used up.",
      ],
      mod: true,
    },
  ],
};

function nyc(site: "kent" | "flatiron"): Partial<Record<Sym, Entry>> {
  const pc = site === "kent" ? "OTHERSHIP-WMB" : "OTHERSHIP-NYC";
  const rackBullets =
    site === "flatiron"
      ? [
          "Pull out the keyboard.",
          "On the small black box, the blue light should be on the left (AUDIO). If it isn't, press the round button.",
          "Press the “Audio PC” button above the keyboard. Log in with the PIN you were given.",
          "Only touch Spotify and the volume. Don't close any other windows.",
        ]
      : [
          "Pull out the keyboard and wake the screen.",
          "Q-SYS icon in the bottom bar means you are on the Audio PC. That is the one you want.",
          "CTRL icon means the Lighting PC. Press the little black button on the switch box to change over.",
          "Log in with the PIN you were given. Only touch Spotify and the volume.",
        ];
  return {
    "no-sound": {
      steps: [
        {
          t: "Put the iPad on the Othership AV Wi-Fi",
          bullets: [
            "Open Settings → Wi-Fi on the iPad.",
            "Join Othership AV if it is on another network.",
            "If it worked: Wi-Fi shows Othership AV, and the app can see the computer.",
          ],
        },
        {
          t: "Open the right app",
          bullets: [
            "Ordinary class: Spotify.",
            "Mastered class: PlexAmp. Start that class's INTRO track.",
            "Breathwork: PlexAmp, BREATH WORK album.",
            "One class, one app. Don't open the other one.",
          ],
        },
        {
          t: `Connect the app to ${pc}`,
          bullets: [
            `Spotify: tap the device button, then pick ${pc}.`,
            `PlexAmp: tap “connect” at the bottom right of the player, then pick ${pc}.`,
            "Don't pick This iPad.",
            `If it worked: the app is playing on ${pc}.`,
          ],
        },
        {
          t: "Set the Q-SYS input to SPOTIFY",
          bullets: [
            "Open Q-SYS on the iPad.",
            "SPOTIFY is the last option, so scroll down.",
            "Same input for ordinary, mastered, and breathwork classes.",
            "Only pick the input. Don't change anything else in Q-SYS.",
          ],
        },
        {
          t: "Close the app, reopen it, and connect again",
          bullets: [
            "Swipe up to close the music app.",
            "Open it again.",
            `Connect to ${pc} the same way as before.`,
            "If it worked: the music starts in the room.",
          ],
        },
        {
          t: "Go to the Audio PC at the rack",
          bullets: rackBullets,
        },
        {
          t: "Quit Spotify on the Audio PC and open it again",
          bullets: [
            "Quit Spotify, then open it again. Don't close other windows.",
            "Slide Spotify's volume all the way up.",
            "It should say “Playing from Computer”.",
            "Check the Windows speaker icon in the bottom bar is not muted.",
          ],
        },
        {
          t: `On the iPad, reconnect Spotify to ${pc}`,
          bullets: [
            "Swipe up to close Spotify on the iPad.",
            "Open Spotify again.",
            `Tap the device button and pick ${pc}.`,
            "If it worked: sound is back in the room.",
          ],
        },
        {
          t: "Open PlexAmp or Plex Media Server on the Audio PC",
          bullets: [
            "Look on the Audio PC. PlexAmp needs to be open for a mastered class.",
            "Plex Media Server needs to be open too, or PlexAmp has nothing to play.",
            "Open or restart the one that isn't running.",
            "Don't close Q-SYS or anything else.",
          ],
          mod: true,
        },
        {
          t: "PC restarted, stuck at the login screen, or won't respond",
          bullets: [
            "After the Sound PC restarts, Spotify can drop off or the PC can sit at the login screen.",
            "Handle the PC at the rack, or by AnyDesk.",
            "Don't keep retrying from the iPad.",
          ],
          mod: true,
        },
      ],
      note: "Known issue: after the Sound PC restarts, Spotify can disconnect or the PC can sit at the login screen.",
      fallback: NYC_SOUND_FALLBACK,
    },
    quiet: {
      steps: [
        {
          t: "Turn the iPad up with its side buttons",
          bullets: [
            "Use the physical volume buttons, not only the on-screen slider.",
            "If Q-SYS shows RECEPTION INPUT, turn up the front desk iPad too.",
            "Bring it up gradually if guests are in the room.",
            "If it worked: the room gets louder.",
          ],
        },
        {
          t: "Turn the app volume all the way up",
          bullets: [
            "In Spotify, slide the volume all the way up.",
            "Reception input: in Soundtrack Your Brand, slide the sliders all the way up.",
            "If it worked: the app is at full and the room is louder.",
          ],
        },
        {
          t: "Slide the Q-SYS master all the way up",
          bullets: [
            "Open Q-SYS → Dashboard → Main/All Sources.",
            "Slide the volume fully up.",
            "Even a small dip makes the room quiet.",
            "If it worked: the master is at the top and the room is louder.",
          ],
        },
        {
          t: "Make sure the zone is not muted",
          bullets: [
            "Look at the zone button in Q-SYS.",
            "Red means muted. It must be green.",
            "Tap it until it is green.",
            "If it worked: that zone is green and you can hear the music.",
          ],
        },
        {
          t: "On the Audio PC, check Spotify and Windows volume",
          bullets: [
            "Log in with the PIN you were given.",
            "Spotify's volume all the way up.",
            "Windows volume in the bottom bar is not muted.",
            "Only touch Spotify and the volume.",
          ],
        },
        {
          t: "Reception input: check the cables under the front desk",
          bullets: [
            "Only if Q-SYS is on Reception input.",
            "Find the cables from the iPad into the wall, under the front desk.",
            "Push them in so they are seated.",
            "If it worked: reception sound comes back. Don't unplug them.",
          ],
        },
        {
          t: "Unplug and replug the reception cables",
          bullets: [
            "Under the front desk, unplug the cables from the iPad into the wall.",
            "Plug them back in until they are seated.",
            "If it worked: reception sound returns.",
          ],
          mod: true,
        },
      ],
      note: "Bring volume up gradually if guests are in the room.",
      fallback: NYC_DEFAULT_FALLBACK,
    },
    both: {
      steps: [
        {
          t: "On the iPad, pause the app you don't want",
          bullets: [
            "One class means one app.",
            "Spotify for an ordinary class. PlexAmp for a mastered class.",
            "Pause the other app on the iPad.",
            "If it worked: only one thing is playing.",
          ],
        },
        {
          t: "Still both? Pause it on the Audio PC",
          bullets: [
            "Log in with the PIN you were given.",
            "Find the app that should not be playing and pause it.",
            "Don't close any windows.",
            "If it worked: only the class app is still playing.",
          ],
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    pausing: {
      steps: [
        {
          t: "Clear the Spotify queue and restart the track",
          bullets: [
            "Open Spotify and clear the queue.",
            "Start the track again.",
            "If it worked: one track plays and it stops skipping.",
          ],
        },
        {
          t: "Close Spotify on the other iPads",
          bullets: [
            "Only one iPad can play Spotify.",
            "On the Cold Space iPad, swipe up and close Spotify.",
            "On the Reception iPad, swipe up and close Spotify.",
            "If it worked: the class iPad keeps the music.",
          ],
        },
        {
          t: "Reception iPad plays Soundtrack Your Brand, not Spotify",
          bullets: [
            "On the Reception iPad, Soundtrack Your Brand should be the app that is open.",
            "Spotify should not be playing there.",
            "If it worked: reception stays on Soundtrack Your Brand and class music stops jumping.",
          ],
        },
      ],
      note: "Music stopped after the back computer restarted? Use “No music / app won't connect”.",
      fallback: NYC_SOUND_FALLBACK,
    },
    zone: {
      steps: [
        {
          t: "In Q-SYS, unmute that area",
          bullets: [
            "On the main screen, tap the quiet area (for example COMMONS).",
            "The slider on the far right must be green.",
            "Red means muted. Tap it so it turns green.",
            "If it worked: sound is back in that area only.",
          ],
        },
        {
          t: "Commons or reception: check the wall knob",
          bullets: [
            "Find the knob on the wall in that room.",
            "A blue flashing light under the knob means muted. Push the knob in to unmute.",
            "Turn the knob for volume.",
            "If it worked: the blue flash stops and you hear that room.",
          ],
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    "av-class": {
      steps: [
        {
          t: "Set the Q-SYS input to OS CLASS",
          bullets: [
            "Open Q-SYS on the iPad.",
            "Pick OS CLASS. This is only for an AV mastered class.",
            "Don't change anything else in Q-SYS.",
            "If it worked: Q-SYS shows OS CLASS.",
          ],
        },
        {
          t: "Start the class from CTRL Player on the iPad",
          bullets: [
            "Open CTRL Player.",
            "Tap the class you need.",
            "The change shows in the sauna straight away.",
            "If it worked: the class picture and sound start together.",
          ],
        },
        {
          t: "Unmute the Lighting (LX) PC",
          bullets: [
            "On the Lighting PC, click the speaker icon in the bottom bar.",
            "Unmute it.",
            "If it worked: the PC is not muted.",
          ],
          mod: true,
        },
        {
          t: "Unmute ELM",
          bullets: [
            "Open the per-app volume mixer.",
            "Scroll to the ELM icon. Click it if it is muted.",
            "Don't click other ELM slots. Every click is live.",
            "If it worked: ELM is unmuted and the class has sound.",
          ],
          mod: true,
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    "mic-none": {
      steps: [
        {
          t: "Turn the mic pack on",
          bullets: [
            "Open the pack.",
            "Flip open the battery area.",
            "Hold the first button until the pack turns on.",
            "If it worked: the pack stays on.",
          ],
        },
        ...MIC_BASICS,
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    "mic-crackle": {
      steps: [
        {
          t: "Note which mic and where it crackles",
          bullets: [
            "Say whether it is mic 1 or mic 2.",
            "Say if it happens in the sauna only, or everywhere.",
            "You'll need both details if you post in #tech-sos.",
          ],
        },
        {
          t: "Check the headset wire for pinch marks",
          bullets: [
            "Follow the wire from the headset to the pack.",
            "Look for a pinch, a flat spot, or a loose plug.",
            "If it worked: the wire is smooth and the crackle stops.",
          ],
        },
        {
          t: "Swap the headset",
          bullets: [
            "Take a spare headset from the AV bin.",
            "Plug it into the same pack.",
            "Test in the sauna for 1–2 minutes.",
            "Fixed? Label the old one “broken (cutting in and out)” and put it in the AV bin.",
          ],
        },
        {
          t: "Still cutting out? Swap the mic pack",
          bullets: [
            "Take a spare pack with the same number (1 or 2) from the AV bin.",
            "Put batteries in it and plug in the original headset.",
            "Test in the sauna.",
            "Fixed? Label the old pack broken and put it in the AV bin.",
          ],
          mod: true,
        },
        {
          t: "Post in #tech-sos that it was replaced",
          bullets: [
            "Say the ship, mic number, and what you swapped.",
            "Say if it was the headset or the pack.",
            "Management tracks the broken gear from that post.",
          ],
          mod: true,
        },
      ],
      note: site === "kent" ? "Known issue at Kent: mics crackle more often here. Still post it so it's tracked." : undefined,
      fallback: NYC_DEFAULT_FALLBACK,
    },
    wired: {
      steps: [
        {
          t: "Try the other iPad",
          bullets: [
            "Water can stop one iPad working.",
            "Plug the cable into the other iPad.",
            "If it worked: sound comes back on the second iPad.",
          ],
        },
        {
          t: "Swap the dongle",
          bullets: [
            "Unplug the dongle you are using.",
            "Spares are in the cold cabinet or the AV bin in the back.",
            "Plug the spare dongle in and try again.",
            "If it worked: the app plays through the cable.",
          ],
        },
        {
          t: "Make sure the zone is not muted",
          bullets: [
            "Look at the zone button in Q-SYS.",
            "Red means muted. It must be green.",
            "Tap it until it is green.",
            "If it worked: you hear the plugged-in iPad.",
          ],
        },
      ],
      fallback: NYC_SOUND_FALLBACK,
    },
    bluetooth: {
      warn: "Bluetooth is the LAST RESORT, and the MOD decides to use it. Normal classes play from the back computer (see “No music / app won't connect”).",
      steps: [
        {
          t: "Check the Bluetooth receiver is plugged in",
          bullets: [
            "The receiver is in the sauna cabinet.",
            "Check it is pushed into power and into the Sauna Cab audio input.",
            "Just check it is seated. Don't unplug it.",
            "If it worked: the receiver has power and is fully plugged in.",
          ],
        },
        {
          t: "See if “Sauna BT” is connected",
          bullets: [
            "Use the Lighting / Class iPad.",
            "Open Settings → Bluetooth.",
            "Look for “Sauna BT”.",
            "If it worked: “Sauna BT” says Connected.",
          ],
        },
        {
          t: "Put the receiver in pairing mode and connect",
          bullets: [
            "Hold the centre button until the receiver flashes red and blue.",
            "On the iPad, tap “Sauna BT”.",
            "If it worked: the iPad says Connected.",
          ],
          mod: true,
        },
        {
          t: "Switch Q-SYS to Sauna Cab and play",
          bullets: [
            "In Q-SYS, pick the Sauna Cab input.",
            "Mastered class: PlexAmp → the class → Play.",
            "Breathwork: Breathwork app → output icon (top left) → Sauna BT → Play.",
            "If it worked: the room plays from the iPad, not the back computer.",
          ],
          mod: true,
        },
        {
          t: "Still nothing? Restart pairing and reconnect",
          bullets: [
            "Hold the centre button until it flashes red and blue again.",
            "On the iPad, tap “Sauna BT” again.",
            "If it worked: Bluetooth shows Connected and the room has sound.",
          ],
          mod: true,
        },
      ],
      fallback: NYC_SOUND_FALLBACK,
    },
    "light-app": {
      steps: [
        {
          t: "Put the iPad on the Othership AV Wi-Fi",
          bullets: [
            "Open Settings → Wi-Fi.",
            "Join Othership AV.",
            "If it worked: Wi-Fi shows Othership AV.",
          ],
        },
        {
          t: "Close CTRL Player and open it again",
          bullets: [
            "Swipe up to fully close CTRL Player.",
            "Tap it to open it again.",
            "If it worked: the app responds and finds the Engine.",
          ],
        },
        {
          t: "One iPad won't work? Run class from desktop CTRL Player",
          bullets: [
            "Open CTRL Player on the desktop.",
            "Run the class from there.",
            "Every click is live in the sauna.",
          ],
          mod: true,
        },
        {
          t: "Check CTRL Engine on the Lighting PC",
          bullets: [
            "Look in the system tray on the Lighting PC.",
            "Not running? Open it.",
            "Running? Restart it in CTRL Engine Manager. That won't turn the lights off.",
            "If it worked: CTRL Engine is running.",
          ],
          mod: true,
        },
        {
          t: "Reopen CTRL Player and search for the Engine",
          bullets: [
            "Open CTRL Player again.",
            "Search for the Engine.",
            "Add it manually if it doesn't show up. The address is in the management SOP.",
            "If it worked: the iPad connects to the Engine.",
          ],
          mod: true,
        },
        {
          t: "Last fallback: run the lights by hand in ELM",
          bullets: [
            "Trained staff only.",
            "Open ELM and control the lights from there.",
            "Every click is live. Don't click a slot to test.",
          ],
          mod: true,
        },
      ],
      fallback: "Leave the lights as they are, run class, and post in #tech-sos. Don't touch the computer.",
    },
    "ctrl-logout": {
      steps: CTRL_LOGOUT_STEPS,
      fallback: "Leave the lights as they are, run class, and post in #tech-sos. Don't touch the computer.",
    },
    flicker: {
      steps: [
        {
          t: "Take a wide video of the whole sauna",
          bullets: [
            "Film a slow pan so every strip is in the video.",
            "Keep the flickering strip in frame.",
            "You'll attach this video in #tech-sos.",
          ],
        },
        {
          t: "Find the strip on the sauna strip chart",
          bullets: [
            "The chart is in the management SOP.",
            "Match the bad strip to its label, such as E2 or D2.",
            "Write that label down before you post.",
          ],
          mod: true,
        },
        {
          t: "Power-cycle that strip at the breaker",
          bullets: [
            "Not during class.",
            "Turn that strip's breaker off, wait 10 seconds, then on.",
            "The wait lets the Octo node reset.",
            "If it worked: that strip stops flickering.",
          ],
          mod: true,
        },
        {
          t: "Only one segment? Bridge it with the LED jumper",
          bullets: [
            "Use the LED jumper wire from the AV box.",
            "Unplug the strip with a twist and push.",
            "Connect the jumper in its place.",
            "Kent's jumper spot is not marked in the SOP. Flatiron's is the AV box.",
          ],
          mod: true,
        },
        {
          t: "A few segments or a whole row? Unplug both ends",
          bullets: [
            "Unplug both ends of the row, for example A1 and A10.",
            "That cuts power and data to the row.",
            "Don't do this during class.",
          ],
          mod: true,
        },
        {
          t: "Post the ship, the strip, and the video",
          bullets: [
            `Example: “${site === "kent" ? "KENT" : "FLTRN"} – E2”.`,
            "Attach the wide video.",
            "Management books the lighting tech from that post.",
          ],
          mod: true,
        },
      ],
      note:
        site === "flatiron"
          ? "Known issue at Flatiron: the first LED strip on each segment wears out at the joint and flickers. Report it with the strip number."
          : undefined,
      fallback: "Run class with the lights as they are. Post your video in #tech-sos.",
    },
    remote: {
      steps: [
        {
          t: "Replace the ORB remote batteries",
          bullets: [
            "Open the back of the ORB light remote.",
            "Swap in fresh batteries.",
            "Close it and try a button.",
            "If it worked: the lights respond.",
          ],
        },
        {
          t: "Set the classic sunset look",
          bullets: [
            "Press ALL.",
            "Slide to a dark red.",
            `Press ${site === "kent" ? "3" : "4"}.`,
            "Slide to orange. If it worked: the sauna is on that sunset look.",
          ],
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    ups: {
      steps: [
        {
          t: "Run the UPS self test",
          bullets: [
            "The UPS is at the bottom right of the AV rack. Sit on the floor to reach it.",
            "Press Enter to open the menu.",
            "Arrow keys to “Test & Diags”, then Enter. Arrow keys to “UPS Self Test”, then Enter.",
            "Arrow keys to “Yes”, then Enter. If it worked: the beeping stops.",
          ],
          mod: true,
        },
        {
          t: "Test failed? Try once more, then post in #tech-sos",
          bullets: [
            "Run the same self test one more time.",
            "If it fails again, stop.",
            "Post in #tech-sos. Don't unplug anything.",
          ],
          mod: true,
        },
      ],
      fallback: "Leave it beeping and post in #tech-sos. Don't unplug anything.",
    },
  };
}

const YK_BT: Step[] = [
  {
    t: "Put the iPad on the LXWL Wi-Fi",
    bullets: [
      "Open Settings → Wi-Fi.",
      "Join LXWL. Yorkville lights and control use this network.",
      "If it worked: Wi-Fi shows LXWL.",
    ],
  },
  {
    t: "Connect Bluetooth to “B06+”",
    bullets: [
      "Open Settings → Bluetooth on the sauna iPad.",
      "Tap the receiver named “B06+”.",
      "If it worked: “B06+” says Connected.",
    ],
  },
  {
    t: "Slide the Q-SYS master all the way up",
    bullets: [
      "Open Q-SYS → Dashboard → Main/All Sources.",
      "Slide the volume fully up.",
      "Even a small dip makes the room quiet.",
      "If it worked: the master is at the top.",
    ],
  },
  {
    t: "Check the aux cord and the sauna control panel cables",
    bullets: [
      "Look at the aux cord and the cables on the sauna control panel.",
      "They can come loose after DJ nights. Push them in.",
      "Don't touch the AV rack.",
      "If it worked: every cable is seated and you have sound.",
    ],
  },
  {
    t: "Try the Cold Space iPad",
    bullets: [
      "Use the Cold Space iPad as the backup player.",
      "Connect it to “B06+” the same way.",
      "If it worked: sound plays from that iPad.",
    ],
  },
];

const YORKVILLE: Partial<Record<Sym, Entry>> = {
  "no-sound": { steps: YK_BT, fallback: TO_SOUND_FALLBACK },
  bluetooth: {
    steps: [
      ...YK_BT,
      {
        t: "Reset the Bluetooth receiver",
        bullets: [
          "Follow “How to Reset Bluetooth” in the Toronto SOP. The video is linked below.",
          "The video shows the receiver in the cabinet.",
          "Don't do this if it means touching the AV rack.",
        ],
        mod: true,
      },
    ],
    fallback: TO_SOUND_FALLBACK,
    video: { label: "How to Reset Bluetooth (Toronto in-ship SOP)", href: TO_SOP },
  },
  quiet: {
    steps: [
      {
        t: "Turn the iPad up with its side buttons",
        bullets: [
          "Use the physical volume buttons on the sauna iPad.",
          "Bring it up gradually if guests are in the room.",
          "If it worked: the room gets louder.",
        ],
      },
      {
        t: "Slide the Q-SYS master all the way up",
        bullets: [
          "Open Q-SYS → Dashboard → Main/All Sources.",
          "Slide the volume fully up.",
          "Even a small dip on the slider makes it quiet.",
          "If it worked: the master is at the top and the room is louder.",
        ],
      },
      {
        t: "On Reception Input, turn up the front desk iPad",
        bullets: [
          "Only if Q-SYS is on Reception Input.",
          "Use the side buttons on the front desk iPad.",
          "If it worked: reception gets louder too.",
        ],
      },
    ],
    note: "Bring volume up gradually if guests are in the room.",
    fallback: TO_SOUND_FALLBACK,
  },
  zone: {
    steps: [
      {
        t: "Go to the Commons knob",
        bullets: [
          "Go to the Commons.",
          "Face the fireplace. The black knob is on the left wall.",
          "That knob is the Commons volume.",
        ],
      },
      {
        t: "Blue or mute? Press the knob once",
        bullets: [
          "Blue, or a mute mark, means the Commons is muted.",
          "Press the knob once.",
          "If it worked: the mute mark goes and you hear the Commons.",
        ],
      },
      {
        t: "Turn the knob up if it is quiet",
        bullets: [
          "Turn the same knob up.",
          "Bring it up gradually if guests are nearby.",
          "If it worked: the Commons is louder.",
        ],
      },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  pausing: {
    steps: [
      {
        t: "Turn Wi-Fi and Bluetooth off on the Cold Space iPad",
        bullets: [
          "On the Cold Space iPad, open Settings.",
          "Turn Wi-Fi off and Bluetooth off. It can interfere with the sauna iPad.",
          "If it worked: the sauna music stops jumping.",
        ],
      },
      {
        t: "Put the Reception iPad in Airplane Mode",
        bullets: [
          "On the Reception iPad, turn Airplane Mode on.",
          "Then confirm Wi-Fi is off.",
          "If it worked: reception is not taking the music.",
        ],
      },
      {
        t: "Keep the sauna iPad close to the sauna",
        bullets: [
          "Bluetooth cuts out if you walk away with the iPad.",
          "Leave the sauna iPad by the sauna.",
          "If it worked: the music stays on while the iPad stays close.",
        ],
      },
      {
        t: "Clear the Spotify queue and restart the track",
        bullets: [
          "Open Spotify and clear the queue.",
          "Start the track again.",
          "If it worked: one track plays without skipping.",
        ],
      },
      {
        t: "Check only one iPad is playing Spotify",
        bullets: [
          "Only one iPad can play Spotify at a time.",
          "Make sure the Cold Space iPad is not playing too.",
          "If it worked: only the sauna iPad is playing.",
        ],
      },
      {
        t: "Spotify on the wrong account? Stop and get the MOD",
        bullets: [
          "If Spotify is not on the Yorkville account, don't log in or out.",
          "Don't type a password.",
          "The MOD sorts the account.",
        ],
        mod: true,
      },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  "mic-none": { steps: MIC_BASICS, fallback: "Run class without the mic and post in #tech-sos." },
  "mic-crackle": {
    note: "Known issue at Yorkville: mic feedback has kept coming back even with new headsets. Don't keep swapping; report it.",
    fallback: "Run class without the mic and post in #tech-sos.",
  },
  "light-app": {
    steps: [
      {
        t: "Close CTRL Player and open it again",
        bullets: [
          "Swipe up to fully close CTRL Player.",
          "Tap it to open it again.",
          "If it worked: the app responds.",
        ],
      },
      {
        t: "Put the iPad on the LXWL Wi-Fi",
        bullets: [
          "Open Settings → Wi-Fi.",
          "Join LXWL.",
          "If it worked: Wi-Fi shows LXWL and CTRL Player can search.",
        ],
      },
      {
        t: "iPad hot or wet? Let it cool and switch iPads",
        bullets: [
          "Stop using a hot or wet iPad.",
          "Let it cool. Dry your hands and the screen.",
          "Use the Cold Space iPad for now.",
          "If it worked: the backup iPad runs CTRL Player.",
        ],
      },
      {
        t: "By AnyDesk, check CTRL Engine on the Lighting PC",
        bullets: [
          "Use AnyDesk. Don't go to the rack while it is unsafe.",
          "Not running? Open CTRL Engine.",
          "Running? Restart it in CTRL Engine Manager. That won't turn the lights off.",
          "If it worked: CTRL Engine is running.",
        ],
        mod: true,
      },
      {
        t: "Reopen CTRL Player and search for the Engine",
        bullets: [
          "Open CTRL Player again.",
          "Search for the Engine.",
          "Add it manually if it doesn't show up. The address is in the management SOP.",
          "If it worked: the iPad connects.",
        ],
        mod: true,
      },
      {
        t: "Last fallback: run the lights in ELM by AnyDesk",
        bullets: [
          "Trained staff only, and only by AnyDesk.",
          "Don't do this at the rack while it is unsafe.",
          "Every click in ELM is live.",
        ],
        mod: true,
      },
    ],
    fallback: "Leave the lights as they are and run class. Lights off? " + CANDLES,
  },
  "ctrl-logout": {
    steps: CTRL_LOGOUT_STEPS,
    fallback: "Leave the lights as they are and run class. Lights off? " + CANDLES,
  },
  "lights-off": {
    steps: [
      {
        t: "Use the candles so guests can see",
        bullets: [
          "Place the candles safely on the benches.",
          "They are so guests can see, not a lighting repair.",
          "Then get the MOD.",
        ],
      },
      {
        t: "Check the breaker room for a blown fuse",
        bullets: [
          "Go to the breaker room.",
          "Look for a blown fuse and reset it.",
          "If it worked: the sauna lights come back on.",
        ],
        mod: true,
      },
      {
        t: "Check the lighting computer in the Quarters is on",
        bullets: [
          "Check by AnyDesk. Don't touch the rack.",
          "The computer is in the Quarters, by the sink.",
          "If it is off, report it in #tech-sos. Don't power it on at the rack.",
        ],
        mod: true,
      },
    ],
    fallback: CANDLES,
  },
  frozen: {
    steps: [
      {
        t: "Close the lighting app and open it again",
        bullets: [
          "Swipe up to fully close the lighting app on the iPad.",
          "Open it again and pick the look you need.",
          "If it worked: the lights change colour.",
        ],
      },
      {
        t: "By AnyDesk, open CTRL Engine Manager, then Enttec LED Mapper",
        bullets: [
          "The written SOP does this at the keyboard by the sink.",
          "While the rack is unsafe, do it by AnyDesk instead. Don't touch the rack.",
          "Open CTRL Engine Manager, then Enttec LED Mapper.",
          "If it worked: the lights leave the stuck colour.",
        ],
        mod: true,
      },
    ],
    fallback: "Run class on the colour it's stuck on and post in #tech-sos.",
  },
  backup: {
    steps: [
      {
        t: "Use musical instruments",
        bullets: [
          "This is the first backup when nothing else plays.",
          "Run the class with instruments.",
          "If it worked: class can start without the speakers.",
        ],
      },
      {
        t: "Need music? Grab one DJ speaker",
        bullets: [
          "Behind the curtain near the change rooms, bottom shelf.",
          "It runs on battery. You don't need a power outlet.",
          "In the sauna you only need 1 speaker, and no stands.",
        ],
      },
      {
        t: "Pair the DJ speaker",
        bullets: [
          "Press power once.",
          "Hold the Bluetooth button for 4 seconds.",
          "On your iPad or phone, pick “EXM-Mobile-12”. Or use the aux cord.",
          "If it worked: music plays from that speaker.",
        ],
      },
      {
        t: "Call Christian K and post in #tech-sos",
        bullets: [
          "Call Christian K.",
          "Post in #tech-sos with the ship and what failed.",
          "Stay with the class on the backup.",
        ],
      },
    ],
    note: FIRE,
    fallback: "These are the backups. Lights off too? " + CANDLES,
  },
};

const ADEL_BT: Step[] = [
  {
    t: "Check the Bluetooth receiver light",
    bullets: [
      "The light should be blinking blue, or blue and red.",
      "No light? Check the black USB cable is pushed into the wall and into the device.",
      "Just check it is seated. Don't hold the button yet.",
      "If it worked: you can see a blue light.",
    ],
  },
  {
    t: "Connect the iPad to “SAUNA BT”",
    bullets: [
      "Open Settings → Bluetooth.",
      "If “SAUNA BT” is listed but not connected, tap it.",
      "If it worked: “SAUNA BT” says Connected.",
    ],
  },
  {
    t: "Play Spotify to SAUNA BT",
    bullets: [
      "Open Spotify.",
      "Tap the device button at the bottom left.",
      "Tap Bluetooth and AirPlay, then SAUNA BT.",
      "If it worked: Spotify shows SAUNA BT and the sauna has music.",
    ],
  },
  {
    t: "Push the braided cords in",
    bullets: [
      "Find the braided cords on the receiver.",
      "Push each plug in until it is seated.",
      "If it worked: the cords don't pull out and you have sound.",
    ],
  },
  {
    t: "No light even with the cable in? Turn the receiver on",
    bullets: [
      "The black USB cable is already pushed in, and there is still no light.",
      "Hold the centre button for 3–5 seconds.",
      "If it worked: the light comes on.",
    ],
    mod: true,
  },
  {
    t: "Re-pair the receiver",
    bullets: [
      "Hold the centre button for 5 seconds, until it flashes red and blue.",
      "On the iPad, pick SAUNA BT.",
      "If it worked: the light blinks blue and the iPad says Connected.",
    ],
    mod: true,
  },
  {
    t: "Switch to the wired cables",
    bullets: [
      "Unplug the braided cords and plug in the black ones.",
      "Turn Bluetooth off on the iPad.",
      "In Spotify, tap the device button and pick “This iPad”.",
      "If it worked: music plays through the cable.",
    ],
    mod: true,
  },
];

const ADELAIDE: Partial<Record<Sym, Entry>> = {
  "no-sound": { steps: ADEL_BT, fallback: TO_SOUND_FALLBACK },
  bluetooth: { steps: ADEL_BT, fallback: TO_SOUND_FALLBACK },
  wired: {
    steps: [
      {
        t: "Put the sauna iPad on Wi-Fi",
        bullets: [
          "Open Settings → Wi-Fi on the sauna iPad.",
          "Join the ship Wi-Fi.",
          "If it worked: Wi-Fi is on and connected.",
        ],
      },
      {
        t: "Put the Reception iPad in Airplane Mode",
        bullets: [
          "On the Reception iPad, turn Airplane Mode on.",
          "Confirm Wi-Fi is off, so it doesn't fight for the music.",
          "If it worked: reception is offline and the sauna iPad keeps the music.",
        ],
      },
      {
        t: "Check the master volume in the Quarters",
        bullets: [
          "Go to the master control in the Quarters.",
          "Set the volume levels where class usually sits.",
          "If it worked: the Quarters master is up and you hear the sauna.",
        ],
      },
      {
        t: "Try a new dongle",
        bullets: [
          "Unplug the dongle in use.",
          "Plug in a spare dongle.",
          "If it worked: the iPad plays through the new dongle.",
        ],
      },
      {
        t: "Try the iPad from the Quarters",
        bullets: [
          "Swap in the iPad from the Quarters.",
          "Plug it into the same cable.",
          "If it worked: sound plays from that iPad.",
        ],
      },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  quiet: {
    steps: [
      {
        t: "Turn the iPad up with its side buttons",
        bullets: [
          "Use the physical volume buttons.",
          "Bring it up gradually if guests are in the room.",
          "If it worked: the room gets louder.",
        ],
      },
      {
        t: "Set the Staff Room master volume",
        bullets: [
          "Go to the master volume in the Staff Room.",
          "Put it at the usual class level, not all the way down.",
          "If it worked: the room matches that level.",
        ],
      },
      {
        t: "Check the volume panel outside the sauna",
        bullets: [
          "Find the volume panel outside the sauna.",
          "Turn it up if it is all the way down.",
          "If it worked: you can hear the sauna from a normal level.",
        ],
      },
    ],
    note: "Bring volume up gradually if guests are in the room.",
    fallback: TO_SOUND_FALLBACK,
  },
  pausing: {
    steps: [
      {
        t: "Put the Reception iPad in Airplane Mode",
        bullets: [
          "Turn Airplane Mode on.",
          "Confirm Wi-Fi is off.",
          "If it worked: the music stops jumping to reception.",
        ],
      },
      {
        t: "Clear the Spotify queue and restart the playlist",
        bullets: [
          "Open Spotify and clear the queue.",
          "Start the playlist again.",
          "If it worked: one playlist plays without switching.",
        ],
      },
      {
        t: "Try a new dongle",
        bullets: [
          "Swap in a spare dongle.",
          "Play Spotify again through it.",
          "If it worked: the track stays on.",
        ],
      },
      {
        t: "Spotify on the wrong account? Stop and get the MOD",
        bullets: [
          "If Spotify is not on the Adelaide account, don't log in or out.",
          "Don't type a password.",
          "The MOD sorts the account.",
        ],
        mod: true,
      },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  zone: {
    steps: [
      {
        t: "Sauna works but Commons doesn't? Look at AMP 3",
        bullets: [
          "AMP 3 is in the Commons.",
          "Look at the light. Is it flashing red?",
          "Don't unplug it yourself.",
          "If it is flashing red, get the MOD.",
        ],
      },
      {
        t: "AMP 3 flashing red: reset it",
        bullets: [
          "Not during class.",
          "Unplug its power cord from the back.",
          "Wait 10 seconds, then plug it back in.",
          "If it worked: the red flash stops and the Commons has sound.",
        ],
        mod: true,
      },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  "mic-none": {
    steps: [
      {
        t: "Turn the mute switch off",
        bullets: [
          "The switch is on top of the mic pack, near the antenna.",
          "Set it so the pack is not muted.",
          "If it worked: you can hear the mic.",
        ],
      },
      {
        t: "Put in fresh batteries",
        bullets: [
          "Open the pack and replace the batteries.",
          "If it worked: the pack powers on.",
        ],
      },
      {
        t: "Check for pinched cords in the mic pouch",
        bullets: [
          "Open the pouch and look at the cords.",
          "Push a loose plug back in. A pinched cord needs a spare headset.",
          "If it worked: the mic stays on.",
        ],
      },
      {
        t: "Mic in the Commons? Check these too",
        bullets: [
          "Using the mic in the Commons for intros is mandatory.",
          "Quarters volume close to max. Only one mic on at a time.",
          "Commons source is SAUNA-IN.",
          "If it worked: the Commons hears the mic.",
        ],
      },
    ],
    fallback: "Run class without the mic and post in #tech-sos.",
  },
  remote: {
    steps: [
      {
        t: "Let an overheated remote cool",
        bullets: [
          "The remote may have overheated.",
          "Set it aside and let it cool.",
          "Try it again once it is cool.",
          "If it worked: the lights respond.",
        ],
      },
      {
        t: "Turn the lights off and on with the remote",
        bullets: [
          "Press off, then on.",
          "If it worked: the lights follow the remote again.",
        ],
      },
      {
        t: "Swap the remote batteries",
        bullets: [
          "Open the remote and put in fresh batteries.",
          "There should be a spare remote if this one stays dead.",
          "If it worked: the lights respond.",
        ],
      },
    ],
    fallback: "Run class with the lights as they are and post in #tech-sos.",
  },
  "lights-off": {
    steps: [
      {
        t: "Check the light switch in the Staff Room",
        bullets: [
          "The switch is in the Staff Room.",
          "Someone may have turned it off. Turn it on.",
          "If it worked: the sauna lights come on.",
        ],
      },
      {
        t: "Swap the remote batteries",
        bullets: [
          "Open the remote and put in fresh batteries.",
          "Try the lights again.",
          "If it worked: the remote turns the lights on.",
        ],
      },
    ],
    fallback: CANDLES,
  },
  flicker: {
    steps: [
      {
        t: "Turn off MODE and pick one solid colour",
        bullets: [
          "On the remote, turn MODE / effects off.",
          "Pick one solid colour.",
          "If it worked: the lights stay on that colour instead of flashing.",
        ],
      },
      {
        t: "Turn the lights off and on with the remote",
        bullets: [
          "Press off, then on.",
          "Leave MODE off.",
          "If it worked: the flashing stops.",
        ],
      },
    ],
    fallback: "Pick one solid colour and run class. Post in #tech-sos.",
  },
  frozen: {
    steps: [
      {
        t: "Turn off MODE and pick one solid colour",
        bullets: [
          "On the remote, turn MODE / effects off.",
          "Pick one solid colour.",
          "If it worked: the lights change to that colour.",
        ],
      },
      {
        t: "Turn the lights off and on with the remote",
        bullets: [
          "Press off, then on.",
          "Pick the colour again.",
          "If it worked: the lights leave the stuck colour.",
        ],
      },
      {
        t: "Remote not responding? Let it cool and swap the batteries",
        bullets: [
          "Let the remote cool.",
          "Then swap the batteries.",
          "If it worked: the remote changes the lights.",
        ],
      },
    ],
    fallback: "Run class on the colour it's stuck on and post in #tech-sos.",
  },
  "ctrl-logout": {
    note: "Adelaide doesn't use CTRL Player. The sauna lights run from the remote. See “Light remote not responding”.",
  },
  "light-app": {
    note: "Adelaide's sauna lights run from the remote, not an app. See “Light remote not responding”.",
  },
  backup: {
    steps: [
      {
        t: "Use musical instruments",
        bullets: [
          "This is the first backup when nothing else plays.",
          "Run the class with instruments.",
          "If it worked: class can start without the speakers.",
        ],
      },
      {
        t: "Need music? Grab a DJ speaker from The Crank",
        bullets: [
          "The DJ speaker is in The Crank.",
          "It runs on battery.",
          "Bring one speaker to the class.",
        ],
      },
      {
        t: "Pair the DJ speaker",
        bullets: [
          "Press power once.",
          "Hold the Bluetooth button for 4 seconds.",
          "On your iPad or phone, pick “EXM-Mobile-12”. Or use the aux cord.",
          "If it worked: music plays from that speaker.",
        ],
      },
      {
        t: "Post in #tech-sos",
        bullets: [
          "Say Adelaide and what failed.",
          "Say that class is on the backup.",
          "Stay with the class.",
        ],
      },
    ],
    note: FIRE,
    fallback: "These are the backups. Lights off too? " + CANDLES,
  },
};

export const DATA: Record<Loc, Partial<Record<Sym, Entry>>> = {
  kent: nyc("kent"),
  flatiron: nyc("flatiron"),
  yorkville: YORKVILLE,
  adelaide: ADELAIDE,
};

export function fallbackFor(loc: Loc, entry?: Entry): string {
  if (entry?.fallback) return entry.fallback;
  return loc === "kent" || loc === "flatiron"
    ? NYC_DEFAULT_FALLBACK
    : "The SOP has no backup for this. Run class as it is, don't try fixes, and post in #tech-sos.";
}

export function splitSteps(entry?: Entry): { guide: Step[]; mod: Step[] } {
  const steps = entry?.steps ?? [];
  return {
    guide: steps.filter((s) => !s.mod),
    mod: steps.filter((s) => s.mod),
  };
}

/** Discord role mention. Change this one constant when the real role is known. */
export const DISCORD_ROLE_MENTION = "@MOD";

export function sosTemplate(ship: string, problem: string, tried: string[] = []): string {
  const steps = tried.length ? tried.map((title) => `- ${title}`) : ["- none"];
  return [
    DISCORD_ROLE_MENTION,
    `Ship: ${ship}`,
    `Problem: ${problem}`,
    "Steps tried (still broken):",
    ...steps,
    "MOD on site: no",
  ].join("\n");
}

export const STOP_TITLE = "STOP: the next fixes need the MOD on duty";
export const STOP_BODY = "Get the MOD on duty. Don't try anything below yourself.";
export const MOD_BOX_TITLE = "MOD on duty only — Stop: get the MOD";
export const NO_GUIDE = "No guide steps for this one. Go straight to the MOD.";
export const NO_MOD_LEAD = "No MOD on site?";

export const WHO_GUIDES: string[] = [
  "Volume: iPad buttons, app sliders, Q-SYS master and zone mute, wall knobs.",
  "Pause the second app if two things play. Pick the playlist or track again.",
  "Close and reopen the app on the iPad. Pick the class input in Q-SYS.",
  "Log back in to CTRL Player on the iPad if it logged you out (login below). Two fails = get the MOD.",
  "Turn iPad Wi-Fi, Bluetooth or Airplane Mode on/off where the steps say.",
  "Light remote: batteries, colours, on/off. Swap a dongle, headset or backup iPad.",
  "Check a cable is pushed in, only where the steps say.",
];

export const WHO_GUIDES_NYC =
  "NYC: at the Audio PC, log in with your PIN, quit and reopen Spotify, check Spotify and Windows volume, pause a second app. Nothing else.";

export const WHO_STOP: string[] = [
  "Restarting Plex Media Server, CTRL Engine or any PC.",
  "Anything on the Lighting PC. AnyDesk.",
  "Breakers, LED jumpers, unplugging LED rows, the rack battery.",
  "Unplugging or switching cables, re-pairing Bluetooth receivers, Adelaide AMP 3.",
  "Switching to Bluetooth (last resort). Spotify account problems.",
];

export const WHO_NEVER: string[] = [
  "Factory reset, wipe, reinstall or delete anything.",
  "Log out of or sign in to any account (Spotify, Plex, Apple, Discord). Only exception: logging back in to CTRL Player on the iPad with the CTRL Player login on this page.",
  "Change settings, routing or Q-SYS setup (picking the class input is fine).",
  "Open, close or touch ELM, Q-SYS / Q-SYS Designer, CTRL Player, CTRL Engine or any lighting software on the computers.",
  "Open or move rack gear. Touch the Yorkville AV rack at all.",
  "Power-cycle anything during class. Power off the lighting PC or ELM.",
];

export const WHO_WHEN_DONE =
  "When the guide steps are done, stop. Get the MOD on duty. No MOD on site (e.g. 7 am)? Post in #tech-sos with the message below and run class on the backup. Don't keep trying fixes.";

export const STILL_BROKEN: { title: string; detail: string }[] = [
  {
    title: "Get the MOD / Lead / shift captain on duty",
    detail: "If the class can't start or keep going, it's a true SOS. Stay with your guests; the MOD troubleshoots.",
  },
  {
    title: "No MOD on site? Don't try fixes",
    detail: "Post in #tech-sos with the message below, then run class on the backup shown for your problem.",
  },
  {
    title: "Post in Discord #tech-sos",
    detail: "Copy the message, fill in the blanks, attach a photo or video.",
  },
  {
    title: "Management takes it from there",
    detail:
      "They bring in the specialists: Frank for lighting hardware (LED strips, nodes) and Brett for NYC sound and Q-SYS. Guides don't contact vendors.",
  },
];

export const YORKVILLE_RACK =
  "Yorkville: stay away from the AV rack in the Quarters. MOD steps here are done by AnyDesk.";

export const SOURCES: string[] = [
  "NYC In-Ship Mgmt AV SOP / Troubleshoot (Oct 21, 2026)",
  "Proposed NYC AV Troubleshooting V2 (Oct 26, 2026)",
  "T.O In-Ship Mgmt AV SOP / Troubleshoot (Sept 9, 2026)",
  "T.O AV Troubleshooting guide page (Sept 9, 2026)",
  "NYC SOP and signal-flow training videos; July 28, 2026 AV check-in",
  "Guide permissions set by the Director of Guides (Nov 9, 2026)",
];

export function isLoc(value: string | null): value is Loc {
  return value === "kent" || value === "flatiron" || value === "yorkville" || value === "adelaide";
}

export function locInfo(loc: Loc) {
  return LOCS.find((l) => l.value === loc)!;
}
