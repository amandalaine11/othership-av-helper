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

export type Step = { t: string; d?: string; mod?: boolean };
export type Entry = {
  steps?: Step[];
  note?: string;
  warn?: string;
  fallback?: string;
  video?: { label: string; href: string };
};
export type Tip = { t: string; mod?: boolean };

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
  { t: "Mute switch on top of the pack (near the antenna) is off" },
  { t: "Put in fresh batteries" },
  { t: "No pinched or loose cords in the mic pouch" },
  { t: "Zone isn't muted in Q-SYS", d: "Muted shows red. It must be green." },
  {
    t: "Mouthpiece faces your mouth",
    d: "Take off the foam cover (poof) and point it at your mouth. Facing away = very quiet or nothing.",
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
  { t: "Open CTRL Player on the iPad" },
  {
    t: "Asked for the Engine? Enter this ship's engine address",
    d: "It's in “CTRL Player login” on this page (tap to open).",
  },
  {
    t: "Enter the username and password and log in",
    d: "From “CTRL Player login”. If it fails, try the other username spelling shown there.",
  },
  { t: "Pick the scene or class again" },
  {
    t: "Login failed twice? Stop — get the MOD",
    d: "Don't keep trying. Don't touch the computer.",
  },
  { t: "Check CTRL Engine is running on the Lighting PC and reconnect the iPad", mod: true },
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
  { t: "The iPads are remotes. The music plays from the Sound PC in the back, so both need to be ready." },
  { t: "One class, one app. Never run Spotify and PlexAmp together." },
  { t: "We no longer use AirPlay. Bluetooth is a last resort the MOD switches to." },
  { t: "Most fixes are a volume or zone check: iPad buttons, app slider, Q-SYS master, zone green." },
  { t: "Bring volume up gradually when guests are in the room." },
  { t: "Anything you change in CTRL Player shows in the sauna straight away." },
  { t: "Scan the QR code in the AV cabinet for these steps before posting an SOS." },
  { t: "In #tech-sos be very specific: ship, room, mic number (1 or 2), class time, video." },
  { t: "Keep a spare light remote and spare mic gear in the AV bin. Tell the MOD when spares run low." },
  { t: "If an iPad dies, the MOD can run class from the rack: desktop CTRL Player, Q-SYS Viewer and PlexAmp.", mod: true },
  { t: "Restarting CTRL Engine doesn't turn the lights off.", mod: true },
];

export const GOOD_TO_KNOW: Record<Loc, Tip[]> = {
  kent: [
    ...NYC_TIPS,
    { t: "Known at Kent: Q-SYS on the iPad can jump back to the dashboard after a few seconds. Report it." },
    { t: "Known at Kent: mics crackle more often here. Report it each time." },
  ],
  flatiron: [
    ...NYC_TIPS,
    { t: "Known at Flatiron: the first LED strip on each segment can flicker (worn joint). Video it and report the strip." },
  ],
  yorkville: [
    { t: "Sauna music: iPad → Bluetooth receiver “B06+” → Q-SYS. Lights: CTRL Player on the iPad over the LXWL Wi-Fi." },
    { t: "Only one iPad plays Spotify at a time. Music jumping? Cold Space iPad Wi-Fi and Bluetooth off." },
    { t: "Keep the sauna iPad near the sauna; Bluetooth cuts out with distance." },
    { t: "After DJ nights, cables at the sauna control panel can be unplugged. Check them first." },
    { t: "DJ speaker: behind the curtain near the change rooms, bottom shelf. Runs on battery." },
    { t: "Never go near the AV rack in the Quarters (by the sink)." },
    { t: "Known: mic feedback keeps coming back. Report it; don't keep swapping headsets." },
    { t: FIRE },
    { t: "The rack's one screen switches between the sound and lighting PCs. While the rack is unsafe, use AnyDesk only.", mod: true },
  ],
  adelaide: [
    { t: "Adelaide is low-tech: iPad → Bluetooth “SAUNA BT” (or wired), volume knobs, lights on a remote." },
    { t: "Using the mic in the Commons for intros is mandatory. Quarters volume near max, one mic only, Commons source SAUNA-IN." },
    { t: "Reception iPad stays on Airplane Mode with Wi-Fi off so it doesn't grab the music." },
    { t: "The light remote can overheat. Let it cool. There should be a spare." },
    { t: "DJ speaker is in The Crank. Runs on battery." },
    { t: FIRE },
    { t: "Spares to keep on hand: 2 mic packs, 2 headsets, 1 belt pack, 1 aux cord, 1 light remote.", mod: true },
  ],
};

function nyc(site: "kent" | "flatiron"): Partial<Record<Sym, Entry>> {
  const pc = site === "kent" ? "OTHERSHIP-WMB" : "OTHERSHIP-NYC";
  const toAudioPc =
    site === "flatiron"
      ? "Pull out the keyboard. On the small black box the blue light should be on the left (AUDIO); if not, press its round button. Then press the “Audio PC” button above the keyboard. Log in with the PIN you were given."
      : "Pull out the keyboard and wake the screen. Q-SYS icon in the bottom bar = Audio PC (the one you want). CTRL icon = Lighting PC: press the little black button on the switch box to change over. Log in with the PIN you were given.";
  return {
    "no-sound": {
      steps: [
        { t: "iPad is on the Othership AV Wi-Fi" },
        {
          t: "Use the right app",
          d: "Ordinary class: Spotify. Mastered class: PlexAmp, start the class's INTRO track. Breathwork: PlexAmp, BREATH WORK album.",
        },
        {
          t: `Connect the app to ${pc}`,
          d: `Spotify: tap the device button, pick ${pc}. PlexAmp: tap “connect” at the bottom right of the player, pick ${pc}.`,
        },
        {
          t: "Q-SYS input is SPOTIFY",
          d: "It's the last option, so scroll down. Same input for mastered classes. Only pick the input; don't change anything else in Q-SYS.",
        },
        { t: "Close the app on the iPad (swipe up), reopen it, connect again" },
        {
          t: "Go to the Audio PC at the rack",
          d: toAudioPc + " Only touch Spotify and the volume. Don't close any other windows.",
        },
        {
          t: "Quit and reopen Spotify on the Audio PC",
          d: "Check Spotify's volume is all the way up, it says “Playing from Computer”, and the Windows volume isn't muted.",
        },
        { t: `Back on the iPad: close Spotify, reopen, connect to ${pc}` },
        {
          t: "PlexAmp or Plex Media Server isn't open on the Audio PC",
          d: "Open or restart them. Don't close Q-SYS or anything else.",
          mod: true,
        },
        {
          t: "PC restarted, stuck at the login screen, or won't respond",
          d: "Handle the PC at the rack or by AnyDesk.",
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
          d: "Use the physical buttons. If Q-SYS shows RECEPTION INPUT, turn up the front desk iPad too.",
        },
        {
          t: "Turn the app volume up",
          d: "Spotify all the way up. Reception input: Soundtrack Your Brand sliders all the way up.",
        },
        {
          t: "Q-SYS master volume fully up",
          d: "Q-SYS → Dashboard → Main/All Sources → slide fully up. Even a small dip makes it quiet.",
        },
        { t: "Zone isn't muted", d: "Red = muted. It must be green." },
        {
          t: "On the Audio PC: Spotify volume all the way up, Windows volume not muted",
          d: "Log in with your PIN. Only touch Spotify and the volume.",
        },
        {
          t: "Reception input: check the cables under the front desk are pushed in",
          d: "The cables from the iPad into the wall.",
        },
        { t: "Unplug and replug the reception cables under the desk", mod: true },
      ],
      note: "Bring volume up gradually if guests are in the room.",
      fallback: NYC_DEFAULT_FALLBACK,
    },
    both: {
      steps: [
        {
          t: "On the iPad, pause the app you don't want",
          d: "One class = one app. Spotify for ordinary classes, PlexAmp for mastered.",
        },
        {
          t: "Still both? Pause it on the Audio PC",
          d: "Log in with your PIN, find the app that shouldn't be playing and pause it. Don't close anything.",
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    pausing: {
      steps: [
        { t: "Clear the Spotify queue and restart the track" },
        {
          t: "Only one iPad can play Spotify",
          d: "On the Cold Space and Reception iPads, swipe up to close Spotify.",
        },
        { t: "Reception iPad plays Soundtrack Your Brand, not Spotify" },
      ],
      note: "Music stopped after the back computer restarted? Use “No music / app won't connect”.",
      fallback: NYC_SOUND_FALLBACK,
    },
    zone: {
      steps: [
        {
          t: "In Q-SYS, check that area isn't muted",
          d: "Main screen → the area (e.g. COMMONS) → far-right slider must be green.",
        },
        {
          t: "Commons or reception silent? Check the wall knob",
          d: "Blue flashing light under the knob = muted. Push the knob in to unmute. Turn it for volume.",
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    "av-class": {
      steps: [
        { t: "Q-SYS input is OS CLASS" },
        { t: "Start the class from CTRL Player on the iPad" },
        { t: "Unmute the Lighting (LX) PC", d: "Click the speaker icon in the bottom bar and unmute.", mod: true },
        {
          t: "Unmute ELM",
          d: "Open the per-app volume mixer, scroll to the ELM icon, click it if muted. Don't click other ELM slots — every click is live.",
          mod: true,
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    "mic-none": {
      steps: [{ t: "Mic pack is on", d: "Open the pack, flip open the battery area, hold the first button." }, ...MIC_BASICS],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    "mic-crackle": {
      steps: [
        { t: "Note which mic (#1 or #2) and where it happens", d: "Sauna only, or everywhere?" },
        { t: "Check the headset wire for pinch marks" },
        {
          t: "Swap the headset",
          d: "Plug a spare headset from the AV bin into the same pack. Test in the sauna for 1–2 min. Fixed? Label the old one “broken (cutting in and out)” and put it in the AV bin.",
        },
        {
          t: "Still cutting out? Swap the mic pack",
          d: "Spare pack with the same number (1 or 2), add batteries, plug in the original headset, test in the sauna. Fixed? Label the old pack broken.",
          mod: true,
        },
        { t: "Post in #tech-sos that it's been replaced", mod: true },
      ],
      note: site === "kent" ? "Known issue at Kent: mics crackle more often here. Still post it so it's tracked." : undefined,
      fallback: NYC_DEFAULT_FALLBACK,
    },
    wired: {
      steps: [
        { t: "Try the other iPad", d: "Water can stop one working." },
        { t: "Swap the dongle", d: "Spares are in the cold cabinet or the AV bin in the back." },
        { t: "Zone isn't muted", d: "Red = muted. Must be green." },
      ],
      fallback: NYC_SOUND_FALLBACK,
    },
    bluetooth: {
      warn: "Bluetooth is the LAST RESORT, and the MOD decides to use it. Normal classes play from the back computer (see “No music / app won't connect”).",
      steps: [
        {
          t: "Check the Bluetooth receiver in the sauna cabinet is plugged in",
          d: "Into power and into the Sauna Cab audio input. Just check it's seated.",
        },
        { t: "On the Lighting / Class iPad: Settings → Bluetooth → is “Sauna BT” connected?" },
        {
          t: "Put the receiver in pairing mode and connect",
          d: "Hold the centre button until it flashes red and blue, then tap “Sauna BT” on the iPad.",
          mod: true,
        },
        {
          t: "Switch the Q-SYS input to Sauna Cab and play",
          d: "Mastered class: PlexAmp → class → Play. Breathwork: Breathwork app → output icon (top left) → Sauna BT → Play.",
          mod: true,
        },
        { t: "Still nothing? Restart pairing and reconnect", mod: true },
      ],
      fallback: NYC_SOUND_FALLBACK,
    },
    "light-app": {
      steps: [
        { t: "iPad is on the Othership AV Wi-Fi" },
        { t: "Fully close CTRL Player on the iPad (swipe up) and reopen it" },
        { t: "One iPad won't work? Run the class from CTRL Player on the desktop", mod: true },
        {
          t: "Check CTRL Engine is running on the Lighting PC",
          d: "System tray. Not running? Open it. Running? Restart in Ctrl Engine Manager (won't turn the lights off).",
          mod: true,
        },
        {
          t: "Reopen CTRL Player and search for the Engine",
          d: "Add it manually if needed (details in the management SOP).",
          mod: true,
        },
        { t: "Last fallback: control the lights by hand in ELM", d: "Trained staff only. Every click is live.", mod: true },
      ],
      fallback: "Leave the lights as they are, run class, and post in #tech-sos. Don't touch the computer.",
    },
    "ctrl-logout": {
      steps: CTRL_LOGOUT_STEPS,
      fallback: "Leave the lights as they are, run class, and post in #tech-sos. Don't touch the computer.",
    },
    flicker: {
      steps: [
        { t: "Take a video with a wide pan of the whole sauna" },
        { t: "Find the strip on the sauna strip chart (e.g. E2, D2)", d: "Chart is in the management SOP.", mod: true },
        { t: "Power cycle that strip at the breaker", d: "Off, wait 10 seconds, on. Not during class.", mod: true },
        {
          t: "Only one segment? Bridge it with the LED jumper wire",
          d: "Unplug the strip (twist and push) and connect the jumper from the AV box.",
          mod: true,
        },
        { t: "A few segments or a whole row? Unplug both ends of the row", d: "For example A1 and A10.", mod: true },
        {
          t: "Post in #tech-sos with the site, strip and video",
          d: `For example “${site === "kent" ? "KENT" : "FLTRN"} – E2”. Management books the lighting tech.`,
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
        { t: "Open the back of the ORB light remote and replace the batteries" },
        {
          t: "Set the classic sunset look",
          d: `Press ALL → slide to a dark red → press ${site === "kent" ? "3" : "4"} → slide to orange.`,
        },
      ],
      fallback: NYC_DEFAULT_FALLBACK,
    },
    ups: {
      steps: [
        {
          t: "Run the UPS self test",
          d: "UPS at the bottom right of the AV rack: Enter → “Test & Diags” → Enter → “UPS Self Test” → Enter → “Yes” → Enter.",
          mod: true,
        },
        { t: "Test failed? Try once more, then post in #tech-sos", mod: true },
      ],
      fallback: "Leave it beeping and post in #tech-sos. Don't unplug anything.",
    },
  };
}

const YK_BT: Step[] = [
  { t: "iPad is on the LXWL Wi-Fi" },
  { t: "iPad Bluetooth is connected to the receiver “B06+”" },
  { t: "Q-SYS master volume fully up", d: "Q-SYS → Dashboard → Main/All Sources → slide fully up." },
  {
    t: "Check the aux cord and cables at the sauna control panel are pushed in",
    d: "They can come loose after DJ nights. Don't touch the AV rack.",
  },
  { t: "Try the Cold Space iPad as a backup" },
];

const YORKVILLE: Partial<Record<Sym, Entry>> = {
  "no-sound": { steps: YK_BT, fallback: TO_SOUND_FALLBACK },
  bluetooth: {
    steps: [
      ...YK_BT,
      {
        t: "Reset the Bluetooth receiver",
        d: "Shown in the “How to Reset Bluetooth” video in the Toronto SOP. Not if it means touching the AV rack.",
        mod: true,
      },
    ],
    fallback: TO_SOUND_FALLBACK,
    video: { label: "How to Reset Bluetooth (Toronto in-ship SOP)", href: TO_SOP },
  },
  quiet: {
    steps: [
      { t: "Turn the iPad up with its side buttons" },
      { t: "Q-SYS master volume fully up", d: "Even a small dip on the slider makes it quiet." },
      { t: "Using Reception Input? Turn up the front desk iPad too" },
    ],
    note: "Bring volume up gradually if guests are in the room.",
    fallback: TO_SOUND_FALLBACK,
  },
  zone: {
    steps: [
      { t: "Go to the Commons", d: "Facing the fireplace, find the black knob on the left wall." },
      { t: "Showing blue / mute? Press the knob once to unmute" },
      { t: "Turn the knob up if the volume is low" },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  pausing: {
    steps: [
      { t: "Turn Wi-Fi and Bluetooth OFF on the Cold Space iPad", d: "It can interfere with the sauna iPad." },
      { t: "Reception iPad: Airplane Mode on, Wi-Fi off" },
      { t: "Keep the sauna iPad close to the sauna", d: "Bluetooth can cut out if you walk away with it." },
      { t: "Clear the Spotify queue and restart the track" },
      { t: "Only one iPad plays Spotify", d: "Make sure the Cold Space iPad isn't playing too." },
      { t: "Spotify isn't on the Yorkville account?", d: "Don't log in or out. The MOD sorts the account.", mod: true },
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
      { t: "Fully close CTRL Player on the iPad (swipe up) and reopen it" },
      { t: "iPad is on the LXWL Wi-Fi" },
      { t: "iPad hot or wet? Let it cool and use the Cold Space iPad for now" },
      {
        t: "By AnyDesk, check CTRL Engine is running on the Lighting PC",
        d: "Not running? Open it. Running? Restart in Ctrl Engine Manager. Not at the rack while it's unsafe.",
        mod: true,
      },
      {
        t: "Reopen CTRL Player and search for the Engine",
        d: "Add it manually if needed (details in the management SOP).",
        mod: true,
      },
      {
        t: "Last fallback: control the lights by hand in ELM by AnyDesk",
        d: "Trained staff only. Every click is live.",
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
      { t: "Use the candles, placed safely on the benches, so guests can see" },
      { t: "Check the breaker room for a blown fuse and reset it", mod: true },
      {
        t: "Check the lighting computer in the Quarters is on",
        d: "Check by AnyDesk. Don't touch the rack; if the computer is off, report it.",
        mod: true,
      },
    ],
    fallback: CANDLES,
  },
  frozen: {
    steps: [
      { t: "Fully close and reopen the lighting app on the iPad" },
      {
        t: "By AnyDesk on the Lighting PC: open CTRL Engine Manager, then Enttec LED Mapper",
        d: "The SOP does this at the keyboard by the sink. Not while the rack is unsafe.",
        mod: true,
      },
    ],
    fallback: "Run class on the colour it's stuck on and post in #tech-sos.",
  },
  backup: {
    steps: [
      { t: "Use musical instruments" },
      {
        t: "Need music? Grab one DJ speaker",
        d: "Behind the curtain near the change rooms, bottom shelf. Runs on battery. In the sauna you only need 1 speaker, no stands.",
      },
      {
        t: "Pair it",
        d: "Press power once. Hold the Bluetooth button 4 sec. On your iPad/phone pick “EXM-Mobile-12”. Or use the aux cord.",
      },
      { t: "Call Christian K and post in #tech-sos" },
    ],
    note: FIRE,
    fallback: "These are the backups. Lights off too? " + CANDLES,
  },
};

const ADEL_BT: Step[] = [
  {
    t: "Bluetooth receiver light is on",
    d: "Blinking blue, or blue/red. No light? Check the black USB cable is pushed into the wall and the device.",
  },
  { t: "iPad Bluetooth shows “SAUNA BT” connected", d: "If it's listed but not connected, tap it." },
  {
    t: "Spotify is playing to SAUNA BT",
    d: "Spotify → device button (bottom left) → Bluetooth and AirPlay → SAUNA BT.",
  },
  { t: "Braided cords are pushed in" },
  { t: "Receiver has no light even with the cable in", d: "Hold the centre button 3–5 sec to turn it on.", mod: true },
  {
    t: "Re-pair the receiver",
    d: "Hold the centre button 5 sec until it flashes red/blue, pick SAUNA BT on the iPad. Light should blink blue.",
    mod: true,
  },
  {
    t: "Switch to wired",
    d: "Unplug the braided cords, plug in the black ones. Bluetooth OFF on the iPad. Spotify device → “This iPad”.",
    mod: true,
  },
];

const ADELAIDE: Partial<Record<Sym, Entry>> = {
  "no-sound": { steps: ADEL_BT, fallback: TO_SOUND_FALLBACK },
  bluetooth: { steps: ADEL_BT, fallback: TO_SOUND_FALLBACK },
  wired: {
    steps: [
      { t: "Sauna iPad is on Wi-Fi" },
      { t: "Reception iPad: Airplane Mode on, Wi-Fi off", d: "Stops it fighting for the music." },
      { t: "Check the volume levels on the master control in the Quarters" },
      { t: "Try a new dongle" },
      { t: "Try the iPad from the Quarters" },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  quiet: {
    steps: [
      { t: "Turn the iPad up with its side buttons" },
      { t: "Master volume in the Staff Room is at the right level" },
      { t: "Volume panel outside the sauna isn't turned all the way down" },
    ],
    note: "Bring volume up gradually if guests are in the room.",
    fallback: TO_SOUND_FALLBACK,
  },
  pausing: {
    steps: [
      { t: "Reception iPad: Airplane Mode on, Wi-Fi off" },
      { t: "Clear the Spotify queue and restart the playlist" },
      { t: "Try a new dongle" },
      { t: "Spotify isn't on the Adelaide account?", d: "Don't log in or out. The MOD sorts the account.", mod: true },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  zone: {
    steps: [
      {
        t: "Sauna works but Commons doesn't? Look at AMP 3 in the Commons",
        d: "Is it flashing red? Don't unplug it yourself.",
      },
      {
        t: "AMP 3 flashing red: reset it",
        d: "Unplug its power cord from the back for 10 sec, plug it back in. Not during class.",
        mod: true,
      },
    ],
    fallback: TO_SOUND_FALLBACK,
  },
  "mic-none": {
    steps: [
      { t: "Mute switch on top of the pack (near the antenna) is off" },
      { t: "Put in fresh batteries" },
      { t: "No pinched cords in the mic pouch" },
      {
        t: "Mic in the Commons? Check these too",
        d: "Quarters volume close to max. Only one mic on at a time. Commons source is SAUNA-IN.",
      },
    ],
    fallback: "Run class without the mic and post in #tech-sos.",
  },
  remote: {
    steps: [
      { t: "Remote may have overheated", d: "Let it cool and try again." },
      { t: "Turn the lights off and on again with the remote" },
      { t: "Swap the remote batteries" },
    ],
    fallback: "Run class with the lights as they are and post in #tech-sos.",
  },
  "lights-off": {
    steps: [
      { t: "Check the light switch in the Staff Room is on", d: "Someone may have turned it off." },
      { t: "Swap the remote batteries" },
    ],
    fallback: CANDLES,
  },
  flicker: {
    steps: [
      { t: "Turn off MODE / effects on the remote and pick one solid colour" },
      { t: "Turn the lights off and on again with the remote" },
    ],
    fallback: "Pick one solid colour and run class. Post in #tech-sos.",
  },
  frozen: {
    steps: [
      { t: "Turn off MODE / effects on the remote and pick one solid colour" },
      { t: "Turn the lights off and on again with the remote" },
      { t: "Remote not responding? Let it cool and swap the batteries" },
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
      { t: "Use musical instruments" },
      { t: "Need music? Grab a DJ speaker from The Crank", d: "Runs on battery." },
      {
        t: "Pair it",
        d: "Press power once. Hold the Bluetooth button 4 sec. On your iPad/phone pick “EXM-Mobile-12”. Or use the aux cord.",
      },
      { t: "Post in #tech-sos" },
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

export function sosTemplate(long: string, problem: string): string {
  return [
    `TECH SOS – ${long}`,
    `Room / sauna: `,
    `Class time: `,
    `Problem: ${problem}`,
    `What I tried: `,
    `MOD on site? yes / no`,
    `Photo / video: attached`,
    `Name: `,
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
