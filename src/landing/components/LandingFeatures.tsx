import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { DumbellSVG, EmptyDietSVG, FireSVG, PlanSVG } from "../../common/components/SVGS";
import "./LandingFeatures.css";

const features = [
  {
    to: "/signin",
    icon: <EmptyDietSVG />,
    title: "Dieta personalizada",
    text: "Plan de 5 días con desayuno, almuerzo y cena según tus restricciones y tu meta.",
  },
  {
    to: "/signin",
    icon: <DumbellSVG />,
    title: "Rutina personalizada",
    text: "Semana de entrenamiento con ejercicios, series y repeticiones para tu nivel.",
  },
  {
    to: "/calculator",
    icon: <FireSVG />,
    title: "Calculadora",
    text: "Calcula tus calorías y proteínas diarias en segundos, gratis y sin cuenta.",
  },
  {
    to: "/macros",
    icon: (
      <span className='landing-feature-icon--light'>
        <PlanSVG />
      </span>
    ),
    title: "Tabla de macros",
    text: "Descubre qué alimentos tienen las proteínas y minerales que necesitas.",
  },
];

export const LandingFeatures = () => {
  return (
    <section className='landing-section'>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='landing-section-title'>Todo lo que necesitas para progresar</h2>
        <p className='landing-section-sub'>
          Nutrición y entrenamiento en un solo lugar, adaptados a ti.
        </p>
      </motion.div>
      <div className='landing-features-grid'>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <NavLink to={f.to} className='landing-feature-card'>
              <span className='landing-feature-icon'>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
