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
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const getDashboardRoute = (role) => {
    const routes = {
      'patient': '/dashboardPatient',
      'admin': '/dashboardAdmin',
      'dentist': '/dashboardDentist'
    };
    return routes[role.toLowerCase()] || '/'
  };

  return (
    
    <nav className="bg-amber-40 text-white p-4 relative z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-neutral-400">DentalCare Clinic</h1>
        {isAuthenticated && (
          <div className="text-blue-800 dark:text-neutral-400">
            Hello, {user?.name || 'usuario'}
          </div>
        )}

        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Abrir menú" >
          <FontAwesomeIcon icon={menuOpen ? faX : faBars} className="w-5 h-5" />
        </button>

        {/* Enlaces: visibilidad según tamaño de pantalla */}
        <div className={`${menuOpen ? "flex" : "hidden md:flex"}
            flex-col md:flex-row gap-3 md:gap-2
            items-start md:items-center
            absolute md:static top-16 left-0 w-full md:w-auto bg-amber-40 p-4 md:p-0
            transition-all duration-200 ease-in-out shadow-lg md:shadow-none dark:bg-black
          `}>
          <NavLink to="/" 
          onClick={closeMenu}
          className={({ isActive }) => `px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100 dark:bg-gray-700' : 'hover:bg-blue-200 dark:hover:bg-blue-600'}`}>Home</NavLink>
          {!isAuthenticated && (
          <NavLink to="/register" 
            onClick={closeMenu}
            className={({ isActive }) => `px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100 dark:bg-gray-700' : 'hover:bg-blue-100 dark:hover:bg-blue-600'}`}>Register</NavLink>
          )}
          <NavLink to="/services" 
          onClick={closeMenu}
          className={({ isActive }) => `px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100 dark:bg-gray-700' : 'hover:bg-blue-100 dark:hover:bg-blue-600'}`}>Services</NavLink>
          {isAuthenticated && user?.role && (
            <NavLink to={getDashboardRoute(user.role)}
              onClick={closeMenu}
              className={({ isActive }) => `flex flex-col md:flex-row px-4 py-2 rounded text-blue-900 dark:text-neutral-400 ${isActive ? 'bg-blue-100 dark:bg-gray-700' : 'hover:bg-blue-100 dark:hover:bg-blue-600'}`}>Dashboard</NavLink>
          )}
          <button
            onClick={() =>{toggleTheme();
            closeMenu();}}
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