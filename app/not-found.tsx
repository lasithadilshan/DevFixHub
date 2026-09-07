import Link from "next/link";
import { AlertCircle, Home, Wrench, BookOpen, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            HTTP 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The solution, tool, or guide you are looking for has either been relocated or does not exist. Check out our main directories below:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <Link
            href="/"
            className="flex flex-col items-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <Home className="w-4 h-4 text-teal-500 mb-1" />
            <span>Home</span>
          </Link>

          <Link
            href="/errors"
            className="flex flex-col items-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <AlertCircle className="w-4 h-4 text-amber-500 mb-1" />
            <span>Errors</span>
          </Link>

          <Link
            href="/tools"
            className="flex flex-col items-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <Wrench className="w-4 h-4 text-teal-500 mb-1" />
            <span>Tools</span>
          </Link>

          <Link
            href="/tutorials"
            className="flex flex-col items-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <BookOpen className="w-4 h-4 text-blue-500 mb-1" />
            <span>Tutorials</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
