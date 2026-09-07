import { ErrorArticle } from "../types";
import { ERRORS_BATCH_1 } from "./errors-batch1";
import { ERRORS_BATCH_2 } from "./errors-batch2";
import { ERRORS_BATCH_3 } from "./errors-batch3";

export const ALL_ERRORS: ErrorArticle[] = [
  ...ERRORS_BATCH_1,
  ...ERRORS_BATCH_2,
  ...ERRORS_BATCH_3,
];

export function getErrorBySlug(slug: string): ErrorArticle | undefined {
  return ALL_ERRORS.find((e) => e.slug === slug);
}

export function getAllErrors(): ErrorArticle[] {
  return ALL_ERRORS;
}

export function getErrorsByCategory(category: string): ErrorArticle[] {
  return ALL_ERRORS.filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );
}
