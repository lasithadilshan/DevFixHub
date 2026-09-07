import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AlertCircle, CheckCircle2, AlertTriangle, ShieldAlert, Clock, Calendar, HelpCircle, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import CodeBlock from "@/components/CodeBlock";
import RelatedContent from "@/components/RelatedContent";
import { AdInArticle, AdSidebar } from "@/components/AdPlaceholder";
import { getErrorBySlug, getAllErrors, getRelatedContentForError } from "@/lib/content";
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
  const errors = getAllErrors();
  return errors.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const error = getErrorBySlug(slug);
  if (!error) return {};

  return constructMetadata({
    title: `${error.title} - Solution & Step-by-Step Fix`,
    description: error.description,
    canonicalUrl: `/errors/${error.slug}`,
    ogType: "article",
  });
}

export default async function ErrorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const error = getErrorBySlug(slug);

  if (!error) {
    notFound();
  }

  const { relatedErrors, relatedTutorials, relatedTools } = getRelatedContentForError(error);

  const breadcrumbItems = [
    { name: "Developer Errors", url: "/errors" },
    { name: error.category, url: `/categories/${error.category.toLowerCase().replace(/\s+/g, "-")}` },
    { name: error.title, url: `/errors/${error.slug}` },
  ];

  const articleSchema = generateArticleSchema({
    title: error.title,
    description: error.description,
    url: `/errors/${error.slug}`,
    datePublished: error.date,
    dateModified: error.updated || error.date,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = error.faq.length > 0 ? generateFAQSchema(error.faq) : null;

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
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {error.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{error.readingTime} read</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{error.date}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {error.title}
              </h1>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {error.description}
              </p>
            </header>

            {/* Error Message Snippet */}
            {error.errorCode && (
              <section className="space-y-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Error Code / Stack Trace
                </h2>
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200 font-mono text-xs overflow-x-auto selection:bg-red-500/30">
                  <code>{error.errorCode}</code>
                </div>
              </section>
            )}

            {/* Problem Overview */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Problem Overview
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {error.problem}
              </p>
            </section>

            {/* Why Does This Happen? */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Why Does This Happen?
              </h2>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {error.causes.map((cause, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Step-by-Step Fix */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-teal-500" />
                Step-by-Step Solution
              </h2>

              <div className="space-y-6">
                {error.solutionSteps.map((step, index) => (
                  <div key={index} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                    {step.command && (
                      <CodeBlock code={step.command} language={step.language || "bash"} />
                    )}
                    {step.code && (
                      <CodeBlock code={step.code} language={step.language || "typescript"} />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* In-Article AdSense slot */}
            <AdInArticle slotId="error-in-article" />

            {/* Alternative Solutions */}
            {error.alternatives && error.alternatives.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Alternative Workarounds
                </h2>
                <div className="space-y-3">
                  {error.alternatives.map((alt, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{alt.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{alt.description}</p>
                      {alt.code && <CodeBlock code={alt.code} />}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Common Mistakes */}
            {error.commonMistakes && error.commonMistakes.length > 0 && (
              <section className="p-5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
                <h2 className="text-base font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  Common Mistakes to Avoid
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
                  {error.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Prevention Tips */}
            {error.preventionTips && error.preventionTips.length > 0 && (
              <section className="p-5 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/40 dark:bg-teal-950/20 space-y-3">
                <h2 className="text-base font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-teal-500" />
                  Prevention & Best Practices
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-teal-900 dark:text-teal-200">
                  {error.preventionTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ Section */}
            {error.faq && error.faq.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-teal-500" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {error.faq.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.question}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Content & Strong Internal Linking */}
            <RelatedContent
              errors={relatedErrors}
              tutorials={relatedTutorials}
              tools={relatedTools}
            />
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Fix Summary
              </h3>
              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200">{error.category}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Difficulty</dt>
                  <dd className="font-semibold text-teal-600 dark:text-teal-400">Quick Fix</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Reading Time</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200">{error.readingTime}</dd>
                </div>
              </dl>

              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {error.tags.map((tag) => (
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

            {/* Sidebar AdSense Slot */}
            <AdSidebar slotId="error-sidebar" />
          </aside>
        </div>
      </article>
    </>
  );
}
