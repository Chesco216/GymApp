import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { MacrosRow }  from "../components/MacrosRow";
import { fetchMacros } from '../assets/fetchMacros';
import './Macros.css'

export const Macros = () => {

  const [dataEmpty, setDataEmpty] = useState({ display: 'none' })
  const [data, setData] = useState([])
  useEffect(() => {
    fetchMacros()
      .then( res => setData(res) )
  }, [])

  const setHidden = () => {
    setDataEmpty({ display: 'none' })
  }
  return (
    <>
      <Header/>
      <SearchBar onDataChanged={ setData } onNotFound={ setDataEmpty } title='food'/>
      <div className='no-data' style={ dataEmpty }> 
        <label>
          no se encontro el alimento
        </label>
        <button onClick={ setHidden } className='close-not-found'>x</button>
      </div>
      <div className='macros-table'>
        <table>
          <thead>
            <tr>
              <th>Comida</th>
              <th>Calorias</th>
              <th>Proteinas</th>
              <th>Grasas</th>
              <th>Viataminas</th>
              <th>Minerales</th>
            </tr>
          </thead>
          <tbody>
          {
            // (dataFiltered.length == 0) ? true : false
            data.map((item) => {
                return(
                  <MacrosRow 
                    key={item.nombre}
                    nombre={item.nombre} 
                    calorias={item.macros.calorias}
                    proteinas={item.macros.proteinas}
                    grasa={item.macros.grasa}
                    vitaminas={item.macros.vitaminas}
                    minerales={item.macros.minerales}
                  />
                )
            })
          }
          </tbody>
        </table>
      </div>
    </>
  )
}
