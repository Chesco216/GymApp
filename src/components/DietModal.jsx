import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    height: '80%',
    overflow: 'scroll',
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const DietModal = ({ modalIsOpen, setIsOpen, time }) => {

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
      {
        time.map((item) => {
          return ( 
            <>
              <h1 key={item.meal}>{item.meal}</h1>
              <h2 key={item.nombre}>{item.nombre}</h2>
              <label key={item.descripcion}>{item.descripcion}</label>
              <h2 key={'food'}>Ingredientes</h2>
              {
                item.alimentos.map((item) => {
                  return (
                    <>
                      <span key={item.nombre}>
                        {item.nombre} | cantidad: {item.cantidad}
                      </span>
                    </>
                  )
                })
              }
              <h2 key={'macros'}>Macros</h2>
              <label key={item.macros.prote}>Proteinas: {item.macros.prote}</label>
              <label key={item.macros.cals}>Calorias: {item.macros.cals}</label>
              <label key={item.macros.vitaminas}>Vitaminas: {item.macros.vitaminas.join(' | ')}</label>
              <label key={item.macros.minerales}>Minerales: {item.macros.minerales.join(' | ')}</label>
            </>)
        })
      }
      <h1></h1>
      <button onClick={closeModal}>close</button>
    </Modal>
  )
}
