import React from 'react'
import { Header } from '../components/Header'
import { PriceCard } from '../components/PriceCard'
import "./Prices.css"

export const Prices = () => {
  return (
    <>
      <Header/>
      <div className="price-card">
        <PriceCard time = "month" classColor= "price-card-container-blue"/>
        <PriceCard time = "months" classColor= "price-card-container-purple"/>
        <PriceCard time = "year" classColor= "price-card-container-green"/>
      </div>
    </>
  )
}
