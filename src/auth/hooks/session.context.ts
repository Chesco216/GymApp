import { createContext, useContext } from "react";
import type { User } from "../interfaces/user";

export interface SessionContextValue {
  userinfo: User | undefined;
  setUserinfo: (user: User | undefined) => void;
}

export const SessionContext = createContext<SessionContextValue>({
  userinfo: undefined,
  setUserinfo: () => {},
});

export const useSessionContext = (): SessionContextValue => useContext(SessionContext);
