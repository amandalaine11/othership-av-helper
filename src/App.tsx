import { useEffect, useRef, useState, type ReactNode } from "react";
import symbol from "./assets/symbol.svg";
import wordmark from "./assets/wordmark.png";
import {
  CTRL_ALT_NOTE,
  CTRL_LOGIN,
  DATA,
  GOOD_TO_KNOW,
  LOCS,
  MOD_BOX_TITLE,
  NO_GUIDE,
  NO_MOD_LEAD,
  QUICK_CONNECT,
  SOURCES,
  STILL_BROKEN,
  STOP_BODY,
  STOP_TITLE,
  SYMPTOMS,
  WHO_GUIDES,
  WHO_GUIDES_NYC,
  WHO_NEVER,
  WHO_STOP,
  WHO_WHEN_DONE,
  YORKVILLE_RACK,
  fallbackFor,
  isLoc,
  locInfo,
  sosTemplate,
  splitSteps,
  type Loc,
  type Step,
  type Sym,
} from "./lib/content";
import { matchSymptoms } from "./lib/search";

const SHIP_KEY = "othership-av-ship";

type Mode = "walk" | "all" | "stop" | "fixed";

function readShip(): Loc | null {
  try {
    const value = localStorage.getItem(SHIP_KEY);
    return isLoc(value) ? value : null;
  } catch {
    return null;
  }
}

function saveShip(loc: Loc) {
  try {
    localStorage.setItem(SHIP_KEY, loc);
  } catch {
    /* private mode */
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.left = "0";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function scrollTo(el: HTMLElement | null) {
  if (!el) return;
  el.scrollIntoView({ behavior: "auto", block: "start" });
}

export default function App() {
  const [loc, setLoc] = useState<Loc | null>(readShip);
  const [query, setQuery] = useState("");
  const [sym, setSym] = useState<Sym | "">("");
  const [mode, setMode] = useState<Mode>("walk");
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const info = loc ? locInfo(loc) : null;
  const entry = loc && sym ? DATA[loc][sym] : undefined;
  const parts = splitSteps(entry);
  const symInfo = SYMPTOMS.find((s) => s.id === sym);
  const matches = matchSymptoms(query);
  const message = info ? sosTemplate(info.long, symInfo?.label ?? "") : "";
  const isNyc = loc === "kent" || loc === "flatiron";

  useEffect(() => {
    if (sym) scrollTo(panelRef.current);
  }, [sym, loc]);

  function chooseShip(next: Loc) {
    setLoc(next);
    saveShip(next);
    setCopied("");
    setStep(0);
    if (sym) {
      const guide = splitSteps(DATA[next][sym]).guide;
      setMode(guide.length ? "walk" : "stop");
    }
  }

  function openProblem(id: Sym, how: "walk" | "all") {
    if (!loc) return;
    setSym(id);
    setStep(0);
    setCopied("");
    const guide = splitSteps(DATA[loc][id]).guide;
    setMode(how === "walk" && guide.length === 0 ? "stop" : how);
  }

  function clearProblem() {
    setSym("");
    setQuery("");
    setStep(0);
    setMode("walk");
    setCopied("");
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  async function onCopy(id: string, text: string) {
    const ok = await copyText(text);
    setCopied(ok ? id : `${id}:no`);
  }

  return (
    <div className={sym ? "in-problem" : undefined}>
      <a className="skip" href="#happening">
        Skip to what’s happening
      </a>
      <header className="top">
        <div className="lockup">
          <img src={symbol} alt="" width={56} height={56} className="mark" />
          <div>
            <h1>
              <img src={wordmark} alt="Othership" className="wordmark" />
              <span className="product">AV Tech Helper</span>
            </h1>
            <span className="spark" aria-hidden="true" />
          </div>
        </div>
      </header>
      <p className="lede">
        For sauna guides. No login. Say what’s happening, then follow each guide step. When those run out, stop and get
        the MOD on duty.
      </p>

      <main>
        <section className={loc ? "block ship-block" : "block"} aria-labelledby="where">
          <h2 id="where" className={loc ? "ship-heading" : undefined}>
            {loc ? "Ship" : "Where are you?"}
          </h2>
          <div className="ships" role="radiogroup" aria-label="Ship">
            {LOCS.map((item) => {
              const on = loc === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={on ? "ship on" : "ship"}
                  data-testid={`ship-${item.value}`}
                  onClick={() => chooseShip(item.value)}
                >
                  <span className="ship-name">{item.label}</span>
                  <span className="ship-long">{item.long}</span>
                </button>
              );
            })}
          </div>
          {info ? <p className="ship-now">Steps for {info.long}. Saved on this device.</p> : <p className="ship-now">Pick your ship. It stays on this iPad or phone.</p>}
        </section>

        {loc && info ? (
          <>
            <section className="block" aria-labelledby="happening">
              <h2 id="happening">What’s happening?</h2>
              <label className="sr" htmlFor="q">
                What’s happening?
              </label>
              <input
                id="q"
                ref={searchRef}
                className="search"
                data-testid="search"
                value={query}
                placeholder="no sound, flicker, crackle"
                enterKeyHint="search"
                autoComplete="off"
                autoCapitalize="off"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && matches[0]) openProblem(matches[0].id, "walk");
                }}
              />
              {query.trim() ? (
                matches.length ? (
                  <div className="matches" role="list">
                    {matches.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        role="listitem"
                        className={sym === m.id ? "match on" : "match"}
                        onClick={() => openProblem(m.id, "walk")}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="hint">No match. Pick from the list below.</p>
                )
              ) : (
                <p className="hint">Type what you see. Every problem is listed under Browse all problems.</p>
              )}
            </section>

            {symInfo ? (
              <article className="problem" ref={panelRef} data-testid="problem">
                <div className="problem-head">
                  <p className="kicker">{info.long}</p>
                  <h2>{symInfo.label}</h2>
                  <button type="button" className="text-btn" onClick={clearProblem}>
                    New problem
                  </button>
                </div>

                {loc === "yorkville" ? <Callout tone="stop">{YORKVILLE_RACK}</Callout> : null}
                {entry?.warn ? <Callout tone="mod">{entry.warn}</Callout> : null}
                {entry?.note && mode !== "all" ? <Callout tone="info">{entry.note}</Callout> : null}

                {mode === "fixed" ? (
                  <div className="fixed" data-testid="fixed">
                    <h3>That fixed it</h3>
                    <p>Carry on with class.</p>
                    <div className="actions">
                      <button type="button" className="btn btn-go" onClick={clearProblem}>
                        New problem
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={() => setMode("walk")}>
                        Back to this step
                      </button>
                    </div>
                  </div>
                ) : null}

                {mode === "walk" && parts.guide.length > 0 ? (
                  <div className="walk">
                    <p className="progress" data-testid="progress">
                      Guide step {step + 1} of {parts.guide.length}
                    </p>
                    <div className="step-card" aria-live="polite">
                      <h3 data-testid="step-title">{parts.guide[step].t}</h3>
                      {parts.guide[step].d ? <p className="detail">{parts.guide[step].d}</p> : null}
                    </div>
                    {sym === "ctrl-logout" && (step === 1 || step === 2) ? (
                      <CtrlCard loc={loc} copied={copied} onCopy={onCopy} />
                    ) : null}
                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn-go"
                        data-testid="fixed-btn"
                        onClick={() => setMode("fixed")}
                      >
                        That fixed it
                      </button>
                      <button
                        type="button"
                        className="btn btn-next"
                        data-testid="next-btn"
                        onClick={() => {
                          if (step + 1 >= parts.guide.length) setMode("stop");
                          else setStep(step + 1);
                        }}
                      >
                        Still broken, next step
                      </button>
                    </div>
                    <button type="button" className="text-btn" onClick={() => setMode("all")}>
                      See every step
                    </button>
                  </div>
                ) : null}

                {mode === "all" ? (
                  <div className="all">
                    {parts.guide.length ? (
                      <button type="button" className="btn btn-next" onClick={() => { setStep(0); setMode("walk"); }}>
                        Walk me through it
                      </button>
                    ) : null}
                    <div className="box guide">
                      <h3>Guide steps</h3>
                      {parts.guide.length ? <StepList steps={parts.guide} /> : <p>{NO_GUIDE}</p>}
                    </div>
                    <div className="box stop" data-testid="stop">
                      <h3>{STOP_TITLE}</h3>
                      <p>{STOP_BODY}</p>
                    </div>
                    {parts.mod.length ? (
                      <div className="box mod">
                        <h3>{MOD_BOX_TITLE}</h3>
                        <StepList steps={parts.mod} badge />
                      </div>
                    ) : null}
                    <Callout tone="info" lead={NO_MOD_LEAD}>
                      {fallbackFor(loc, entry)} Copy the message below.
                    </Callout>
                    {entry?.video ? (
                      <p className="video">
                        Video:{" "}
                        <a href={entry.video.href} target="_blank" rel="noreferrer">
                          {entry.video.label}
                        </a>
                      </p>
                    ) : null}
                    {entry?.note ? <Callout tone="info">{entry.note}</Callout> : null}
                  </div>
                ) : null}

                {mode === "stop" ? (
                  <div data-testid="stop">
                    {parts.guide.length === 0 ? (
                      <div className="box guide">
                        <h3>Guide steps</h3>
                        <p>{NO_GUIDE}</p>
                      </div>
                    ) : null}
                    <div className="box stop">
                      <h3>{STOP_TITLE}</h3>
                      <p>{STOP_BODY}</p>
                    </div>
                    {parts.mod.length ? (
                      <div className="box mod">
                        <h3>{MOD_BOX_TITLE}</h3>
                        <StepList steps={parts.mod} badge />
                      </div>
                    ) : null}
                    <Callout tone="info" lead={NO_MOD_LEAD}>
                      {fallbackFor(loc, entry)} Copy the message below.
                    </Callout>
                    {entry?.video ? (
                      <p className="video">
                        Video:{" "}
                        <a href={entry.video.href} target="_blank" rel="noreferrer">
                          {entry.video.label}
                        </a>
                      </p>
                    ) : null}
                    <StillBroken message={message} copied={copied} onCopy={onCopy} />
                    <button type="button" className="text-btn" onClick={() => { setStep(0); setMode(parts.guide.length ? "walk" : "all"); }}>
                      {parts.guide.length ? "Back to guide steps" : "See the full page"}
                    </button>
                  </div>
                ) : null}
              </article>
            ) : null}

            <section className="block" id="who">
              <h2>Who does what</h2>
              <div className="box guide">
                <h3>Guides can</h3>
                <ul>
                  {WHO_GUIDES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {isNyc ? <li>{WHO_GUIDES_NYC}</li> : null}
                </ul>
              </div>
              <div className="box mod">
                <h3>Stop: get the MOD on duty</h3>
                <ul>
                  {WHO_STOP.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="box stop">
                <h3>Never</h3>
                <ul>
                  {WHO_NEVER.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <Callout tone="info" lead="When the guide steps run out">
                {WHO_WHEN_DONE}
              </Callout>
            </section>

            <section className="block" id="browse">
              <h2>Browse all problems</h2>
              <div className="matches">
                {SYMPTOMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={sym === item.id ? "match on" : "match"}
                    onClick={() => openProblem(item.id, "all")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>

            <details className="fold">
              <summary>Good to know — {info.label}</summary>
              <p className="fold-note">Short tips from the SOPs, training videos and AV check-ins.</p>
              {isNyc ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Class</th>
                        <th>App on the iPad</th>
                        <th>Q-SYS input</th>
                      </tr>
                    </thead>
                    <tbody>
                      {QUICK_CONNECT.map((row) => (
                        <tr key={row[0]}>
                          <td data-label="Class">{row[0]}</td>
                          <td data-label="App on the iPad">{row[1]}</td>
                          <td data-label="Q-SYS input">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              <ul className="tips">
                {GOOD_TO_KNOW[loc].map((tip) => (
                  <li key={tip.t}>
                    {tip.t}
                    {tip.mod ? <Badge /> : null}
                  </li>
                ))}
              </ul>
            </details>

            {CTRL_LOGIN[loc] ? (
              <details className="fold" id="ctrl-login">
                <summary>CTRL Player login — {info.label}</summary>
                <p className="fold-note">Only for logging CTRL Player back in on the iPad.</p>
                <CtrlCard loc={loc} copied={copied} onCopy={onCopy} />
              </details>
            ) : null}

            {mode !== "stop" ? (
              <section className="block" id="sos">
                <StillBroken message={message} copied={copied} onCopy={onCopy} />
              </section>
            ) : null}
          </>
        ) : null}

        <footer>
          <p>Nothing you type is sent anywhere. Your ship is saved on this device only.</p>
          <ul>
            {SOURCES.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </footer>
      </main>
    </div>
  );
}

function Callout({
  tone,
  lead,
  children,
}: {
  tone: "info" | "mod" | "stop";
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout ${tone}`}>
      {lead ? <p className="lead">{lead}</p> : null}
      <p>{children}</p>
    </div>
  );
}

function Badge() {
  return <span className="badge">MOD only</span>;
}

function StepList({ steps, badge = false }: { steps: Step[]; badge?: boolean }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={`${s.t}-${i}`}>
          <span className="n">{i + 1}</span>
          <div>
            <p className="t">
              {s.t}
              {badge ? <Badge /> : null}
            </p>
            {s.d ? <p className="d">{s.d}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function CtrlCard({
  loc,
  copied,
  onCopy,
}: {
  loc: Loc;
  copied: string;
  onCopy: (id: string, text: string) => void;
}) {
  const login = CTRL_LOGIN[loc];
  if (!login) return null;
  const rows = [
    ["Engine address", login.addr, "addr"],
    ["Username", login.user, "user"],
    ["Password", login.pw, "pw"],
  ] as const;
  return (
    <div className="ctrl">
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Enter</th>
            <th>
              <span className="sr">Copy</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([field, value, id]) => (
            <tr key={id}>
              <td data-label="Field">{field}</td>
              <td data-label="Enter">
                <span className="secret">{value}</span>
              </td>
              <td>
                <button type="button" className="btn btn-ghost small" onClick={() => onCopy(id, value)}>
                  {copied === id ? "Copied" : "Copy"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="alt-user">{CTRL_ALT_NOTE}</p>
    </div>
  );
}

function StillBroken({
  message,
  copied,
  onCopy,
}: {
  message: string;
  copied: string;
  onCopy: (id: string, text: string) => void;
}) {
  return (
    <div className="sos">
      <h2>Still broken?</h2>
      <ol className="steps">
        {STILL_BROKEN.map((item, i) => (
          <li key={item.title}>
            <span className="n">{i + 1}</span>
            <div>
              <p className="t">{item.title}</p>
              <p className="d">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <pre data-testid="sos" className="sos-box">
        {message}
      </pre>
      <button type="button" className="btn btn-next" data-testid="copy-sos" onClick={() => onCopy("sos", message)}>
        {copied === "sos" ? "Copied" : "Copy message"}
      </button>
      {copied === "sos:no" ? <p className="hint">Copy didn’t work here. Tap the message box to select it, then copy.</p> : null}
    </div>
  );
}
