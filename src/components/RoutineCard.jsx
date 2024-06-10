import React, { useEffect, useState } from 'react'
import './RoutineCard.css'
import { RoutineModal } from './RoutineModal'
import { getRoutines } from '../services/getRoutines'

export const RoutineCard = () => {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [routine, setRoutine] = useState([])
  const [exercises, setExercises] = useState()
  let flag = false

  useEffect(() => {
    getRoutines().then(data => setRoutine(data))
   }, [flag])
  
  const handleModal = (item) => {
    setIsOpen(true)
    console.log(routine)
    setExercises(item)
  }

  //FIX: SOMETHING WRONG WITH EXERCSES STATE
  return (
    <>
      {
        routine.map((item) => {
          return (
            <div className='routine-card-container'>
              <label className='day-title' key={item.day}>{item.day}</label>
              <button className='day-button' key={`${item.day}-button`} onClick={() => { handleModal(item); flag = !flag }}>Ver</button>
            </div>
          )
        })
      }
      {
        exercises && <RoutineModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} exercises={exercises}/>
      }
    </>
  )
}

