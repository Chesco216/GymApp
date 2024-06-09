import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ChangePlan.css'
import { LogSignSVG } from './SVGS'
import { prices } from '../Screens/Prices'
import { PriceCard } from './PriceCard'

//TODO: add paayment functionality
export const ChangePlan = () => {

  const navigate = useNavigate()

  return (
    <div className='change-plan-container'>
      <div className='back-to-profile' onClick={() => {navigate('/profile')}}>
        <LogSignSVG/>
      </div>
      <div className='prices-cards-screen'>
        {
          prices.map((item) => {
            return <PriceCard plan={item.plan} price={item.price} utils={item.utils} />
          })
        }
      </div>
    </div>
  )
}
