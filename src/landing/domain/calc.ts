export interface CalcInput {
  age: number | string;
  heightCm: number | string;
  weightKg: number | string;
  activityFactor: number;
  genderOffset: number;
}

export interface CalcResult {
  prote: number;
  cals: number;
}

/** Mifflin-St Jeor calories × activity + 1.8g protein per kg. Port of legacy getProtCal. */
export const getProtCal = (
  age: number | string,
  height: number | string,
  weight: number | string,
  activity: number,
  gender: number,
): CalcResult => {
  const ageNum = parseInt(String(age), 10);
  const heightNum = parseInt(String(height), 10);
  const weightNum = parseInt(String(weight), 10);

  const prote = Math.round(weightNum * 1.8);
  const cals = Math.round(activity * (10 * weightNum + 6.25 * heightNum - 5 * ageNum + gender));

  return { prote, cals };
};
