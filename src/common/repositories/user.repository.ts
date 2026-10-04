import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";

export const getUserDoc = async <T>(uid: string): Promise<T | null> => {
  const snapshot = await getDoc(doc(db, "users", uid));
  const data = snapshot.data();
  return data ? ({ uid, ...data } as T) : null;
};

export const saveUserDoc = async <T extends { uid: string }>(user: T): Promise<void> => {
  // Firestore rechaza `undefined`. Convertimos a null / omitimos para que
  // formularios con campos opcionales (photoURL, displayName, …) no fallen
  // con "Function setDoc() called with invalid data".
  const clean = Object.fromEntries(
    Object.entries({ ...user }).filter(([, v]) => v !== undefined),
  ) as T;
  await setDoc(doc(db, "users", user.uid), { ...clean });
};
