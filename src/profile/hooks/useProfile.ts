import { useEffect, useState } from "react";
import { getDiets } from "../../diet/repositories/diet.repository.firebase";
import { getRoutines } from "../../routine/repositories/routine.repository.firebase";
import type { DietDayPlan } from "../../diet/interfaces/diet";
import type { StoredWorkoutDay } from "../../routine/interfaces/routine";

export interface ProfileContent {
  diets: DietDayPlan[] | undefined;
  routines: StoredWorkoutDay[] | undefined;
}

interface ContentLoaders {
  loadDiets: () => Promise<DietDayPlan[] | undefined>;
  loadRoutines: () => Promise<StoredWorkoutDay[] | undefined>;
}

export const resolveProfileContent = async (loaders: ContentLoaders): Promise<ProfileContent> => {
  const [diets, routines] = await Promise.all([loaders.loadDiets(), loaders.loadRoutines()]);
  return { diets, routines };
};

export const useProfileContent = () => {
  const [content, setContent] = useState<ProfileContent>({ diets: undefined, routines: undefined });

  useEffect(() => {
    resolveProfileContent({ loadDiets: getDiets, loadRoutines: getRoutines }).then(setContent);
  }, []);

  return content;
};
