import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { MacrosRow }  from "../components/MacrosRow";
import { fetchMacros } from '../services/fetchMacros';
import './Macros.css'
import { searchFoodByName } from '../services/searchFoodByName';

export const Macros = () => {

  const [dataEmpty, setDataEmpty] = useState({ display: 'none' })
  const [data, setData] = useState([])
  const [cardData, setCardData] = useState({})
  useEffect(() => {
    fetchMacros()
      .then( res => setData(res))
    searchFoodByName('pollo')
      .then( res => setCardData(res.retVal[0]))
  }, [])

  const setHidden = () => {
    setDataEmpty({ display: 'none' })
  }

  const showCardPreview = async( event ) => {
    const value = event.target.innerText
    const { retVal } = await searchFoodByName(value)
    setCardData(retVal[0])
    console.log(cardData)
  }

  return (
    <>
      <Header/>
      <SearchBar onDataChanged={ setData } onCardChanged={ setCardData } onNotFound={ setDataEmpty } />
      <div className='no-data' style={ dataEmpty }> 
        <label>
          no se encontro el alimento
        </label>
        <button onClick={ setHidden } className='close-not-found'>x</button>
      </div>
      <div className='macros-table-card-container'>
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
                      showCardPreview={ showCardPreview }
                    />
                  )
              })
            }
            </tbody>
          </table>
        </div>
          <div className='food-card-container'>
            <img src={cardData.img} className='food-card-img' />
            <span className='food-card-text'>
              <h3>{cardData.nombre}</h3>
              <label>{cardData.descripcion}</label>
            </span>
          </div>
      </div>
    </>
  )
}
