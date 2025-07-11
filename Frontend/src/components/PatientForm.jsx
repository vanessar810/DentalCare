import React from 'react'
import { useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/api';

const Patient = ({ patients, setPatients }) => {
  const [newPatient, setNewPatient] = React.useState({
    name: '',
    lastname: '',
    email: '',
    dni: '',
    inDate: '',
    dateOfBirth: ''
  });

  const location = useLocation();
  const userData = location.state || {};
  console.log('userData:', userData);

  useEffect(() => {
    setNewPatient(prev => ({
      ...prev,
      ...userData
    }));
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (newPatient.name && newPatient.email) {
      setPatients([...patients, { ...newPatient, id: Date.now() }]);
      setNewPatient({ name: '', lastname:'', email: '', dni: '', inDate: '', dateOfBirth: ''});
    }
    try {
      await api.post('http://localhost:8080/patient/profile', newPatient);
      console.log("Perfil de paciente creado");
      // Puedes redirigir o mostrar mensaje
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
              placeholder="Full Name"
              value={newPatient.name + newPatient.lastname}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:text-blue-800"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newPatient.email}
              onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
              required
            />
            <input
              type="number"
              placeholder="identification"
              value={newPatient.dni}
              onChange={(e) => setNewPatient({ ...newPatient, dni: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
            />
            <input
              type="date"
              placeholder="today"
              value={newPatient.inDate}
              onChange={(e) => setNewPatient({ ...newPatient, inDate: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={newPatient.dateOfBirth}
              onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 dark:text-neutral-400">
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Patient