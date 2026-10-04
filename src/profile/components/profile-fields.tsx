/** Límites y opciones compartidos entre InfoForm y el editor de InfoProfile. */

export const LIMITS = {
  age: { min: 10, max: 100, label: "edad" },
  weight: { min: 30, max: 300, label: "peso" },
  height: { min: 100, max: 250, label: "altura" },
} as const;

export const GOAL_OPTIONS = [
  "Perder peso",
  "Ganar masa muscular",
  "Tonificar",
  "Mantener peso",
  "Mejorar resistencia",
  "Mejorar salud general",
];

export const SEX_OPTIONS = ["Hombre", "Mujer"];

export const FOOD_SUGGESTIONS = ["Ninguna", "Vegetariano", "Vegano", "Sin gluten", "Sin lactosa", "Sin azúcar", "Hipertensión", "Diabetes"];
export const BODY_SUGGESTIONS = ["Ninguna", "Rodilla", "Espalda", "Hombro", "Tobillo", "Cuello", "Asma"];

export const NONE_OPTION = "Ninguna";

/**
 * Añade un chip con "Ninguna" como opción exclusiva: elegirla limpia el
 * resto; elegir otra cosa quita "Ninguna". Devuelve null si no hay cambio.
 */
export const toggleExclusiveChip = (value: string, current: string[]): string[] | null => {
  const clean = value.trim();
  if (!clean) return null;
  if (clean === NONE_OPTION) return current.length === 1 && current[0] === NONE_OPTION ? null : [NONE_OPTION];
  const rest = current.filter((c) => c !== NONE_OPTION);
  if (rest.includes(clean)) return null;
  return [...rest, clean];
};

export const checkRange = (raw: string, min: number, max: number, label: string): string | null => {
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return `Ingresa tu ${label}.`;
  if (value < min || value > max) return `Ingresa un ${label} válido (entre ${min} y ${max}).`;
  return null;
};

/** "a, b" ↔ ["a", "b"] para guardar los chips como string (shape Firestore sin cambios). */
export const splitChips = (raw?: string | null): string[] =>
  (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const joinChips = (values: string[]): string => values.join(", ");

export const ChipInput = ({
  label,
  values,
  suggestions,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
}: {
  label: string;
  values: string[];
  suggestions: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}) => {
  return (
    <span className='info-span'>
      <label>{label}</label>
      <div className='info-chip-row'>
        <input
          className='info-input'
          type='text'
          value={inputValue}
          placeholder='Escribe y pulsa Añadir'
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAdd(inputValue);
            }
          }}
        />
        <button type='button' className='info-chip-add' onClick={() => onAdd(inputValue)}>
          Añadir
        </button>
      </div>
      <div className='info-chips'>
        {values.map((v) => (
          <span key={v} className='info-chip'>
            {v}
            <button type='button' onClick={() => onRemove(v)} aria-label={`Quitar ${v}`}>
              ×
            </button>
          </span>
        ))}
      </div>
      <div className='info-suggestions'>
        {suggestions
          .filter((s) => !values.includes(s))
          .map((s) => (
            <button key={s} type='button' className='info-suggestion' onClick={() => onAdd(s)}>
              + {s}
            </button>
          ))}
      </div>
    </span>
  );
};
