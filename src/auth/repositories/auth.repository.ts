import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../common/firebase/client";
import { getUserDoc } from "../../common/repositories/user.repository";
import { clearSession, saveSessionId } from "../../common/session/session.storage";
import type { User } from "../interfaces/user";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const toUser = (fb: FirebaseUser, extra?: Partial<User>): User => ({
  uid: fb.uid,
  email: fb.email,
  displayName: fb.displayName,
  ...extra,
});

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = toUser(credential.user);
  saveSessionId(user.uid);
  return user;
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  await createUserWithEmailAndPassword(auth, email, password);
  const current = auth.currentUser;
  if (!current) throw new Error("signup succeeded but no current user");
  const user = toUser(current, { displayName: username });
  saveSessionId(user.uid);
  return user;
};

export const fetchUserProfile = async (uid: string): Promise<User | null> =>
  getUserDoc<User>(uid);

/** Port of legacy googleSignin: popup → session → users/{uid} doc. Returns profile or null. */
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    saveSessionId(user.uid);
    return await fetchUserProfile(user.uid);
  } catch (error) {
    const err = error as { code?: string; message?: string };
    alert("Error code: " + err.code + " Message: " + err.message);
    console.log(error);
    return null;
  }
};

/** Port of legacy facebookSignin (known fb-API flakiness kept, no behavior change). */
export const signInWithFacebook = async (): Promise<User> => {
  const result = await signInWithPopup(auth, facebookProvider);
  FacebookAuthProvider.credentialFromResult(result);
  const user = toUser(result.user);
  saveSessionId(user.uid);
  return user;
};

export const signOutSession = async (): Promise<void> => {
  try {
    await auth.signOut();
  } finally {
    clearSession();
  }
};
