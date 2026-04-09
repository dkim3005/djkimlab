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
