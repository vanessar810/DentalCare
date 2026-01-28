import React, { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { validateForm } from '../utils/formValidator';
import api from '../services/api';
import { useAuth } from '../providers/AuthProvider';


const User = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleAddUser = async (e) => {
    e.preventDefault();
    //console.log("creating patient")
    const validationErrors = await validateForm(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/register', newUser);
      storeToken(data.token);
      //console.log("successful register")

      setNewUser({ name: '', lastname: '', email: '', password: '' });
      //console.log("Enviando a PatientForm:", newUser);
      navigate('/patientForm', {
        state: {
          name: newUser.name, lastname: newUser.lastname
        }, replace: true
      });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ api: err.response.data });
      } else {
        setErrors({ api: err.response?.data?.message || 'Error al registrar' });
      }
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-neutral-400"> Registration form</h2>

        <div className="max-w-lg bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-neutral-400">Add New Patient</h3>
          <form onSubmit={handleAddUser} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300 dark:text-blue-800"
              required
            />
            {errors.name && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </div>
            )}
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={newUser.lastname}
              onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-300"
              required
            />
            {errors.lastname && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastname}
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name='email'
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-300"
              />
              {errors.email && (
                <div className="flex items-center mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            <div className="relative w-full ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className={`w-full py-2.5 pl-10 pr-10 rounded-lg border dark:bg-gray-300
              ${errors.password ? 'border-red-300 bg-red-50 focus:ring-red-500' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </div>
            )}
            <button type="submit" className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-700 dark:text-neutral-400"
              disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
            {
              errors.api && (
                <p className="text-red-500 mt-2">{errors.api}</p>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
};
export default User