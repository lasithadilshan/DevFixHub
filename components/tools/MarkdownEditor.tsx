"use client";

import { useState, useId } from "react";
import {
  Heading1,
  Heading2,
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Download,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import CopyButton from "../CopyButton";

const INITIAL_MD = `# Welcome to DevFixHub Markdown Editor

Write, preview, and format your technical documentation and error fix guides in real time!

## Key Features
- **Split-Screen Live Preview**: Instant client-side typography rendering
- *Rich Text Formatting*: Headers, lists, quotes, and inline code
- \`Zero Latency\`: Runs 100% locally in your browser

### Quick Code Example
\`\`\`typescript
function solveError(problem: string): string {
  return \`DevFixHub solution for: \${problem}\`;
}
\`\`\`

> "Fix Errors. Build Better Software." — DevFixHub

Enjoy writing clean markdown!
`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MD);

  const insertTag = (before: string, after = "") => {
    const textarea = document.getElementById("md-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = `${before}${selected || "text"}${after}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected.length || 4));
    }, 10);
  };

  const downloadFile = (format: "md" | "html") => {
    let content = markdown;
    let mime = "text/markdown";
    let filename = "document.md";

    if (format === "html") {
      content = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>DevFixHub Export</title><style>body{font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:40px auto;line-height:1.6;padding:0 20px;}code{background:#f1f5f9;padding:2px 4px;border-radius:4px;}pre{background:#0f172a;color:#f8fafc;padding:16px;border-radius:8px;overflow-x:auto;}blockquote{border-left:4px solid #14b8a6;margin:0;padding-left:16px;color:#64748b;}</style></head><body>${renderHtmlPreview(markdown)}</body></html>`;
      mime = "text/html";
      filename = "document.html";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Safe lightweight client-side markdown to HTML renderer
  const renderHtmlPreview = (md: string): string => {
    let html = md
      // Escape basic HTML entities
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Fenced code blocks
      .replace(/```([\s\S]*?)```/g, (_match, code) => {
        return `<pre class="my-3 p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto"><code>${code.trim()}</code></pre>`;
      })
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-teal-600 dark:text-teal-400">$1</code>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-teal-500 pl-3 my-2 text-slate-600 dark:text-slate-400 italic">$1</blockquote>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-5 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">$1</h1>')
      // Bold & Italic
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-600 dark:text-teal-400 underline hover:no-underline">$1</a>')
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>')
      // Numbered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 dark:text-slate-300">$1</li>')
      // Paragraph breaks
      .replace(/\n\n/g, '<p class="my-2 text-slate-700 dark:text-slate-300"></p>');

    return html;
  };

  const wordsCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const charsCount = markdown.length;

  return (
    <div className="w-full space-y-4">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span>Your input is processed locally in your browser and is not sent to our server.</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertTag("# ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTag("## ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />
          <button
            onClick={() => insertTag("**", "**")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTag("*", "*")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTag("`", "`")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />
          <button
            onClick={() => insertTag("- ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTag("1. ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTag("> ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertTag("[", "](https://example.com)")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMarkdown(INITIAL_MD)}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            title="Reset to Sample"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <CopyButton text={markdown} label="Copy MD" />
          <button
            onClick={() => downloadFile("md")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.MD</span>
          </button>
          <button
            onClick={() => downloadFile("html")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.HTML</span>
          </button>
        </div>
      </div>

      {/* Split-screen Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor Pane */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Markdown Source</span>
            <span>{wordsCount} words | {charsCount} chars</span>
          </div>
          <textarea
            id="md-textarea"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={18}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Live Preview Pane */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Live Rendered Preview</span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold">Real-time</span>
          </div>
          <div
            className="p-5 overflow-y-auto max-h-[500px] text-xs leading-relaxed text-slate-800 dark:text-slate-200 selection:bg-teal-500/30"
            dangerouslySetInnerHTML={{ __html: renderHtmlPreview(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
