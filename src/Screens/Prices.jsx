import React from 'react'
import { Header } from '../components/Header'
import { PriceCard } from '../components/PriceCard'
import "./Prices.css"

export const Prices = () => {
  return (
    <>
      <Header/>
      <div className="price-card">
        <PriceCard time = "month"/>
      </div>
    </>
  )
}
