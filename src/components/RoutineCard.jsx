import React, { useContext, useEffect, useState } from 'react'
import './RoutineCard.css'
import { RoutineModal } from './RoutineModal'
import { getRoutines } from '../services/getRoutines'
import { userContext } from '../context/UserProvider'

export const RoutineCard = () => {

  const { userinfo } = useContext(userContext)

  const [modalIsOpen, setIsOpen] = useState(false)
  const [routine, setRoutine] = useState([])
  const [exercises, setExercises] = useState()
  let flag = false

  useEffect(() => {
    getRoutines({userinfo}).then(data => setRoutine(data))
    console.log('userinfo useeffect: ', userinfo)
   }, [flag])
  
  const handleModal = (item) => {
    setIsOpen(true)
    console.log(routine)
    setExercises(item)
    flag => !flag
  }

  //FIX: SOMETHING WRONG WITH EXERCSES STATE
  return (
    <>
      {
        routine.map((item) => {
          return (
            <div className='routine-card-container'>
              <label className='day-title' key={item.day}>{item.day}</label>
              <button className='day-button' key={`${item.day}-button`} onClick={() => { handleModal(item)}}>Ver</button>
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

