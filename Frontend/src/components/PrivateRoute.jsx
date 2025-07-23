import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>Cargando...</p>; 
  console.log('¿Está autenticado?', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/home" replace />;
};

export default PrivateRoute;