import { createContext, useContext } from "react";
import type { User } from "../interfaces/user";

export interface SessionContextValue {
  userinfo: User | undefined;
  setUserinfo: (user: User | undefined) => void;
  isLoading: boolean;
}

export const SessionContext = createContext<SessionContextValue>({
  userinfo: undefined,
  setUserinfo: () => {},
  isLoading: true,
});

export const useSessionContext = (): SessionContextValue => useContext(SessionContext);
