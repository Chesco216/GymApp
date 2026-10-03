import { describe, expect, test } from "vitest";
import { dietPlanSchema } from "./diet.dto";

const validDay = {
  day: "Lunes",
  meals: [
    {
      meal_time: "Desayuno",
      name: "Huevo con pan",
      description: "un huevo frito con pan",
      ingredients: [{ name: "huevo", quantity: "2 huevos" }],
      macros: { proteins: "20 gr", calories: "300 cals", vitamins: ["A"], minerals: ["M1"] },
    },
  ],
};

describe("diet.dto dietPlanSchema", () => {
  test("accepts a valid 5-day-shaped plan", () => {
    const plan = [validDay, { ...validDay, day: "Martes" }];
    expect(dietPlanSchema.safeParse(plan).success).toBe(true);
  });

  test("rejects unknown day and missing meals", () => {
    expect(dietPlanSchema.safeParse([{ ...validDay, day: "Funday" }]).success).toBe(false);
    expect(
      dietPlanSchema.safeParse([{ day: "Lunes" }]).success,
    ).toBe(false);
  });
});
