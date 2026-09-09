import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "DevFixHub",
  tagline: "Developer Tools, Tutorials & Error Fixes",
  defaultTitle: "DevFixHub – Developer Tools, Tutorials & Error Fixes",
  description: "Free developer tools, practical programming tutorials, and solutions to common software development errors.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://devfixhub.vercel.app").replace(/\/+$/, ""),
  author: "DevFixHub Editorial Team",
  creator: "DevFixHub",
  publisher: "DevFixHub",
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/lasithadilshan/DevFixHub",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com",
  },
};

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  canonicalUrl,
  ogType = "website",
  noindex = false,
}: {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
} = {}): Metadata {
  const ogTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.defaultTitle;

  const url = canonicalUrl
    ? `${SITE_CONFIG.url}${canonicalUrl.startsWith("/") ? canonicalUrl : `/${canonicalUrl}`}`
    : SITE_CONFIG.url;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: title
      ? title
      : {
          default: SITE_CONFIG.defaultTitle,
          template: `%s | ${SITE_CONFIG.name}`,
        },
    description,
    keywords: [
      "developer tools",
      "programming error fixes",
      "software troubleshooting",
      "code solutions",
      "developer tutorials",
      "JSON formatter",
      "regex tester",
      "base64 encoder",
      "Spring Boot",
      "React",
      "Next.js",
      "Docker",
      "Kubernetes",
    ],
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      creator: "@devfixhub",
      site: "@devfixhub",
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : {
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

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/icon`,
    "sameAs": [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin].filter(Boolean),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const normalizedItems = items[0]?.name === "Home" || items[0]?.url === "/"
    ? items
    : [{ name: "Home", url: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": normalizedItems.map((item, index) => ({
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
