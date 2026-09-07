import { describe, it, expect } from "vitest";

// ==========================================
// 1. JSON Formatter & Minifier Logic Tests
// ==========================================
describe("JSON Formatter & Minifier", () => {
  it("formats valid JSON with 2 spaces", () => {
    const raw = '{"name":"DevFixHub","tools":10}';
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, 2);
    expect(formatted).toBe('{\n  "name": "DevFixHub",\n  "tools": 10\n}');
  });

  it("formats valid JSON with 4 spaces", () => {
    const raw = '{"active":true}';
    const formatted = JSON.stringify(JSON.parse(raw), null, 4);
    expect(formatted).toBe('{\n    "active": true\n}');
  });

  it("minifies formatted JSON", () => {
    const formatted = '{\n  "name": "DevFixHub",\n  "version": 1\n}';
    const minified = JSON.stringify(JSON.parse(formatted));
    expect(minified).toBe('{"name":"DevFixHub","version":1}');
  });

  it("throws syntax error on invalid JSON", () => {
    const invalid = '{ name: "Unquoted key" }';
    expect(() => JSON.parse(invalid)).toThrow();
  });

  it("handles empty or whitespace strings", () => {
    const empty = "   ";
    expect(empty.trim()).toBe("");
  });
});

// ==========================================
// 2. JSON Validator Logic Tests
// ==========================================
describe("JSON Validator", () => {
  function validateJson(input: string): { isValid: boolean; error?: string } {
    if (!input.trim()) return { isValid: false, error: "Empty input" };
    try {
      JSON.parse(input);
      return { isValid: true };
    } catch (err: unknown) {
      return { isValid: false, error: err instanceof Error ? err.message : "Invalid JSON" };
    }
  }

  it("validates well-formed JSON", () => {
    const res = validateJson('{"status": "ok", "items": [1, 2, 3]}');
    expect(res.isValid).toBe(true);
  });

  it("fails on trailing commas", () => {
    const res = validateJson('{"a": 1, "b": 2,}');
    expect(res.isValid).toBe(false);
    expect(res.error).toBeDefined();
  });

  it("fails on single quotes", () => {
    const res = validateJson("{'key': 'value'}");
    expect(res.isValid).toBe(false);
  });
});

// ==========================================
// 3. Base64 Encoder Logic Tests
// ==========================================
describe("Base64 Encoder", () => {
  function encodeBase64(text: string, isUrlSafe = false): string {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let b64 = btoa(binary);
    if (isUrlSafe) {
      b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return b64;
  }

  it("encodes standard ASCII text", () => {
    expect(encodeBase64("DevFixHub")).toBe("RGV2Rml4SHVi");
  });

  it("encodes UTF-8 characters and emojis safely", () => {
    const encoded = encodeBase64("Hello 🚀");
    expect(encoded).toBe("SGVsbG8g8J+agA==");
  });

  it("encodes in URL-safe mode replacing + and /", () => {
    // String that produces + and /
    const raw = "subjects?test=true&id=>>??";
    const std = encodeBase64(raw, false);
    const urlSafe = encodeBase64(raw, true);
    expect(urlSafe).not.toContain("+");
    expect(urlSafe).not.toContain("/");
    expect(urlSafe).not.toContain("=");
  });
});

// ==========================================
// 4. Base64 Decoder Logic Tests
// ==========================================
describe("Base64 Decoder", () => {
  function decodeBase64(val: string): string {
    let sanitized = val.trim().replace(/-/g, "+").replace(/_/g, "/");
    while (sanitized.length % 4 !== 0) {
      sanitized += "=";
    }
    const binary = atob(sanitized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(bytes);
  }

  it("decodes standard Base64 string", () => {
    expect(decodeBase64("RGV2Rml4SHVi")).toBe("DevFixHub");
  });

  it("decodes UTF-8 and emoji Base64 strings", () => {
    expect(decodeBase64("SGVsbG8g8J+agA==")).toBe("Hello 🚀");
  });

  it("decodes unpadded URL-safe Base64 strings", () => {
    // "Hello 🚀" URL safe without padding: SGVsbG8g8J-agA
    expect(decodeBase64("SGVsbG8g8J-agA")).toBe("Hello 🚀");
  });

  it("fails on illegal non-base64 characters", () => {
    expect(() => decodeBase64("Invalid!@#$%^&*()")).toThrow();
  });
});

// ==========================================
// 5. UUID Generator Logic Tests
// ==========================================
describe("UUID Generator", () => {
  function generateV4(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => {
      const num = Number(c);
      return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
    });
  }

  it("generates valid RFC 4122 v4 UUID format", () => {
    const id = generateV4();
    const v4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(id).toMatch(v4Regex);
  });

  it("generates batch of distinct unique UUIDs", () => {
    const set = new Set<string>();
    for (let i = 0; i < 20; i++) {
      set.add(generateV4());
    }
    expect(set.size).toBe(20);
  });

  it("formats uppercase and unhyphenated UUIDs", () => {
    const raw = generateV4();
    const upperNoHyphens = raw.replace(/-/g, "").toUpperCase();
    expect(upperNoHyphens).toHaveLength(32);
    expect(upperNoHyphens).not.toContain("-");
    expect(upperNoHyphens).toBe(upperNoHyphens.toUpperCase());
  });
});

// ==========================================
// 6. Timestamp Converter Logic Tests
// ==========================================
describe("Timestamp Converter", () => {
  it("converts unix epoch seconds to UTC string", () => {
    const seconds = 1741368000;
    const date = new Date(seconds * 1000);
    expect(date.toISOString()).toBe("2025-03-07T17:20:00.000Z");
  });

  it("distinguishes 10-digit seconds from 13-digit milliseconds", () => {
    const sec = 1741368000;
    const ms = 1741368000000;

    const ms1 = sec.toString().length >= 12 ? sec : sec * 1000;
    const ms2 = ms.toString().length >= 12 ? ms : ms * 1000;

    expect(ms1).toBe(ms2);
  });

  it("converts Date to epoch seconds", () => {
    const d = new Date("2025-03-07T17:20:00.000Z");
    const epoch = Math.floor(d.getTime() / 1000);
    expect(epoch).toBe(1741368000);
  });
});

// ==========================================
// 7. URL Encoder Logic Tests
// ==========================================
describe("URL Encoder", () => {
  it("encodes query component special characters", () => {
    const raw = "React & Next.js = Awesome/Fast";
    const encoded = encodeURIComponent(raw);
    expect(encoded).toBe("React%20%26%20Next.js%20%3D%20Awesome%2FFast");
  });

  it("preserves URL protocol with encodeURI", () => {
    const fullUrl = "https://devfixhub.com/search?q=react errors";
    const encoded = encodeURI(fullUrl);
    expect(encoded).toBe("https://devfixhub.com/search?q=react%20errors");
    expect(encoded).toContain("https://");
  });
});

// ==========================================
// 8. URL Decoder Logic Tests
// ==========================================
describe("URL Decoder", () => {
  it("decodes percent-encoded characters", () => {
    const encoded = "https%3A%2F%2Fdevfixhub.com%2Fsearch%3Fquery%3Dreact%20hydration";
    expect(decodeURIComponent(encoded)).toBe("https://devfixhub.com/search?query=react hydration");
  });

  it("decodes '+' as space when configured", () => {
    const raw = "hello+world+developer";
    const withSpaces = raw.replace(/\+/g, "%20");
    expect(decodeURIComponent(withSpaces)).toBe("hello world developer");
  });

  it("extracts query parameters key-values", () => {
    const url = "https://devfixhub.com/tools?category=json&mode=minify";
    const qIndex = url.indexOf("?");
    const params = new URLSearchParams(url.slice(qIndex + 1));
    expect(params.get("category")).toBe("json");
    expect(params.get("mode")).toBe("minify");
  });
});

// ==========================================
// 9. Regex Tester Logic Tests
// ==========================================
describe("Regex Tester", () => {
  it("matches valid email addresses", () => {
    const pattern = "([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})";
    const regex = new RegExp(pattern, "g");
    const text = "Contact dev@devfixhub.com and support@example.org";
    const matches = [...text.matchAll(regex)];
    expect(matches).toHaveLength(2);
    expect(matches[0][0]).toBe("dev@devfixhub.com");
    expect(matches[1][0]).toBe("support@example.org");
  });

  it("handles case-insensitive flag", () => {
    const regex = new RegExp("devfixhub", "i");
    expect(regex.test("DEVFIXHUB")).toBe(true);
    expect(regex.test("DevFixHub")).toBe(true);
  });

  it("throws SyntaxError on malformed regex", () => {
    expect(() => new RegExp("[a-z", "g")).toThrow();
  });
});
