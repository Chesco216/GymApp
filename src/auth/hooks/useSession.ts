import { useEffect, useState } from "react";
import { fetchUserProfile } from "../repositories/auth.repository";
import { loadSessionId } from "../../common/session/session.storage";
import type { User } from "../interfaces/user";

export const useSessionProvider = (): {
  userinfo: User | undefined;
  setUserinfo: (user: User | undefined) => void;
} => {
  const [userinfo, setUserinfo] = useState<User | undefined>(undefined);

  useEffect(() => {
    const id = loadSessionId();
    if (id) {
      fetchUserProfile(id)
        .then((profile) => {
          if (profile) setUserinfo(profile);
        })
        .catch((error: unknown) => console.log(error));
    }
  }, []);

  return { userinfo, setUserinfo };
};
