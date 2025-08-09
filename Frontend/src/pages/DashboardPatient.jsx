import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import { User2, Calendar, Settings, Clock, FileText, ChevronRight, Bell, Edit } from 'lucide-react';

const DashboardPatient = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { User } = useAuth();
    const [patientData, setPatientData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(null)

    const services = [
        { name: 'Health Insurance', status: 'Active', renewal: '2025-12-31' },
        { name: 'Parking Access', status: 'Active', renewal: '2025-08-15' },
        { name: 'IT Support', status: 'Active', renewal: 'Ongoing' },
        { name: 'Learning Platform', status: 'Active', renewal: '2025-11-30' }
    ];

    const history = [
        { id: 1, action: 'Profile Updated', date: '2025-07-10', details: 'Updated contact information' },
        { id: 2, action: 'Appointment Scheduled', date: '2025-07-08', details: 'Client Review meeting' },
        { id: 3, action: 'Service Activated', date: '2025-07-01', details: 'Learning Platform access granted' },
        { id: 4, action: 'Document Uploaded', date: '2025-06-28', details: 'Performance review documents' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/patient/profile');
                console.log('data from api:', response.data)
                setPatientData(response.data);
                setFormData(response.data);
                const patientId = response.data.id;
                const appointmentsResponse = await api.get('/appointment/user',{
                    params: {patientId}
                });
                console.log('data from appoinments:', appointmentsResponse.data)
                setAppointments(appointmentsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = () => {
        setEditing(!editing);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [field]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDafault();
        try {
            await api.put('http://localhost:8080/patient/profile', FormData)
            setPatientData(formData);
            setEditing(false);
            alert("Information successfully updated");
        } catch (error) {
            console.error("Error updating data: ", error);
            alert("There was an error updating your details");
        }
    };
    const getServiceStatus = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };
    if (!patientData || !formData) return <p>Cargando...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Role and Quick Stats */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Welcome, {patientData.name}!</h2>

                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold">{appointments.length}</div>
                            <div className="text-blue-100 text-sm">Upcoming Appointments</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: 'overview', label: 'Overview', icon: User2 },
                            { id: 'appointments', label: 'Appointments', icon: Calendar },
                            { id: 'services', label: 'Services', icon: Settings },
                            { id: 'history', label: 'History', icon: Clock }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${activeTab === id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {activeTab === 'overview' && (
                    <>
                        {/* Personal Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-400">Personal Information</h3>
                                    <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setEditing(!editing)} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Full Name</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{patientData.name + " " + patientData.lastname}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Email</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{patientData.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Document of identification</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{patientData.dni}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Address</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{patientData.address.street + ", " + patientData.address.number + ", " + patientData.address.neighborhood}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Birthdate</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{patientData.birthDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-neutral-400">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:bg-gray-700">
                                        <span className="text-sm font-medium text-blue-900 dark:text-neutral-400">Schedule Appointment</span>
                                        <ChevronRight className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors dark:bg-gray-700">
                                        <span className="text-sm font-medium text-green-900 dark:text-neutral-400">Update Profile</span>
                                        <ChevronRight className="w-4 h-4 text-green-600" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors dark:bg-gray-700">
                                        <span className="text-sm font-medium text-purple-900 dark:text-neutral-400">View Documents</span>
                                        <ChevronRight className="w-4 h-4 text-purple-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'appointments' && (
                    <div className="lg:col-span-3 space-y-4">
                        {appointments.length === 0 ? (
                            <p className='dark:text-neutral-400'>There are no scheduled appointments..</p>
                        ) : (
                            appointments.map((appt) => (
                                <div key={appt.id} className="border rounded p-4 shadow-sm">
                                    <p><strong>Date:</strong> {appt.date}</p>
                                    <p><strong>Hour:</strong> {appt.time}</p>
                                    <p><strong>Specialist:</strong> {appt.doctorName}</p>
                                    <p><strong>Subject:</strong> {appt.reason}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Active Services</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {services.map((service, index) => (
                                    <div key={index} className="p-6 hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                                                <p className="text-sm text-gray-500">Renewal: {service.renewal}</p>
                                            </div>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceStatus(service.status)}`}>
                                                {service.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {history.map((item) => (
                                    <div key={item.id} className="p-6 hover:bg-gray-50">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <FileText className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{item.action}</h4>
                                                <p className="text-sm text-gray-500">{item.details}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(item.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPatient;