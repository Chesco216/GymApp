import Modal from "react-modal";
import { ExerciseView } from "./ExerciseView";
import "../../common/components/RoutineModal.css";
import { ClockSVG, FireSVG } from "../../common/components/SVGS";
import type { StoredWorkoutDay } from "../interfaces/routine";

const customStyles = {
  content: {
    width: 'min(92vw, 480px)',
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

interface RoutineModalProps {
  modalIsOpen: boolean;
  setIsOpen: (open: boolean) => void;
  exercises: StoredWorkoutDay;
}

export const RoutineModal = ({ modalIsOpen, setIsOpen, exercises }: RoutineModalProps) => {

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
            return <ExerciseView key={item.series} sets={item}/>
          })
        }
        <button className='close-modal-btn' onClick={closeModal}>Cerrar</button>
      </Modal>
  )
}
