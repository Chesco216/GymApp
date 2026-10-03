import { EmptyRoutineSVG } from "../../common/components/SVGS";
import { useSessionContext } from "../../auth/hooks/session.context";
import { useCreateRoutine } from "../hooks/useRoutines";
import "./EmptyRoutine.css";

export const EmptyRoutine = () => {
  const { userinfo } = useSessionContext();
  const { creating, generate } = useCreateRoutine();

  const handleClick = async () => {
    if (userinfo) {
      await generate(userinfo, () => location.reload());
    }
  };

  return (
    <div className='empty-diet-routine-container'>
      {
        (creating) ? <div className='loader-card'></div>
        :
          <span className='empty-routine-container'>
            <EmptyRoutineSVG/>
            <label className='empty-routine-label'>En este momento no tienes rutinas</label>
            <button className='empty-routine-btn' onClick={handleClick}>Generar</button>
          </span>
      }
    </div>
  )
}
