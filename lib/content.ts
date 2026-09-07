import { ErrorArticle, TutorialArticle, DevTool } from "./types";
import { ALL_ERRORS, getErrorBySlug, getAllErrors, getErrorsByCategory } from "./data/errors";
import { ALL_TUTORIALS, getTutorialBySlug, getAllTutorials, getTutorialsByCategory } from "./data/tutorials";
import { getAllTools, getToolBySlug } from "./tools";

export {
  ALL_ERRORS,
  getErrorBySlug,
  getAllErrors,
  getErrorsByCategory,
  ALL_TUTORIALS,
  getTutorialBySlug,
  getAllTutorials,
  getTutorialsByCategory,
};

export function getRelatedContentForError(error: ErrorArticle): {
  relatedErrors: ErrorArticle[];
  relatedTutorials: TutorialArticle[];
  relatedTools: DevTool[];
} {
  // Related errors by explicit keys or same category
  const relatedErrors: ErrorArticle[] = [];
  if (error.relatedErrors) {
    error.relatedErrors.forEach((slug) => {
      const found = getErrorBySlug(slug);
      if (found) relatedErrors.push(found);
    });
  }
  if (relatedErrors.length < 3) {
    const categorySiblings = getErrorsByCategory(error.category).filter(
      (e) => e.slug !== error.slug && !relatedErrors.some((re) => re.slug === e.slug)
    );
    relatedErrors.push(...categorySiblings.slice(0, 3 - relatedErrors.length));
  }

  // Related tutorials
  const relatedTutorials: TutorialArticle[] = [];
  if (error.relatedTutorials) {
    error.relatedTutorials.forEach((slug) => {
      const found = getTutorialBySlug(slug);
      if (found) relatedTutorials.push(found);
    });
  }
  if (relatedTutorials.length < 3) {
    const catTutorials = getTutorialsByCategory(error.category).filter(
      (t) => !relatedTutorials.some((rt) => rt.slug === t.slug)
    );
    relatedTutorials.push(...catTutorials.slice(0, 3 - relatedTutorials.length));
  }

  // Related tools
  const relatedTools: DevTool[] = [];
  if (error.relatedTools) {
    error.relatedTools.forEach((slug) => {
      const found = getToolBySlug(slug);
      if (found) relatedTools.push(found);
    });
  }
  if (relatedTools.length < 3) {
    const all = getAllTools();
    relatedTools.push(...all.filter((t) => !relatedTools.some((rt) => rt.slug === t.slug)).slice(0, 3 - relatedTools.length));
  }

  return {
    relatedErrors: relatedErrors.slice(0, 3),
    relatedTutorials: relatedTutorials.slice(0, 3),
    relatedTools: relatedTools.slice(0, 3),
  };
}

export function getRelatedContentForTutorial(tutorial: TutorialArticle): {
  relatedErrors: ErrorArticle[];
  relatedTutorials: TutorialArticle[];
  relatedTools: DevTool[];
} {
  const relatedTutorials: TutorialArticle[] = [];
  if (tutorial.relatedTutorials) {
    tutorial.relatedTutorials.forEach((slug) => {
      const found = getTutorialBySlug(slug);
      if (found) relatedTutorials.push(found);
    });
  }
  if (relatedTutorials.length < 3) {
    const siblings = getTutorialsByCategory(tutorial.category).filter(
      (t) => t.slug !== tutorial.slug && !relatedTutorials.some((rt) => rt.slug === t.slug)
    );
    relatedTutorials.push(...siblings.slice(0, 3 - relatedTutorials.length));
  }

  const relatedErrors: ErrorArticle[] = [];
  if (tutorial.relatedErrors) {
    tutorial.relatedErrors.forEach((slug) => {
      const found = getErrorBySlug(slug);
      if (found) relatedErrors.push(found);
    });
  }
  if (relatedErrors.length < 3) {
    const catErrors = getErrorsByCategory(tutorial.category).filter(
      (e) => !relatedErrors.some((re) => re.slug === e.slug)
    );
    relatedErrors.push(...catErrors.slice(0, 3 - relatedErrors.length));
  }

  const relatedTools: DevTool[] = [];
  if (tutorial.relatedTools) {
    tutorial.relatedTools.forEach((slug) => {
      const found = getToolBySlug(slug);
      if (found) relatedTools.push(found);
    });
  }
  if (relatedTools.length < 3) {
    const all = getAllTools();
    relatedTools.push(...all.filter((t) => !relatedTools.some((rt) => rt.slug === t.slug)).slice(0, 3 - relatedTools.length));
  }

  return {
    relatedErrors: relatedErrors.slice(0, 3),
    relatedTutorials: relatedTutorials.slice(0, 3),
    relatedTools: relatedTools.slice(0, 3),
  };
}
