// src/components/AuthMenuButton.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthMenuButton() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  /* ———— 1.  Cerrar menú con Escape u “clic‑afuera” ———— */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  /* ———— 2.  Acción de Logout ———— */
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    // Por ejemplo: setAuth(null);  // si usas contexto global
    navigate('/login');                    
  };
  const openMenu   = () => setOpen(true);   
  const closeMenu  = () => setOpen(false); 

  /* ———— 3.  Render ———— */
  return (
    <div ref={menuRef} className="">
      {/* Botón que abre/cierra el menú */}
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={openMenu} 
        onFocus={openMenu}   
        aria-haspopup="true"
        aria-expanded={open}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring"
      >
        user
      </button>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute w-30 bg-indigo-200 rounded-md shadow-lg py-2 z-50 dark:bg-black" onMouseLeave={closeMenu}>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
