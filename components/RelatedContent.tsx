import Link from "next/link";
import { AlertCircle, BookOpen, Wrench, ArrowRight } from "lucide-react";
import { ErrorArticle, TutorialArticle, DevTool } from "@/lib/types";

interface RelatedContentProps {
  errors?: ErrorArticle[];
  tutorials?: TutorialArticle[];
  tools?: DevTool[];
}

export default function RelatedContent({ errors = [], tutorials = [], tools = [] }: RelatedContentProps) {
  if (errors.length === 0 && tutorials.length === 0 && tools.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Related Developer Solutions & Tools
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.length > 0 && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
            <div className="flex items-center gap-2 mb-3 text-teal-600 dark:text-teal-400 font-semibold text-sm">
              <Wrench className="w-4 h-4" />
              <span>Recommended Tools</span>
            </div>
            <ul className="space-y-2.5">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="group block text-xs hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {tool.name}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 line-clamp-1">{tool.shortDescription}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {errors.length > 0 && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
            <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Related Error Fixes</span>
            </div>
            <ul className="space-y-2.5">
              {errors.map((error) => (
                <li key={error.slug}>
                  <Link
                    href={`/errors/${error.slug}`}
                    className="group block text-xs hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                      {error.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">{error.category}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tutorials.length > 0 && (
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
            <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-semibold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>In-Depth Tutorials</span>
            </div>
            <ul className="space-y-2.5">
              {tutorials.map((tutorial) => (
                <li key={tutorial.slug}>
                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="group block text-xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                      {tutorial.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px]">{tutorial.difficulty} • {tutorial.readingTime}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
