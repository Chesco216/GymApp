import { afterEach, describe, expect, test, vi } from "vitest";
import { getGeminiKey } from "./env";

describe("getGeminiKey", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("prefers VITE_GEMINI_KEY", () => {
    vi.stubEnv("VITE_GEMINI_KEY", "new-key");
    vi.stubEnv("VITE_GEMINI_API_KEY", "old-key");
    expect(getGeminiKey()).toBe("new-key");
  });

  test("falls back to legacy VITE_GEMINI_API_KEY", () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "old-key");
    expect(getGeminiKey()).toBe("old-key");
  });

  test("returns undefined when neither is set", () => {
    vi.stubEnv("VITE_GEMINI_KEY", "");
    vi.stubEnv("VITE_GEMINI_API_KEY", "");
    expect(getGeminiKey()).toBeUndefined();
  });
});
