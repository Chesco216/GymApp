import React, { useState } from 'react'
import './DietCard.css'
import { DietModal } from './DietModal'

export const DietCard = ({day, time}) => {

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
    <DietModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} time={time}/>
    </>
  )
}
  