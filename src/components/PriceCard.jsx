import React from 'react'
import { PriceBenefit } from './PriceBenefit'
import "./PriceCard.css"
/**
 * 
 * @param {String} time especify the time in month, months or year for the susbscription type
 * @param {String} classColor especify the color for the price card
 * @returns 
 */
export const PriceCard = ({time, classColor}) => {
  return (
    <>
      <div className={classColor}>
        <div className="name-price">
          <h1>Hobby</h1>
          <p>lorem ipsum</p>
        </div>
        <div className="price-details">
          <span>Bs</span>
          <span>Lorem Ipsum</span>
          <span>{time}</span>
        </div>
        <div className="price-details-more">
          <span>
            {
              "+"
              //TODO: Add an + Symbol
            } 
          </span>
          <p>Beneficios extra</p>
        </div>
        <hr className='price-br'/>
        <ul className="price-benefits">
        <PriceBenefit benefitInfo = "Lorem Ipsum"/>
        <PriceBenefit benefitInfo = "Lorem Ipsum"/>
        <PriceBenefit benefitInfo = "Lorem Ipsum"/>
        <PriceBenefit benefitInfo = "Lorem Ipsum"/>
        <PriceBenefit benefitInfo = "Lorem Ipsum"/>
        </ul>
        <button className="btn-subscribe">
          <a href="">Subscribe now</a>
        </button>
      </div>
    </>
  )
}
