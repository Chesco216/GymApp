import React from 'react'
import Modal from 'react-modal'
import './DietModal.css'
import { LogoSVG } from './SVGS'

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

export const DietModal = ({ modalIsOpen, setIsOpen, meals }) => {

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
        meals.map((item) => {
          return ( 
            <>
              <h1 className='meal-title' key={item.meal_time}>{item.meal_time}</h1>
              <div key={'container'} className='meal-name-description'>
                <h2 className='meal-subtitle' key={item.name}>{item.name}</h2>
                <label className='meal-description' key={item.description}>{item.description}</label>
                <hr className='hr-line-separator-1'></hr>
                <h2 className='meal-subtitle' key={'food'}>Ingredientes</h2>
                <table className='foods-table' key={`table${item.name}`}>
                  <tr>
                    <th key={'ingrediente'} className='table-headder'>Ingrediente</th>
                    <th key={'cantidad'} className='table-headder'>Catidad</th>
                  </tr>
                  {
                    item.ingredients.map((item) => {
                      return (
                        <tr>
                          <td className='table-content' key={item.name}>
                            {item.name}
                          </td>
                          <td className='table-content' key={item.quantity}>
                            {item.quantity}
                          </td>
                        </tr>
                      )
                    })
                  }
                </table>
                <hr className='hr-line-separator-1'></hr>
                <h2 className='meal-subtitle' key={'macros'}>Macros</h2>
                <div className='labels-container'>
                  <label className='macros-modal-label' key={item.macros.proteins}>Proteinas: {item.macros.proteins}</label>
                  <label className='macros-modal-label' key={item.macros.calories}>Calorias: {item.macros.calories}</label>
                  <label className='macros-modal-label' key={item.macros.vitaminas}>Vitaminas: {item.macros.vitamins.join(' , ')}</label>
                  <label className='macros-modal-label' key={item.macros.minerales}>Minerales:{item.macros.minerals.join(' , ')}</label>
                </div>
              </div>
              <hr className='hr-line-separator-2'></hr>
            </>)
        })
      }

      <div className='powered-by'><label className='powered-by-label'>Powered by</label> <LogoSVG className='powered-by-logo,'/> <img src='../../public/gpt_logo.png' className='gpt-logo' alt='logo'/></div>
      <button className='close-modal-btn' onClick={closeModal}>close</button>
    </Modal>
  )
}
