"use client";

import { useState } from "react";
import { ShieldCheck, FileCode, Trash2, AlertTriangle } from "lucide-react";
import CopyButton from "../CopyButton";

export default function Base64Decoder() {
  const [input, setInput] = useState<string>("SGVsbG8sIERldkZpeEh1YiEg8J+agA==");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const decodeBase64 = (val = input) => {
    setError(null);
    if (!val.trim()) {
      setOutput("");
      return;
    }
    try {
      // Normalize URL-safe Base64
      let sanitized = val.trim().replace(/-/g, "+").replace(/_/g, "/");
      while (sanitized.length % 4 !== 0) {
        sanitized += "=";
      }

      const binary = atob(sanitized);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decoded = new TextDecoder("utf-8").decode(bytes);
      setOutput(decoded);
    } catch {
      setError("Invalid Base64 string. Please verify the characters and padding.");
      setOutput("");
    }
  };

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
            onClick={() => decodeBase64()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-sm"
          >
            <FileCode className="w-3.5 h-3.5" />
            Decode Base64
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setError(null);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        {output && <CopyButton text={output} label="Copy Decoded Text" />}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Base64 Encoded Input</span>
            <span>{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              decodeBase64(e.target.value);
            }}
            placeholder="Paste Base64 string to decode..."
            rows={10}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Decoded Plain Text</span>
            {output && <span>{output.length} chars</span>}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Decoded text will appear here..."
            rows={10}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
