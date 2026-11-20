import { useEffect, useRef, useState, type ReactNode } from "react";
import symbol from "./assets/symbol.svg";
import wordmark from "./assets/wordmark.png";
import {
  CTRL_ALT_NOTE,
  CTRL_LOGIN,
  DATA,
  GOOD_TO_KNOW,
  LOCS,
  NO_GUIDE,
  QUICK_CONNECT,
  SOURCES,
  SYMPTOMS,
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

type Mode = "walk" | "stop" | "fixed";

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
  const [tried, setTried] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const info = loc ? locInfo(loc) : null;
  const entry = loc && sym ? DATA[loc][sym] : undefined;
  const parts = splitSteps(entry);
  const symInfo = SYMPTOMS.find((s) => s.id === sym);
  const matches = matchSymptoms(query);
  const message = info && symInfo ? sosTemplate(info.long, symInfo.label, tried) : "";
  const isNyc = loc === "kent" || loc === "flatiron";

  useEffect(() => {
    if (sym) scrollTo(panelRef.current);
  }, [sym, loc]);

  function chooseShip(next: Loc) {
    setLoc(next);
    saveShip(next);
    setCopied("");
    setStep(0);
    setTried([]);
    if (sym) {
      const guide = splitSteps(DATA[next][sym]).guide;
      setMode(guide.length ? "walk" : "stop");
    }
  }

  function openProblem(id: Sym) {
    if (!loc) return;
    setSym(id);
    setStep(0);
    setTried([]);
    setCopied("");
    const guide = splitSteps(DATA[loc][id]).guide;
    setMode(guide.length === 0 ? "stop" : "walk");
  }

  function clearProblem() {
    setSym("");
    setQuery("");
    setStep(0);
    setTried([]);
    setMode("walk");
    setCopied("");
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  function stillBroken() {
    const current = parts.guide[step];
    if (current) {
      setTried((prev) => (prev.includes(current.t) ? prev : [...prev, current.t]));
    }
    if (step + 1 >= parts.guide.length) setMode("stop");
    else setStep(step + 1);
  }

  async function onCopy(id: string, text: string) {
    const ok = await copyText(text);
    setCopied(ok ? id : `${id}:no`);
  }

  return (
    <div className={sym ? "page in-problem" : "page"}>
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
        For sauna guides. No login. Pick your ship, say what’s happening, then follow the steps in order.
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
                  if (e.key === "Enter" && matches[0]) openProblem(matches[0].id);
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
                        onClick={() => openProblem(m.id)}
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
                {entry?.note ? <Callout tone="info">{entry.note}</Callout> : null}

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
                    <h3 className="section-label">Try these, in order</h3>
                    <p className="progress" data-testid="progress">
                      Step {step + 1} of {parts.guide.length}
                    </p>
                    <div className="step-card" aria-live="polite">
                      <h3 data-testid="step-title">{parts.guide[step].t}</h3>
                      <BulletList items={parts.guide[step].bullets} />
                    </div>
                    {sym === "ctrl-logout" && /engine address|username/i.test(parts.guide[step].t) ? (
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
                      <button type="button" className="btn btn-next" data-testid="next-btn" onClick={stillBroken}>
                        Still broken
                      </button>
                    </div>
                  </div>
                ) : null}

                {mode === "stop" ? (
                  <div data-testid="stop">
                    <h3 className="section-label">Still not fixed? Next step</h3>
                    {parts.guide.length === 0 ? <p>{NO_GUIDE}</p> : null}
                    <div className="choice choice-fast">
                      <p className="choice-kicker">Fastest</p>
                      <p className="choice-title">MOD on site? Go get them now</p>
                    </div>
                    <div className="choice choice-sos">
                      <p className="choice-title">No MOD on site, or can't find them?</p>
                      <button
                        type="button"
                        className="btn btn-next"
                        data-testid="copy-sos"
                        onClick={() => onCopy("sos", message)}
                      >
                        {copied === "sos" ? "Copied" : "Copy message"}
                      </button>
                      <p className="choice-next">Paste it in #tech-sos on Discord and send.</p>
                      <p>{fallbackFor(loc, entry)}</p>
                      <pre data-testid="sos" className="sos-box">
                        {message}
                      </pre>
                      {copied === "sos:no" ? (
                        <p className="hint">Copy didn’t work here. Tap the message box to select it, then copy.</p>
                      ) : null}
                    </div>
                    {parts.guide.length ? (
                      <button
                        type="button"
                        className="text-btn"
                        onClick={() => {
                          setStep(parts.guide.length - 1);
                          setMode("walk");
                        }}
                      >
                        Back to the steps
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {parts.mod.length ? (
                  <details className="fold mod-fold" data-testid="mod-fold">
                    <summary>For the MOD</summary>
                    <p className="fold-note">These are for the MOD on duty. Guides stop at the steps above.</p>
                    <StepList steps={parts.mod} />
                    {entry?.video ? (
                      <p className="video">
                        Video:{" "}
                        <a href={entry.video.href} target="_blank" rel="noreferrer">
                          {entry.video.label}
                        </a>
                      </p>
                    ) : null}
                  </details>
                ) : null}
              </article>
            ) : null}

            <section className="block" id="browse">
              <h2>Browse all problems</h2>
              <div className="matches">
                {SYMPTOMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={sym === item.id ? "match on" : "match"}
                    onClick={() => openProblem(item.id)}
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
                    <p className="t">
                      {tip.t}
                      {tip.mod ? <Badge /> : null}
                    </p>
                    <BulletList items={tip.bullets} />
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="points">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={`${s.t}-${i}`}>
          <span className="n">{i + 1}</span>
          <div>
            <p className="t">{s.t}</p>
            <BulletList items={s.bullets} />
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

