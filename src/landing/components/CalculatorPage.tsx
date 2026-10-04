import { Header } from "../../common/components/Header";
import "./Calculator.css";
import { SelectBox } from "./SelectBox";
import { NavLink } from "react-router-dom";
import { useCalculator } from "../hooks/useCalculator";

export const CalculatorPage = () => {

  const selectProps = [
    { key: 1, value: 1.2, text: 'Muy poca actividad' },
    { key: 2, value: 1.375, text: 'Poca actividad' },
    { key: 3, value: 1.55, text: 'Actividad moderada' },
    { key: 4, value: 1.725, text: 'Actividad alta' },
    { key: 5, value: 1.9, text: 'Actividad muy alta' },
  ]

  const { prot, cal, calculate } = useCalculator();

  const getMacros = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const activity = Number(fields.get('actBox'));
    const age = String(fields.get('agein'));
    const height = String(fields.get('heightin'));
    const weight = String(fields.get('weightin'));
    const gender = fields.get('gender');
    let gen: number;
    gender ? gen = -161 : gen = 5;
    calculate(age, height, weight, activity, gen);
  }

  return (
    <>
      <Header />
      <main className='calc-page'>
        <div className='calc-head'>
          <h1>Calcula tus macros</h1>
          <p>Descubre cuántas proteínas y calorías necesitas al día según tu cuerpo y tu actividad.</p>
        </div>
        <div className='calc-grid'>
          <form className='calc-card' onSubmit={getMacros}>
            <label className='input-label-calc'>Edad</label>
            <input name='agein' className='calc-input' type='number' min={1} placeholder='Ej. 28' />

            <label className='input-label-calc'>Peso (kg)</label>
            <input name='weightin' className='calc-input' type='number' min={1} placeholder='Ej. 70' />

            <label className='input-label-calc'>Altura (cm)</label>
            <input name='heightin' className='calc-input' type='number' min={1} placeholder='Ej. 175' />

            <SelectBox title={'Nivel de actividad'} options={selectProps} />

            <label className='input-label-calc'>Sexo</label>
            <div className="button r" id="button-1">
              <input name='gender' type="checkbox" className="checkbox" />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
            <button className='get-macros-button' type='submit'>Calcular</button>
          </form>
          <div className='calc-result-card'>
            <h2>Tu ingesta diaria</h2>
            <div className='calc-result-stats'>
              <div className='calc-result-stat'>
                <span className='calc-result-value'>{prot}</span>
                <span className='calc-result-label'>Proteínas (g)</span>
              </div>
              <div className='calc-result-stat'>
                <span className='calc-result-value'>{cal}</span>
                <span className='calc-result-label'>Calorías (kcal)</span>
              </div>
            </div>
            <p className='calc-result-hint'>Completa el formulario y pulsa Calcular para ver tus números.</p>
          </div>
        </div>
        <div className='calc-info-grid'>
          <span className='calc-info-card'>
            <h2>¿Por qué las proteínas son importantes?</h2>
            <p>
              Las proteínas son esenciales para la reparación y construcción muscular, la síntesis de enzimas y hormonas, el mantenimiento de la salud ósea y de la piel, el apoyo al sistema inmunológico y la regulación del apetito y la saciedad. Consumir suficientes proteínas de alta calidad es fundamental para mantener un cuerpo fuerte y saludable.
            </p>
          </span>
          <span className='calc-info-card'>
            <h2>¿Más o menos calorías?</h2>
            <p>
              Consumir más calorías de las que quemas lleva al aumento de peso, mientras que consumir menos resulta en pérdida de peso. Más allá del conteo, la calidad importa: prioriza frutas, verduras, proteínas magras y granos enteros sobre opciones ultraprocesadas.
            </p>
          </span>
        </div>
        <div className='calc-macros-cta'>
          <label className='which-meals-label'>
            ¿Qué alimentos contienen las proteínas y minerales que necesitas?
          </label>
          <NavLink to='/macros' className='calc-cta-button'>
            Ir a la tabla de macronutrientes
          </NavLink>
        </div>
      </main>
    </>
  )
}
