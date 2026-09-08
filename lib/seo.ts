import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "DevFixHub",
  tagline: "Fix Errors. Build Better.",
  description: "Practical developer solutions, troubleshooting guides and free online developer tools.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://devfixhub.com",
  author: "DevFixHub Editorial Team",
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/lasithadilshan/DevFixHub",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com",
  }
};

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  canonicalUrl,
  ogType = "website",
}: {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article";
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`;
  const url = canonicalUrl ? `${SITE_CONFIG.url}${canonicalUrl}` : SITE_CONFIG.url;

  return {
    title: fullTitle,
    description,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@devfixhub",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = SITE_CONFIG.author,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "url": url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": author,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`,
    },
  };
}

export function generateFAQSchema(faqItems: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}

export function generateToolSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };
}
