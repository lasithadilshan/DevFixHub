import { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  AlertCircle,
  BookOpen,
  Coffee,
  Leaf,
  FileCode,
  Atom,
  ShieldAlert,
  Terminal,
  Server,
  Box,
  Boxes,
  GitBranch,
  Sparkles,
  Database
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { AdBanner } from "@/components/AdPlaceholder";
import { CATEGORIES } from "@/lib/categories";
import { getErrorsByCategory, getTutorialsByCategory } from "@/lib/content";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Browse All Programming Categories | Technology Solutions & Guides",
  description: "Explore developer error solutions, programming guides, and troubleshooting walkthroughs organized across 12 major engineering domains.",
  canonicalUrl: "/categories",
});

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Coffee,
  Leaf,
  FileCode,
  Atom,
  ShieldAlert,
  Terminal,
  Server,
  Box,
  Boxes,
  GitBranch,
  Sparkles,
  Database,
};

export default function CategoriesPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-full">
            <Layers className="w-3.5 h-3.5" />
            <span>12 Core Technology Stacks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Technology Categories
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Find targeted troubleshooting recipes, runtime error fixes, and step-by-step coding tutorials categorized by your programming language or infrastructure tool.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || Layers;
            const errorCount = getErrorsByCategory(category.name).length;
            const tutorialCount = getTutorialsByCategory(category.name).length;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/60 dark:to-teal-900/40 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center gap-1 transition-colors">
                      Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{errorCount}</span> Error Fixes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{tutorialCount}</span> Tutorials
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Ad Placement */}
        <AdBanner slotId="categories-bottom-banner" />
      </div>
    </>
  );
}
