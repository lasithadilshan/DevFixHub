"use client";

import { useState, useEffect, useRef, useId } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Wrench, AlertCircle, BookOpen, Folder, ArrowRight, CornerDownLeft } from "lucide-react";
import { searchContent } from "@/lib/search";
import { SearchItem } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle global Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim()) {
      const hits = searchContent(query, 8);
      setResults(hits);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    router.push(item.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (query.trim()) {
        onClose();
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  if (!isOpen) return null;

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">Search DevFixHub Content</h2>
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search 50 errors, 30 tutorials, 10 free tools, and categories..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            aria-label="Search site content"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.trim() && results.length > 0 && (
            <div className="space-y-1">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-100"
                        : "hover:bg-slate-50 dark:hover:bg-slate-850/60 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-500">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <CornerDownLeft className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-teal-600 dark:text-teal-400" : "text-transparent"}`} />
                  </div>
                );
              })}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="mt-1">Try searching for &quot;Spring Boot&quot;, &quot;React map&quot;, &quot;JSON&quot;, or &quot;Docker&quot;.</p>
            </div>
          )}

          {!query.trim() && (
            <div className="p-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Popular Quick Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Port 8080 in Use", q: "port 8080" },
                  { label: "React map is not a function", q: "map is not a function" },
                  { label: "JSON Formatter", q: "json formatter" },
                  { label: "Docker Exit 137", q: "docker container exited" },
                  { label: "Kubernetes CrashLoopBackOff", q: "crashloopbackoff" },
                  { label: "CORS Error", q: "cors" },
                  { label: "UUID Generator", q: "uuid" },
                  { label: "FastAPI REST API", q: "fastapi" }
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setQuery(s.q)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to navigate</span>
            <span><kbd className="font-mono">ENTER</kbd> to select</span>
          </div>
          {query.trim() && (
            <button
              onClick={() => {
                onClose();
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }}
              className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              See all results <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
