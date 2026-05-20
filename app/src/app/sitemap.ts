import type { MetadataRoute } from "next";
import { getAllWikiSlugs } from "@/lib/wiki";
import { MLVIZ_TIMELINE } from "@/lib/mlviz";
import { getAllProjectSlugs } from "@/lib/projects";

const SITE_URL = "https://djkimlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/wiki`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/projects/mlviz`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/colophon`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];

  const mlvizRoutes: MetadataRoute.Sitemap = MLVIZ_TIMELINE.map((node) => ({
    url: `${SITE_URL}/projects/mlviz/${node.modelSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: node.demoStatus === "live" ? 0.7 : 0.4,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const wikiRoutes: MetadataRoute.Sitemap = getAllWikiSlugs().map((slug) => ({
    url: `${SITE_URL}/wiki/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...mlvizRoutes, ...wikiRoutes];
}
