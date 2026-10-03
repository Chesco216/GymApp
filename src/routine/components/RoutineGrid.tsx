import { RoutineCard } from "./RoutineCard";
import "./RoutineGrid.css";
import { useSessionContext } from "../../auth/hooks/session.context";
import { createRoutine } from "../repositories/routine.ai.gemini";

export const RoutineGrid = () => {
  const { userinfo } = useSessionContext();

  const handleNewRoutine = async () => {
    if (userinfo) await createRoutine(userinfo);
  };

  return (
    <div className='routines-grid'>
      <RoutineCard/>
      {
        (userinfo?.memberType) &&
        <button className='routine-card-container' onClick={handleNewRoutine}>Quieres una nueva rutina?</button>
      }
    </div>
  )
}
