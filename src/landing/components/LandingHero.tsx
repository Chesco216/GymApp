import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./LandingHero.css";

const stats = [
  { value: "5 días", label: "de dieta personalizada" },
  { value: "5 días", label: "de rutina semanal" },
  { value: "100%", label: "adaptado a tu cuerpo" },
];

export const LandingHero = () => {
  return (
    <section className='landing-hero'>
      <motion.div
        className='landing-hero-copy'
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className='landing-badge'>Dieta y rutina generadas con IA</span>
        <h1 className='landing-hero-title'>
          Tu plan de entrenamiento y nutrición, <span>hecho a tu medida</span>
        </h1>
        <p className='landing-hero-sub'>
          Jayani Power crea tu dieta de 5 días y tu rutina semanal según tu cuerpo,
          tus metas y tus limitaciones. Sin plantillas genéricas.
        </p>
        <div className='landing-hero-ctas'>
          <NavLink to='/signin' className='landing-btn landing-btn-primary'>
            Empezar gratis
          </NavLink>
          <NavLink to='/calculator' className='landing-btn landing-btn-secondary'>
            Probar la calculadora
          </NavLink>
        </div>
        <dl className='landing-hero-stats'>
          {stats.map((s) => (
            <div key={s.label} className='landing-hero-stat'>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
      <motion.div
        className='landing-hero-media'
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img
          className='landing-hero-image'
          src='/openart-image_sVzkasfZ_1714275645837_raw.jpg'
          alt='Persona entrenando en el gimnasio'
        />
      </motion.div>
    </section>
  );
};
