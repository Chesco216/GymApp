import { describe, expect, test } from "vitest";
import { resolveProfileContent } from "./useProfile";
import type { DietDayPlan } from "../../diet/interfaces/diet";
import type { StoredWorkoutDay } from "../../routine/interfaces/routine";

const diet: DietDayPlan[] = [{ day: "Lunes", meals: [] }];
const routine: StoredWorkoutDay[] = [
  { day: "Lunes", group: "Pecho", exercises: [], cals: "1", duration: "2" },
];

describe("resolveProfileContent", () => {
  test("shows grids when plans exist", async () => {
    const content = await resolveProfileContent({
      loadDiets: async () => diet,
      loadRoutines: async () => routine,
    });
    expect(content).toEqual({ diets: diet, routines: routine });
  });

  test("falls back to empty states when nothing stored", async () => {
    const content = await resolveProfileContent({
      loadDiets: async () => undefined,
      loadRoutines: async () => undefined,
    });
    expect(content).toEqual({ diets: undefined, routines: undefined });
  });
});
