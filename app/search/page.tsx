import { Suspense } from "react";
import type { Metadata } from "next";
import SearchResultsClient from "@/components/SearchResultsClient";
import Breadcrumb from "@/components/Breadcrumb";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = constructMetadata({
  title: "Search Developer Errors, Tools and Tutorials",
  description: "Search DevFixHub for solutions to developer errors, free online browser tools, programming tutorials, and technology categories.",
  canonicalUrl: "/search",
});

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ name: "Search", url: "/search" }]} />
      <Suspense fallback={<div className="py-12 text-center text-sm text-slate-400">Loading search...</div>}>
        <SearchResultsClient />
      </Suspense>
    </div>
  );
}
