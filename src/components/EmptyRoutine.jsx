import React, { useContext } from 'react'
import { EmptyRoutineSVG } from './SVGS'
import { createRoutine } from '../services/createRoutine'
import { userContext } from '../context/UserProvider'
import './EmptyRoutine.css'

export const EmptyRoutine = () => {

  const { userinfo } = useContext(userContext)

  return (
    <div className='empty-diet-routine-container'>
      <span className='empty-routine-container'>
        <EmptyRoutineSVG/>
        <label className='empty-routine-label'>En este momento no tienes rutinas</label>
        <button className='empty-routine-btn' onClick={async() => { await createRoutine(userinfo) }}>Generar</button>
      </span>
    </div>
  )
}

