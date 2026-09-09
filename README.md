# DevFixHub — Fix Errors. Build Better.

> Practical developer solutions, in-depth troubleshooting guides, and free online developer tools.

[![Live Demo](https://img.shields.io/badge/demo-devfixhub.vercel.app-0070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://devfixhub.vercel.app)
[![Release](https://img.shields.io/badge/release-v1.0.0-10b981?style=for-the-badge)](https://github.com/lasithadilshan/DevFixHub/releases/tag/v1.0.0)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-8b5cf6?style=for-the-badge)](LICENSE)

DevFixHub is a production-quality, fast, lightweight, and SEO-optimized developer portal built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. It is designed from the ground up for high search visibility, zero-latency browser tools, and Google AdSense monetization.

🌐 **Live Website**: [https://devfixhub.vercel.app](https://devfixhub.vercel.app)  
📦 **GitHub Repository**: [https://github.com/lasithadilshan/DevFixHub](https://github.com/lasithadilshan/DevFixHub)  
⚡ **Vercel Project**: [https://vercel.com/lasithadilshans-projects/devfixhub](https://vercel.com/lasithadilshans-projects/devfixhub)

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Development & Build Commands](#development--build-commands)
7. [Environment Variables](#environment-variables)
8. [Developer Tools (100% In-Browser)](#developer-tools-100-in-browser)
9. [Content Management (MDX)](#content-management-mdx)
   - [Adding a New Developer Error Article](#adding-a-new-developer-error-article)
   - [Adding a New Programming Tutorial](#adding-a-new-programming-tutorial)
   - [Adding a New Developer Tool](#adding-a-new-developer-tool)
10. [Google AdSense Monetization Setup](#google-adsense-monetization-setup)
11. [Google Analytics & Search Console Setup](#google-analytics--search-console-setup)
12. [SEO Architecture & Structured Data](#seo-architecture--structured-data)
13. [Deployment to Vercel](#deployment-to-vercel)
14. [Future Roadmap](#future-roadmap)

---

## Project Overview

Modern software engineers spend hours navigating bloated forums, paywalled documentation, and obsolete StackOverflow answers to fix compile-time exceptions and environment bugs. 

DevFixHub provides:
- **50 Complete Developer Error Fixes**: Root causes, terminal commands, and copyable code solutions across Spring Boot, Java, React, Next.js, Angular, Node.js, Python, Docker, Kubernetes, Git, and SQL.
- **30 Practical Programming Tutorials**: Step-by-step guides with architecture tips and best practices.
- **10 Free Online Developer Tools**: Completely private, client-side utilities with zero server transmission.
- **Fast Global Search (⌘K)**: Instant keyboard-driven search indexing errors, tutorials, and tools.
- **AdSense-Ready Architecture**: Layout-shift-free ad slots adhering strictly to Google publisher policies.

---

## Key Features

- **⚡ Blazing Fast Performance**: Static generation (SSG) with instantaneous page transitions.
- **🔒 Privacy Guarantee**: Sensitive strings, tokens, JSON, and regex never leave the client browser.
- **🌙 Dark / Light / System Mode**: Anti-FOUC theme switching respecting modern CSS `color-scheme`.
- **📱 Fully Responsive**: Pixel-perfect typography and controls tested from 320px mobile to 1440px desktop.
- **🔍 Comprehensive SEO**: Dynamic Next.js Metadata API, dynamic `sitemap.ts`, `robots.ts`, and JSON-LD schemas (`TechArticle`, `WebApplication`, `BreadcrumbList`, `FAQPage`).
- **🛡️ Built-in Security**: Hardened HTTP headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), input sanitization, and no client-side secret exposure.

---

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Content Engine**: Local Markdown/MDX with typed frontmatter
- **Testing**: Vitest unit test suite

---

## Project Structure

```
DevFixHub/
├── app/
│   ├── layout.tsx                     # Theme bootstrap, GA4 & AdSense scripts
│   ├── page.tsx                       # Homepage with hero, tools, errors, tutorials
│   ├── not-found.tsx                  # 404 page with navigation fallbacks
│   ├── sitemap.ts                     # Dynamic sitemap (all 100+ routes)
│   ├── robots.ts                      # Search crawler rules
│   ├── errors/
│   │   ├── page.tsx                   # Directory of all 50 error fixes
│   │   └── [slug]/page.tsx            # Detail fix page with code and FAQ
│   ├── tutorials/
│   │   ├── page.tsx                   # Directory of all 30 tutorials
│   │   └── [slug]/page.tsx            # In-depth architectural tutorial page
│   ├── tools/
│   │   ├── page.tsx                   # Grid of all 10 browser tools
│   │   └── [slug]/page.tsx            # Interactive tool runner + guides
│   ├── categories/
│   │   └── [slug]/page.tsx            # Category hub (Spring Boot, React, Docker...)
│   ├── search/
│   │   └── page.tsx                   # Dedicated search results with filters
│   ├── about/page.tsx                 # Mission and philosophy
│   ├── contact/page.tsx               # Contact form and feedback
│   ├── privacy-policy/page.tsx        # GDPR/CCPA & AdSense compliant policy
│   ├── terms/page.tsx                 # Terms of service
│   └── cookie-policy/page.tsx         # Transparent cookie disclosure
├── components/
│   ├── Navbar.tsx                     # Responsive navbar + mobile drawer
│   ├── Footer.tsx                     # Multi-column footer with legal links
│   ├── SearchBar.tsx                  # Search input launcher
│   ├── SearchModal.tsx                # Cmd/Ctrl + K command dialog
│   ├── ThemeToggle.tsx                # Dark / Light theme toggle
│   ├── AdPlaceholder.tsx              # Banner, in-article, and sidebar ad slots
│   ├── CodeBlock.tsx                  # Syntax container with copy button
│   ├── CopyButton.tsx                 # Tooltip copy feedback button
│   ├── Breadcrumb.tsx                 # Schema.org breadcrumb navigation
│   ├── ToolCard.tsx                   # Interactive tool card
│   ├── ErrorCard.tsx                  # Error fix card
│   ├── TutorialCard.tsx               # Tutorial card
│   ├── RelatedContent.tsx             # Automated cross-linking
│   └── tools/                         # 10 Browser-based tools
│       ├── JsonFormatter.tsx
│       ├── JsonValidator.tsx
│       ├── Base64Encoder.tsx
│       ├── Base64Decoder.tsx
│       ├── UuidGenerator.tsx
│       ├── TimestampConverter.tsx
│       ├── UrlEncoder.tsx
│       ├── UrlDecoder.tsx
│       ├── RegexTester.tsx
│       └── MarkdownEditor.tsx
├── content/
│   ├── errors/                        # 50 MDX error articles
│   ├── tutorials/                     # 30 MDX tutorial articles
│   └── categories/                    # 12 JSON category descriptors
├── lib/
│   ├── types.ts                       # Typed TypeScript interfaces
│   ├── content.ts                     # Content loader & cross-linking
│   ├── tools.ts                       # Tool metadata registry
│   ├── categories.ts                  # Category descriptors
│   ├── search.ts                      # Search indexing & scoring engine
│   ├── seo.ts                         # SEO metadata & JSON-LD schemas
│   └── utils.ts                       # Formatting & string utilities
├── tests/
│   └── tools.test.ts                  # Vitest suite covering all 10 tools
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js 18.18+ or 20+ (Node 24 recommended)
- npm 9+

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/lasithadilshan/DevFixHub.git
cd DevFixHub

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## Development & Build Commands

```bash
# Start Next.js development server
npm run dev

# Run Vitest unit tests for all 10 developer tools
npm run test

# Run TypeScript compilation check
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Canonical site URL
NEXT_PUBLIC_SITE_URL=https://devfixhub.com

# Google Analytics 4 Measurement ID (leave blank to disable)
NEXT_PUBLIC_GA_ID=

# Google AdSense Client Publisher ID (e.g. ca-pub-XXXXXXXXXXXXXXXX)
NEXT_PUBLIC_ADSENSE_CLIENT=

# Social Media Links
NEXT_PUBLIC_GITHUB_URL=https://github.com/lasithadilshan/DevFixHub
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/devfixhub
```

---

## Developer Tools (100% In-Browser)

Every tool processes inputs locally within the browser:

1. **JSON Formatter**: Format (2 spaces, 4 spaces, tabs), minify, byte comparison, download .json, copy.
2. **JSON Validator**: High-precision syntax validation with line and column coordinates.
3. **Base64 Encoder**: Standard and URL-safe Base64 encoding with UTF-8 support.
4. **Base64 Decoder**: Safe Base64 decoding with padding recovery and character checks.
5. **UUID Generator**: RFC 4122 v4 generator (1, 5, 10, 20 items), uppercase and hyphen toggles.
6. **Timestamp Converter**: Bi-directional epoch seconds/ms <-> ISO/UTC/Local dates + live clock.
7. **URL Encoder**: Component vs Full URI percent-encoding.
8. **URL Decoder**: Percent-decoding with query parameters inspector table.
9. **Regex Tester**: Live regex evaluation, flags (g, i, m, s, u), match counter, and capture group tables.
10. **Markdown Editor**: Split-screen live preview, formatting toolbar, word count, .md and .html export.

---

## Content Management (MDX)

Content is stored as local `.mdx` files in `content/errors/` and `content/tutorials/`.

### Adding a New Developer Error Article
1. Create `content/errors/<slug>.mdx`:
```markdown
---
title: "Docker Out of Memory Error (Exit Code 137)"
description: "Fix container exit code 137 by adjusting Linux memory limits and JVM heaps."
slug: "docker-out-of-memory-exit-code-137"
category: "Docker"
tags: ["docker", "memory", "devops"]
date: "2026-03-01"
author: "DevFixHub Core Team"
readingTime: "4 min"
errorCode: "Exited (137) 2 seconds ago"
---

# Docker Out of Memory Error (Exit Code 137)
...
```
2. Add the corresponding entry to `lib/data/errors-batch3.ts`.

### Adding a New Programming Tutorial
1. Create `content/tutorials/<slug>.mdx`:
```markdown
---
title: "Mastering Next.js Server Components"
description: "Learn when to use React Server Components vs Client Components."
slug: "mastering-nextjs-server-components"
category: "React"
tags: ["nextjs", "react", "ssr"]
date: "2026-03-01"
author: "DevFixHub Core Team"
readingTime: "8 min"
difficulty: "Intermediate"
---

# Mastering Next.js Server Components
...
```
2. Add the entry to `lib/data/tutorials-batch2.ts`.

---

## Google AdSense Monetization Setup

DevFixHub includes production-ready AdSense architecture in `components/AdPlaceholder.tsx`:
- During development (or when `NEXT_PUBLIC_ADSENSE_CLIENT` is unset), clean zero-shift placeholder boxes are shown.
- In production, setting `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` automatically injects the Google AdSense script and renders responsive `<ins class="adsbygoogle">` ad tags.
- Ad slots:
  - `AdBanner`: Horizontal banners (`min-h-[90px]`) between major content blocks.
  - `AdInArticle`: In-article responsive slots (`min-h-[250px]`) placed below primary solution steps.
  - `AdSidebar`: Sticky sidebar slots (`min-h-[280px]`) on desktop views.

---

## Google Analytics & Search Console Setup

1. **Google Analytics 4**: Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `.env.local`. DevFixHub automatically tracks page views and navigation events without logging user tool inputs.
2. **Google Search Console**:
   - Verify ownership via DNS TXT record or HTML tag.
   - Submit your dynamic sitemap URL: `https://devfixhub.com/sitemap.xml`.
   - Googlebot automatically discovers all 100+ pages from `app/sitemap.ts` and `app/robots.ts`.

---

## Deployment to Vercel

DevFixHub is deployed and running live on **Vercel**:

- 🌐 **Live Production URL**: [https://devfixhub.vercel.app](https://devfixhub.vercel.app)
- ⚡ **Direct Deployment**: [https://devfixhub-5mpua17jz-lasithadilshans-projects.vercel.app](https://devfixhub-5mpua17jz-lasithadilshans-projects.vercel.app)
- 📊 **Vercel Project Dashboard**: [https://vercel.com/lasithadilshans-projects/devfixhub](https://vercel.com/lasithadilshans-projects/devfixhub)

### Deploying Updates / Your Own Fork

```bash
# Deploy to preview
npx vercel

# Deploy directly to production
npx vercel --prod
```

### Production Environment Variables (Vercel Project Settings)
Configure in **Settings → Environment Variables**:
- `NEXT_PUBLIC_SITE_URL`: `https://devfixhub.vercel.app` (or your custom domain)
- `NEXT_PUBLIC_ADSENSE_CLIENT`: `ca-pub-XXXXXXXXXXXXXXXX` (optional, for Google AdSense monetization)
- `NEXT_PUBLIC_GA_ID`: `G-XXXXXXXXXX` (optional, for Google Analytics 4)

---

## License

MIT © [DevFixHub](https://devfixhub.com). Free for developers everywhere.
