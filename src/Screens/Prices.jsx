import React, { useContext } from 'react'
import { Header } from '../components/Header'
import { PriceCard } from '../components/PriceCard'
import { userContext } from '../context/UserProvider'
import "./Prices.css"

export const prices = [
	{
		plan: 'Standar',
		price: 0,
		utils: [
			'Obtiene las macros para tu dia a dia',
			'Rutinas y dietas',
		],
	},
	{
		plan: 'Premium',
		price: 2.99,
		utils: [
			'Obtiene las macros para tu dia a dia',
			'Rutinas y dietas personalizadas',
      'Crea una nueva rutina cuando quieras'
		],
	},
]


export const Prices = () => {

  const { userinfo } = useContext(userContext)

	return (
		<div className='prices-container'>
			<Header />
			<div className='prices-cards-screen'>
				{
					prices.map((item) => {
						return (
							<PriceCard plan={item.plan} price={item.price} utils={item.utils} user={userinfo}/>
						)
					})
				}
			</div>
		</div>
	)
}
