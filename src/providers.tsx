import type { ReactNode } from "react";
import { SessionContext } from "./auth/hooks/session.context";
import { useSessionProvider } from "./auth/hooks/useSession";

export const Providers = ({ children }: { children: ReactNode }) => {
  const session = useSessionProvider();
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
