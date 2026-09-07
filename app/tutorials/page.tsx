import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import TutorialCard from "@/components/TutorialCard";
import Breadcrumb from "@/components/Breadcrumb";
import { AdBanner } from "@/components/AdPlaceholder";
import { getAllTutorials } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Programming Tutorials & Developer Architecture Guides",
  description: "Comprehensive step-by-step programming tutorials for Spring Boot, Python, React, Angular, Node.js, Docker, Kubernetes, and Git.",
  canonicalUrl: "/tutorials",
});

export default function TutorialsPage() {
  const tutorials = getAllTutorials();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Tutorials", url: "/tutorials" }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Developer Tutorials & Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          In-depth technical guides with prerequisites, copyable architectural code examples, best practices, and common mistakes to avoid.
        </p>
      </div>

      <AdBanner slotId="tutorials-list-top" />

      {/* Grid of all 30 tutorials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.slug} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
}
