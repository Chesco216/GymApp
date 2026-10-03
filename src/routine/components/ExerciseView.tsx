import "./ExerciseView.css";
import { DumbellSVG } from "../../common/components/SVGS";
import type { StoredExercise } from "../interfaces/routine";

export const ExerciseView = ({ sets }: { sets: StoredExercise }) => {
  return (
    <div className='sets-container'>
      <label className='set-label-title'>
        <DumbellSVG className='exercise-svg'/>
        {sets.set}
      </label>
      <p className='set-description'>{sets.description}</p>
      <hr className='hr-sets'/>
      <div className='reps-series-container'>
        <label className='reps-series-label'>{sets.reps}</label>
        <label className='reps-series-label'>{sets.series}</label>
      </div>
    </div>
  )
}
