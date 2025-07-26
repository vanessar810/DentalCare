import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, UserCheck, Calendar, Search, Save, X } from 'lucide-react';
import api from '../lib/api';

const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [odontologists, setOdontologists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedItem, setSelectedItem] = useState(null);


  // Generic API functions
  const apiCall = async (url, method = 'GET', data = null) => {
    try {
      const config = {
        method,
        url,
        data,
      };
      const response = await api(config);
      return response.data;
    }
    catch (error) {
      console.error('API call failes', error);
      const message = error.response?.data?.message || error.message || 'Unkown error';
      alert(`Operation failed: ${message}`);
      return null;
    } finally { setLoading(false); }
  };

  // Load data functions
  const loadPatients = async () => {
    setLoading(true);
    const data = await apiCall('/patient');
    if (data) setPatients(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const loadOdontologists = async () => {
    setLoading(true);
    const data = await apiCall('/odontologist');
    if (data) setOdontologists(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const loadAppointments = async () => {
    setLoading(true);
    const data = await apiCall('/appointment');
    if (data) setAppointments(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  // CRUD operations
  const handleCreate = async (formData) => {
    const endpoints = {
      patients: '/patient',
      odontologists: '/odontologist',
      appointments: '/appointment'
    };
    console.log(formData)
    const result = await apiCall(endpoints[activeTab], 'POST', formData);

    if (result) {
      setShowModal(false);
      loadCurrentTabData();
    }
  };

  const handleUpdate = async (formData) => {
    const endpoints = {
      patients: `/patient/${selectedItem.id}`,
      odontologists: `/odontologist/${selectedItem.id}`,
      appointments: `/appointment/${selectedItem.id}`
    };

    const result = await apiCall(endpoints[activeTab], 'PUT', formData);
    if (result) {
      setShowModal(false);
      loadCurrentTabData();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const endpoints = {
      patients: `/patient/${id}`,
      odontologists: `/odontologist/${id}`,
      appointments: `/appointment/${id}`
    };

    const result = await apiCall(endpoints[activeTab], 'DELETE');
    if (result) {
      loadCurrentTabData();
    }
  };

  // Load data based on active tab
  const loadCurrentTabData = () => {
    switch (activeTab) {
      case 'patients':
        loadPatients();
        break;
      case 'odontologists':
        loadOdontologists();
        break;
      case 'appointments':
        loadAppointments();
        break;
    }
  };

  // Initial load
  useEffect(() => {
    loadCurrentTabData();
  }, [activeTab]);

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'patients':
        return patients;
      case 'odontologists':
        return odontologists;
      case 'appointments':
        return appointments;
      default:
        return [];
    }
  };

  // Filter data based on search term
  const getFilteredData = () => {
    const data = getCurrentData();
    if (!searchTerm) return data;

    return data.filter(item => {
      const searchableFields = Object.values(item).join(' ').toLowerCase();
      return searchableFields.includes(searchTerm.toLowerCase());
    });
  };

  // Modal handlers
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedItem(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Form component
  const FormModal = () => {
    const getInitialFormData = () => {
      switch (activeTab) {
        case 'patients':
          return {
            dni: '',
            birthDate: '',
            address: {
              street: '',
              number: '',
              neighborhood: '',
            },
            user: {
              name: '',
              lastname: '',
              email: '',
              password: '',
              userRole: '',
            }
          };
        case 'odontologists':
          return {
            phone: '',
            license: '',
            user: {
              name: '',
              lastname: '',
              email: '',
              password: '',
              userRole: '',
            }
          };
        case 'appointments':
          return {
            patientId: '',
            odontologistId: '',
            appointmentDate: '',
            description: '',
            status: 'SCHEDULED'
          };
        default:
          return {};
      }
    };

    const [formData, setFormData] = useState(selectedItem || getInitialFormData());

    useEffect(() => {
      if (modalMode === 'create') {
        setFormData(getInitialFormData());
      } else if (selectedItem) {
        setFormData(selectedItem);
      }
    }, [modalMode, selectedItem, activeTab]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (modalMode === 'create') {
        handleCreate(formData);
      } else {
        handleUpdate(formData);
      }
    };

    const handleInputChange = (field, value) => {
      if (field.startsWith('address.')) {
        const subField = field.split('.')[1];
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [subField]: value,
          },
        }));
      } else if (field.startsWith('user.')) {
        const subField = field.split('.')[1];
        setFormData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            [subField]: value,
          },
        }));
      } else
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getFormFields = () => {
      switch (activeTab) {
        case 'patients':
          return [
            { field: 'user.name', label: 'Name', type: 'text', required: true },
            { field: 'user.lastname', label: 'Last Name', type: 'text', required: true },
            { field: 'user.email', label: 'email', type: 'email', required: true },
            { field: 'user.password', label: 'password', type: 'password', required: modalMode === 'create' },
            { field: 'user.userRole', label: 'Role', type: 'select', options: ['PATIENT', 'ADMIN', 'DENTIST'], required: true },
            { field: 'dni', label: 'DNI', type: 'text', required: true },
            { field: 'birthDate', label: 'birthdate', type: 'date', required: true },
            { field: 'address.street', label: 'street', type: 'text', required: true },
            { field: 'address.number', label: 'number', type: 'text', required: true },
            { field: 'address.neighborhood', label: 'neighborhood', type: 'text', required: true },
          ];
        case 'odontologists':
          return [
            { field: 'user.name', label: 'Name', type: 'text', required: true },
            { field: 'user.lastname', label: 'Last Name', type: 'text', required: true },
            { field: 'user.email', label: 'email', type: 'email', required: true },
            { field: 'user.password', label: 'password', type: 'password', required: modalMode === 'create' },
            { field: 'user.userRole', label: 'Role', type: 'select', options: ['PATIENT', 'ADMIN', 'DENTIST'], required: true },
            { field: 'phone', label: 'phone', type: 'text', required: true },
            { field: 'license', label: 'License', type: 'text', required: true },
          ];
        case 'appointments':
          return [
            { field: 'patientId', label: 'Patient ID', type: 'number', required: true },
            { field: 'odontologistId', label: 'Odontologist ID', type: 'number', required: true },
            { field: 'appointmentDate', label: 'Date', type: 'datetime-local', required: true },
            { field: 'description', label: 'Description', type: 'text', required: false },
            { field: 'status', label: 'Status', type: 'select', required: true, options: ['SCHEDULED', 'COMPLETED', 'CANCELLED'] },
          ];
        default:
          return [];
      }
    };

    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {modalMode === 'create' ? 'Create' : 'Edit'} {activeTab.slice(0, -1)}
            </h3>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {getFormFields().map(({ field, label, type, required, options }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-400">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                {
                  type === 'select' ? (
                    <select
                      value={
                        field.startsWith('user.') ? formData.user?.[field.split('.')[1]] || '' :
                          field.startsWith('address.') ? formData.address?.[field.split('.')[1]] || '' :
                            formData[field] || ''
                      }
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      required={required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select {label}</option>
                      {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      value={field.startsWith('address.') ? formData.address?.[field.split('.')[1]] || '' : field.startsWith('user.')
                        ? formData.user?.[field.split('.')[1]] || ''
                        : formData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      required={required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-800"
                    />
                  )}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {modalMode === 'create' ? 'Create' : 'Update'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === id
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const DataTable = () => {
    const data = getFilteredData();

    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500 dark:bg-gray-800">
          No {activeTab} found. Create your first one!
        </div>
      );
    }

    const getTableHeaders = () => {
      switch (activeTab) {
        case 'patients':
          return ['ID', 'Name', 'DNI', 'Date of Birth', 'Address', 'Actions'];
        case 'odontologists':
          return ['ID', 'Name', 'License', 'Specialty', 'Actions'];
        case 'appointments':
          return ['ID', 'Date', 'Patient ID', 'Odontologist ID', 'Actions'];
        default:
          return [];
      }
    };

    const renderTableRow = (item) => {
      switch (activeTab) {
        case 'patients':
          return (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">
                {item.name} {item.lastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.dni}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.birthDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.address.street} {item.address.number} {item.address.neighborhood}</td>
            </>
          );
        case 'odontologists':
          return (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">
                {item.name} {item.lastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.license}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.specialty}</td>
            </>
          );
        case 'appointments':
          return (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">
                {new Date(item.appointmentDate).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.patientId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-400">{item.odontologistId}</td>

              {/* <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  item.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {item.status}
                </span>
              </td> */}
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {getTableHeaders().map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 divide-gray-700">
            {data.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-500">
                {renderTableRow(item)}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-400">Dental Clinic Admin</h1>
          <p className="text-gray-600 mt-2 dark:text-neutral-400">Manage patients, odontologists, and appointments</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <TabButton id="patients" label="Patients" icon={Users} />
          <TabButton id="odontologists" label="Odontologists" icon={UserCheck} />
          <TabButton id="appointments" label="Appointments" icon={Calendar} />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 dark:bg-gray-800">
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <DataTable />
        </div>

        {/* Modal */}
        <FormModal />
      </div>
    </div>
  );
};

export default DashboardAdmin;