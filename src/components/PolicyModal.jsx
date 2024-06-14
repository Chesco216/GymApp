import Modal from 'react-modal'
import './RoutineModal.css'
import TermsConditions from './TermsConditions';
import { CloseSVG } from './SVGS';

const customStyles = {
  content: {
    height: 'fit-content',
    overflow: 'scroll',
    border: '5px solid #FF004D',
    borderRadius: '20px',
    scrollbarWidth: 'none',
    width: 'fit-content',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    // padding: '30px',
    transform: 'translate(-50%, -50%)',
    background: '#242933'
  },
  overlay: {
    backgroundColor: 'rgba(36, 41, 51, 0.8)',
  }
};

Modal.setAppElement('#root');

export const PolicyModal = ({ modalIsOpen, setIsOpen }) => {

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
        <div onClick={closeModal} className='terms-close-modal-btn'>
          <CloseSVG/>
        </div>
        <TermsConditions/>
      </Modal>
  )
}
