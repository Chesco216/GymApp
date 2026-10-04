import { DietCard } from "./DietCard";
import { useDiets } from "../hooks/useDiets";
import { useSessionContext } from "../../auth/hooks/session.context";

export const DietGrid = ({ onChanged }: { onChanged?: () => void | Promise<void> }) => {
  const { userinfo } = useSessionContext();
  const { diets, handleNewDiet, canRegenerate } = useDiets(userinfo);

  return (
    <div className='diet-card-container'>
      {
        (diets) ? (
          diets.map((item) => {
            return (
              <DietCard key={item.day} day={item.day} meals={item.meals} />
            )
          })
        ) : (<></>)
      }
      {
        (userinfo?.memberType) &&
        (canRegenerate ? (
          <button className='diet-regen-btn' onClick={() => void handleNewDiet(onChanged)}>Quieres cambiar tu dieta?</button>
        ) : (
          <button className='diet-regen-btn' disabled>Ya generaste tu dieta hoy, vuelve mañana</button>
        ))
      }
    </div>
  )
}
