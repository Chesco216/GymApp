import React from 'react'
import { DietCard } from './DietCard'
import { Diet } from '../assets/diet.model'

export const DietGrid = () => {

  const handleNewDiet = () => {

  }

  return  (
    <div className='diet-card-container'>
      {
        Diet.map((item) => {
          return (
            <DietCard key={item.day} day={item.day} time={item.time}/>
          )
        })
      }
      <button className='diet-card' onClick={handleNewDiet}>Quieres cambiar tu dieta?</button>
    </div>
  )
}

