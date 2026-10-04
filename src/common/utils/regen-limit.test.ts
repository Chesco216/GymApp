import { describe, expect, test } from "vitest";
import { canRegenerateToday, isSameCalendarDay } from "./regen-limit";

describe("isSameCalendarDay", () => {
  test("same day different hours match", () => {
    expect(
      isSameCalendarDay(new Date(2026, 9, 4, 0, 0, 1), new Date(2026, 9, 4, 23, 59, 59)),
    ).toBe(true);
  });

  test("consecutive days do not match", () => {
    expect(
      isSameCalendarDay(new Date(2026, 9, 3, 23, 59), new Date(2026, 9, 4, 0, 0)),
    ).toBe(false);
  });
});

describe("canRegenerateToday", () => {
  test("allows when never generated (null/undefined)", () => {
    expect(canRegenerateToday(null)).toBe(true);
    expect(canRegenerateToday(undefined)).toBe(true);
  });

  test("blocks when last generation was today", () => {
    const todayMorning = new Date();
    todayMorning.setHours(0, 5, 0, 0);
    expect(canRegenerateToday(todayMorning)).toBe(false);
  });

  test("allows when last generation was yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(canRegenerateToday(yesterday)).toBe(true);
  });

  test("supports Firestore Timestamp shape", () => {
    const today = new Date();
    today.setHours(1, 0, 0, 0);
    expect(canRegenerateToday({ toDate: () => today })).toBe(false);
  });

  test("allows unparseable values (legacy docs without createdAt)", () => {
    expect(canRegenerateToday("not-a-date")).toBe(true);
    expect(canRegenerateToday({})).toBe(true);
  });
});
