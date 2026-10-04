import { useEffect, useState } from "react";
import "./RoutineCard.css";
import { RoutineModal } from "./RoutineModal";
import { getRoutines } from "../repositories/routine.repository.firebase";
import type { StoredWorkoutDay } from "../interfaces/routine";

export const RoutineCard = ({ refreshToken = 0 }: { refreshToken?: number }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [routine, setRoutine] = useState<StoredWorkoutDay[]>([]);
  const [exercises, setExercises] = useState<StoredWorkoutDay | undefined>(undefined);

  useEffect(() => {
    getRoutines().then((data) => {
      if (data) setRoutine(data);
    });
  }, [refreshToken]);

  const handleModal = (item: StoredWorkoutDay) => {
    setIsOpen(true);
    setExercises(item);
  };

  return (
    <>
      {
        routine.map((item) => {
          return (
            <div className='routine-card-container' key={item.day}>
              <span className='routine-card-day'>{item.day}</span>
              <span className='routine-card-meta'>{item.group} · {item.duration}</span>
              <button className='day-button' key={`${item.day}-button`} onClick={() => { handleModal(item)}}>Ver</button>
            </div>
          )
        })
      }
      {
        exercises && <RoutineModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} exercises={exercises}/>
      }
    </>
  )
}
