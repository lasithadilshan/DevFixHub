"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Wrench, AlertCircle, BookOpen, Folder, ArrowRight, Filter } from "lucide-react";
import { searchContent } from "@/lib/search";
import { SearchItem } from "@/lib/types";

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<"all" | "error" | "tutorial" | "tool" | "category">("all");
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const hits = searchContent(query, 50);
      setResults(hits);
    } else {
      setResults([]);
    }
  }, [query]);

  const filteredResults = results.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  const getTypeIcon = (type: SearchItem["type"]) => {
    switch (type) {
      case "tool":
        return <Wrench className="w-4 h-4 text-teal-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "tutorial":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "category":
        return <Folder className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Search DevFixHub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Find solutions across 50 developer errors, 30 programming guides, 10 free tools, and 12 categories.
        </p>
      </div>

      {/* Input box */}
      <div className="relative max-w-2xl">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search errors, tools, tutorials..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 dark:border-slate-800 pb-4 text-xs">
        <span className="text-slate-400 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: "all", label: `All (${results.length})` },
          { id: "error", label: `Errors (${results.filter((r) => r.type === "error").length})` },
          { id: "tool", label: `Tools (${results.filter((r) => r.type === "tool").length})` },
          { id: "tutorial", label: `Tutorials (${results.filter((r) => r.type === "tutorial").length})` },
          { id: "category", label: `Categories (${results.filter((r) => r.type === "category").length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as typeof filterType)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterType === tab.id
                ? "bg-teal-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.length > 0 && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            {filteredResults.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="group flex items-start justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2 ml-4" />
              </Link>
            ))}
          </div>
        )}

        {query.trim() && filteredResults.length === 0 && (
          <div className="py-16 text-center space-y-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No results found for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn&apos;t find any articles or tools matching that exact phrase. Try searching for a broader term like &quot;React&quot;, &quot;Spring&quot;, &quot;Docker&quot;, or &quot;JSON&quot;.
            </p>
          </div>
        )}

        {!query.trim() && (
          <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
            Start typing above to search our entire library of solutions.
          </div>
        )}
      </div>
    </div>
  );
}
