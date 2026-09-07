import { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import ErrorCard from "@/components/ErrorCard";
import Breadcrumb from "@/components/Breadcrumb";
import { AdBanner } from "@/components/AdPlaceholder";
import { getAllErrors } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Developer Error Solutions & Troubleshooting Directory",
  description: "Browse step-by-step troubleshooting solutions for 50+ common developer errors in Spring Boot, React, Angular, Python, Docker, Kubernetes, and Git.",
  canonicalUrl: "/errors",
});

export default function ErrorsPage() {
  const errors = getAllErrors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Developer Errors", url: "/errors" }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Troubleshooting Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Developer Errors & Solutions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Detailed, step-by-step guides with root cause analyses, terminal commands, copyable code fixes, and prevention tips for real programming exceptions and compiler errors.
        </p>
      </div>

      <AdBanner slotId="errors-list-top" />

      {/* Grid of all 50 errors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {errors.map((error) => (
          <ErrorCard key={error.slug} error={error} />
        ))}
      </div>
    </div>
  );
}
