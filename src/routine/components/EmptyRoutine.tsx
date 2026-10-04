import { EmptyRoutineSVG } from "../../common/components/SVGS";
import { useSessionContext } from "../../auth/hooks/session.context";
import { useCreateRoutine } from "../hooks/useRoutines";
import "./EmptyRoutine.css";

export const EmptyRoutine = ({ onGenerated }: { onGenerated?: () => void | Promise<void> }) => {
  const { userinfo } = useSessionContext();
  const { creating, generate } = useCreateRoutine();

  const handleClick = async () => {
    if (userinfo) {
      await generate(userinfo, onGenerated);
    }
  };

  return (
    <div className='empty-plan'>
      {creating ? (
        <div className='empty-plan-loading'>
          <div className='loader-card'></div>
          <p>Generando tu rutina… esto puede tomar unos segundos</p>
        </div>
      ) : (
        <>
          <span className='empty-plan-icon'>
            <EmptyRoutineSVG />
          </span>
          <h3>Aún no tienes tu rutina</h3>
          <p>Generamos tu semana de entrenamiento con ejercicios, series y repeticiones.</p>
          <button className='empty-plan-btn' onClick={handleClick}>Generar mi rutina</button>
        </>
      )}
    </div>
  )
}
