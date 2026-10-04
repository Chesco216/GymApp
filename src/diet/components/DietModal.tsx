import Modal from "react-modal";
import "./DietModal.css";
import type { DietMeal } from "../interfaces/diet";

const customStyles = {
  content: {
    width: 'min(92vw, 640px)',
    maxHeight: '85vh',
    height: 'auto',
    overflow: 'auto' as const,
    border: '1px solid rgba(255, 0, 77, 0.4)',
    borderRadius: '20px',
    scrollbarWidth: 'none' as const,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '24px',
    transform: 'translate(-50%, -50%)',
    background: '#242933'
  },
  overlay: {
    backgroundColor: 'rgba(36, 41, 51, 0.8)',
  }
};

Modal.setAppElement('#root');

interface DietModalProps {
  modalIsOpen: boolean;
  setIsOpen: (open: boolean) => void;
  meals: DietMeal[];
  className?: string;
}

export const DietModal = ({ modalIsOpen, setIsOpen, meals }: DietModalProps) => {

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
                  <tbody>
                  <tr>
                    <th key={'ingrediente'} className='table-headder'>Ingrediente</th>
                    <th key={'cantidad'} className='table-headder'>Cantidad</th>
                  </tr>
                  {
                    item.ingredients.map((ingredient) => {
                      return (
                        <tr key={ingredient.name}>
                          <td className='table-content' key={ingredient.name}>
                            {ingredient.name}
                          </td>
                          <td className='table-content' key={ingredient.quantity}>
                            {ingredient.quantity}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
                <hr className='hr-line-separator-1'></hr>
                <h2 className='meal-subtitle' key={'macros'}>Macros</h2>
                <div className='labels-container'>
                  <label className='macros-modal-label' key={item.macros.proteins}>Proteinas: {item.macros.proteins}</label>
                  <label className='macros-modal-label' key={item.macros.calories}>Calorias: {item.macros.calories}</label>
                  <label className='macros-modal-label' key={item.macros.vitamins.join()}>Vitaminas: {item.macros.vitamins.join(' , ')}</label>
                  <label className='macros-modal-label' key={item.macros.minerals.join()}>Minerales:{item.macros.minerals.join(' , ')}</label>
                </div>
              </div>
              <hr className='hr-line-separator-2'></hr>
            </>)
        })
      }

      <button className='close-modal-btn' onClick={closeModal}>Cerrar</button>
    </Modal>
  )
}
