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

  const getDashboardRoute = (role) => {
    const routes = {
      'patient': '/dashboardPatient',
      'admin': '/dashboardAdmin',
      'dentist': '/dashboardDentist'
    };
    return routes[role.toLowerCase()] || '/'
  };

  return (
    <nav className="bg-amber-40-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-neutral-400">DentalCare Clinic</h1>
        {isAuthenticated && (
          <div className="text-blue-800 dark:text-neutral-400">
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
            absolute md:static top-16 left-0 w-full md:w-auto bg-amber-40 p-4 md:p-0 z-40
            transition-all duration-200 ease-in-out
            ${menuOpen ? 'block' : 'hidden md:flex'}
          `}>
          <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100' : 'hover:bg-blue-700'}`}>Home</NavLink>
          {!isAuthenticated && (
            <NavLink to="/register" className={({ isActive }) => `px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100' : 'hover:bg-blue-100'}`}>Register</NavLink>
          )}
          <NavLink to="/services" className={({ isActive }) => `px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100' : 'hover:bg-blue-100'}`}>Services</NavLink>
          {isAuthenticated && user?.role && (
            <NavLink to={getDashboardRoute(user.role)} className={({ isActive }) => `flex flex-col md:flex-row px-4 py-2 rounded text-blue-900 dark:text-neutral-400${isActive ? 'bg-blue-100' : 'hover:bg-blue-100'}`}>Dashboard</NavLink>
          )}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-amber-40 text-blue-900 dark:text-neutral-400"
            aria-label="Cambiar modo">
            <FontAwesomeIcon
              icon={theme === 'dark' ? faLightbulb : faMoon}
              className="h-4 w-4"
            />
          </button>
          <AuthMenuButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar