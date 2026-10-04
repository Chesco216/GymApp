import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InfoForm.css";
import { useSessionContext } from "../../auth/hooks/session.context";
import { saveProfile } from "../repositories/profile.repository";
import {
  BODY_SUGGESTIONS,
  FOOD_SUGGESTIONS,
  GOAL_OPTIONS,
  LIMITS,
  SEX_OPTIONS,
  ChipInput,
  checkRange,
  joinChips,
  toggleExclusiveChip,
} from "./profile-fields";

export const InfoForm = () => {
  const navigate = useNavigate();
  const context = useSessionContext();
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [food, setFood] = useState<string[]>([]);
  const [foodInput, setFoodInput] = useState<string>("");
  const [body, setBody] = useState<string[]>([]);
  const [bodyInput, setBodyInput] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addChip = (value: string, current: string[], set: (v: string[]) => void, clear: () => void) => {
    const next = toggleExclusiveChip(value, current);
    if (next) set(next);
    clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.userinfo) return;

    const ageError = checkRange(age, LIMITS.age.min, LIMITS.age.max, LIMITS.age.label);
    if (ageError) {
      setError(ageError);
      return;
    }
    const weightError = checkRange(weight, LIMITS.weight.min, LIMITS.weight.max, LIMITS.weight.label);
    if (weightError) {
      setError(weightError);
      return;
    }
    const heightError = checkRange(height, LIMITS.height.min, LIMITS.height.max, LIMITS.height.label);
    if (heightError) {
      setError(heightError);
      return;
    }
    if (!sex) {
      setError("Selecciona tu sexo.");
      return;
    }
    if (!goal) {
      setError("Selecciona tu meta.");
      return;
    }
    setError(null);

    const currDate = new Date();
    // Firestore no acepta `undefined`: todo lo opcional va como null o se omite.
    // photoURL viene de Google; en cuentas email es null → guardamos null.
    // Los chips se guardan unidos por coma para no cambiar el shape (los
    // prompts y el perfil los consumen como string).
    const userObj = {
      age: parseFloat(age),
      createdAt: currDate,
      email: context.userinfo.email ?? null,
      height: parseFloat(height),
      memberType: true,
      profilePictureUrl: context.userinfo.photoURL ?? null,
      uid: context.userinfo.uid,
      updatedAt: currDate,
      username: context.userinfo.displayName ?? context.userinfo.username ?? null,
      weight: parseFloat(weight),
      gender: sex,
      foodRestrictions: joinChips(food),
      physicalLimitations: joinChips(body),
      goal: goal,
    };

    try {
      await saveProfile(userObj);
      // Actualizar el contexto para que /profile pinte los datos nuevos
      // sin depender de una recarga.
      context.setUserinfo({ ...context.userinfo, ...userObj });
      navigate('/profile');
    } catch (err) {
      console.log(err);
      setError('No se pudieron guardar los datos. Inténtalo de nuevo.');
    }
  };

  return (
    <div className='info-form-container'>
      <div className='more-info-form'>
        <h1>Cuéntanos de ti</h1>
        <p>Con estos datos generamos tu dieta y tu rutina a medida.</p>
        <form className='info-form' onSubmit={handleSubmit}>
          {error && <div className='info-error' role='alert'>{error}</div>}
          <span className='info-span'>
            <label>
              ¿Qué edad tienes?
            </label>
            <input
              className='info-input'
              type='number'
              name='age'
              required
              min={LIMITS.age.min}
              max={LIMITS.age.max}
              placeholder={`${LIMITS.age.min}-${LIMITS.age.max} años`}
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              ¿Cuál es tu peso? (kg)
            </label>
            <input
              className='info-input'
              type='number'
              name='weight'
              required
              min={LIMITS.weight.min}
              max={LIMITS.weight.max}
              placeholder={`${LIMITS.weight.min}-${LIMITS.weight.max} kg`}
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              ¿Cuál es tu altura? (cm)
            </label>
            <input
              className='info-input'
              type='number'
              name='height'
              required
              min={LIMITS.height.min}
              max={LIMITS.height.max}
              placeholder={`${LIMITS.height.min}-${LIMITS.height.max} cm`}
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </span>
          <span className='info-span'>
            <label>
              Sexo
            </label>
            <div className='info-pills' role='radiogroup' aria-label='Sexo'>
              {SEX_OPTIONS.map((option) => (
                <button
                  key={option}
                  type='button'
                  role='radio'
                  aria-checked={sex === option}
                  className={`info-pill${sex === option ? " info-pill--active" : ""}`}
                  onClick={() => setSex(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </span>
          <ChipInput
            label='Restricciones alimentarias'
            values={food}
            suggestions={FOOD_SUGGESTIONS}
            inputValue={foodInput}
            onInputChange={setFoodInput}
            onAdd={(v) => addChip(v, food, setFood, () => setFoodInput(""))}
            onRemove={(v) => setFood(food.filter((f) => f !== v))}
          />
          <ChipInput
            label='Limitaciones físicas'
            values={body}
            suggestions={BODY_SUGGESTIONS}
            inputValue={bodyInput}
            onInputChange={setBodyInput}
            onAdd={(v) => addChip(v, body, setBody, () => setBodyInput(""))}
            onRemove={(v) => setBody(body.filter((b) => b !== v))}
          />
          <span className='info-span'>
            <label>
              ¿Cuál es tu meta?
            </label>
            <select
              className='info-input'
              name='goal'
              required
              value={goal}
              onChange={e => setGoal(e.target.value)}
            >
              <option value='' disabled>Selecciona tu meta</option>
              {GOAL_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </span>
          <button className='info-submit' type='submit'>Guardar y continuar</button>
        </form>
      </div>
    </div>
  )
}
