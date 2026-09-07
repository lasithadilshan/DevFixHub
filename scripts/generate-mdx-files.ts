import fs from "fs";
import path from "path";
import { ALL_ERRORS } from "../lib/data/errors.ts";
import { ALL_TUTORIALS } from "../lib/data/tutorials.ts";
import { CATEGORIES } from "../lib/categories.ts";

const errorsDir = path.join(process.cwd(), "content", "errors");
const tutorialsDir = path.join(process.cwd(), "content", "tutorials");
const categoriesDir = path.join(process.cwd(), "content", "categories");

fs.mkdirSync(errorsDir, { recursive: true });
fs.mkdirSync(tutorialsDir, { recursive: true });
fs.mkdirSync(categoriesDir, { recursive: true });

// Export Errors to MDX
for (const error of ALL_ERRORS) {
  const frontmatter = `---
title: "${error.title.replace(/"/g, '\\"')}"
description: "${error.description.replace(/"/g, '\\"')}"
slug: "${error.slug}"
category: "${error.category}"
tags: ${JSON.stringify(error.tags)}
date: "${error.date}"
updated: "${error.updated || error.date}"
author: "${error.author}"
readingTime: "${error.readingTime}"
errorCode: "${(error.errorCode || '').replace(/"/g, '\\"')}"
---

# ${error.title}

${error.description}

${error.errorCode ? `\`\`\`text\n${error.errorCode}\n\`\`\`` : ''}

## Problem Overview

${error.problem}

## Why Does This Happen?

${error.causes.map(c => `- ${c}`).join('\n')}

## Step-by-Step Fix

${error.solutionSteps.map((step, idx) => `### Step ${idx + 1}: ${step.title}\n\n${step.description}\n\n${step.command ? `\`\`\`${step.language || 'bash'}\n${step.command}\n\`\`\`\n` : ''}${step.code ? `\`\`\`${step.language || 'typescript'}\n${step.code}\n\`\`\`\n` : ''}`).join('\n')}

${error.commonMistakes.length > 0 ? `## Common Mistakes to Avoid\n\n${error.commonMistakes.map(m => `- ${m}`).join('\n')}\n` : ''}
${error.preventionTips.length > 0 ? `## Prevention & Best Practices\n\n${error.preventionTips.map(p => `- ${p}`).join('\n')}\n` : ''}

## Frequently Asked Questions

${error.faq.map(f => `### ${f.question}\n\n${f.answer}\n`).join('\n')}
`;

  fs.writeFileSync(path.join(errorsDir, `${error.slug}.mdx`), frontmatter);
}

// Export Tutorials to MDX
for (const tut of ALL_TUTORIALS) {
  const frontmatter = `---
title: "${tut.title.replace(/"/g, '\\"')}"
description: "${tut.description.replace(/"/g, '\\"')}"
slug: "${tut.slug}"
category: "${tut.category}"
tags: ${JSON.stringify(tut.tags)}
date: "${tut.date}"
updated: "${tut.updated || tut.date}"
author: "${tut.author}"
readingTime: "${tut.readingTime}"
difficulty: "${tut.difficulty}"
---

# ${tut.title}

${tut.description}

## Prerequisites
${tut.prerequisites.map(p => `- ${p}`).join('\n')}

${tut.sections.map(s => `## ${s.title}\n\n${s.content}\n\n${s.code ? `\`\`\`${s.language || 'typescript'}\n${s.code}\n\`\`\`\n` : ''}`).join('\n')}

## Best Practices
${tut.bestPractices.map(b => `- ${b}`).join('\n')}

## Common Mistakes
${tut.commonMistakes.map(m => `- ${m}`).join('\n')}

## Frequently Asked Questions
${tut.faq.map(f => `### ${f.question}\n\n${f.answer}\n`).join('\n')}
`;

  fs.writeFileSync(path.join(tutorialsDir, `${tut.slug}.mdx`), frontmatter);
}

// Export Categories metadata
for (const cat of CATEGORIES) {
  const jsonContent = JSON.stringify(cat, null, 2);
  fs.writeFileSync(path.join(categoriesDir, `${cat.slug}.json`), jsonContent);
}

console.log(`Generated ${ALL_ERRORS.length} MDX errors and ${ALL_TUTORIALS.length} MDX tutorials successfully!`);
