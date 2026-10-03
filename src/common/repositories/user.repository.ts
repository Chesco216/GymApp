import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";

export const getUserDoc = async <T>(uid: string): Promise<T | null> => {
  const snapshot = await getDoc(doc(db, "users", uid));
  const data = snapshot.data();
  return data ? ({ uid, ...data } as T) : null;
};

export const saveUserDoc = async <T extends { uid: string }>(user: T): Promise<void> => {
  await setDoc(doc(db, "users", user.uid), { ...user });
};
