import React from 'react'
import { Header } from '../components/Header'
import './Landing.css'
import { NavLink } from 'react-router-dom'

export const Landing = () => {
  return (
    <>
      <Header/>
      <div className='landing-container'>
        <div className='landing-left'>
            <span className='landing-title'>
              <img src='../../public/logo.jpg' className='landing-logo' />
              JAYANI POWER
          </span>
          <h1>
            ¡Transforma tu Cuerpo y Tu Vida!
          </h1>
          <label className='get-started-text'>
            En Jayani Power, estamos dedicados a empoderarte en tu viaje hacia un estilo de vida más saludable y equilibrado. Entendemos que cada persona es única, por lo que ofrecemos un enfoque personalizado para ayudarte a alcanzar tus objetivos de salud y bienestar. Nuestro equipo de expertos en nutrición y fitness ha diseñado cuidadosamente planes adaptados a diferentes necesidades, ya sea que desees perder peso, tonificar tu cuerpo o mejorar tu salud en general.
          </label>
          <NavLink to='signin'>
            <button className='get-started-button'>Get Started</button>
            </NavLink>
        </div>
        <div className='Landing-right'>
          <img className='landing-right-image' src='../../public/openart-image_sVzkasfZ_1714275645837_raw.jpg'/>
        </div>
      </div>
    </>
  )
}
