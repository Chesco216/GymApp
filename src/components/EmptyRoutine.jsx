import React, { useContext, useState } from 'react'
import { EmptyRoutineSVG } from './SVGS'
import { createRoutine } from '../services/createRoutine'
import { userContext } from '../context/UserProvider'
import './EmptyRoutine.css'

export const EmptyRoutine = () => {

  const { userinfo } = useContext(userContext)
  const [loader, setLoader] = useState(false)

  const handleClick = async() => {
    setLoader(true)
    await createRoutine(userinfo)
    setLoader(false)
    location.reload()
  }

  return (
    <div className='empty-diet-routine-container'>
      {
        (loader) ? <div className='loader-card'></div>
        :
          <span className='empty-routine-container'>
            <EmptyRoutineSVG/>
            <label className='empty-routine-label'>En este momento no tienes rutinas</label>
            <button className='empty-routine-btn' onClick={handleClick}>Generar</button>
          </span>
      }
    </div>
  )
}

