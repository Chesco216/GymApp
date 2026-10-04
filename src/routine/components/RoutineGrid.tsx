import { useEffect, useState } from "react";
import { RoutineCard } from "./RoutineCard";
import "./RoutineGrid.css";
import { useSessionContext } from "../../auth/hooks/session.context";
import { createRoutine } from "../repositories/routine.ai.gemini";
import { getLastRoutineDate } from "../repositories/routine.repository.firebase";
import { canRegenerateToday } from "../../common/utils/regen-limit";

export const RoutineGrid = ({ onChanged }: { onChanged?: () => void | Promise<void> }) => {
  const { userinfo } = useSessionContext();
  const [refreshToken, setRefreshToken] = useState(0);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  useEffect(() => {
    getLastRoutineDate().then(setLastGenerated);
  }, []);

  const canRegenerate = canRegenerateToday(lastGenerated);

  const handleNewRoutine = async () => {
    if (!userinfo || !canRegenerateToday(lastGenerated)) return;
    await createRoutine(userinfo);
    // Re-consulta lo recién guardado: el card se re-monta con el token y
    // el padre sale del estado Empty* sin recargar la página.
    setRefreshToken((t) => t + 1);
    setLastGenerated(await getLastRoutineDate());
    await onChanged?.();
  };

  return (
    <div className='routines-grid'>
      <RoutineCard refreshToken={refreshToken}/>
      {
        (userinfo?.memberType) &&
        (canRegenerate ? (
          <button className='routine-regen-btn' onClick={() => void handleNewRoutine()}>Quieres una nueva rutina?</button>
        ) : (
          <button className='routine-regen-btn' disabled>Ya generaste tu rutina hoy, vuelve mañana</button>
        ))
      }
    </div>
  )
}
