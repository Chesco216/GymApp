import React, { useState, useEffect}from 'react'
import './MacrosTable.css'
import { MacrosRow } from './MacrosRow'
import { fetchMacros } from '../assets/fetchMacros'

export const MacrosTable = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    fetchMacros()
      .then( res => setData(res) )
  }, [])

  console.log(data)
  return (
    <div>
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
  )
}
