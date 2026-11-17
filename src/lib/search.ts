import { SYMPTOMS, type Sym } from "./content";

function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[] = new Array(cols);
  for (let j = 0; j < cols; j++) dp[j] = j;
  for (let i = 1; i < rows; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j < cols; j++) {
      const temp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = temp;
    }
  }
  return dp[cols - 1];
}

function tokens(value: string): string[] {
  return value.toLowerCase().split(/[^a-z0-9+']+/).filter((w) => w.length >= 5);
}

/** Same scoring as the approved helper, plus a one-letter typo match on longer words. */
export function score(q: string, keys: string[], label: string): number {
  const text = q.toLowerCase().trim().replace(/’/g, "'");
  if (!text) return 0;
  const words = text.split(/[^a-z0-9+']+/).filter((w) => w.length >= 3);
  let s = 0;
  for (const k of keys) {
    if (text.includes(k)) s += 3 + k.length;
    else if (words.some((w) => k.includes(w))) s += 1;
    else if (
      words.some((w) => w.length >= 5 && tokens(k).some((kt) => editDistance(w, kt) === 1))
    ) {
      s += 2;
    }
  }
  const l = label.toLowerCase();
  for (const w of words) if (l.includes(w)) s += 1;
  return s;
}

export function matchSymptoms(query: string): { id: Sym; label: string; keys: string[] }[] {
  return SYMPTOMS.map((s) => ({ s, v: score(query, s.keys, s.label) }))
    .filter((x) => x.v > 0)
    .sort((a, b) => b.v - a.v)
    .slice(0, 4)
    .map((x) => x.s);
}
