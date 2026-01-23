import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { validateForm } from '../utils/formValidator';
import { createHandleChange } from '../utils/handleChange';
import { useAuth } from '../providers/AuthProvider';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, storeToken } = useAuth();
  const navigate = useNavigate();
  const handleChange = createHandleChange(setFormData, setErrors);


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("iniciando sesion")
    if (!validateForm(formData.email, formData.password)) return;
    setIsLoading(true);

    try {
      const { data } = await api.post('/auth/login', formData);
      storeToken(data.token)
      // console.log("token recibido:", data.token);
      // console.log("inicio de sesión exitoso")

      const { data: me } = await api.get('/auth/me');
      setUser(me);

      if (me.role == 'ADMIN') {
        navigate('/dashboardAdmin', { replace: true });
      } else if (me.role === 'PATIENT') {
        if (!me.hasPatientProfile) {
          navigate('/patientForm', { replace: true });
        } else {
          navigate('/dashboardPatient', { replace: true });
        }
      } else if (me.role == 'DENTIST'){
        navigate('/dashboardDentist', {replace: true});
      }
      else {
        etErrors({ api: 'Rol no found. Contact administration.' });
      }
    }
    catch (err) {
      console.log("Login error:", err);
      setErrors({ api: err.response?.data?.message || 'Error al iniciar sesión' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-xl dark:bg-gray-800">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 dark:text-neutral-400">Welcome</h2>
          <p className="text-blue-900 mt-2 dark:text-neutral-400">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2 dark:text-neutral-400">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors 
                  ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2 dark:text-neutral-400">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors 
                  ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
          </div>
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-neutral-400">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex justify-around">
            {/* Login Button */}
            <button
              type="submit"

              disabled={isLoading}
              className="w-1/2 flex justify-center py-3 px-4 mx-2 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r 
              from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Charging...
                </div>
              ) : (
                'LogIn'
              )}
            </button>
          </div>
        </form>
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login