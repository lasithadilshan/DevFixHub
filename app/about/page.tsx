import { Metadata } from "next";
import { Terminal, ShieldCheck, Zap, Heart, CheckCircle2 } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "About DevFixHub - Fix Errors. Build Better.",
  description: "Learn about the mission, engineering values, and privacy-first architecture behind DevFixHub.",
  canonicalUrl: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: "About", url: "/about" }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-500 border border-teal-500/20">
          <Terminal className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          About DevFixHub
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          DevFixHub was founded on a simple principle: software engineers deserve immediate, practical solutions to real programming errors and clean, free developer tools that respect their privacy.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why We Built DevFixHub
          </h2>
          <p>
            When developers encounter a compiler exception, port conflict, or container crash, they need immediate, actionable answers. Too often, search results lead to bloated forums buried beneath paywalls, cookie banners, obsolete answers from a decade ago, or AI-generated filler that doesn&apos;t run.
          </p>
          <p>
            DevFixHub bridges this gap by providing verified, reproducible troubleshooting walkthroughs covering modern web frameworks (React, Next.js, Angular), backend platforms (Spring Boot, Node.js, FastAPI), and cloud infrastructure (Docker, Kubernetes, Git).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            100% In-Browser Privacy Guarantee
          </h2>
          <p>
            Many online developer utilities (such as JSON formatters or Base64 decoders) send your payloads to distant servers, creating severe risks of leaking authentication tokens, production database strings, or proprietary intellectual property.
          </p>
          <p>
            At DevFixHub, every single developer tool runs <strong>100% locally in your browser</strong> using client-side JavaScript. Zero bytes of your tool input are ever uploaded or transmitted to any server.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-teal-500" />
                Zero Friction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                No accounts, no email gates, no newsletters blocking your copy-paste. Jump straight to the solution.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-500" />
                Zero Data Tracking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                We never store tool inputs, search strings, or private code snippets.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
