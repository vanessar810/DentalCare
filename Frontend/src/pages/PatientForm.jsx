import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../providers/AuthProvider';

const PatientForm = () => {
  const { setUser } = useAuth();
  const location = useLocation();
  const userData = location.state || {};
  // console.log('location', location)
  // console.log('userData', userData)
  const navigate = useNavigate();
  const [newPatient, setNewPatient] = useState({
    name: '',
    lastname: '',
    dni: '',
    birthDate: '',
    address: {
      street: '',
      number: '',
      neighborhood: ''
    }
  });

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setNewPatient(prev => ({
        ...prev,
        name: userData.name || '',
        lastname: userData.lastname || '',
      }));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "number", "neighborhood"].includes(name)) {
      setNewPatient(prev => ({
        ...prev,
        address: {
          ...(prev.address || {}),
          [name]: value
        }
      }));
    } else {
      setNewPatient(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      if (newPatient.name && newPatient.lastname) {
        console.log(newPatient)
        console.log(api.defaults.headers.common.Authorization);
        await api.post('/patient/profile', newPatient);
        console.log("Perfil de paciente creado");
        setUser(prev => ({
        ...prev,
        ...newPatient // 
      }));
        setNewPatient({
          name: '', lastname: '', dni: '', birthDate: '', address: {
            street: '',
            number: '', neighborhood: ''
          }
        });
        console.log("Enviando a dashboard:", newPatient);
        navigate('/dashboardPatient', { state: { ...newPatient }, replace: true });
      };
    } catch (error) {
      console.error("Error al crear paciente:", error);
    }
  };


  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Patient information</h2>

        <div className="max-w-lg bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <form onSubmit={handleAddPatient} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newPatient.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:text-blue-800"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              value={newPatient.lastname}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:text-blue-800"
              required
            />
            <input
              type="text"
              name="dni"
              placeholder="identification"
              value={newPatient.dni}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Date of Birth"
              value={newPatient.birthDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
            />
            <div className="w-full p-3 border rounded-lg flex justify-around dark:bg-gray-300">
              <input
                type="text"
                name="street"
                placeholder="street"
                value={newPatient.address.street}
                onChange={handleChange}
                className="w-32 1 p-2 border rounded-lg dark:bg-gray-300"
              />
              <input
                type="number"
                name="number"
                placeholder="number"
                value={newPatient.address.number}
                onChange={handleChange}
                className="w-32 p-2 border rounded-lg dark:bg-gray-300"
              />
              <input
                type="text"
                name="neighborhood"
                placeholder="neighborhood"
                value={newPatient.address.neighborhood}
                onChange={handleChange}
                className="w-32 p-2 border rounded-lg dark:bg-gray-300"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 dark:text-neutral-400">
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PatientForm