import React, { useState ,useRef } from 'react'
import './SearchBar.css'
import { searchFoodByName } from '../assets/searchFoodByName'
import { fetchMacrosByCategory } from '../assets/fetchMacros'

export const SearchBar = ({ onDataChanged, onNotFound, title }) => {
  const searchByFood = async( event ) => {
    event.preventDefault()
    const fields = new FormData( event.target )
    const name = fields.get('food-name')
    const { retVal, found } = await searchFoodByName(name)
    found ? onNotFound({ display: 'none' }) : onNotFound({ display: 'flex' })
    onDataChanged(retVal)
  }

  const filterByCategory = async ( event ) => {
    event.preventDefault()
    const fields = new FormData( event.target )
    const category = fields.get('food-category')
    const data = await fetchMacrosByCategory( category )
    onDataChanged(data)
  }
  
  return (
    <div className='search-container'>
      <form onSubmit={ searchByFood }>
        <label className='search-label'>Search by { title }</label>
        <input name='food-name' className='search-input' type='text'/>
        <button type='submit' className='search-food-button'>Buscar</button>
      </form>

      <label className='search-label'> or search by cartegory</label>
      <form onSubmit={ filterByCategory }>
        <select name='food-category' className='select-macro-category'>
          <option value='carne'>carne</option>
          <option value='vegetales'>vegetales</option>
          <option value='frutas'>frutas</option>
          <option value='legumbre'>legumbre</option>
          <option value='fruto seco'>fruto seco</option>
          <option value='todos'>todos</option>
        </select>
        <button type='submit' className='search-food-button' style={{margin:20}}> Search</button>
      </form>
    </div>
  )
} 
