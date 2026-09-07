import { DevTool } from "./types";

export const DEV_TOOLS: DevTool[] = [
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Format, beautify, and minify JSON with custom indentation, syntax error detection, and stats.",
    fullDescription: "Clean, format, indent, and validate messy JSON strings right in your browser. Supports 2-space, 4-space, and tab indentation, minification, real-time byte calculation, and instant clipboard copying.",
    category: "JSON & Data",
    tags: ["json", "formatter", "beautifier", "minify", "developer-tools"],
    icon: "Braces",
    badge: "Most Popular",
    features: [
      "Custom indentation (2 spaces, 4 spaces, tabs)",
      "One-click JSON minification",
      "Character count and byte size comparison",
      "Line-by-line syntax error identification",
      "One-click copy and file download (.json)",
      "100% Client-side execution without server transmission"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Paste your raw or minified JSON string into the input editor." },
      { step: "2", instruction: "Choose your desired indentation level or click 'Minify'." },
      { step: "3", instruction: "Review the formatted output or any syntax warnings." },
      { step: "4", instruction: "Click 'Copy' or 'Download' to use the cleaned JSON in your project." }
    ],
    faq: [
      {
        question: "Is my JSON data kept private when using this tool?",
        answer: "Yes, DevFixHub processes all JSON formatting and minification directly within your browser's JavaScript engine. Zero data is transmitted to any external server or stored anywhere."
      },
      {
        question: "What is the maximum JSON payload size supported?",
        answer: "Since processing takes place in your browser memory, it comfortably handles payloads up to 20MB without lag."
      },
      {
        question: "What happens if my JSON has invalid syntax?",
        answer: "The formatter will catch the parsing exception and report the exact character and line where the syntax error occurred."
      }
    ]
  },
  {
    id: "json-validator",
    slug: "json-validator",
    name: "JSON Validator",
    shortDescription: "Validate JSON syntax with detailed line, column, and character offset error diagnosis.",
    fullDescription: "Detect syntax errors, missing commas, trailing delimiters, and unquoted keys in your JSON documents with detailed line and column coordinates.",
    category: "JSON & Data",
    tags: ["json", "validator", "linter", "syntax", "debugging"],
    icon: "CheckCircle2",
    badge: "Essential",
    features: [
      "Precise line, column, and position error locator",
      "Standard RFC 8259 JSON syntax compliance check",
      "Formatted structure tree verification",
      "Quick fix error hints (e.g. unquoted keys, trailing commas)",
      "Instant copy and clear controls",
      "Zero telemetry - 100% browser sandbox"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Paste the JSON snippet you want to test into the editor." },
      { step: "2", instruction: "Click the 'Validate JSON' button." },
      { step: "3", instruction: "Check the status banner: green for valid, red with error coordinates if invalid." },
      { step: "4", instruction: "Fix the highlighted issue and re-validate." }
    ],
    faq: [
      {
        question: "Why does JSON validation fail on single quotes?",
        answer: "RFC 8259 strictly requires double quotes (\") for both keys and string values in standard JSON. Single quotes are not valid JSON."
      },
      {
        question: "Does this validator support comments?",
        answer: "Standard JSON does not support comments (// or /* */). If you have JSONC (JSON with comments), strip comments before validating."
      }
    ]
  },
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder",
    shortDescription: "Encode text, strings, and UTF-8 payloads to Base64 format instantly.",
    fullDescription: "Convert standard strings and UTF-8 unicode text to standard RFC 4648 Base64 or URL-safe Base64 with instant live output and clipboard actions.",
    category: "Encoding",
    tags: ["base64", "encoder", "utf8", "binary", "security"],
    icon: "Binary",
    features: [
      "Full UTF-8 Unicode character support",
      "Standard and URL-safe Base64 modes",
      "Live conversion as you type",
      "Raw byte and character length calculation",
      "One-click copy to clipboard",
      "No server transmission guarantees privacy"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Type or paste your text into the input box." },
      { step: "2", instruction: "Select standard Base64 or URL-safe encoding." },
      { step: "3", instruction: "View the generated Base64 output instantly." },
      { step: "4", instruction: "Click 'Copy' to copy the encoded string." }
    ],
    faq: [
      {
        question: "How does UTF-8 encoding work in Base64?",
        answer: "DevFixHub uses the browser's TextEncoder API to convert multi-byte UTF-8 characters into binary bytes before encoding, avoiding character corruption."
      },
      {
        question: "What is URL-safe Base64?",
        answer: "URL-safe Base64 replaces the '+' and '/' characters with '-' and '_' so the string can be placed safely in URL query parameters without percent-encoding."
      }
    ]
  },
  {
    id: "base64-decoder",
    slug: "base64-decoder",
    name: "Base64 Decoder",
    shortDescription: "Decode Base64 strings back to clean readable UTF-8 text with error protection.",
    fullDescription: "Quickly convert Base64 encoded strings back into clean UTF-8 text. Automatically detects URL-safe Base64 variants and flags invalid characters.",
    category: "Encoding",
    tags: ["base64", "decoder", "utf8", "text", "binary"],
    icon: "FileCode",
    features: [
      "Automatic padding detection (= and ==)",
      "Supports both standard and URL-safe Base64 inputs",
      "Safe UTF-8 decoder with error isolation",
      "One-click copy for decoded text",
      "Character length breakdown",
      "100% in-browser processing"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Paste your Base64 encoded string into the input area." },
      { step: "2", instruction: "Click 'Decode Base64'." },
      { step: "3", instruction: "Read the decoded string or inspect invalid character warnings." },
      { step: "4", instruction: "Copy the result with one click." }
    ],
    faq: [
      {
        question: "Why do I see 'Invalid Base64 string'?",
        answer: "Base64 strings must only contain A-Z, a-z, 0-9, +, /, and padding '=' (or '-' and '_' for URL-safe). Any whitespace or illegal characters trigger validation errors."
      }
    ]
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate random cryptographically secure UUID v4 / GUIDs in batches.",
    fullDescription: "Produce RFC 4122 compliant UUID version-4 identifiers using browser crypto.getRandomValues(). Generate 1, 5, 10, or 20 UUIDs with hyphen and uppercase formatting options.",
    category: "Generators",
    tags: ["uuid", "guid", "v4", "generator", "random"],
    icon: "Fingerprint",
    badge: "Fast",
    features: [
      "Cryptographically secure pseudo-random generation (CSPRNG)",
      "Batch generation (1, 5, 10, 20 UUIDs)",
      "Uppercase vs Lowercase toggle",
      "Hyphenated vs Clean toggle",
      "Individual and bulk copy to clipboard",
      "Completely local browser execution"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Select how many UUIDs you need (1, 5, 10, or 20)." },
      { step: "2", instruction: "Toggle uppercase letters or hyphen removal if required." },
      { step: "3", instruction: "Click 'Generate UUIDs' to produce fresh identifiers." },
      { step: "4", instruction: "Click 'Copy All' or copy individual entries." }
    ],
    faq: [
      {
        question: "Are these UUIDs collision-safe?",
        answer: "Yes, UUID v4 has 122 bits of randomness. The probability of generating duplicate UUIDs is mathematically negligible (1 in 2.71 quintillion)."
      }
    ]
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    shortDescription: "Convert between Unix timestamps (seconds & ms) and human-readable UTC/Local dates.",
    fullDescription: "Bi-directional epoch timestamp converter. Convert Unix epoch numbers into ISO 8601, UTC, and local date formats, or convert human date strings into Unix timestamps with a live ticking clock.",
    category: "Time & Date",
    tags: ["timestamp", "epoch", "unix", "date", "time"],
    icon: "Clock",
    features: [
      "Supports both Unix seconds (10 digits) and milliseconds (13 digits)",
      "Dual direction: Timestamp to Date AND Date to Timestamp",
      "Live current timestamp ticker with pause control",
      "Displays ISO 8601, UTC string, and Local Time with timezone name",
      "Relative human time format ('in 2 hours', '5 days ago')",
      "Instant copy for all generated formats"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Enter a Unix epoch timestamp (seconds or ms) OR pick a calendar date/time." },
      { step: "2", instruction: "Click 'Convert' to evaluate the time values." },
      { step: "3", instruction: "Compare UTC, Local, ISO 8601, and Relative time representations." },
      { step: "4", instruction: "Copy the timestamp or formatted date string directly." }
    ],
    faq: [
      {
        question: "What is the difference between Unix seconds and milliseconds?",
        answer: "Standard Unix timestamps count seconds since Jan 1, 1970 (10 digits, e.g., 1741368000). JavaScript and Java frequently use milliseconds (13 digits, e.g., 1741368000000)."
      }
    ]
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder",
    shortDescription: "Percent-encode URL components, query parameters, and special characters safely.",
    fullDescription: "Encode URLs and URI parameters with RFC 3986 percent-encoding. Choose between encodeURIComponent (for query values) and encodeURI (for full addresses) with instant diffing.",
    category: "Web & Network",
    tags: ["url", "encoder", "uri", "percent-encoding", "web"],
    icon: "Link",
    features: [
      "encodeURIComponent mode (encodes slashes, colons, ampersands)",
      "encodeURI mode (preserves protocol and domain structure)",
      "Live encoding as you type",
      "Special character highlight table",
      "One-click copy to clipboard",
      "100% browser-based security"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Enter the text, query string, or complete URL." },
      { step: "2", instruction: "Select the encoding mode (Component or Full URI)." },
      { step: "3", instruction: "Inspect the percent-encoded (%20, %26, %3D) result." },
      { step: "4", instruction: "Copy the safe URL output." }
    ],
    faq: [
      {
        question: "When should I use encodeURIComponent vs encodeURI?",
        answer: "Use encodeURIComponent when encoding parameter keys or values (e.g. search terms with &, =). Use encodeURI when encoding a full URL address without breaking the http:// or / path delimiters."
      }
    ]
  },
  {
    id: "url-decoder",
    slug: "url-decoder",
    name: "URL Decoder",
    shortDescription: "Decode percent-encoded URLs and inspect parsed query string parameters.",
    fullDescription: "Convert percent-encoded strings (%20, %3F, %26) back to clean human-readable text. Features an integrated query string parameter table for quick URL inspection.",
    category: "Web & Network",
    tags: ["url", "decoder", "uri", "query-params", "web"],
    icon: "Unlink",
    features: [
      "Decodes %20, %2B (+) space variants accurately",
      "Built-in query string parameter inspector table",
      "Graceful error handling for malformed percent-sequences",
      "One-click copy for clean decoded strings",
      "Client-side execution preserving privacy"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Paste your percent-encoded URL or query string into the input." },
      { step: "2", instruction: "Click 'Decode URL'." },
      { step: "3", instruction: "View the decoded plain text and explore parsed query parameters." },
      { step: "4", instruction: "Copy the decoded text with one click." }
    ],
    faq: [
      {
        question: "Why do some URLs have '+' instead of '%20' for spaces?",
        answer: "In application/x-www-form-urlencoded query strings, spaces are historically encoded as '+' signs. This decoder gives you the option to treat '+' as spaces."
      }
    ]
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    shortDescription: "Test regular expressions in real-time with match counting and capture group breakdown.",
    fullDescription: "Build, debug, and test regular expressions in real time. Features flags selection (g, i, m, s, u), visual match highlighting, match count badge, and detailed capture group listings.",
    category: "Regex & Text",
    tags: ["regex", "regular-expression", "tester", "matcher", "debugging"],
    icon: "Code2",
    badge: "Interactive",
    features: [
      "Real-time regex evaluation as you type",
      "Configurable flags: global (g), case-insensitive (i), multiline (m), dotAll (s), unicode (u)",
      "Live match counter and match index positions",
      "Capture group extraction table",
      "Catches regex syntax errors with helpful error messages",
      "Zero network latency - runs in client JavaScript"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Enter your regular expression pattern without enclosing slashes." },
      { step: "2", instruction: "Select the regex flags you want to enable (e.g. g, i)." },
      { step: "3", instruction: "Type or paste the test string in the text editor below." },
      { step: "4", instruction: "Examine the highlighted matches and capture groups table." }
    ],
    faq: [
      {
        question: "What does the 'g' flag do?",
        answer: "The 'g' (global) flag finds all occurrences of the pattern in the test string instead of stopping after the first match."
      },
      {
        question: "What flavor of regex does this tool use?",
        answer: "It uses modern ECMAScript (JavaScript) regular expressions, supporting lookbehind, named groups, and unicode property escapes."
      }
    ]
  },
  {
    id: "markdown-editor",
    slug: "markdown-editor",
    name: "Markdown Editor",
    shortDescription: "Live split-screen Markdown editor with instant preview, formatting toolbar, and export.",
    fullDescription: "Write and preview GitHub-flavored Markdown in real time. Includes a handy formatting toolbar for headings, bold, italic, code blocks, lists, quotes, and links with instant HTML and MD export.",
    category: "Writing & Docs",
    tags: ["markdown", "editor", "preview", "gfm", "documentation"],
    icon: "FileText",
    badge: "Productive",
    features: [
      "Split-screen live dual-pane layout (Editor & Preview)",
      "Formatting toolbar: H1-H3, Bold, Italic, Code, Blockquote, Lists, Links, Tables",
      "Word count and character count statistics",
      "One-click copy of raw Markdown or rendered HTML",
      "Export directly to .md or .html file",
      "100% private in-browser editor"
    ],
    privacyNotice: "Your input is processed locally in your browser and is not sent to our server.",
    howToUse: [
      { step: "1", instruction: "Write or paste Markdown content in the left pane." },
      { step: "2", instruction: "Use the toolbar buttons to quickly insert headers, bold text, or code blocks." },
      { step: "3", instruction: "View the formatted typography preview rendered instantly in the right pane." },
      { step: "4", instruction: "Copy the markdown or download your document." }
    ],
    faq: [
      {
        question: "Does this editor support tables and task lists?",
        answer: "Yes, it supports GitHub Flavored Markdown (GFM) tables, strike-through, code fences, and standard task lists."
      }
    ]
  }
];

export function getToolBySlug(slug: string): DevTool | undefined {
  return DEV_TOOLS.find((t) => t.slug === slug);
}

export function getAllTools(): DevTool[] {
  return DEV_TOOLS;
}
