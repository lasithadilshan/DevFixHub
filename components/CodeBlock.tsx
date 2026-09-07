"use client";

import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "text", filename }: CodeBlockProps) {
  const cleanCode = code.trim();

  return (
    <div className="relative my-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </span>
          {filename && <span className="ml-2 text-slate-300 font-medium">{filename}</span>}
          {!filename && <span className="uppercase text-[10px] tracking-wider text-slate-500">{language}</span>}
        </div>
        <CopyButton text={cleanCode} />
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed selection:bg-teal-500/30">
        <pre className="m-0">
          <code>{cleanCode}</code>
        </pre>
      </div>
    </div>
  );
}
