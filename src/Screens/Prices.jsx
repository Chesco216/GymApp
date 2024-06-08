import React from 'react'
import { Header } from '../components/Header'
import { PriceCard } from '../components/PriceCard'
import "./Prices.css"

const prices = [
  {
    plan: 'Standar',
    price: 0,
    utils: [
      'Obtiene las macros para tu dia a dia',
      'Dieta generica semanal',
      'Enciclopedia de rutinas',
      'ChatBot beta para tus dudas',
      'Seguimiento de tu progreso',
    ],
  },
  {
    plan: 'Premium',
    price: 2.99,
    utils: [
      'Obtiene las macros para tu dia a dia',
      'Dieta generica semanal',
      'Enciclopedia de rutinas',
      'ChatBot beta para tus dudas',
      'Seguimiento de tu progreso',
    ],
  },
]

export const Prices = () => {
  return (  
    <>
      <Header/>
        <div className='prices-cards-screen'>
        {
          prices.map((item) => {
            return (
              <PriceCard plan={item.plan} price={item.price} utils={item.utils} />
            )
          })
        }
        </div>
    </>
  )
}
