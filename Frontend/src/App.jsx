import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Services from './pages/Services';
import Login from './pages/Login';
import PatientForm from './pages/PatientForm';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import DashboardPatient from './pages/DashboardPatient';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardDentist from './pages/DashboardDentist';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="services" element={<Services />} />
        <Route path="register" element={<Register />} />
        <Route path="patientForm" element={ <PatientForm />} />
        <Route path="appointments" element={<PrivateRoute> <Appointments /></PrivateRoute>} />
        <Route path="dashboardPatient" element={<PrivateRoute> <DashboardPatient /></PrivateRoute>} />
        <Route path="dashboardAdmin" element={<PrivateRoute> <DashboardAdmin /></PrivateRoute>} />
        <Route path ="dashboardDentist" element={<PrivateRoute> <DashboardDentist/> </PrivateRoute>}/>
        <Route path="*" element={<h1 className="text-center mt-10 dark:text-neutral-400">404 – Not Found</h1>} />
      </Route>
    </Routes >
  );
}
export default App;