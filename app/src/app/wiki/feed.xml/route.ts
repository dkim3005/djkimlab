import { getWikiEntries } from "@/lib/wiki";

const SITE_URL = "https://djkimlab.com";
const FEED_URL = `${SITE_URL}/wiki/feed.xml`;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function summarize(markdown: string, max = 240): string {
  const stripped = markdown
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length <= max ? stripped : stripped.slice(0, max - 1).trimEnd() + "…";
}

function toIsoOrFallback(d?: string): string {
  if (!d) return new Date().toISOString();
  // accept YYYY-MM-DD or full ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return new Date(d + "T00:00:00Z").toISOString();
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export async function GET() {
  const entries = [...getWikiEntries("topics"), ...getWikiEntries("decisions")]
    .map((e) => ({
      ...e,
      stamp: toIsoOrFallback(e.updated ?? e.created ?? e.date),
    }))
    .sort((a, b) => b.stamp.localeCompare(a.stamp))
    .slice(0, 50);

  const latestStamp = entries[0]?.stamp ?? new Date().toISOString();

  const items = entries
    .map((e) => {
      const url = `${SITE_URL}/wiki/${e.slug}`;
      return `  <entry>
    <id>${escapeXml(url)}</id>
    <title>${escapeXml(e.title)}</title>
    <link rel="alternate" href="${escapeXml(url)}" />
    <updated>${e.stamp}</updated>
    ${e.category ? `<category term="${escapeXml(e.category)}" />` : ""}
    <summary>${escapeXml(summarize(e.content))}</summary>
    <author><name>Dongjin Kim</name></author>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>djkimlab wiki</title>
  <subtitle>Technical knowledge base — AI/ML, math, frontend, ADRs.</subtitle>
  <link rel="self" href="${FEED_URL}" />
  <link rel="alternate" href="${SITE_URL}/wiki" />
  <id>${FEED_URL}</id>
  <updated>${latestStamp}</updated>
  <author><name>Dongjin Kim</name><email>djkim3005@gmail.com</email></author>
${items}
</feed>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
