import React from 'react'

export const MacrosRow = ({ nombre, calorias, proteinas, grasa, vitaminas, minerales, showCardPreview }) => {
  return (
    <tr>
      <td onClick={ showCardPreview }>{nombre}</td>
      <td>{calorias}</td>
      <td>{proteinas}</td>
      <td>{grasa}</td>
      <td>{`${vitaminas.join(',  ')}`}</td>
      <td>{`${minerales.join(',  ')}`}</td>
    </tr>
  )
}
