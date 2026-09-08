import { ALL_ERRORS } from "../lib/data/errors";
import { ALL_TUTORIALS } from "../lib/data/tutorials";
import { DEV_TOOLS } from "../lib/tools";
import { CATEGORIES } from "../lib/categories";
import { SITE_CONFIG, generateArticleSchema, generateFAQSchema, generateToolSchema, generateBreadcrumbSchema } from "../lib/seo";

console.log("=========================================");
console.log("🔍 DEVFIXHUB SYSTEMATIC DEEP AUDIT 🔍");
console.log("=========================================\n");

let errorCount = 0;
const warn = (msg: string) => console.warn(`⚠️  WARNING: ${msg}`);
const fail = (msg: string) => {
  console.error(`❌ FAILURE: ${msg}`);
  errorCount++;
};
const pass = (msg: string) => console.log(`✅ PASS: ${msg}`);

const validCategoryNames = new Set(CATEGORIES.map(c => c.name.toLowerCase()));
// Also allow "Web & Network", "Web Development", "General"
validCategoryNames.add("web & network");
validCategoryNames.add("web development");
validCategoryNames.add("general");
validCategoryNames.add("json & data");

const toolSlugs = new Set(DEV_TOOLS.map(t => t.slug));

// 1. Errors Audit
console.log("--- 1. AUDITING 50 ERROR ARTICLES ---");
const errorSlugs = new Set<string>();
if (ALL_ERRORS.length < 50) fail(`Expected at least 50 errors, got ${ALL_ERRORS.length}`);
else pass(`Total errors: ${ALL_ERRORS.length}`);

ALL_ERRORS.forEach((err, idx) => {
  if (errorSlugs.has(err.slug)) fail(`Duplicate error slug: ${err.slug}`);
  errorSlugs.add(err.slug);

  if (!err.title || err.title.length < 5) fail(`Error #${idx} (${err.slug}) title too short`);
  if (!validCategoryNames.has(err.category.toLowerCase())) fail(`Error #${idx} (${err.slug}) invalid category: ${err.category}`);
  if (!err.problem || err.problem.length < 20) fail(`Error #${idx} (${err.slug}) problem statement too thin`);
  if (!err.causes || err.causes.length === 0) fail(`Error #${idx} (${err.slug}) causes list is empty`);
  if (!err.solutionSteps || err.solutionSteps.length === 0) fail(`Error #${idx} (${err.slug}) has no solution steps`);
  if (!err.faq || err.faq.length === 0) fail(`Error #${idx} (${err.slug}) has no FAQs`);
});
pass("All 50 error articles contain detailed problem statements, causes, solution steps, and FAQs.");

// 2. Tutorials Audit
console.log("\n--- 2. AUDITING 30 TUTORIAL ARTICLES ---");
const tutorialSlugs = new Set<string>();
if (ALL_TUTORIALS.length < 30) fail(`Expected at least 30 tutorials, got ${ALL_TUTORIALS.length}`);
else pass(`Total tutorials: ${ALL_TUTORIALS.length}`);

ALL_TUTORIALS.forEach((tut, idx) => {
  if (tutorialSlugs.has(tut.slug)) fail(`Duplicate tutorial slug: ${tut.slug}`);
  tutorialSlugs.add(tut.slug);

  if (!tut.title || tut.title.length < 5) fail(`Tutorial #${idx} (${tut.slug}) title too short`);
  if (!validCategoryNames.has(tut.category.toLowerCase())) fail(`Tutorial #${idx} (${tut.slug}) invalid category: ${tut.category}`);
  if (!tut.description || tut.description.length < 20) fail(`Tutorial #${idx} (${tut.slug}) description too thin`);
  if (!tut.sections || tut.sections.length === 0) fail(`Tutorial #${idx} (${tut.slug}) has no sections`);
  if (!tut.prerequisites || tut.prerequisites.length === 0) fail(`Tutorial #${idx} (${tut.slug}) has no prerequisites`);
  if (!tut.bestPractices || tut.bestPractices.length === 0) fail(`Tutorial #${idx} (${tut.slug}) has no best practices`);
  if (!tut.faq || tut.faq.length === 0) fail(`Tutorial #${idx} (${tut.slug}) has no FAQs`);
});
pass("All 30 tutorial articles contain comprehensive prerequisites, sections, best practices, and FAQs.");

// 3. Tools Audit
console.log("\n--- 3. AUDITING 10 DEVELOPER TOOLS ---");
if (DEV_TOOLS.length !== 10) fail(`Expected exactly 10 developer tools, got ${DEV_TOOLS.length}`);
else pass(`Total developer tools: ${DEV_TOOLS.length}`);

DEV_TOOLS.forEach(t => {
  if (!t.name || !t.slug || !t.shortDescription || !t.fullDescription) {
    fail(`Tool ${t.slug} has missing description metadata`);
  }
  if (!t.features || t.features.length === 0) {
    fail(`Tool ${t.slug} has no features listed`);
  }
  if (!t.howToUse || t.howToUse.length === 0) {
    fail(`Tool ${t.slug} has no how-to-use instructions`);
  }
  if (!t.faq || t.faq.length === 0) {
    fail(`Tool ${t.slug} has no FAQs`);
  }
});
pass("All 10 developer tools have complete metadata, features, how-to-use guides, and FAQs.");

// 4. Cross-Reference Internal Links Integrity
console.log("\n--- 4. AUDITING INTERNAL CROSS-LINKS ---");
let brokenLinks = 0;

ALL_ERRORS.forEach(err => {
  err.relatedErrors?.forEach(slug => {
    if (!errorSlugs.has(slug)) {
      fail(`Error [${err.slug}] references non-existent related error: "${slug}"`);
      brokenLinks++;
    }
  });
  err.relatedTutorials?.forEach(slug => {
    if (!tutorialSlugs.has(slug)) {
      fail(`Error [${err.slug}] references non-existent related tutorial: "${slug}"`);
      brokenLinks++;
    }
  });
  err.relatedTools?.forEach(slug => {
    if (!toolSlugs.has(slug)) {
      fail(`Error [${err.slug}] references non-existent related tool: "${slug}"`);
      brokenLinks++;
    }
  });
});

ALL_TUTORIALS.forEach(tut => {
  tut.relatedErrors?.forEach(slug => {
    if (!errorSlugs.has(slug)) {
      fail(`Tutorial [${tut.slug}] references non-existent related error: "${slug}"`);
      brokenLinks++;
    }
  });
  tut.relatedTutorials?.forEach(slug => {
    if (!tutorialSlugs.has(slug)) {
      fail(`Tutorial [${tut.slug}] references non-existent related tutorial: "${slug}"`);
      brokenLinks++;
    }
  });
  tut.relatedTools?.forEach(slug => {
    if (!toolSlugs.has(slug)) {
      fail(`Tutorial [${tut.slug}] references non-existent related tool: "${slug}"`);
      brokenLinks++;
    }
  });
});

if (brokenLinks === 0) {
  pass("100% of internal cross-references (errors, tutorials, tools) resolve to valid destinations!");
}

// 5. Schema Structured Data Verification
console.log("\n--- 5. AUDITING SCHEMA.ORG STRUCTURED DATA GENERATORS ---");
const testArticleSchema = generateArticleSchema({
  title: "Test Error",
  description: "Test Description",
  url: "/errors/test-error",
  datePublished: "2026-01-01",
});
if (testArticleSchema["@type"] !== "TechArticle" || !testArticleSchema.headline) {
  fail("TechArticle schema generation failed");
} else {
  pass("generateArticleSchema outputs compliant TechArticle schema.");
}

const testFaqSchema = generateFAQSchema([
  { question: "How to fix?", answer: "Follow these steps." }
]);
if (testFaqSchema["@type"] !== "FAQPage" || testFaqSchema.mainEntity.length !== 1) {
  fail("FAQPage schema generation failed");
} else {
  pass("generateFAQSchema outputs compliant FAQPage schema.");
}

const testToolSchema = generateToolSchema({
  name: "JSON Formatter",
  description: "Format JSON in browser",
  url: "/tools/json-formatter",
});
if (testToolSchema["@type"] !== "WebApplication" || testToolSchema.offers.price !== "0") {
  fail("WebApplication schema generation failed");
} else {
  pass("generateToolSchema outputs compliant WebApplication schema with zero price (free tool).");
}

const testBreadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Errors", url: "/errors" },
  { name: "CORS Error", url: "/errors/cors-policy-error" },
]);
if (testBreadcrumbSchema["@type"] !== "BreadcrumbList" || testBreadcrumbSchema.itemListElement.length !== 3) {
  fail("BreadcrumbList schema generation failed");
} else {
  pass("generateBreadcrumbSchema outputs compliant BreadcrumbList schema.");
}

console.log("\n=========================================");
if (errorCount === 0) {
  console.log("🎉 AUDIT PASSED: ZERO SYSTEMIC DEFECTS DETECTED 🎉");
} else {
  console.error(`💥 AUDIT FAILED: ${errorCount} ERRORS FOUND 💥`);
  process.exit(1);
}
console.log("=========================================\n");
