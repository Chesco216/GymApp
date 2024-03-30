import React, { useState } from 'react'
import { Header } from '../components/Header'
import './Calculator.css'
import { SelectBox } from '../components/SelectBox'
import { getProtCal } from '../assets/getProtCal'

export const Calculator = () => {

  const act = document.querySelector('.select-box-component')
  const inVals = document.querySelectorAll('.calc-input')
  const check = document.querySelector('.gender-checkbox')

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

  const getMacros = () => {
    let gen
    check.checked ? gen = 5 : gen = -161
    const { prote, cals } = getProtCal( inVals[0].value, inVals[2].value, inVals[1].value, act.value, gen )
    setCal(cals)
    setProt(prote)
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
        

        <label className='input-label-calc'>Select Gender</label>
        <label>
          <input className='gender-checkbox' type='radio'name='gender' />
          Male
        </label>
        <label>
          <input className='gender-checkbox' type='radio' name='gender' />
          Female
        </label>

        <label>{ `Protein: ${prot}   |   Calories: ${cal}` }</label>

        <button className='get-macros-button' onClick={ getMacros }>Get</button>

      </div>
    </>
  )
}
