import { Metadata } from "next";
import { Mail } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "./ContactForm";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact DevFixHub - Support, Error Submissions & Feedback",
  description: "Get in touch with the DevFixHub editorial and engineering team. Submit error solutions, report bugs, or propose tutorial topics.",
  canonicalUrl: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: "Contact Us", url: "/contact" }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-500 border border-teal-500/20">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Contact DevFixHub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Have an error fix to suggest, found a bug in one of our browser tools, or want to contribute a tutorial? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form Container (7 cols) */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <ContactForm />
        </div>

        {/* Sidebar Info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Community & Inquiries
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              DevFixHub is an open developer resource. We gladly accept pull requests, error solution improvements, and suggestions for new browser-based utilities.
            </p>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Direct Email:</span>
                <span>contact@devfixhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Response Time:</span>
                <span>1-2 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
