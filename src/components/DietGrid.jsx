import React, { useContext, useEffect, useState } from 'react'
import { DietCard } from './DietCard'
import { createDiet } from '../services/createDiet'
import { userContext } from '../context/UserProvider'
import { getDiets } from '../services/getDiets'

export const DietGrid = () => {

  const { userinfo } = useContext(userContext)

  const [diets, setDiets] = useState()

  useEffect(() => {
    getDiets(userinfo)
    .then(diet => setDiets(diet))
    console.log('dieta: ', diets)
  }, [])

  const handleNewDiet = () => {
    console.log('new diet')
    createDiet(userinfo)
  }

  return  (
    <div className='diet-card-container'>
      {
        (diets) ? (
          diets.map((item) => {
            return (
              <DietCard key={item.day} day={item.day} meals={item.meals}/>
            )
          })
        ) : (<></>)
      }
      {
        (userinfo.memberType == 'premium') &&
        <button className='diet-card' onClick={handleNewDiet}>Quieres cambiar tu dieta?</button>
      }
    </div>
  )
}

