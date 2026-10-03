import { EmptyDietSVG } from "../../common/components/SVGS";
import "./EmptyDiet.css";
import { useSessionContext } from "../../auth/hooks/session.context";
import { useCreateDiet } from "../hooks/useDiets";

export const EmptyDiet = () => {
  const { userinfo } = useSessionContext();
  const { creating, generate } = useCreateDiet();

  const handleClick = async () => {
    if (userinfo) await generate(userinfo);
  };

  return (
    <div className='empty-diet-routine-container'>
      {
        (creating) ? <div className='loader-card'></div>
          :
          <span className='empty-diet-container'>
            <EmptyDietSVG />
            <label className='empty-diet-label'>En este momento no tienes una dieta</label>
            <button className='empty-diet-btn' onClick={handleClick}>Generar</button>
          </span>
      }
    </div>
  )
}
