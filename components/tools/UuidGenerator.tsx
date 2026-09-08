"use client";

import { useState, useEffect, useCallback } from "react";
import { Fingerprint, RefreshCw, ShieldCheck } from "lucide-react";
import CopyButton from "../CopyButton";

export default function UuidGenerator() {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([]);

  // RFC 4122 v4 UUID generator using crypto API
  const generateV4 = (): string => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback using crypto.getRandomValues
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => {
      const num = Number(c);
      return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
    });
  };

  const generateBatch = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let id = generateV4();
      if (!hyphens) {
        id = id.replace(/-/g, "");
      }
      if (uppercase) {
        id = id.toUpperCase();
      }
      list.push(id);
    }
    setUuids(list);
  }, [count, uppercase, hyphens]);

  useEffect(() => {
    generateBatch();
  }, [generateBatch]);

  return (
    <div className="w-full space-y-4">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span>Your input is processed locally in your browser and is not sent to our server.</span>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={generateBatch}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generate New
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
            <span>Count:</span>
            {[1, 5, 10, 20].map((num) => (
              <button
                key={num}
                onClick={() => setCount(num)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  count === num
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span>Uppercase</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span>Hyphens</span>
          </label>

          {uuids.length > 0 && <CopyButton text={uuids.join("\n")} label="Copy All" />}
        </div>
      </div>

      {/* UUID List Display */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
        {uuids.map((id, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 w-5">
                {index + 1}.
              </span>
              <code className="text-sm font-mono font-medium text-slate-900 dark:text-slate-100 selection:bg-teal-500/30">
                {id}
              </code>
            </div>
            <CopyButton text={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
