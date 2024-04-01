import React from 'react'
import './SearchBar.css'

export const SearchBar = ({ title }) => {
  
  // TODO: implement searching food by name
  const searchByFood = async() => {
    // const data = await fetchMacros()
    // console.log(data)
  }

  // TODO: implement filter by category

  return (
    <div className='search-container'>
      <label className='search-label'>Search by { title }</label>
      <input className='search-input' type='text'/>
      <button onClick={ searchByFood } className='search-food-button'>Buscar</button>
      
      <select className='select-macro-category'>
        <option value='carne'>carne</option>
        <option value='vegetales'>vegetales</option>
        <option value='frutas'>frutas</option>
        <option value='legumbre'>legumbre</option>
        <option value='fruto seco'>fruto seco</option>
      </select>
    </div>
  )
} 
