import { DietCard } from "./DietCard";
import { useDiets } from "../hooks/useDiets";
import { useSessionContext } from "../../auth/hooks/session.context";

export const DietGrid = () => {
  const { userinfo } = useSessionContext();
  const { diets, handleNewDiet } = useDiets(userinfo);

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
        <button className='diet-card' onClick={handleNewDiet}>Quieres cambiar tu dieta?</button>
      }
    </div>
  )
}
