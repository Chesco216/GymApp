import React, { useEffect } from 'react'
import './SearchBar.css'
import { fetchMacros } from '../assets/fetchMacros'

export const SearchBar = ({ title }) => {

  const searchByFood = async() => {
    // const data = await fetchMacros()
    console.log(data)
  }

  useEffect(() => {
    fetchMacros()
      .then( res => data )
  }, [])

  return (
    <div className='search-container'>
      <label className='search-label'>Search by { title }</label>
      <input className='search-input' type='text'/>
      <button onClick={ searchByFood }>Buscar</button>

    </div>
  )
} 
