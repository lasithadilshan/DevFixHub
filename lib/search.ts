import { SearchItem } from "./types";
import { getAllTools } from "./tools";
import { CATEGORIES } from "./categories";
import { getAllErrors } from "./content";
import { getAllTutorials } from "./content";

export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Tools
  const tools = getAllTools();
  tools.forEach((t) => {
    items.push({
      id: `tool-${t.slug}`,
      title: t.name,
      description: t.shortDescription,
      url: `/tools/${t.slug}`,
      type: "tool",
      category: t.category,
      tags: t.tags,
    });
  });

  // Categories
  CATEGORIES.forEach((c) => {
    items.push({
      id: `category-${c.slug}`,
      title: `${c.name} Solutions & Guides`,
      description: c.description,
      url: `/categories/${c.slug}`,
      type: "category",
      category: c.name,
      tags: [c.slug, c.name.toLowerCase()],
    });
  });

  // Errors
  const errors = getAllErrors();
  errors.forEach((e) => {
    items.push({
      id: `error-${e.slug}`,
      title: e.title,
      description: e.description,
      url: `/errors/${e.slug}`,
      type: "error",
      category: e.category,
      tags: e.tags,
    });
  });

  // Tutorials
  const tutorials = getAllTutorials();
  tutorials.forEach((t) => {
    items.push({
      id: `tutorial-${t.slug}`,
      title: t.title,
      description: t.description,
      url: `/tutorials/${t.slug}`,
      type: "tutorial",
      category: t.category,
      tags: t.tags,
    });
  });

  return items;
}

export function searchContent(query: string, limit = 20): SearchItem[] {
  if (!query || !query.trim()) return [];

  const rawTerms = query.toLowerCase().trim().split(/\s+/);
  const index = getSearchIndex();

  const scored = index
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const catLower = item.category.toLowerCase();
      const tagsLower = item.tags.map((t) => t.toLowerCase());

      rawTerms.forEach((term) => {
        if (titleLower === term) score += 50;
        else if (titleLower.includes(term)) score += 25;

        if (catLower.includes(term)) score += 20;

        if (tagsLower.some((t) => t.includes(term))) score += 15;

        if (descLower.includes(term)) score += 10;
      });

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);

  return scored;
}
