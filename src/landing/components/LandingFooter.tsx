import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { LogoSVG } from "../../common/components/SVGS";
import "./LandingFooter.css";

export const LandingFinalCta = () => {
  return (
    <section className='landing-section'>
      <motion.div
        className='landing-cta'
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>¿Listo para transformar tu cuerpo?</h2>
        <p>Tu primera dieta y rutina personalizadas están a un clic.</p>
        <NavLink to='/signin' className='landing-btn landing-btn-primary'>
          Crear mi cuenta gratis
        </NavLink>
      </motion.div>
    </section>
  );
};

const footerLinks = [
  { to: "/calculator", label: "Calculadora" },
  { to: "/macros", label: "Macros" },
  { to: "/login", label: "Iniciar sesión" },
  { to: "/signin", label: "Crear cuenta" },
  { to: "/terms", label: "Términos" },
];

export const LandingFooter = () => {
  return (
    <footer className='landing-footer'>
      <div className='landing-footer-inner'>
        <span className='landing-footer-brand'>
          <LogoSVG />
          JAYANI POWER
        </span>
        <nav className='landing-footer-links'>
          {footerLinks.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <small>© 2026 Jayani Power. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
};
