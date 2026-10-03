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
        <label className='day-title'>{day}</label>
        <button className='day-button' onClick={ handleModal }>Ver</button>
      </div>
      <DietModal className='diet-modal-component' modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} meals={meals}/>
    </>
  )
}
