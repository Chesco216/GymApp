import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { LogoSVG } from './SVGS';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className='header-container'>
			<div className="hmb">
				<NavLink to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					<div className='logo-label-div'>
            <div className='logo-svg-headder'>
              <LogoSVG/>
            </div>
						<label>JAYANI POWER</label>
					</div>
				</NavLink>

				<div className='menu-icon' onClick={toggleMenu}>
					&#9776; {/* Icono de menú hamburguesa */}
				</div>
			</div>

			<div className={`menu ${menuOpen ? 'open' : ''}`}>
				<NavLink to='/calculator' style={{ textDecoration: 'none', color: 'inherit' }} className='menu-item'>
					<span className='header-links'>calculadora</span>
				</NavLink>

				<NavLink to='/macros' style={{ textDecoration: 'none', color: 'inherit' }} className='menu-item'>
					<span className='header-links'>macros</span>
				</NavLink>

				<NavLink to='/prices' style={{ textDecoration: 'none', color: 'inherit' }} className='menu-item'>
					<span className='header-links'>precios</span>
				</NavLink>

				<NavLink to='/login' style={{ textDecoration: 'none', color: 'inherit' }} className='menu-item'>
					<button className='log-in-button'>Log in</button>
				</NavLink>

				<NavLink to='/signin' style={{ textDecoration: 'none', color: 'inherit' }} className='menu-item'>
					<button className='sign-in-button'>Sign in</button>
				</NavLink>
			</div>
		</div>
	);
};
