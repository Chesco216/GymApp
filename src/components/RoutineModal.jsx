import Modal from 'react-modal'
import { ExerciseView } from './ExerciseView';
import './RoutineModal.css'
import { ClockSVG, FireSVG, LogoSVG } from './SVGS';

const customStyles = {
  content: {
    height: '80%',
    overflow: 'scroll',
    border: '5px solid #FF004D',
    borderRadius: '20px',
    scrollbarWidth: 'none',
    width: '30%',
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

export const RoutineModal = ({ modalIsOpen, setIsOpen, exercises }) => {

  function closeModal() {
    setIsOpen(false);
  }

  // const routine = exercises.exercises

  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className='group-routine'>{exercises.group}</h1>
        <hr/>
        <div className='info-modal-container'>
          <FireSVG/>
          <label className='info-modal-label'>{exercises.cals}</label>
          <ClockSVG/>
          <label className='info-modal-label'>{exercises.duration}</label>
        </div>
        {
          exercises.exercises.map((item) => {
            return <ExerciseView key={item.set} sets={item}/>
          })
        }
        <div className='powered-by-container'>
        <div className='powered-by'>
          <label className='powered-by-label'>Powered by</label>
          <LogoSVG className='powered-by-logo,'/>
          <img src='../../public/gpt_logo.png' className='gpt-logo' alt='logo'/></div>
        </div>
        <button className='close-modal-btn' onClick={closeModal}>close</button>
      </Modal>
  )
}
