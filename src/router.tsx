import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSessionContext } from "./auth/hooks/session.context";
import "./common/components/Skeleton.css";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { userinfo, isLoading } = useSessionContext();
  // La restauración de sesión es asíncrona (Firebase Auth + Firestore).
  // Sin este gate, recargar una ruta protegida redirigía a /login antes
  // de que la sesión se restaurara y "se perdía la sesión".
  if (isLoading) {
    return (
      <div className='gate-loading' aria-label='Cargando sesión'>
        <span className='skel gate-loading-bar gate-loading-bar--title' />
        <span className='skel gate-loading-bar' />
        <span className='skel gate-loading-bar gate-loading-bar--short' />
      </div>
    );
  }
  if (!userinfo) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
