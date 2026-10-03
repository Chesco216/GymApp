import { useState } from "react";
import { createRoutine } from "../repositories/routine.ai.gemini";
import { getRoutines } from "../repositories/routine.repository.firebase";
import type { User } from "../../auth/interfaces/user";
import type { StoredWorkoutDay } from "../interfaces/routine";

export const useRoutines = () => {
  const [routines, setRoutines] = useState<StoredWorkoutDay[] | undefined>(undefined);

  const refresh = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  return { routines, refresh };
};

export const useCreateRoutine = () => {
  const [creating, setCreating] = useState(false);

  const generate = async (userinfo: User, after?: () => void) => {
    setCreating(true);
    try {
      await createRoutine(userinfo);
    } finally {
      setCreating(false);
      after?.();
    }
  };

  return { creating, generate };
};
