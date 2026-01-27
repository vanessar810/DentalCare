// src/components/AuthMenuButton.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';


export default function AuthMenuButton() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    logout();
    setOpen(false);
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 0);
  };
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

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
        className="px-4 py-2 rounded-md text-blue-900 bg-amber-40 hover:bg-blue-100 focus:outline-none focus:ring dark:text-neutral-400"
      >
        user
      </button>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute w-30 bg-ambar-40 rounded-md shadow-lg py-2 z-50 dark:bg-black" onMouseLeave={closeMenu}>
          <Link
            to="/login"
            className="block px-4 py-2 text-blue-900 hover:bg-indigo-50 dark:text-neutral-400 "
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block px-4 py-2 text-blue-900 hover:bg-indigo-50 dark:text-neutral-400"
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>

          <button
            onClick={() => {
              handleLogout();
            }}
            className="block px-4 py-2 text-blue-900 hover:bg-indigo-50 dark:text-neutral-400"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
