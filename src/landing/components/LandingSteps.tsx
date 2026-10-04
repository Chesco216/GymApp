import { motion } from "framer-motion";
import "./LandingSteps.css";

const steps = [
  {
    n: "1",
    title: "Crea tu cuenta",
    text: "Regístrate gratis con tu email o con Google en menos de un minuto.",
  },
  {
    n: "2",
    title: "Completa tu perfil",
    text: "Cuéntanos tu edad, peso, metas, restricciones y limitaciones físicas.",
  },
  {
    n: "3",
    title: "Recibe tu plan",
    text: "Generamos tu dieta y tu rutina a medida. Puedes regenerarlas cada día.",
  },
];

export const LandingSteps = () => {
  return (
    <section className='landing-section landing-steps'>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='landing-section-title'>Empieza en 3 pasos</h2>
        <p className='landing-section-sub'>Del registro a tu primer plan en minutos.</p>
      </motion.div>
      <ol className='landing-steps-list'>
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            className='landing-step'
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <span className='landing-step-n'>{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};
