const SESSION_KEY = "user";

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

const defaultStorage = (): KeyValueStorage | null =>
  typeof globalThis.localStorage !== "undefined"
    ? globalThis.localStorage
    : null;

const stripQuotes = (raw: string): string => raw.replaceAll('"', "");

export const saveSessionId = (uid: string, storage: KeyValueStorage | null = defaultStorage()): void => {
  storage?.setItem(SESSION_KEY, JSON.stringify(uid));
};

export const loadSessionId = (storage: KeyValueStorage | null = defaultStorage()): string | null => {
  const raw = storage?.getItem(SESSION_KEY);
  if (!raw) return null;
  return stripQuotes(raw);
};

export const clearSession = (storage: KeyValueStorage | null = defaultStorage()): void => {
  storage?.removeItem(SESSION_KEY);
};
