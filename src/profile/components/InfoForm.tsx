import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InfoForm.css";
import { useSessionContext } from "../../auth/hooks/session.context";
import { saveProfile } from "../repositories/profile.repository";

export const InfoForm = () => {
  const navigate = useNavigate();
  const context = useSessionContext();
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.userinfo) return;
    const currDate = new Date();
    const userObj = {
      age: parseFloat(age),
      createdAt: currDate,
      email: context.userinfo.email,
      height: parseFloat(height),
      memberType: true,
      profilePictureUrl: context.userinfo.photoURL,
      uid: context.userinfo.uid,
      updatedAt: currDate,
      username: context.userinfo.displayName,
      weight: parseFloat(weight),
      gender: gender,
      foodRestrictions: food,
      physicalLimitations: body,
      goal: goal,
    };

    try {
      await saveProfile(userObj);
      navigate('/profile');
    } catch (error) {
      console.log(error);
      alert('error al cargar los datos');
    }
  };

  return (
    <div className='info-form-container'>
      <div className='more-info-form'>
        <h1>About you</h1>
        <form className='info-form' onSubmit={handleSubmit}>
          <span className='info-span'>
            <label>
              Que edad tienes?
            </label>
            <input
              className='info-input'
              type='number'
              name='age'
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Cual es tu peso? (kg)
            </label>
            <input
              className='info-input'
              type='number'
              name='weight'
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Cual es tu altura? (cm)
            </label>
            <input
              className='info-input'
              type='number'
              name='height'
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Con que genero te identificas?
            </label>
            <input
              className='info-input'
              type='text'
              name='gender'
              value={gender}
              onChange={e => setGender(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Restricciones alimentarias
            </label>
            <input
              className='info-input'
              type='text'
              name='food'
              value={food}
              onChange={e => setFood(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Limitaciones Fisicas
            </label>
            <input
              className='info-input'
              type='text'
              name='body'
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Cual la meta a la que quieres llegar con tu fisico?
            </label>
            <input
              className='info-input'
              type='text'
              name='goal'
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </span>
          <button className='info-submit' type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  )
}
