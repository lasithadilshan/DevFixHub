export interface FAQItem {
  question: string;
  answer: string;
}

export interface ErrorArticle {
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  date: string;
  updated?: string;
  author: string;
  readingTime: string;
  errorCode?: string;
  problem: string;
  causes: string[];
  solutionSteps: {
    title: string;
    description: string;
    command?: string;
    code?: string;
    language?: string;
  }[];
  alternatives?: {
    title: string;
    description: string;
    code?: string;
  }[];
  commonMistakes: string[];
  preventionTips: string[];
  faq: FAQItem[];
  relatedErrors?: string[];
  relatedTutorials?: string[];
  relatedTools?: string[];
  content?: string;
}

export interface TutorialArticle {
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  date: string;
  updated?: string;
  author: string;
  readingTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites: string[];
  sections: {
    title: string;
    content: string;
    command?: string;
    code?: string;
    language?: string;
  }[];
  bestPractices: string[];
  commonMistakes: string[];
  faq: FAQItem[];
  relatedErrors?: string[];
  relatedTutorials?: string[];
  relatedTools?: string[];
  content?: string;
}

export interface DevTool {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  icon: string;
  badge?: string;
  features: string[];
  privacyNotice: string;
  howToUse: {
    step: string;
    instruction: string;
  }[];
  faq: FAQItem[];
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "error" | "tutorial" | "tool" | "category";
  category: string;
  tags: string[];
}
