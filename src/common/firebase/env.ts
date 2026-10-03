/**
 * Gemini API key. New name VITE_GEMINI_KEY wins; legacy VITE_GEMINI_API_KEY
 * still honored so existing .env files and Vercel vars keep working.
 * Empty strings count as missing.
 */
export const getGeminiKey = (): string | undefined =>
  ((import.meta.env.VITE_GEMINI_KEY as string | undefined) ||
    (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ||
    undefined);
