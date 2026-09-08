import { ALL_ERRORS } from "../lib/data/errors";
import { ALL_TUTORIALS } from "../lib/data/tutorials";
import { DEV_TOOLS } from "../lib/tools";
import { CATEGORIES } from "../lib/categories";

const BASE_URL = "http://127.0.0.1:3000";

const routesToTest = [
  // Core & Legal
  "/",
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
  "/sitemap.xml",
  "/robots.txt",
  // 12 Categories
  ...CATEGORIES.map(c => `/categories/${c.slug}`),
  // 10 Tools
  ...DEV_TOOLS.map(t => `/tools/${t.slug}`),
  // Sample Errors
  ...ALL_ERRORS.slice(0, 10).map(e => `/errors/${e.slug}`),
  // Sample Tutorials
  ...ALL_TUTORIALS.slice(0, 10).map(t => `/tutorials/${t.slug}`),
];

async function testAll() {
  console.log(`Starting HTTP Route & SEO Audit across ${routesToTest.length} routes...\n`);
  let failures = 0;

  for (const route of routesToTest) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      if (!res.ok) {
        console.error(`❌ [${res.status}] ${route}`);
        failures++;
        continue;
      }

      const text = await res.text();

      // Basic content checks
      if (route.endsWith(".xml") || route.endsWith(".txt")) {
        console.log(`✅ [${res.status}] ${route} (${text.length} bytes)`);
        continue;
      }

      // HTML checks
      const hasTitle = text.includes("<title>") && text.includes("</title>");
      const hasCanonical = text.includes('rel="canonical"');
      const hasMetaDesc = text.includes('name="description"');

      if (!hasTitle || !hasCanonical || !hasMetaDesc) {
        console.warn(`⚠️  Incomplete SEO tags on ${route}: title=${hasTitle}, canonical=${hasCanonical}, desc=${hasMetaDesc}`);
        failures++;
      } else {
        console.log(`✅ [200 OK] ${route} (SEO verified)`);
      }
    } catch (err: any) {
      console.error(`💥 Request failed for ${route}:`, err.message);
      failures++;
    }
  }

  console.log("\n=========================================");
  if (failures === 0) {
    console.log(`🎉 ALL ${routesToTest.length} ROUTES RETURNED HTTP 200 WITH VERIFIED SEO TAGS! 🎉`);
  } else {
    console.error(`💥 Encountered ${failures} failures during HTTP audit.`);
    process.exit(1);
  }
  console.log("=========================================\n");
}

testAll();
