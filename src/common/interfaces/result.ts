export interface AppError {
  code: string;
  message: string;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

export const err = (code: string, message: string): AppError => ({ code, message });
