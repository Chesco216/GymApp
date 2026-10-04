import { useEffect, useState } from "react";
import { createDiet } from "../repositories/diet.ai.gemini";
import { getDiets, getLastDietDate } from "../repositories/diet.repository.firebase";
import { canRegenerateToday } from "../../common/utils/regen-limit";
import type { User } from "../../auth/interfaces/user";
import type { DietDayPlan } from "../interfaces/diet";

export const useDiets = (userinfo: User | undefined) => {
  const [diets, setDiets] = useState<DietDayPlan[] | undefined>(undefined);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  useEffect(() => {
    getDiets().then((diet) => setDiets(diet));
    getLastDietDate().then(setLastGenerated);
  }, []);

  const canRegenerate = canRegenerateToday(lastGenerated);

  const handleNewDiet = async (after?: () => void | Promise<void>) => {
    if (!userinfo || !canRegenerateToday(lastGenerated)) return;
    await createDiet(userinfo);
    // Recargar lo recién guardado para pintar el grid sin reload.
    const fresh = await getDiets();
    setDiets(fresh);
    setLastGenerated(await getLastDietDate());
    await after?.();
  };

  return { diets, handleNewDiet, canRegenerate };
};

export const useCreateDiet = () => {
  const [creating, setCreating] = useState(false);

  const generate = async (userinfo: User, after?: () => void | Promise<void>) => {
    setCreating(true);
    try {
      await createDiet(userinfo);
      await after?.();
    } finally {
      setCreating(false);
    }
  };

  return { creating, generate };
};
