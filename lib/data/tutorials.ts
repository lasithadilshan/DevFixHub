import { TutorialArticle } from "../types";
import { TUTORIALS_BATCH_1 } from "./tutorials-batch1";
import { TUTORIALS_BATCH_2 } from "./tutorials-batch2";

export const ALL_TUTORIALS: TutorialArticle[] = [
  ...TUTORIALS_BATCH_1,
  ...TUTORIALS_BATCH_2,
];

export function getTutorialBySlug(slug: string): TutorialArticle | undefined {
  return ALL_TUTORIALS.find((t) => t.slug === slug);
}

export function getAllTutorials(): TutorialArticle[] {
  return ALL_TUTORIALS;
}

export function getTutorialsByCategory(category: string): TutorialArticle[] {
  return ALL_TUTORIALS.filter(
    (t) => t.category.toLowerCase() === category.toLowerCase()
  );
}
