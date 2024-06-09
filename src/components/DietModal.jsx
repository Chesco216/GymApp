import React from 'react'
import Modal from 'react-modal'
import './DietModal.css'

const customStyles = {
  content: {
    height: '80%',
    overflow: 'scroll',
    border: '5px solid #FF004D',
    borderRadius: '20px',
    scrollbarWidth: 'none',
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '30px',
    transform: 'translate(-50%, -50%)',
    background: '#242933'
  },
  overlay: {
    backgroundColor: 'rgba(36, 41, 51, 0.8)',
  }
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
        //WARN: i must return components instead but well, i dont have time so it is what it is
        time.map((item) => {
          return ( 
            <>
              <h1 className='meal-title' key={item.meal}>{item.meal}</h1>
              <div key={'container'} className='meal-name-description'>
                <h2 className='meal-subtitle' key={item.nombre}>{item.nombre}</h2>
                <label className='meal-description' key={item.descripcion}>{item.descripcion}</label>
                <hr className='hr-line-separator-1'></hr>
                <h2 className='meal-subtitle' key={'food'}>Ingredientes</h2>
                <table className='foods-table' key={`table${item.meal}`}>
                  <tr>
                    <th key={'ingrediente'} className='table-headder'>Ingrediente</th>
                    <th key={'cantidad'} className='table-headder'>Catidad</th>
                  </tr>
                  {
                    item.alimentos.map((item) => {
                      return (
                        <tr>
                          <td className='table-content' key={item.nombre}>
                            {item.nombre}
                          </td>
                          <td className='table-content' key={item.cantidad}>
                            {item.cantidad}
                          </td>
                        </tr>
                      )
                    })
                  }
                </table>
                <hr className='hr-line-separator-1'></hr>
                <h2 className='meal-subtitle' key={'macros'}>Macros</h2>
                <div className='labels-container'>
                  <label className='macros-modal-label' key={item.macros.prote}>Proteinas: {item.macros.prote}</label>
                  <label className='macros-modal-label' key={item.macros.cals}>Calorias: {item.macros.cals}</label>
                  <label className='macros-modal-label' key={item.macros.vitaminas}>Vitaminas: {item.macros.vitaminas.join(' , ')}</label>
                  <label className='macros-modal-label' key={item.macros.minerales}>Minerales:{item.macros.minerales.join(' , ')}</label>
                </div>
              </div>
              <hr className='hr-line-separator-2'></hr>
            </>)
        })
      }
      <button onClick={closeModal}>close</button>
    </Modal>
  )
}
