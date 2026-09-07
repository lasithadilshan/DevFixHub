"use client";

import { useState } from "react";
import { Download, Sparkles, Minimize2, Trash2, ShieldCheck, AlertTriangle } from "lucide-react";
import CopyButton from "../CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState<string>(
    '{\n  "name": "DevFixHub",\n  "tools": 10,\n  "fast": true,\n  "tags": ["developer", "seo", "tools"]\n}'
  );
  const [output, setOutput] = useState<string>("");
  const [indent, setIndent] = useState<number | string>(2);
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const space = indent === "tab" ? "\t" : Number(indent);
      const formatted = JSON.stringify(parsed, null, space);
      setOutput(formatted);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid JSON format";
      setError(msg);
      setOutput("");
    }
  };

  const minifyJson = () => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid JSON format";
      setError(msg);
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "devfixhub-formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(output).length;

  return (
    <div className="w-full space-y-4">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span>Your input is processed locally in your browser and is not sent to our server.</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={formatJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Format JSON
          </button>
          <button
            onClick={minifyJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Minify
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span>Indent:</span>
            <select
              value={indent}
              onChange={(e) => setIndent(e.target.value === "tab" ? "tab" : Number(e.target.value))}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </label>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Error parsing JSON: {error}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Raw Input JSON</span>
            <span>{inputBytes} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            rows={14}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span>Formatted Output</span>
              {output && <span className="text-slate-400">({outputBytes} bytes)</span>}
            </div>
            <div className="flex items-center gap-2">
              {output && (
                <>
                  <button
                    onClick={downloadJson}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                    title="Download formatted JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <CopyButton text={output} />
                </>
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted result will appear here after clicking Format or Minify..."
            rows={14}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
