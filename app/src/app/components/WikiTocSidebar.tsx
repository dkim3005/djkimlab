"use client";

import { useEffect, useState } from "react";
import type { WikiTocItem } from "@/lib/wiki";

interface Props {
  toc: WikiTocItem[];
}

export default function WikiTocSidebar({ toc }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;
    const targets = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length < 3) return null;

  return (
    <nav
      className="hidden xl:block sticky top-24 self-start text-sm"
      aria-label="On this page"
    >
      <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-card-border">
        {toc.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 pl-3 py-0.5 transition-colors ${
                activeId === item.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              } ${item.depth === 3 ? "text-xs" : ""}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
