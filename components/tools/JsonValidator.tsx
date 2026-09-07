"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ShieldCheck, Trash2, HelpCircle } from "lucide-react";
import CopyButton from "../CopyButton";

export default function JsonValidator() {
  const [input, setInput] = useState<string>('{\n  "service": "DevFixHub",\n  "status": "online",\n  "version": 1\n}');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean | null;
    message: string;
    line?: number;
    column?: number;
  }>({ isValid: null, message: "" });

  const validateJson = () => {
    if (!input.trim()) {
      setValidationResult({ isValid: null, message: "Please enter JSON to validate." });
      return;
    }
    try {
      JSON.parse(input);
      setValidationResult({
        isValid: true,
        message: "Valid JSON! Conforms strictly to RFC 8259 syntax specifications.",
      });
    } catch (err: unknown) {
      let line: number | undefined;
      let column: number | undefined;
      let msg = "Invalid JSON syntax.";

      if (err instanceof Error) {
        msg = err.message;
        // Parse "at line X column Y" or "position Z"
        const lineMatch = msg.match(/line (\d+) column (\d+)/);
        if (lineMatch) {
          line = parseInt(lineMatch[1], 10);
          column = parseInt(lineMatch[2], 10);
        } else {
          const posMatch = msg.match(/position (\d+)/);
          if (posMatch) {
            const pos = parseInt(posMatch[1], 10);
            const lines = input.slice(0, pos).split("\n");
            line = lines.length;
            column = lines[lines.length - 1].length + 1;
          }
        }
      }

      setValidationResult({
        isValid: false,
        message: msg,
        line,
        column,
      });
    }
  };

  const loadSample = (type: "valid" | "invalid") => {
    if (type === "valid") {
      setInput('{\n  "api": "DevFixHub",\n  "authenticated": false,\n  "endpoints": [\n    "/errors",\n    "/tutorials",\n    "/tools"\n  ]\n}');
    } else {
      setInput('{\n  name: "Unquoted Key",\n  "trailingComma": true,\n}');
    }
    setValidationResult({ isValid: null, message: "" });
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
            onClick={validateJson}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Validate JSON
          </button>
          <button
            onClick={() => loadSample("valid")}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Sample Valid
          </button>
          <button
            onClick={() => loadSample("invalid")}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Sample Invalid
          </button>
          <button
            onClick={() => {
              setInput("");
              setValidationResult({ isValid: null, message: "" });
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        {input && <CopyButton text={input} label="Copy JSON" />}
      </div>

      {/* Result Alert */}
      {validationResult.isValid === true && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">Valid JSON Syntax</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">{validationResult.message}</p>
          </div>
        </div>
      )}

      {validationResult.isValid === false && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">JSON Syntax Error Detected</h4>
            <p className="text-xs font-mono text-red-700 dark:text-red-300">{validationResult.message}</p>
            {validationResult.line && (
              <p className="text-xs font-medium text-red-800 dark:text-red-200">
                Location: Line {validationResult.line}
                {validationResult.column ? `, Column ${validationResult.column}` : ""}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>JSON Input to Validate</span>
          <span>{input.split("\n").length} lines</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (validationResult.isValid !== null) {
              setValidationResult({ isValid: null, message: "" });
            }
          }}
          placeholder="Paste JSON to test syntax..."
          rows={14}
          className="w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-900 dark:text-slate-100 resize-y focus:outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
