import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Navigation component
const Navbar = ({ currentPage, setCurrentPage }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">DentalCare Clinic</h1>
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('patients')}
            className={`px-4 py-2 rounded ${currentPage === 'patients' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Patients
          </button>
          <button
            onClick={() => setCurrentPage('appointments')}
            className={`px-4 py-2 rounded ${currentPage === 'appointments' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Appointments
          </button>
          <button
            onClick={() => setCurrentPage('services')}
            className={`px-4 py-2 rounded ${currentPage === 'services' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Services
          </button>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-blue-600"
            aria-label="Cambiar modo"
          >  
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