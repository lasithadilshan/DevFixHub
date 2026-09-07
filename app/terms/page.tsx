import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service - DevFixHub",
  description: "Terms and conditions governing the use of DevFixHub developer tools and technical articles.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Terms of Service", url: "/terms" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 1, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DevFixHub (https://devfixhub.com), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may discontinue use of our site and tools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Permitted Use</h2>
          <p>
            DevFixHub grants you a non-exclusive, worldwide, royalty-free license to access our educational content, copy troubleshooting commands, and use our browser tools for personal, academic, and commercial software development purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Disclaimer of Warranties</h2>
          <p>
            All content, code snippets, architectural patterns, and developer tools are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. Software debugging involves systems administration risks; you are responsible for validating commands before executing them on production servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall DevFixHub or its authors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the site&apos;s materials or tools.
          </p>
        </section>
      </div>
    </div>
  );
}
