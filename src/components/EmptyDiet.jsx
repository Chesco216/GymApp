import React, { useContext, useState } from 'react'
import { EmptyDietSVG } from './SVGS'
import './EmptyDiet.css'
import { userContext } from '../context/UserProvider'
import { createDiet } from '../services/createDiet'

export const EmptyDiet = () => {
  
  const { userinfo } = useContext(userContext)
  const [loader, setLoader] = useState(false)

  const handleClick = async() => {
    setLoader(true)
    await createDiet(userinfo)
    setLoader(false)
    location.reload()
  }

  return (
    <div className='empty-diet-routine-container'>
      {
        (loader) ? <div className='loader-card'></div>
        :
        <span className='empty-diet-container'>
          <EmptyDietSVG/>
          <label className='empty-diet-label'>En este momento no tienes una dieta</label>
          <button className='empty-diet-btn' onClick={ handleClick }>Generar</button>
        </span>
      }
    </div>
  )
}

