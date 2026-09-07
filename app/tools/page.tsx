import { Metadata } from "next";
import { Wrench, ShieldCheck, Zap } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import Breadcrumb from "@/components/Breadcrumb";
import { AdBanner } from "@/components/AdPlaceholder";
import { getAllTools } from "@/lib/tools";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "10 Free Online Developer Tools - 100% Client-Side & Private",
  description: "Free, instant in-browser developer utilities: JSON Formatter, JSON Validator, Base64 Encoder/Decoder, UUID Generator, Timestamp Converter, URL Encoder/Decoder, Regex Tester, and Markdown Editor.",
  canonicalUrl: "/tools",
});

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Developer Tools", url: "/tools" }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-500 border border-teal-500/20">
          <Wrench className="w-3.5 h-3.5" />
          <span>Browser Utilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Free Online Developer Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Fast, client-side developer utilities that execute 100% in your browser. No data leaves your machine, no tracking, no registration required.
        </p>
      </div>

      {/* Privacy Badge */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-teal-200 dark:border-teal-800/70 bg-teal-50/50 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-teal-500 flex-shrink-0" />
        <span>
          <strong>Guaranteed Privacy:</strong> All tools process inputs entirely locally using client-side JavaScript. Sensitive payloads, tokens, passwords, and data never touch our servers.
        </span>
      </div>

      <AdBanner slotId="tools-list-top" />

      {/* Grid of all 10 tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
