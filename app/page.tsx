import Link from "next/link";
import { ArrowRight, Wrench, AlertCircle, BookOpen, ShieldCheck, Zap, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import ErrorCard from "@/components/ErrorCard";
import TutorialCard from "@/components/TutorialCard";
import { AdBanner } from "@/components/AdPlaceholder";
import { getAllTools } from "@/lib/tools";
import { getAllErrors } from "@/lib/content";
import { getAllTutorials } from "@/lib/content";
import { CATEGORIES } from "@/lib/categories";

export default function HomePage() {
  const tools = getAllTools();
  const allErrors = getAllErrors();
  const allTutorials = getAllTutorials();

  // Curated Popular Errors for quick access
  const popularSlugs = [
    "spring-boot-port-8080-already-in-use",
    "spring-boot-ambiguous-handler-methods",
    "react-map-is-not-a-function",
    "angular-cannot-find-module",
    "docker-container-exited",
    "kubernetes-imagepullbackoff",
  ];
  const popularErrors = popularSlugs
    .map((slug) => allErrors.find((e) => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const latestErrors = allErrors.slice(6, 12);
  const latestTutorials = allTutorials.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Over 50 Error Fixes & 10 Free In-Browser Tools</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight text-balance">
            Fix Developer Errors. <br className="hidden sm:inline" />
            <span className="text-teal-600 dark:text-teal-400">Build Better Software.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Practical solutions, troubleshooting guides and free developer tools for software engineers. No paywalls, zero telemetry.
          </p>

          {/* Search Bar in Hero */}
          <div className="pt-2 max-w-xl mx-auto flex justify-center">
            <SearchBar placeholder="Search errors, tools and tutorials..." />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/errors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-500/20 transition-all hover:-translate-y-0.5"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Browse Developer Errors</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <Wrench className="w-4 h-4" />
              <span>Explore Tools</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Developer Errors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Top Troubleshooted Issues</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Popular Developer Errors
            </h2>
          </div>
          <Link
            href="/errors"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            View all 50 error guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularErrors.map((error) => (
            <ErrorCard key={error.slug} error={error} />
          ))}
        </div>
      </section>

      {/* AdSense Slot 1: Between major sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AdBanner slotId="homepage-banner-1" />
      </div>

      {/* Free Developer Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              <Wrench className="w-3.5 h-3.5" />
              <span>100% In-Browser & Private</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Free Developer Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Explore all 10 free tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Latest Developer Fixes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Recently Updated</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Latest Developer Fixes
            </h2>
          </div>
          <Link
            href="/errors"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            See all fixes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestErrors.map((error) => (
            <ErrorCard key={error.slug} error={error} />
          ))}
        </div>
      </section>

      {/* Latest Tutorials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Step-by-Step Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Latest Tutorials
            </h2>
          </div>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Browse all 30 tutorials <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.slug} tutorial={tutorial} />
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            Explore By Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Browse Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/40 hover:shadow-md transition-all text-center items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
                {cat.name.slice(0, 2)}
              </div>
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why DevFixHub? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-teal-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/20 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Why DevFixHub?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Engineered specifically for developers who want direct answers without bloated ads, forced signups, or paywalls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">100% Free Forever</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  All 50 error solutions, 30 tutorials, and 10 developer tools are completely free to use without limits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
              <Zap className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Practical & Direct</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  No generic filler. Step-by-step terminal commands, code snippets, and exact root causes for every error.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
              <ShieldCheck className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Privacy-First Architecture</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tools run 100% in your browser. Passwords, tokens, JSON, and regex never touch any external server.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
              <Lock className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">No Registration Required</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  No accounts, no email gates, no newsletters blocking your copy-paste. Jump straight to the fix.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
              <Wrench className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Developer-Focused Design</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dark mode default, syntax highlighting, one-click copy buttons, and keyboard navigation (⌘K).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
              <Sparkles className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Blazing Fast Performance</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Static HTML generation, minimal client JavaScript, and zero database latency for instant page loads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
