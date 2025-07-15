import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/Register';
import Appointments from './components/Appointments';
import Services from './components/Services';
import Login from './components/Login';
import Patient from './components/Patient';
import PatientForm from './components/PatientForm';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="services" element={<Services />} />
        <Route path="register" element={<Register />} />
        <Route path="patient" element={ <Patient />} />
        <Route path="patientForm" element={ <PatientForm />} />
        <Route path="appointments" element={<PrivateRoute> <Appointments /></PrivateRoute>} />
        <Route path="dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
        <Route path="*" element={<h1 className="text-center mt-10 dark:text-neutral-400">404 – Not Found</h1>} />
      </Route>
    </Routes >
  );
}
export default App;