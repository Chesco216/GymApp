import React from 'react'
import './SelectBox.css'

export const SelectBox = ({ title, options }) => {
  return (
    <>
      <label className='input-label-calc'>{title}</label>
      <select name='actBox' className='select-box-component'>
        {
          options.map( option => {
            return (
              <option key={option.key} value={option.value}>{option.text}</option>
            )
          })
        }
      </select>
    </>
  )
}
