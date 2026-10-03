import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../common/firebase/client";
import { loadSessionId } from "../../common/session/session.storage";
import type { DietDayPlan } from "../interfaces/diet";

export const getDiets = async (): Promise<DietDayPlan[] | undefined> => {
  const id = loadSessionId();
  if (!id) return undefined;

  const q = query(
    collection(db, "dietas-personalizadas"),
    where("uid", "==", id),
    where("is_available", "==", true),
  );
  const querySnapshot = await getDocs(q);
  let data: Record<string, DietDayPlan> | undefined;
  querySnapshot.forEach((docSnapshot) => {
    data = docSnapshot.data() as Record<string, DietDayPlan>;
  });
  if (!data) return undefined;

  return [data.day_1, data.day_2, data.day_3, data.day_4, data.day_5];
};
