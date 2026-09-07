import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy - DevFixHub",
  description: "DevFixHub privacy policy explaining client-side browser execution, Google Analytics, cookies, and Google AdSense compliance.",
  canonicalUrl: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Privacy Policy", url: "/privacy-policy" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 1, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Overview</h2>
          <p>
            At DevFixHub (accessible from https://devfixhub.com), the privacy of our visitors is one of our primary priorities. This Privacy Policy document outlines the types of information that is collected and recorded by DevFixHub and how we use it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Client-Side Tool Processing Guarantee</h2>
          <p>
            All online developer utilities provided on DevFixHub (including the JSON Formatter, JSON Validator, Base64 Encoder/Decoder, UUID Generator, Timestamp Converter, URL Encoder/Decoder, Regex Tester, and Markdown Editor) execute <strong>100% locally in your web browser</strong> using client-side JavaScript.
          </p>
          <p>
            DevFixHub does <strong>not</strong> upload, transmit, intercept, log, or store any data, code, tokens, passwords, or text entered into any of our tools. Your input remains exclusively on your device.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Cookies and Web Beacons</h2>
          <p>
            DevFixHub uses cookies to store user preferences such as light or dark theme settings. These cookies are stored locally on your device and are never sold or shared with third-party data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">4. Google AdSense & Third-Party Advertising</h2>
          <p>
            Google is one of our third-party advertising partners. Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to devfixhub.com and other sites on the internet.
          </p>
          <p>
            Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 underline">https://policies.google.com/technologies/ads</a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">5. Google Analytics</h2>
          <p>
            We may use Google Analytics to monitor aggregate, anonymous website performance metrics (such as page views, device types, and bounce rates). Google Analytics does not collect personally identifiable information or tool inputs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">6. Contact Information</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at privacy@devfixhub.com or via our <a href="/contact" className="text-teal-600 dark:text-teal-400 underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
