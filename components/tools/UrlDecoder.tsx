"use client";

import { useState } from "react";
import { Unlink, ShieldCheck, Trash2, ListFilter } from "lucide-react";
import CopyButton from "../CopyButton";

export default function UrlDecoder() {
  const [input, setInput] = useState<string>(
    "https%3A%2F%2Fdevfixhub.com%2Fsearch%3Fquery%3Dreact%20hydration%26filters%3Dtrue"
  );
  const [decodePlusAsSpace, setDecodePlusAsSpace] = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([]);

  const handleDecode = (val = input, plusToSpace = decodePlusAsSpace) => {
    if (!val) {
      setOutput("");
      setQueryParams([]);
      return;
    }
    try {
      let raw = val;
      if (plusToSpace) {
        raw = raw.replace(/\+/g, "%20");
      }
      const decoded = decodeURIComponent(raw);
      setOutput(decoded);

      // Parse query params if present
      const qIndex = decoded.indexOf("?");
      if (qIndex !== -1) {
        const queryStr = decoded.slice(qIndex + 1).split("#")[0];
        const searchParams = new URLSearchParams(queryStr);
        const paramsList: { key: string; value: string }[] = [];
        searchParams.forEach((value, key) => {
          paramsList.push({ key, value });
        });
        setQueryParams(paramsList);
      } else {
        setQueryParams([]);
      }
    } catch {
      setOutput("Error: Malformed percent-encoded URL sequence.");
      setQueryParams([]);
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
            onClick={() => handleDecode()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-sm"
          >
            <Unlink className="w-3.5 h-3.5" />
            Decode URL
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setQueryParams([]);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={decodePlusAsSpace}
            onChange={(e) => {
              setDecodePlusAsSpace(e.target.checked);
              handleDecode(input, e.target.checked);
            }}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span>Treat &apos;+&apos; as space</span>
        </label>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Encoded Input</span>
            <span>{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleDecode(e.target.value, decodePlusAsSpace);
            }}
            placeholder="Paste percent-encoded URL here..."
            rows={8}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Decoded URL</span>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Decoded output will appear here..."
            rows={8}
            className="w-full p-4 font-mono text-xs leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Query Parameters Inspector Table */}
      {queryParams.length > 0 && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
            <ListFilter className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Extracted Query Parameters ({queryParams.length})</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono">
                  <th className="py-2 px-3">Parameter (Key)</th>
                  <th className="py-2 px-3">Value</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {queryParams.map((param, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 font-mono">
                    <td className="py-2 px-3 font-semibold text-teal-600 dark:text-teal-400">{param.key}</td>
                    <td className="py-2 px-3 text-slate-800 dark:text-slate-200 break-all">{param.value}</td>
                    <td className="py-2 px-3 text-right">
                      <CopyButton text={param.value} label="Copy" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
