import React, { useContext } from 'react'
import { EmptyDietSVG } from './SVGS'
import './EmptyDiet.css'
import { userContext } from '../context/UserProvider'
import { createDiet } from '../services/createDiet'

export const EmptyDiet = () => {
  
  const { userinfo } = useContext(userContext)

  return (
    <div className='empty-diet-routine-container'>
      <span className='empty-diet-container'>
        <EmptyDietSVG/>
        <label className='empty-diet-label'>En este momento no tienes una dieta</label>
        <button className='empty-diet-btn' onClick={async() => { await createDiet(userinfo) }}>Generar</button>
      </span>
    </div>
  )
}

