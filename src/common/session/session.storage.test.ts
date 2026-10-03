import { describe, expect, test } from "vitest";
import { loadSessionId, saveSessionId, clearSession } from "./session.storage";

const memory = () => {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
};

describe("session.storage", () => {
  test("round-trips the raw uid", () => {
    const storage = memory();
    saveSessionId("abc123", storage);
    expect(loadSessionId(storage)).toBe("abc123");
  });

  test("strips JSON quotes written by legacy JSON.stringify", () => {
    const storage = memory();
    storage.setItem("user", '"abc123"');
    expect(loadSessionId(storage)).toBe("abc123");
  });

  test("returns null when empty and clears on sign out", () => {
    const storage = memory();
    expect(loadSessionId(storage)).toBeNull();
    saveSessionId("abc123", storage);
    clearSession(storage);
    expect(loadSessionId(storage)).toBeNull();
  });
});
