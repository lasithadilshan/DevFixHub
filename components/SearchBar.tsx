"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export default function SearchBar({
  placeholder = "Search errors, tools and tutorials...",
  className = "",
  compact = false,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative flex items-center cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all ${
          compact ? "px-3 py-1.5 text-xs w-full max-w-xs" : "px-4 py-3 text-sm w-full max-w-xl"
        } ${className}`}
      >
        <Search className={`text-slate-400 group-hover:text-teal-500 transition-colors ${compact ? "w-4 h-4 mr-2" : "w-5 h-5 mr-3"}`} />
        <span className="flex-1 truncate text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
          {placeholder}
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-md">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
