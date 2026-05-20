"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export interface WikiSearchHit {
  slug: string;
  title: string;
  category?: string;
  tags?: string[];
  excerpt: string;
}

interface Props {
  index: WikiSearchHit[];
}

// Lightweight fuzzy: requires the query characters to appear in order in
// either the title or the excerpt. Title hits score higher than excerpt hits.
function score(query: string, hit: WikiSearchHit): number {
  const q = query.toLowerCase();
  if (!q) return 0;
  const t = hit.title.toLowerCase();
  const e = hit.excerpt.toLowerCase();
  const tags = (hit.tags ?? []).join(" ").toLowerCase();

  if (t.includes(q)) return 100 - t.indexOf(q);
  if (tags.includes(q)) return 60;
  if (e.includes(q)) return 30 - Math.min(e.indexOf(q), 25);

  // Subsequence fallback for typos like "lnrgrss" → "linear regression".
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  if (qi === q.length) return 10;
  return -1;
}

export default function WikiSearch({ index }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const modPressed = isMac ? e.metaKey : e.ctrlKey;
      if (modPressed && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setActive(0);
    }
  }, [open]);

  const hits = useMemo(() => {
    if (!query.trim()) return [];
    return index
      .map((h) => ({ hit: h, s: score(query.trim(), h) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.hit);
  }, [query, index]);

  function handleListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      window.location.href = `/wiki/${hits[active].slug}`;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 rounded-md border border-card-border bg-card-bg/60 px-3 py-1.5 text-xs font-mono text-muted transition-colors hover:text-foreground hover:border-accent/50"
        aria-label="Open wiki search"
      >
        <span>Search wiki</span>
        <kbd className="rounded border border-card-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-card-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleListKey}
          >
            <div className="flex items-center gap-3 border-b border-card-border px-4 py-3">
              <span className="font-mono text-sm text-accent">$</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search wiki — type to filter, ↑↓ to move, ⏎ to open"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                aria-label="Search wiki"
              />
              <kbd className="rounded border border-card-border px-1.5 py-0.5 text-[10px] font-mono text-muted">
                Esc
              </kbd>
            </div>

            {query.trim() === "" && (
              <div className="px-4 py-8 text-center text-sm text-muted">
                Start typing to search {index.length} wiki pages.
              </div>
            )}

            {query.trim() !== "" && hits.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted">
                No matches for &quot;{query}&quot;.
              </div>
            )}

            {hits.length > 0 && (
              <ul className="max-h-[420px] overflow-y-auto">
                {hits.map((hit, i) => (
                  <li key={hit.slug}>
                    <Link
                      href={`/wiki/${hit.slug}`}
                      onClick={() => setOpen(false)}
                      className={`block border-l-2 px-4 py-3 transition-colors ${
                        i === active
                          ? "border-accent bg-card-bg"
                          : "border-transparent hover:bg-card-bg/60"
                      }`}
                      onMouseEnter={() => setActive(i)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {hit.title}
                        </span>
                        {hit.category && (
                          <span className="text-[10px] font-mono text-muted">
                            {hit.category}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {hit.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
