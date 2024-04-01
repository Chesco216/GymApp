import React from 'react'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { MacrosTable } from '../components/MacrosTable'

export const Macros = () => {
  return (
    <>
      <Header/>
      <SearchBar title='food'/>
      <MacrosTable/>
    </>
  )
}
