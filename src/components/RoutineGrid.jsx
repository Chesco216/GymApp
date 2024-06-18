import React, { useContext } from 'react'
import { RoutineCard } from './RoutineCard'
import './RoutineGrid.css'
import { userContext } from '../context/UserProvider'
import { createRoutine } from '../services/createRoutine'

export const RoutineGrid = () => {

  const { userinfo } = useContext(userContext)

  const handleNewRoutine = async() => {
    console.log('new routine')
    await createRoutine(userinfo)
  }

  return (
    <div className='routines-grid'>
      <RoutineCard/>
      {
        (userinfo.memberType) &&
        <button className='routine-card-container' onClick={handleNewRoutine}>Quieres una nueva rutina?</button>
      }
    </div>
  )
}
  
