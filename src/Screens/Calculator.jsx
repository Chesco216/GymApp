import React from 'react'
import { Header } from '../components/Header'
import './Calculator.css'
import { SelectBox } from '../components/SelectBox'
import { getProtCal } from '../assets/getProtCal'

export const Calculator = () => {

  const act = document.querySelector('.select-box-component')
  const inVals = document.querySelectorAll('.calc-input')

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

  // TODO: insert hooks useState
  const getMacros = () => {
    const { prote, cals } = getProtCal( inVals[0], inVals[2], inVals[1], act.value )
  }

  return (
    <>
      <Header/>
      <div className='calc-form-div'>
        <label className='input-label-calc'>Age</label>
        <input className='calc-input' type='number'/>

        <label className='input-label-calc'>Weight (kg)</label>
        <input className='calc-input' type='number'/>
          
        <label className='input-label-calc'>Height (cm)</label>
        <input className='calc-input' type='number'/>
        
        <SelectBox title={'Activity'} options={selectProps}/>
        

        {/* TODO: fix radio buttom, only one checed*/}
        <label className='input-label-calc'>Gender</label>
        <label>
          <input className='gender-checkbox' type='radio'/>
          Male
        </label>

        <label>
          <input className='gender-checkbox' type='radio'/>
          Female
        </label>
        {/* FIX: this doesnt work
        <label>{ prote | cals }</label>
        {/*}<input className='calc-input' type='checkbox'/>*/}

        <button onClick={ getMacros }>Get</button>

      </div>
    </>
  )
}
