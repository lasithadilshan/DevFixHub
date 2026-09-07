"use client";

import { useState, useEffect } from "react";
import { Clock, ShieldCheck, Pause, Play, ArrowDown, ArrowUp } from "lucide-react";
import CopyButton from "../CopyButton";

export default function TimestampConverter() {
  const [currentSec, setCurrentSec] = useState<number>(Math.floor(Date.now() / 1000));
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Epoch to Date inputs & results
  const [epochInput, setEpochInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [parsedUtc, setParsedUtc] = useState<string>("");
  const [parsedLocal, setParsedLocal] = useState<string>("");
  const [parsedIso, setParsedIso] = useState<string>("");
  const [parsedRelative, setParsedRelative] = useState<string>("");

  // Date to Epoch inputs & results
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 16));
  const [targetEpochSec, setTargetEpochSec] = useState<number>(0);
  const [targetEpochMs, setTargetEpochMs] = useState<number>(0);

  // Ticking current timestamp
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Convert Epoch to Formatted Date
  const convertEpoch = (val = epochInput) => {
    if (!val.trim()) {
      setParsedUtc("");
      setParsedLocal("");
      setParsedIso("");
      setParsedRelative("");
      return;
    }
    const num = Number(val.trim());
    if (isNaN(num)) return;

    // Check if input is in seconds (10 digits) or milliseconds (13 digits)
    const ms = val.trim().length >= 12 ? num : num * 1000;
    const d = new Date(ms);

    if (isNaN(d.getTime())) {
      setParsedUtc("Invalid Date");
      setParsedLocal("Invalid Date");
      setParsedIso("Invalid Date");
      return;
    }

    setParsedUtc(d.toUTCString());
    setParsedLocal(d.toString());
    setParsedIso(d.toISOString());

    // Relative calculation
    const diffSec = Math.round((Date.now() - d.getTime()) / 1000);
    if (Math.abs(diffSec) < 60) {
      setParsedRelative("Just now");
    } else if (diffSec > 0) {
      const minutes = Math.floor(diffSec / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) setParsedRelative(`${days} day${days > 1 ? "s" : ""} ago`);
      else if (hours > 0) setParsedRelative(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      else setParsedRelative(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
    } else {
      const minutes = Math.floor(Math.abs(diffSec) / 60);
      setParsedRelative(`in ${minutes} minutes`);
    }
  };

  // Convert Date to Epoch
  const convertDate = (val = dateInput) => {
    if (!val) return;
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      setTargetEpochSec(Math.floor(d.getTime() / 1000));
      setTargetEpochMs(d.getTime());
    }
  };

  useEffect(() => {
    convertEpoch(epochInput);
  }, [epochInput]);

  useEffect(() => {
    convertDate(dateInput);
  }, [dateInput]);

  return (
    <div className="w-full space-y-6">
      {/* Privacy Notice */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span>Your input is processed locally in your browser and is not sent to our server.</span>
      </div>

      {/* Live Ticking Current Epoch */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-teal-200 dark:border-teal-800/80 bg-teal-50/50 dark:bg-teal-950/30">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-pulse" />
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">The Current Unix Epoch Timestamp</div>
            <div className="text-2xl font-mono font-bold text-teal-700 dark:text-teal-300">
              {currentSec}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title={isPaused ? "Resume Live Clock" : "Pause Live Clock"}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-500" /> : <Pause className="w-4 h-4" />}
          </button>
          <CopyButton text={currentSec.toString()} label="Copy Timestamp" />
          <button
            onClick={() => {
              setEpochInput(currentSec.toString());
              convertEpoch(currentSec.toString());
            }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors"
          >
            Use in Converter
          </button>
        </div>
      </div>

      {/* Mode 1: Timestamp -> Human Date */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <ArrowDown className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Convert Unix Epoch Timestamp to Human Date
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            placeholder="e.g. 1741368000 (seconds) or 1741368000000 (ms)"
            className="flex-1 min-w-[240px] px-3.5 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => convertEpoch(epochInput)}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors"
          >
            Convert
          </button>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>GMT / UTC Format</span>
              {parsedUtc && <CopyButton text={parsedUtc} />}
            </div>
            <div className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100 break-all">
              {parsedUtc || "Enter timestamp"}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Local System Time</span>
              {parsedLocal && <CopyButton text={parsedLocal} />}
            </div>
            <div className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100 break-all">
              {parsedLocal || "Enter timestamp"}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>ISO 8601</span>
              {parsedIso && <CopyButton text={parsedIso} />}
            </div>
            <div className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100 break-all">
              {parsedIso || "Enter timestamp"}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Relative Time</span>
            </div>
            <div className="font-mono text-xs font-medium text-teal-600 dark:text-teal-400">
              {parsedRelative || "Enter timestamp"}
            </div>
          </div>
        </div>
      </div>

      {/* Mode 2: Date -> Epoch */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <ArrowUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Convert Human Date & Time to Unix Timestamp
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="px-3.5 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => convertDate(dateInput)}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors"
          >
            Convert
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Unix Timestamp (Seconds)</span>
              {targetEpochSec > 0 && <CopyButton text={targetEpochSec.toString()} />}
            </div>
            <div className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
              {targetEpochSec}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Unix Timestamp (Milliseconds)</span>
              {targetEpochMs > 0 && <CopyButton text={targetEpochMs.toString()} />}
            </div>
            <div className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
              {targetEpochMs}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
