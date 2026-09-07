import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BookOpen, CheckCircle2, AlertTriangle, Clock, Calendar, HelpCircle, Layers, Award } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import CodeBlock from "@/components/CodeBlock";
import RelatedContent from "@/components/RelatedContent";
import { AdInArticle, AdSidebar } from "@/components/AdPlaceholder";
import { getTutorialBySlug, getAllTutorials, getRelatedContentForTutorial } from "@/lib/content";
import {
  constructMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tutorials = getAllTutorials();
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return {};

  return constructMetadata({
    title: `${tutorial.title} - Complete Tutorial`,
    description: tutorial.description,
    canonicalUrl: `/tutorials/${tutorial.slug}`,
    ogType: "article",
  });
}

export default async function TutorialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  const { relatedErrors, relatedTutorials, relatedTools } = getRelatedContentForTutorial(tutorial);

  const breadcrumbItems = [
    { name: "Tutorials", url: "/tutorials" },
    { name: tutorial.category, url: `/categories/${tutorial.category.toLowerCase().replace(/\s+/g, "-")}` },
    { name: tutorial.title, url: `/tutorials/${tutorial.slug}` },
  ];

  const articleSchema = generateArticleSchema({
    title: tutorial.title,
    description: tutorial.description,
    url: `/tutorials/${tutorial.slug}`,
    datePublished: tutorial.date,
    dateModified: tutorial.updated || tutorial.date,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = tutorial.faq && tutorial.faq.length > 0 ? generateFAQSchema(tutorial.faq) : null;

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4">
          {/* Main Tutorial (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {tutorial.category}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  {tutorial.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tutorial.readingTime} read</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{tutorial.date}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {tutorial.title}
              </h1>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {tutorial.description}
              </p>
            </header>

            {/* Prerequisites */}
            {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
              <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-500" />
                  Prerequisites
                </h2>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {tutorial.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Sections / Steps */}
            <div className="space-y-8">
              {tutorial.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {sec.title}
                  </h2>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sec.content}
                  </p>
                  {sec.code && (
                    <CodeBlock code={sec.code} language={sec.language || "typescript"} />
                  )}
                </section>
              ))}
            </div>

            {/* In-Article AdSense slot */}
            <AdInArticle slotId="tutorial-in-article" />

            {/* Best Practices */}
            {tutorial.bestPractices && tutorial.bestPractices.length > 0 && (
              <section className="p-5 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/40 dark:bg-teal-950/20 space-y-3">
                <h2 className="text-base font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-500" />
                  Best Practices & Architecture Advice
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-teal-900 dark:text-teal-200">
                  {tutorial.bestPractices.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Common Mistakes */}
            {tutorial.commonMistakes && tutorial.commonMistakes.length > 0 && (
              <section className="p-5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
                <h2 className="text-base font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  Common Mistakes to Watch Out For
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
                  {tutorial.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ */}
            {tutorial.faq && tutorial.faq.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-teal-500" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {tutorial.faq.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.question}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Content */}
            <RelatedContent
              errors={relatedErrors}
              tutorials={relatedTutorials}
              tools={relatedTools}
            />
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Guide Information
              </h3>
              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200">{tutorial.category}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Difficulty</dt>
                  <dd className="font-semibold text-teal-600 dark:text-teal-400">{tutorial.difficulty}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Reading Time</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200">{tutorial.readingTime}</dd>
                </div>
              </dl>

              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tutorial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <AdSidebar slotId="tutorial-sidebar" />
          </aside>
        </div>
      </article>
    </>
  );
}
