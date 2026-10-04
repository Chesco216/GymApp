import { EmptyDietSVG } from "../../common/components/SVGS";
import "./EmptyDiet.css";
import { useSessionContext } from "../../auth/hooks/session.context";
import { useCreateDiet } from "../hooks/useDiets";

export const EmptyDiet = ({ onGenerated }: { onGenerated?: () => void | Promise<void> }) => {
  const { userinfo } = useSessionContext();
  const { creating, generate } = useCreateDiet();

  const handleClick = async () => {
    if (userinfo) await generate(userinfo, onGenerated);
  };

  return (
    <div className='empty-plan'>
      {creating ? (
        <div className='empty-plan-loading'>
          <div className='loader-card'></div>
          <p>Generando tu dieta… esto puede tomar unos segundos</p>
        </div>
      ) : (
        <>
          <span className='empty-plan-icon'>
            <EmptyDietSVG />
          </span>
          <h3>Aún no tienes tu dieta</h3>
          <p>Generamos un plan de 5 días con desayuno, almuerzo y cena según tu perfil.</p>
          <button className='empty-plan-btn' onClick={handleClick}>Generar mi dieta</button>
        </>
      )}
    </div>
  )
}
