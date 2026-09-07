import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Cookie Policy - DevFixHub",
  description: "Explanation of cookies, local storage, analytics, and advertising preferences on DevFixHub.",
  canonicalUrl: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Cookie Policy", url: "/cookie-policy" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 1, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device by web browsers to store state, preferences, and anonymous session identifiers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. How DevFixHub Uses Cookies</h2>
          <p>
            We use cookies and localStorage strictly for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Essential Preferences:</strong> Preserving your selected Light, Dark, or System color scheme to prevent screen flashing on page load.</li>
            <li><strong>Google Analytics:</strong> Gathering anonymous traffic statistics to understand which errors and guides require expanded documentation.</li>
            <li><strong>Google AdSense:</strong> Displaying relevant, non-intrusive advertisements to help fund our free developer tools and infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Managing and Disabling Cookies</h2>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. In Chrome, Firefox, Safari, or Edge, visit your browser&apos;s Settings &rarr; Privacy and Security to manage or delete cookies at any time.
          </p>
        </section>
      </div>
    </div>
  );
}
