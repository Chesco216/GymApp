import { useState } from "react";
import { getProtCal, type CalcResult } from "../domain/calc";

/** Holds calculator output; form parsing stays in the page (legacy behavior). */
export const useCalculator = () => {
  const [result, setResult] = useState<CalcResult>({ prote: 0, cals: 0 });

  const calculate = (
    age: string,
    height: string,
    weight: string,
    activity: number,
    genderOffset: number,
  ) => {
    setResult(getProtCal(age, height, weight, activity, genderOffset));
  };

  return { prot: result.prote, cal: result.cals, calculate };
};
