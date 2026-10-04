import { useEffect, useState } from "react";
import { useSessionContext } from "../../auth/hooks/session.context";
import { useNavigate } from "react-router-dom";
import "./InfoProfile.css";
import "./InfoForm.css";
import "./UserAvatar.css";
import { UserAvatar } from "./UserAvatar";
import { CloseSVG, LogSignSVG } from "../../common/components/SVGS";
import { getProfile, saveProfile } from "../repositories/profile.repository";
import type { Profile } from "../interfaces/profile";
import {
  BODY_SUGGESTIONS,
  FOOD_SUGGESTIONS,
  GOAL_OPTIONS,
  LIMITS,
  SEX_OPTIONS,
  ChipInput,
  checkRange,
  joinChips,
  splitChips,
  toggleExclusiveChip,
} from "./profile-fields";

const DisplayChips = ({ value }: { value?: string | null }) => {
  const chips = splitChips(value);
  if (chips.length === 0) return <>—</>;
  return (
    <span className='info-display-chips'>
      {chips.map((c) => (
        <span key={c} className='info-display-chip'>{c}</span>
      ))}
    </span>
  );
};

export const InfoProfile = () => {
  const navigate = useNavigate();
  const { userinfo, setUserinfo } = useSessionContext();
  const [hide, setHide] = useState(true);

  useEffect(() => {
    getProfile(userinfo?.uid).then((data) => {
      if (data) setUserinfo(data);
    });
  }, []);

  if (!userinfo) {
    return (
      <div className='info-profile-container' aria-label='Cargando perfil'>
        <div className='info-profile-head'>
          <span className='skel info-profile-skeleton-avatar' />
          <span className='skel info-profile-skeleton-line' />
        </div>
        <span className='skel info-profile-skeleton-line' />
        <span className='skel info-profile-skeleton-line' />
        <span className='skel info-profile-skeleton-line info-profile-skeleton-line--short' />
      </div>
    );
  }

  const displayName = userinfo.username ?? userinfo.displayName ?? userinfo.email ?? "Mi perfil";

  return (
    <>
      <button className='back-to-profile' onClick={() => { navigate('/profile') }} aria-label='Volver al perfil'>
        <LogSignSVG />
      </button>
      <div className='info-profile-container'>
        <div className='info-profile-head'>
          <UserAvatar name={displayName} photoUrl={userinfo.profilePictureUrl} size={110} />
          <h1>{displayName}</h1>
        </div>
        <dl className='info-fields-container'>
          <div className='info-field-row'>
            <dt className='info-field'>Nombre de usuario</dt>
            <dd className='info-field-value'>{userinfo.username ?? "—"}</dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Correo electrónico</dt>
            <dd className='info-field-value'>{userinfo.email ?? "—"}</dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Edad</dt>
            <dd className='info-field-value'>{userinfo.age ?? "—"}</dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Peso</dt>
            <dd className='info-field-value'>{userinfo.weight != null ? `${userinfo.weight} kg` : "—"}</dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Altura</dt>
            <dd className='info-field-value'>{userinfo.height != null ? `${userinfo.height} cm` : "—"}</dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Sexo</dt>
            <dd className='info-field-value'>{userinfo.gender ?? "—"}</dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Restricciones alimentarias</dt>
            <dd className='info-field-value'><DisplayChips value={userinfo.foodRestrictions} /></dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Limitaciones físicas</dt>
            <dd className='info-field-value'><DisplayChips value={userinfo.physicalLimitations} /></dd>
          </div>
          <div className='info-field-row'>
            <dt className='info-field'>Meta</dt>
            <dd className='info-field-value'>{userinfo.goal ?? "—"}</dd>
          </div>
        </dl>
        <button className='update-info-button-1' onClick={() => { setHide(false) }}>Editar</button>
        <UpdateForm hide={(hide) ? 'hide' : ''} setHide={setHide} />
      </div>
    </>
  )
}

const UpdateForm = ({ hide, setHide }: { hide: string; setHide: (hide: boolean) => void }) => {
  const { userinfo, setUserinfo } = useSessionContext();
  const [username, setUsername] = useState(userinfo?.username ?? userinfo?.displayName ?? "");
  const [weight, setWeight] = useState(userinfo?.weight != null ? String(userinfo.weight) : "");
  const [sex, setSex] = useState(userinfo?.gender ?? "");
  const [food, setFood] = useState<string[]>(splitChips(userinfo?.foodRestrictions));
  const [foodInput, setFoodInput] = useState("");
  const [body, setBody] = useState<string[]>(splitChips(userinfo?.physicalLimitations));
  const [bodyInput, setBodyInput] = useState("");
  const [goal, setGoal] = useState(userinfo?.goal ?? "");
  const [error, setError] = useState<string | null>(null);

  const addChip = (value: string, current: string[], set: (v: string[]) => void, clear: () => void) => {
    const next = toggleExclusiveChip(value, current);
    if (next) set(next);
    clear();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userinfo) return;

    const weightError = checkRange(weight, LIMITS.weight.min, LIMITS.weight.max, LIMITS.weight.label);
    if (weightError) {
      setError(weightError);
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

    const updated: Profile = {
      ...(userinfo as Profile),
      uid: userinfo.uid,
      username,
      weight: parseFloat(weight),
      gender: sex,
      foodRestrictions: joinChips(food),
      physicalLimitations: joinChips(body),
      goal,
      updatedAt: new Date(),
    };

    try {
      await saveProfile(updated);
      setUserinfo({ ...userinfo, ...updated });
      setHide(true);
    } catch (err) {
      console.log(err);
      setError('No se pudo actualizar el perfil. Inténtalo de nuevo.');
    }
  };

  return (
    <form className={`update-info-form ${hide}`} onSubmit={handleUpdate}>
      <div className='update-form-top'>
        <h2>Editar información</h2>
        <button type='button' className='exit-form' onClick={() => { setHide(true) }} aria-label='Cerrar edición'>
          <CloseSVG />
        </button>
      </div>
      {error && <div className='info-error' role='alert'>{error}</div>}
      <span className='update-span-form'>
        <label className='update-label-form'>Nombre de usuario</label>
        <input
          className='update-input-form'
          type='text'
          name='name'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Peso (kg)</label>
        <input
          className='update-input-form'
          type='number'
          name='weight'
          required
          min={LIMITS.weight.min}
          max={LIMITS.weight.max}
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
      </span>
      <span className='update-span-form'>
        <label className='update-label-form'>Sexo</label>
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
      <div className='update-chip-block'>
        <ChipInput
          label='Restricciones alimentarias'
          values={food}
          suggestions={FOOD_SUGGESTIONS}
          inputValue={foodInput}
          onInputChange={setFoodInput}
          onAdd={(v) => addChip(v, food, setFood, () => setFoodInput(""))}
          onRemove={(v) => setFood(food.filter((f) => f !== v))}
        />
      </div>
      <div className='update-chip-block'>
        <ChipInput
          label='Limitaciones físicas'
          values={body}
          suggestions={BODY_SUGGESTIONS}
          inputValue={bodyInput}
          onInputChange={setBodyInput}
          onAdd={(v) => addChip(v, body, setBody, () => setBodyInput(""))}
          onRemove={(v) => setBody(body.filter((b) => b !== v))}
        />
      </div>
      <span className='update-span-form'>
        <label className='update-label-form'>Meta</label>
        <select
          className='update-input-form update-select'
          name='goal'
          required
          value={GOAL_OPTIONS.includes(goal) ? goal : ""}
          onChange={e => setGoal(e.target.value)}
        >
          <option value='' disabled>Selecciona tu meta</option>
          {GOAL_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </span>

      <button className='update-info-button-2' type='submit'>Actualizar</button>
    </form>
  )
}
