import Link from "next/link";
import { BookOpen, ArrowRight, Clock, GraduationCap } from "lucide-react";
import { TutorialArticle } from "@/lib/types";

export default function TutorialCard({ tutorial }: { tutorial: TutorialArticle }) {
  const difficultyColors = {
    Beginner: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
    Intermediate: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
    Advanced: "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800",
  }[tutorial.difficulty] || "text-slate-700 bg-slate-100 border-slate-200";

  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${difficultyColors}`}>
            {tutorial.difficulty}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{tutorial.readingTime}</span>
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
          {tutorial.title}
        </h3>

        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tutorial.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700 dark:text-slate-400">{tutorial.category}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
          Read Guide <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
