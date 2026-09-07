"use client";

import { useEffect, useRef } from "react";

interface AdProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdBanner({ slotId = "default-banner", className = "" }: AdProps) {
  return <AdPlaceholder type="banner" slotId={slotId} className={className} />;
}

export function AdInArticle({ slotId = "default-in-article", className = "" }: AdProps) {
  return <AdPlaceholder type="in-article" slotId={slotId} className={className} />;
}

export function AdSidebar({ slotId = "default-sidebar", className = "" }: AdProps) {
  return <AdPlaceholder type="sidebar" slotId={slotId} className={className} />;
}

export default function AdPlaceholder({
  type = "banner",
  slotId,
  className = "",
}: {
  type?: "banner" | "in-article" | "sidebar";
  slotId?: string;
  className?: string;
}) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isLoaded = useRef(false);

  useEffect(() => {
    if (adClient && typeof window !== "undefined" && !isLoaded.current) {
      try {
        // @ts-expect-error Google adsbygoogle array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch {
        // Silently catch adblocker or insertion error
      }
    }
  }, [adClient]);

  // Dimension helpers to maintain layout stability (CLS prevention)
  const sizeClasses = {
    banner: "w-full min-h-[90px] max-h-[120px]",
    "in-article": "w-full min-h-[250px] max-w-2xl mx-auto my-8",
    sidebar: "w-full min-h-[280px] max-w-[336px] mx-auto",
  }[type];

  // If real AdSense client ID is provided, render the official Google AdSense tag
  if (adClient) {
    return (
      <aside
        aria-label="Advertisement"
        className={`my-6 flex flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-100/50 dark:bg-slate-900/50 p-2 text-center text-xs text-slate-400 ${sizeClasses} ${className}`}
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
          Advertisement
        </span>
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={slotId || "0000000000"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Development & fallback placeholder with zero CLS layout container
  return (
    <aside
      aria-label="Advertisement placeholder"
      className={`my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-center transition-colors ${sizeClasses} ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
        <span className="text-xs text-slate-400/80 dark:text-slate-500/80">
          DevFixHub Sponsored Content Slot
        </span>
      </div>
    </aside>
  );
}
