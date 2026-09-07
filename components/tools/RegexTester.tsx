"use client";

import { useState, useMemo } from "react";
import { Code2, ShieldCheck, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import CopyButton from "../CopyButton";

interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})");
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false,
    u: true,
  });
  const [testText, setTestText] = useState<string>(
    "Contact our engineering team at support@devfixhub.com or admin@example.org for quick assistance."
  );

  const activeFlagsString = Object.entries(flags)
    .filter(([, active]) => active)
    .map(([flag]) => flag)
    .join("");

  const { matches, error } = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null };
    }
    try {
      const regex = new RegExp(pattern, activeFlagsString);
      const results: RegexMatch[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        let iteration = 0;
        // Safeguard against infinite loop on zero-length matches
        while ((m = regex.exec(testText)) !== null && iteration < 500) {
          results.push({
            index: m.index,
            match: m[0],
            groups: m.slice(1),
          });
          if (m[0].length === 0) {
            regex.lastIndex++;
          }
          iteration++;
        }
      } else {
        const m = regex.exec(testText);
        if (m) {
          results.push({
            index: m.index,
            match: m[0],
            groups: m.slice(1),
          });
        }
      }

      return { matches: results, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid Regular Expression";
      return { matches: [], error: msg };
    }
  }, [pattern, activeFlagsString, testText, flags.g]);

  const loadSample = (sample: "email" | "url" | "uuid" | "date") => {
    switch (sample) {
      case "email":
        setPattern("([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})");
        setTestText("Hello user@devfixhub.com and test.user+tag@domain.co.uk");
        break;
      case "url":
        setPattern("(https?:\\/\\/[\\w\\.-]+)(:\\d+)?(\\/[\\w\\.\\/\\?%&=]*)?");
        setTestText("Visit https://devfixhub.com:8080/tools and http://localhost:3000/errors today.");
        break;
      case "uuid":
        setPattern("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}");
        setTestText("Transaction IDs: 123e4567-e89b-12d3-a456-426614174000, 550e8400-e29b-41d4-a716-446655440000");
        break;
      case "date":
        setPattern("(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])");
        setTestText("Created on 2026-09-07 and updated on 2026-12-31.");
        break;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span>Your input is processed locally in your browser and is not sent to our server.</span>
      </div>

      {/* Regex Pattern & Flags Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 focus-within:ring-2 focus-within:ring-teal-500">
            <span className="text-slate-400 font-mono text-sm font-bold">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Insert regex pattern..."
              className="flex-1 px-2 py-1 font-mono text-xs text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none"
            />
            <span className="text-slate-400 font-mono text-sm font-bold">/{activeFlagsString}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {["g", "i", "m", "s", "u"].map((flag) => (
              <label
                key={flag}
                className={`px-2.5 py-1 rounded cursor-pointer font-mono font-medium transition-colors ${
                  flags[flag]
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={flags[flag]}
                  onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                  className="hidden"
                />
                {flag}
              </label>
            ))}
          </div>
        </div>

        {/* Samples Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="text-slate-400">Presets:</span>
            <button
              onClick={() => loadSample("email")}
              className="px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 font-medium"
            >
              Email
            </button>
            <button
              onClick={() => loadSample("url")}
              className="px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 font-medium"
            >
              URL
            </button>
            <button
              onClick={() => loadSample("uuid")}
              className="px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 font-medium"
            >
              UUID
            </button>
            <button
              onClick={() => loadSample("date")}
              className="px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-teal-600 dark:text-teal-400 font-medium"
            >
              Date YYYY-MM-DD
            </button>
          </div>

          <button
            onClick={() => {
              setPattern("");
              setTestText("");
            }}
            className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Regex Error: {error}</span>
        </div>
      )}

      {/* Test String Box */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>Test Text</span>
          <span className="font-semibold text-teal-600 dark:text-teal-400">
            {matches.length} match{matches.length === 1 ? "" : "es"} found
          </span>
        </div>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Paste or type text to test regex against..."
          rows={6}
          className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
          spellCheck={false}
        />
      </div>

      {/* Matches List Table */}
      {matches.length > 0 && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Matched Occurrences & Capture Groups
            </h4>
            <CopyButton text={matches.map((m) => m.match).join("\n")} label="Copy All Matches" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Index</th>
                  <th className="py-2 px-3">Full Match</th>
                  <th className="py-2 px-3">Capture Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {matches.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                    <td className="py-2 px-3 text-slate-400">{i + 1}</td>
                    <td className="py-2 px-3 text-slate-500">{m.index}</td>
                    <td className="py-2 px-3 font-semibold text-teal-600 dark:text-teal-400 break-all">{m.match}</td>
                    <td className="py-2 px-3 text-slate-700 dark:text-slate-300">
                      {m.groups.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {m.groups.map((g, gi) => (
                            <span
                              key={gi}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              Group {gi + 1}: &quot;{g}&quot;
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None</span>
                      )}
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
