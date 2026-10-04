import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../common/firebase/client";
import { fetchUserProfile } from "../repositories/auth.repository";
import {
  clearSession,
  saveSessionId,
} from "../../common/session/session.storage";
import type { User } from "../interfaces/user";

export const useSessionProvider = (): {
  userinfo: User | undefined;
  setUserinfo: (user: User | undefined) => void;
  isLoading: boolean;
} => {
  const [userinfo, setUserinfo] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Firebase Auth persiste la sesión (local). Es la fuente de verdad:
    // al recargar, el primer render tiene userinfo === undefined pero la
    // sesión sigue viva; RequireAuth debe esperar en vez de redirigir.
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (!fbUser) {
        clearSession();
        setUserinfo(undefined);
        setIsLoading(false);
        return;
      }
      saveSessionId(fbUser.uid);
      const authUser: User = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName,
        photoURL: fbUser.photoURL,
      };
      // Enriquecer con el perfil de Firestore si ya existe (info-form
      // completado). Si aún no hay doc, conservar el usuario de Auth para
      // no botar a /login mientras completa /info-form.
      fetchUserProfile(fbUser.uid)
        .then((profile) => setUserinfo(profile ?? authUser))
        .catch((error: unknown) => {
          console.log(error);
          setUserinfo(authUser);
        })
        .finally(() => setIsLoading(false));
    });
    return () => unsub();
  }, []);

  return { userinfo, setUserinfo, isLoading };
};
