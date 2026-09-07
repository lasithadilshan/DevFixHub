import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Folder, AlertCircle, BookOpen, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ErrorCard from "@/components/ErrorCard";
import TutorialCard from "@/components/TutorialCard";
import { AdBanner } from "@/components/AdPlaceholder";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { getErrorsByCategory, getTutorialsByCategory } from "@/lib/content";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return constructMetadata({
    title: `${category.name} Solutions, Error Fixes & Tutorials`,
    description: category.description,
    canonicalUrl: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryErrors = getErrorsByCategory(category.name);
  const categoryTutorials = getTutorialsByCategory(category.name);

  const breadcrumbItems = [
    { name: "Categories", url: "/errors" },
    { name: category.name, url: `/categories/${category.slug}` },
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

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-500 border border-teal-500/20">
            <Folder className="w-3.5 h-3.5" />
            <span>Category Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {category.name} Developer Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <AdBanner slotId="category-banner-top" />

        {/* Category Errors */}
        {categoryErrors.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-lg">
              <AlertCircle className="w-5 h-5" />
              <h2>{category.name} Error Fixes ({categoryErrors.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryErrors.map((error) => (
                <ErrorCard key={error.slug} error={error} />
              ))}
            </div>
          </section>
        )}

        {/* Category Tutorials */}
        {categoryTutorials.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-lg">
              <BookOpen className="w-5 h-5" />
              <h2>{category.name} Programming Tutorials ({categoryTutorials.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.slug} tutorial={tutorial} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
