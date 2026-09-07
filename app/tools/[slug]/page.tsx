import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Wrench, CheckCircle2, ShieldCheck, HelpCircle, Sparkles } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { AdBanner } from "@/components/AdPlaceholder";
import RelatedContent from "@/components/RelatedContent";
import { getToolBySlug, getAllTools } from "@/lib/tools";
import { getAllErrors, getAllTutorials } from "@/lib/content";
import {
  constructMetadata,
  generateToolSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from "@/lib/seo";

// Client Tool Components
import JsonFormatter from "@/components/tools/JsonFormatter";
import JsonValidator from "@/components/tools/JsonValidator";
import Base64Encoder from "@/components/tools/Base64Encoder";
import Base64Decoder from "@/components/tools/Base64Decoder";
import UuidGenerator from "@/components/tools/UuidGenerator";
import TimestampConverter from "@/components/tools/TimestampConverter";
import UrlEncoder from "@/components/tools/UrlEncoder";
import UrlDecoder from "@/components/tools/UrlDecoder";
import RegexTester from "@/components/tools/RegexTester";
import MarkdownEditor from "@/components/tools/MarkdownEditor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return constructMetadata({
    title: `${tool.name} - Free Online Browser Tool`,
    description: tool.fullDescription,
    canonicalUrl: `/tools/${tool.slug}`,
  });
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Cross-linking for tools
  const allErrors = getAllErrors();
  const allTutorials = getAllTutorials();
  const allTools = getAllTools();

  let relatedErrors = allErrors.filter((e) => e.category === tool.category).slice(0, 3);
  if (relatedErrors.length === 0) {
    relatedErrors = allErrors.slice(0, 3);
  }

  let relatedTutorials = allTutorials.filter((t) => t.category === tool.category).slice(0, 3);
  if (relatedTutorials.length === 0) {
    relatedTutorials = allTutorials.slice(0, 3);
  }

  const siblingTools = allTools.filter((t) => t.slug !== tool.slug).slice(0, 3);

  const breadcrumbItems = [
    { name: "Developer Tools", url: "/tools" },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ];

  const toolSchema = generateToolSchema({
    name: tool.name,
    description: tool.fullDescription,
    url: `/tools/${tool.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = tool.faq && tool.faq.length > 0 ? generateFAQSchema(tool.faq) : null;

  // Render matching tool UI
  const renderToolComponent = () => {
    switch (tool.slug) {
      case "json-formatter":
        return <JsonFormatter />;
      case "json-validator":
        return <JsonValidator />;
      case "base64-encoder":
        return <Base64Encoder />;
      case "base64-decoder":
        return <Base64Decoder />;
      case "uuid-generator":
        return <UuidGenerator />;
      case "timestamp-converter":
        return <TimestampConverter />;
      case "url-encoder":
        return <UrlEncoder />;
      case "url-decoder":
        return <UrlDecoder />;
      case "regex-tester":
        return <RegexTester />;
      case "markdown-editor":
        return <MarkdownEditor />;
      default:
        return null;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Tool Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {tool.category}
            </span>
            {tool.badge && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {tool.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {tool.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {tool.fullDescription}
          </p>
        </div>

        {/* The Interactive Tool Workspace */}
        <section className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm backdrop-blur-sm">
          {renderToolComponent()}
        </section>

        {/* AdSense Slot directly below the tool */}
        <div className="py-2">
          <AdBanner slotId="tool-bottom-banner" />
        </div>

        {/* Informational Sections: Features & How to Use */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Features */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-500" />
              Key Features
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {tool.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-teal-500" />
              How to Use {tool.name}
            </h2>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {tool.howToUse.map((stepItem, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {stepItem.step}
                  </span>
                  <span>{stepItem.instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* FAQ */}
        {tool.faq && tool.faq.length > 0 && (
          <section className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.faq.map((item, index) => (
                <div key={index} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.question}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strong Internal Linking */}
        <RelatedContent
          errors={relatedErrors}
          tutorials={relatedTutorials}
          tools={siblingTools}
        />
      </div>
    </>
  );
}
