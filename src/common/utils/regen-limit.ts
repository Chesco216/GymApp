/** Límite de regeneración diaria de dieta/rutina (día calendario local). */

interface TimestampLike {
  toDate: () => Date;
}

const isTimestampLike = (value: unknown): value is TimestampLike =>
  typeof value === "object" &&
  value !== null &&
  "toDate" in value &&
  typeof (value as TimestampLike).toDate === "function";

/** Normaliza Date | Firestore Timestamp | ISO string | epoch millis a Date. */
export const toDate = (value: unknown): Date | null => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (isTimestampLike(value)) {
    const d = value.toDate();
    return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
  }
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
};

export const isSameCalendarDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/**
 * true si se puede generar hoy. Sin fecha previa (docs legacy sin
 * createdAt) o valor ilegible → se permite.
 */
export const canRegenerateToday = (lastGenerated: unknown, now: Date = new Date()): boolean => {
  const d = toDate(lastGenerated);
  if (!d) return true;
  return !isSameCalendarDay(d, now);
};
