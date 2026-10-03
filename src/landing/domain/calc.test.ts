import { describe, expect, test } from "vitest";
import { getProtCal } from "./calc";

describe("getProtCal", () => {
  test("computes protein and calories (Mifflin-St Jeor + 1.8g/kg)", () => {
    expect(getProtCal(30, 175, 70, 1.55, 5)).toEqual({ prote: 126, cals: 2556 });
  });

  test("parses string form inputs", () => {
    expect(getProtCal("30", "175", "70", 1.55, -161)).toEqual({
      prote: 126,
      cals: 2298,
    });
  });
});
