import { useEffect, useState } from "react";
import { createDiet } from "../repositories/diet.ai.gemini";
import { getDiets } from "../repositories/diet.repository.firebase";
import type { User } from "../../auth/interfaces/user";
import type { DietDayPlan } from "../interfaces/diet";

export const useDiets = (userinfo: User | undefined) => {
  const [diets, setDiets] = useState<DietDayPlan[] | undefined>(undefined);

  useEffect(() => {
    getDiets().then((diet) => setDiets(diet));
  }, []);

  const handleNewDiet = () => {
    if (userinfo) void createDiet(userinfo);
  };

  return { diets, handleNewDiet };
};

export const useCreateDiet = () => {
  const [creating, setCreating] = useState(false);

  const generate = async (userinfo: User) => {
    setCreating(true);
    try {
      await createDiet(userinfo);
    } finally {
      setCreating(false);
    }
  };

  return { creating, generate };
};
