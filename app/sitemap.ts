import { MetadataRoute } from "next";
import { getAllErrors } from "@/lib/content";
import { getAllTutorials } from "@/lib/content";
import { getAllTools } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Static Pages
  const staticRoutes = [
    "",
    "/errors",
    "/tutorials",
    "/tools",
    "/categories",
    "/search",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
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
    ...staticRoutes,
    ...errorRoutes,
    ...tutorialRoutes,
    ...toolRoutes,
    ...categoryRoutes,
  ];
}
