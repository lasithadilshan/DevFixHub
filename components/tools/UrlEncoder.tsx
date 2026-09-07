"use client";

import { useState } from "react";
import { Link, ShieldCheck, Trash2 } from "lucide-react";
import CopyButton from "../CopyButton";

export default function UrlEncoder() {
  const [input, setInput] = useState<string>("https://devfixhub.com/search?query=react hydration & filters=true");
  const [mode, setMode] = useState<"component" | "full">("component");
  const [output, setOutput] = useState<string>("");

  const handleEncode = (val = input, encodeMode = mode) => {
    if (!val) {
      setOutput("");
      return;
    }
    try {
      if (encodeMode === "component") {
        setOutput(encodeURIComponent(val));
      } else {
        setOutput(encodeURI(val));
      }
    } catch {
      setOutput("Error encoding URL string.");
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
            onClick={() => handleEncode()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-sm"
          >
            <Link className="w-3.5 h-3.5" />
            Encode URL
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="radio"
              name="mode"
              checked={mode === "component"}
              onChange={() => {
                setMode("component");
                handleEncode(input, "component");
              }}
              className="text-teal-600 focus:ring-teal-500"
            />
            <span>encodeURIComponent (Query params)</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="radio"
              name="mode"
              checked={mode === "full"}
              onChange={() => {
                setMode("full");
                handleEncode(input, "full");
              }}
              className="text-teal-600 focus:ring-teal-500"
            />
            <span>encodeURI (Full URL)</span>
          </label>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Plain URL / Text Input</span>
            <span>{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleEncode(e.target.value, mode);
            }}
            placeholder="Type or paste URL to encode..."
            rows={10}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Percent-Encoded Output</span>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Encoded URL will appear here..."
            rows={10}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
