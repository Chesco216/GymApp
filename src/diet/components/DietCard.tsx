import { useState } from "react";
import "./DietCard.css";
import { DietModal } from "./DietModal";
import type { DietMeal } from "../interfaces/diet";

interface DietCardProps {
  day: string;
  meals: DietMeal[];
}

export const DietCard = ({ day, meals }: DietCardProps) => {

  const [modalIsOpen, setIsOpen] = useState(false)

  const handleModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div className='diet-card'>
        <span className='diet-card-day'>{day}</span>
        <span className='diet-card-meta'>{meals?.length ?? 0} comidas</span>
        <button className='day-button' onClick={ handleModal }>Ver</button>
      </div>
      <DietModal className='diet-modal-component' modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} meals={meals}/>
    </>
  )
}
