import { describe, expect, test } from "vitest";
import { trainingRoutineSchema } from "./routine.dto";

const validDay = {
  day: "Lunes",
  group: "Pecho y triceps",
  exercises: [
    { set: "Press banca", description: "acostado empuja", series: "3 series", reps: "10 repeticiones" },
  ],
  cals: "300 cals",
  duration: "60 minutos",
};

describe("routine.dto trainingRoutineSchema", () => {
  test("accepts a valid day", () => {
    expect(trainingRoutineSchema.safeParse([validDay]).success).toBe(true);
  });

  test("rejects missing exercises and bad day", () => {
    expect(
      trainingRoutineSchema.safeParse([{ ...validDay, exercises: "none" }]).success,
    ).toBe(false);
    expect(
      trainingRoutineSchema.safeParse([{ ...validDay, day: "Funday" }]).success,
    ).toBe(false);
  });
});
