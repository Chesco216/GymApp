import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../common/firebase/client";
import { loadSessionId } from "../../common/session/session.storage";
import { toDate } from "../../common/utils/regen-limit";
import type { DietDayPlan } from "../interfaces/diet";

const COLLECTION = "dietas-personalizadas";

/** Doc vigente: el de mayor createdAt. Docs legacy sin createdAt empatan y gana el último visto. */
const getLatestPlanDoc = async (): Promise<Record<string, unknown> | null> => {
  const id = loadSessionId();
  if (!id) return null;

  const q = query(
    collection(db, COLLECTION),
    where("uid", "==", id),
    where("is_available", "==", true),
  );
  const querySnapshot = await getDocs(q);
  let latest: Record<string, unknown> | null = null;
  let latestTime = -Infinity;
  querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data() as Record<string, unknown>;
    const t = toDate(data.createdAt)?.getTime() ?? -Infinity;
    if (t >= latestTime) {
      latest = data;
      latestTime = t;
    }
  });
  return latest;
};

export const getDiets = async (): Promise<DietDayPlan[] | undefined> => {
  const data = await getLatestPlanDoc();
  if (!data) return undefined;

  const days = [data.day_1, data.day_2, data.day_3, data.day_4, data.day_5] as (
    | DietDayPlan
    | undefined
  )[];
  if (days.some((d) => !d)) return undefined;
  return days as DietDayPlan[];
};

/** Fecha de generación del plan vigente, o null si no hay plan / no tiene fecha (legacy). */
export const getLastDietDate = async (): Promise<Date | null> => {
  const data = await getLatestPlanDoc();
  return data ? toDate(data.createdAt) : null;
};
