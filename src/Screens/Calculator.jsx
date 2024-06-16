import React, { useState } from 'react'
import { Header } from '../components/Header'
import './Calculator.css'
import { SelectBox } from '../components/SelectBox'
import { getProtCal } from '../services/getProtCal'
import { NavLink } from 'react-router-dom'

export const Calculator = () => {

	const selectProps = [
		{
			key: 1,
			value: 1.2,
			text: 'Muy poca actividad'
		},
		{
			key: 2,
			value: 1.375,
			text: 'Poca actividad'
		},
		{
			key: 3,
			value: 1.55,
			text: 'Actividad moderada'
		},
		{
			key: 4,
			value: 1.725,
			text: 'Actividad alta'
		},
		{
			key: 5,
			value: 1.9,
			text: 'Actividad muy alta'
		},
	]

	const [prot, setProt] = useState(0)
	const [cal, setCal] = useState(0)

	const getMacros = (event) => {
		event.preventDefault()
		const fields = new FormData(event.target)
		const activity = fields.get('actBox')
		const age = fields.get('agein')
		const height = fields.get('heightin')
		const weight = fields.get('weightin')
		const gender = fields.get('gender')
		let gen
		gender ? gen = -161 : gen = 5
		const { prote, cals } = getProtCal(age, height, weight, activity, gen)
		setCal(cals)
		setProt(prote)
	}

	return (
		<>
			<Header />
			<div className='calculator-screen-container'>
				<form className='calc-form-div' onSubmit={getMacros}>
					<label className='input-label-calc'>Edad</label>
					<input name='agein' className='calc-input' type='number' />

					<label className='input-label-calc'>Peso (kg)</label>
					<input name='weightin' className='calc-input' type='number' />

					<label className='input-label-calc'>Altura (cm)</label>
					<input name='heightin' className='calc-input' type='number' />

					<SelectBox title={'Actividad'} options={selectProps} />

					<label className='input-label-calc'>Seleccione el sexo</label>
					<div className="button r" id="button-1">
						<input name='gender' type="checkbox" className="checkbox" />
						<div className="knobs"></div>
						<div className="layer"></div>
					</div>
					<button className='get-macros-button' type='submit' >OK</button>
				</form>
				<div className='prot-cal-div'>
					<label><h3>Tu ingesta diaria:</h3><br></br>{`Proteinas: ${prot}   |   Calorias: ${cal}`}</label>
					<span>
						<h2>
							Porque las proteinas son importantes?
						</h2>
						<label>
							Las proteínas son esenciales para la reparación y construcción muscular, la síntesis de enzimas y hormonas, el mantenimiento de la salud ósea y de la piel, el apoyo al sistema inmunológico y la regulación del apetito y la saciedad. Actúan como bloques de construcción en nuestro cuerpo, desempeñando un papel vital en una amplia gama de funciones fisiológicas. Consumir suficientes proteínas de alta calidad en nuestra dieta es fundamental para mantener un cuerpo fuerte, saludable y en funcionamiento óptimo.
						</label>
					</span>
					<span>
						<h2>
							Mas o menos calorias?
						</h2>
						<label>
							El equilibrio calórico es crucial para la salud y el peso adecuado. Consumir más calorías de las que se queman puede llevar al aumento de peso, mientras que consumir menos calorías puede resultar en pérdida de peso. Sin embargo, más allá del simple conteo de calorías, la calidad de los alimentos es fundamental. Optar por alimentos nutritivos y equilibrados, como frutas, verduras, proteínas magras y granos enteros, es esencial para garantizar una nutrición adecuada, independientemente de si estamos buscando aumentar o reducir nuestra ingesta calórica. Priorizar estos alimentos sobre opciones procesadas y ultraprocesadas puede promover una mejor salud y bienestar general.
						</label>
					</span>
				</div>
				<div className='go-to-macros'>
					<label className='which-meals-label'>
						Que alimentos contienen las proteinas y  minerales que necesito?
					</label>
					<NavLink to='/macros' style={{ textDecoration: 'none', color: 'inherit' }}>
						<label className='go-to-macros-label'>
							Ir a la tabla de macronutrientes
						</label>
					</NavLink>
				</div>
			</div>
		</>
	)
}
