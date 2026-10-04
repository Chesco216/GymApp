import { useCallback, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  // Re-consulta Firestore tras generar dieta/rutina para que la UI cambie
  // de Empty* a Grid sin recargar la página.
  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const next = await resolveProfileContent({ loadDiets: getDiets, loadRoutines: getRoutines });
      setContent(next);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...content, refresh, isLoading };
};
