import React from 'react'
import "./PriceCard.css"
/**
 * @param {String} time especify the time in month, months or year for the susbscription type
 * @param {String} classColor especify the color for the price card
 * @returns 
 */
export const PriceCard = ({ plan, price, utils }) => {
  return (
    <div className='price-card-container'>
      <h1 className='plan-header'>{plan}</h1>
      <label><strong className='plan-price'>{price}$</strong> /mes</label>
      <ul className='utils-ul'>
      {
        utils.map((item) => {
          return (
            <li className='plan-utils'>{item}</li>
          )
        })
      }
      </ul>
      <button className='prices-sus-button'>Suscribirse</button>
    </div>
  )
}
