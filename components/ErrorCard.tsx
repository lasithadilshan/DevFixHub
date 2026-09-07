import Link from "next/link";
import { AlertCircle, ArrowRight, Clock } from "lucide-react";
import { ErrorArticle } from "@/lib/types";

export default function ErrorCard({ error }: { error: ErrorArticle }) {
  return (
    <Link
      href={`/errors/${error.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {error.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{error.readingTime}</span>
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
          {error.title}
        </h3>

        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {error.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-1">
          {error.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              #{tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 font-medium text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
          View Solution <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
