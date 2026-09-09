import { MetadataRoute } from "next";
import { getAllErrors } from "@/lib/content";
import { getAllTutorials } from "@/lib/content";
import { getAllTools } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Core Indexable Hubs & Informational Pages (excluding noindex /search)
  const staticHubs = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/errors", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/tutorials", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/tools", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/categories", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/privacy-policy", priority: 0.3, changeFrequency: "monthly" as const },
    { route: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
    { route: "/cookie-policy", priority: 0.3, changeFrequency: "monthly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Errors (50)
  const errorRoutes = getAllErrors().map((e) => ({
    url: `${baseUrl}/errors/${e.slug}`,
    lastModified: new Date(e.updated || e.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Tutorials (30)
  const tutorialRoutes = getAllTutorials().map((t) => ({
    url: `${baseUrl}/tutorials/${t.slug}`,
    lastModified: new Date(t.updated || t.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Tools (10)
  const toolRoutes = getAllTools().map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Categories (12)
  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticHubs,
    ...errorRoutes,
    ...tutorialRoutes,
    ...toolRoutes,
    ...categoryRoutes,
  ];
}
