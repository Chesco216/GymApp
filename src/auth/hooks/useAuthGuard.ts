import { useSessionContext } from "./session.context";

/** Returns true when a session user is present; routers use it for <RequireAuth>. */
export const useAuthGuard = (): boolean => {
  const { userinfo } = useSessionContext();
  return userinfo !== undefined;
};
