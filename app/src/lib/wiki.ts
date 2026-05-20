import fs from "fs";
import path from "path";
import matter from "gray-matter";

function toStr(val: unknown): string | undefined {
  if (val == null) return undefined;
  if (val instanceof Date) return val.toISOString().split("T")[0];
  return String(val);
}

const WIKI_DIR = path.join(process.cwd(), "..", "wiki");

export interface WikiEntry {
  slug: string;
  title: string;
  category?: string;
  tags?: string[];
  created?: string;
  updated?: string;
  status?: string;
  date?: string;
  content: string;
}

export type WikiSection = "topics" | "decisions";

function getMarkdownFiles(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
      files.push(rel);
    }
  }
  return files;
}

export function getWikiEntries(section: WikiSection): WikiEntry[] {
  const dir = path.join(WIKI_DIR, section);
  const files = getMarkdownFiles(dir);
  return files.map((file) => {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, "");
    return {
      slug: `${section}/${slug}`,
      title: data.title || slug,
      category: data.category,
      tags: data.tags,
      created: toStr(data.created),
      updated: toStr(data.updated),
      status: data.status,
      date: toStr(data.date),
      content,
    };
  });
}

export function getWikiEntry(slug: string): WikiEntry | null {
  const fullPath = path.join(WIKI_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    category: data.category,
    tags: data.tags,
    created: toStr(data.created),
    updated: toStr(data.updated),
    status: data.status,
    date: toStr(data.date),
    content,
  };
}

export function getAllWikiSlugs(): string[] {
  const topicFiles = getMarkdownFiles(path.join(WIKI_DIR, "topics"));
  const decisionFiles = getMarkdownFiles(path.join(WIKI_DIR, "decisions"));
  return [
    ...topicFiles.map((f) => `topics/${f.replace(/\.md$/, "")}`),
    ...decisionFiles.map((f) => `decisions/${f.replace(/\.md$/, "")}`),
  ];
}

// ---------- Cross-page features ----------

function allEntries(): WikiEntry[] {
  return [...getWikiEntries("topics"), ...getWikiEntries("decisions")];
}

export interface WikiSearchHit {
  slug: string;
  title: string;
  category?: string;
  tags?: string[];
  excerpt: string;
}

function plainTextExcerpt(markdown: string, max = 180): string {
  const stripped = markdown
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped.length <= max) return stripped;
  return stripped.slice(0, max - 1).trimEnd() + "…";
}

export function getWikiSearchIndex(): WikiSearchHit[] {
  return allEntries().map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    tags: entry.tags,
    excerpt: plainTextExcerpt(entry.content),
  }));
}

export interface WikiSibling {
  slug: string;
  title: string;
}

export function getWikiSiblings(currentSlug: string): {
  prev: WikiSibling | null;
  next: WikiSibling | null;
} {
  // Sort siblings by slug within the same parent directory.
  const parent = currentSlug.split("/").slice(0, -1).join("/");
  const siblings = allEntries()
    .filter((e) => e.slug.split("/").slice(0, -1).join("/") === parent)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const idx = siblings.findIndex((e) => e.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? { slug: siblings[idx - 1].slug, title: siblings[idx - 1].title } : null,
    next:
      idx < siblings.length - 1
        ? { slug: siblings[idx + 1].slug, title: siblings[idx + 1].title }
        : null,
  };
}

export function getWikiBacklinks(currentSlug: string): WikiSibling[] {
  // Find any entry whose body links to this slug. We check two specific
  // forms (any other guess is a false-positive risk):
  //   1. An absolute markdown link to `/wiki/<currentSlug>` (with optional
  //      trailing `)`, `#`, `"`, or whitespace).
  //   2. A markdown link target ending in the exact relative path with a
  //      delimiter on the left. We match `(`, `/`, or whitespace before the
  //      filename so e.g. "perceptron.md" does not also pick up
  //      "mlp-perceptron.md".
  const route = `/wiki/${currentSlug}`;
  const tail = currentSlug.split("/").pop() ?? "";
  const mdTail = tail ? `${tail}.md` : null;

  const absoluteRe = new RegExp(
    `${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=[)#"\\s])`,
  );
  const relativeRe = mdTail
    ? new RegExp(`[(\\s/]${mdTail.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}(?=[)#"\\s])`)
    : null;

  const hits: WikiSibling[] = [];
  for (const entry of allEntries()) {
    if (entry.slug === currentSlug) continue;
    const body = entry.content;
    if (absoluteRe.test(body) || (relativeRe && relativeRe.test(body))) {
      hits.push({ slug: entry.slug, title: entry.title });
    }
  }
  return hits.sort((a, b) => a.title.localeCompare(b.title));
}

export interface WikiTocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getWikiToc(content: string): WikiTocItem[] {
  const items: WikiTocItem[] = [];
  // Skip headings inside fenced code blocks.
  let inFence = false;
  for (const rawLine of content.split("\n")) {
    const line = rawLine;
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    items.push({ depth, text, id: slugifyHeading(text) });
  }
  return items;
}
