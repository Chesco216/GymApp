import React from 'react'
import { Header } from '../components/Header'
import { PriceCard } from '../components/PriceCard'
import "./Prices.css"

export const prices = [
	{
		plan: 'Standar',
		price: 0,
		utils: [
			'Obtiene las macros para tu dia a dia',
			'Rutinas',
			'Seguimiento de tu progreso',
		],
	},
	{
		plan: 'Premium',
		price: 2.99,
		utils: [
			'Obtiene las macros para tu dia a dia',
			'Rutinas y dietas personalizadas',
			'Seguimiento de tu progreso',
		],
	},
]

export const Prices = () => {
	return (
		<>
			<Header />
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
