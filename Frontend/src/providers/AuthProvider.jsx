import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Cargar usuario en memoria si ya hay token guardado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.get('/auth/me').then((response) => {
        setUser(response.data);
      }).catch(() => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common.Authorization;
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) return <p>Cargando...</p>;

  const storeToken = (token) => {
    const cleanToken = token.trim();
    localStorage.setItem('token', cleanToken);
    api.defaults.headers.common.Authorization = `Bearer ${cleanToken}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    storeToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
