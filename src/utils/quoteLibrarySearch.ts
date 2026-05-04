import { QUOTE_LIBRARY, type QuoteLibraryEntry } from "@/data/quoteLibrary";

function normalize (value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[’'"]/g, "");
}

function entryHaystack (entry: QuoteLibraryEntry) {
  const parts = [
    entry.author,
    ...(entry.aliases ?? []),
    ...(entry.tags ?? []),
    entry.quote,
  ];
  return normalize(parts.filter(Boolean).join(" | "));
}

function scoreEntry (query: string, entry: QuoteLibraryEntry) {
  const q = normalize(query);
  if (!q) return 0;

  const authorTerms = [entry.author, ...(entry.aliases ?? [])].map(normalize);
  const tags = (entry.tags ?? []).map(normalize);
  const quote = normalize(entry.quote);

  // 人物名っぽい入力は author/aliases を最優先
  if (authorTerms.some((t) => t === q)) return 100;
  if (authorTerms.some((t) => t && (t.includes(q) || q.includes(t)))) return 90;

  if (tags.some((t) => t === q)) return 70;
  if (tags.some((t) => t && (t.includes(q) || q.includes(t)))) return 60;

  if (quote.includes(q)) return 30;

  const haystack = entryHaystack(entry);
  if (haystack.includes(q)) return 10;

  return 0;
}

export function findLocalQuote (query: string): QuoteLibraryEntry | null {
  const scored = QUOTE_LIBRARY
    .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  const bestScore = scored[0].score;
  const best = scored.filter((x) => x.score === bestScore).map((x) => x.entry);
  return best[Math.floor(Math.random() * best.length)] ?? null;
}

