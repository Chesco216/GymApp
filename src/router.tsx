import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSessionContext } from "./auth/hooks/session.context";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { userinfo } = useSessionContext();
  if (!userinfo) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
