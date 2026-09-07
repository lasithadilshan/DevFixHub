import Link from "next/link";
import {
  Braces,
  CheckCircle2,
  Binary,
  FileCode,
  Fingerprint,
  Clock,
  Link as LinkIcon,
  Unlink,
  Code2,
  FileText,
  Wrench,
  ArrowRight
} from "lucide-react";
import { DevTool } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Braces,
  CheckCircle2,
  Binary,
  FileCode,
  Fingerprint,
  Clock,
  Link: LinkIcon,
  Unlink,
  Code2,
  FileText,
};

export default function ToolCard({ tool }: { tool: DevTool }) {
  const IconComponent = iconMap[tool.icon] || Wrench;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-200/60 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <IconComponent className="w-5 h-5" />
          </div>
          {tool.badge && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {tool.name}
        </h3>

        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-700 dark:text-slate-300">{tool.category}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
          Open Tool <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
