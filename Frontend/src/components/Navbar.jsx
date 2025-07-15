import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faLightbulb, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import AuthMenuButton from './AuthMenubutton';
import { useAuth } from '../providers/AuthProvider';

// Navigation component
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">DentalCare Clinic</h1>
        {isAuthenticated && (
        <div>
          Hola, {user?.name || 'usuario'}
        </div>
      )}

        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Abrir menú" >
          <FontAwesomeIcon icon={menuOpen ? faX : faBars} className="w-5 h-5" />
        </button>

        {/* Enlaces: visibilidad según tamaño de pantalla */}
        <div className={`
            flex flex-col md:flex-row gap-3 md:gap-2
            items-start md:items-center
            absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 p-4 md:p-0 z-40
            transition-all duration-200 ease-in-out
            ${menuOpen ? 'block' : 'hidden md:flex'}
          `}>
          <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}>Home</NavLink>
          <NavLink to="/register" className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}>Register</NavLink>
          <NavLink to="/appointments" className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}>Appointments</NavLink>
          <NavLink to="/services" className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}>Services</NavLink>
          <AuthMenuButton />
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-blue-600"
            aria-label="Cambiar modo">
            <FontAwesomeIcon
              icon={theme === 'dark' ? faLightbulb : faMoon}
              className="h-4 w-4"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar