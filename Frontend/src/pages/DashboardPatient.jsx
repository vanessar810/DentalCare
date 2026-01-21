import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import { User2, Calendar, Settings, Clock, FileText, ChevronRight, Bell, Edit } from 'lucide-react';
import FormModal from "../components/FormModal";
import EntityForm from "../components/EntityForm";
import { adaptBackendToForm, adaptFormToBackend } from '../utils/dataAdapters';
import { patientValidateForm, getPatientInitialFormData } from '../utils/patientValidateForm';
import { appointmentValidateForm, getAppoinmentInitialFormData } from '../utils/appointmentValidateForm';

const DashboardPatient = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { User } = useAuth();
    const [patientData, setPatientData] = useState(null);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
    const [isEditingAppointment, setIsEditingAppointment] = useState(false);
    const [formData, setFormData] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [editContext, setEditContext] = useState();
    const [selectedId, setSelectedId] = useState();
    const [showModal2, setShowModal2] = useState(false);

    const services = [
        { name: 'Health Insurance', status: 'Active', renewal: '2025-12-31' },
        { name: 'Parking Access', status: 'Active', renewal: '2025-08-15' },
        { name: 'IT Support', status: 'Active', renewal: 'Ongoing' },
    ];

    const history = [
        { id: 1, action: 'Profile Updated', date: '2025-07-10', details: 'Updated contact information' },
        { id: 2, action: 'Appointment Scheduled', date: '2025-07-08', details: 'Client Review meeting' },
        { id: 3, action: 'Service Activated', date: '2025-07-01', details: 'Learning Platform access granted' },
        { id: 4, action: 'Document Uploaded', date: '2025-06-28', details: 'Performance review documents' }
    ];

    const entityType = isEditingProfile ? 'patient' :
        isCreatingAppointment ? 'appointment' :
            isEditingAppointment ? 'appointment' :
                null;
    useEffect(() => {
        if (isEditingProfile || isCreatingAppointment || isEditingAppointment) {
            setShowModal(true);
            console.log(entityType)
        }
    }, [isEditingProfile, isCreatingAppointment, isEditingAppointment]);

    const getEntityConfig = (type) => {
        const configs = {
            patient: {
                validateForm: patientValidateForm,
                getInitialFormData: getPatientInitialFormData,
                singularName: 'Patient',
                pluralName: 'Patients'
            },
            appointment: {
                validateForm: appointmentValidateForm,
                getInitialFormData: getAppoinmentInitialFormData,
                singularName: 'Appointment',
                pluralName: 'Appointments'
            }
        };

        const config = configs[type];
        if (!config) {
            throw new Error(`Unsupported entity type: ${type}`);
        }
        return config;
    };
    const config = entityType ? getEntityConfig(entityType) : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/patient/profile');
                //console.log('data from api:', response.data)
                setPatientData(response.data);
                const patientId = response.data.id;
                const appointmentsResponse = await api.get('/appointment/user', {
                    params: { patientId }
                });
                //console.log('data from appoinments:', appointmentsResponse.data)
                setPastAppointments(appointmentsResponse.data.past)
                setUpcomingAppointments(appointmentsResponse.data.upcoming)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const closeModal = () => {
        setShowModal(false);;
        setIsEditingProfile(false);
        setIsCreatingAppointment(false);
        setIsEditingAppointment(false);
        setFormData(null);
    };
    const openEditModal = (item, type, editContext = 'self') => {
        //console.log('🔍 1. Original item', item, 'entityType: ', type);
        const adaptedItem = adaptBackendToForm(item, type);
        //console.log('2. Adapted item:', adaptedItem);
        setIsCreatingAppointment(false);
        if (type === 'patient') {
            setIsEditingProfile(true);
        } else if (type === 'appointment') {
            setIsEditingAppointment(true);
        }
        setFormData(adaptedItem);
        setEditContext(editContext);

    };
    const openCreateModal = () => {
        setIsCreatingAppointment(true);
        console.log(' IsCreatingAppointment:', isCreatingAppointment);
        setFormData({ patient_id: patientData.id, patient_name: `${patientData.name} ${patientData.lastname }`});
    };

    const onFormSubmit = async (entityFormData) => {
        const backendData = adaptFormToBackend(entityFormData, entityType, isEditingProfile || isEditingAppointment);
        //console.log('PatientToBackend: ', backendData)
        try {
            if (isEditingProfile) {
                //patient editing its profile
                const response = await api.put('/patient/me', backendData);
                setPatientData(response.data)
                //console.log('lo que devuelve backend: ', response.data)
                console.log("Information successfully updated");
            } else if (isEditingAppointment) {
                const response = await api.put(`/appointment/${formData.id}`, backendData);
                setUpcomingAppointments(upcomingAppointments.map(appt =>
                    appt.id === formData.id ? response.data : appt
                ));
            } else {
                //patient creating an appointment
                const response = await api.post('appointment', backendData)
                setUpcomingAppointments([...upcomingAppointments, response.data])
                console.log('appointment created backend: ', response.data)

            }
            closeModal();

        } catch (error) {
            console.error("Error updating data: ", error);
            alert("There was an error updating your details");
        }
    };
    const handleCancelClick = (id) => {
        setSelectedId(id);
        console.log('id: ',id)
        setShowModal2(true);
    }
    const confirmDelete = async () => {
        try{
            if(selectedId){
                const response = await api.delete(`/appointment/${selectedId}`);
                console.log('appointmed successfully deleted', response)
            }
        setShowModal2(false);
        setSelectedId(null);
        } catch(error){
            console.error("error deleting appointment", error);
        }
    };
    const getServiceStatus = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };
    if (!patientData) return <p>Cargando...</p>;

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
                            <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
                            <div className="text-blue-100 text-sm">Upcoming Appointments</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
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
                                    <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => {
                                        const type = 'patient';
                                        openEditModal(patientData, type, 'self');
                                    }} />
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
                                    <button
                                        onClick={openCreateModal}
                                        className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:bg-gray-700">
                                        <span className="text-sm font-medium text-blue-900 dark:text-neutral-400">Schedule Appointment</span>
                                        <ChevronRight className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const type = 'patient';
                                            openEditModal(patientData, type, 'self');
                                        }}
                                        className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors dark:bg-gray-700">
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
                    <div className="lg:col-span-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                        {upcomingAppointments.length === 0 ? (
                            <p className='dark:text-neutral-400'>There are no scheduled appointments..</p>
                        ) : (
                            upcomingAppointments.map((appt) => {
                                const [date, hour] = appt.date.split('T');
                                return (
                                    <div key={appt.id} className="border rounded p-4 shadow-sm flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => {
                                                openEditModal(appt, 'appointment', 'self');
                                            }} />
                                            <button onClick={() => handleCancelClick(appt.id)}
                                                className="text-red-200 hover:text-red-400">
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="text-sm">
                                            <p><strong>Date:</strong> {date} </p>
                                            <p><strong>Hour:</strong> {hour}</p>
                                            <p><strong>Specialist:</strong> {appt.odontologist.name + " " + appt.odontologist.lastname}</p>
                                        </div>
                                    </div>
                                );
                            })
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
                    <div className="lg:col-span-3 space-y-4">
                        {pastAppointments.length === 0 ? (
                            <p className='dark:text-neutral-400'>There are no past appointments..</p>
                        ) : (
                            pastAppointments.map((appt) => {
                                const [date, hour] = appt.date.split('T');
                                return (
                                    <div key={appt.id} className="flex items-center justify-between mb-4">
                                        <div className="border rounded p-4 shadow-sm">
                                            <p><strong>Date:</strong> {date} </p>
                                            <p><strong>Hour:</strong> {hour}</p>
                                            <p><strong>Specialist:</strong> {appt.odontologist.name + " " + appt.odontologist.lastname}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            <FormModal
                isOpen={showModal}
                title={`${isEditingProfile ? 'Edit your information' : isCreatingAppointment ? 'Create appointment' : isEditingAppointment ? 'Edit your appointment' : ''}`}
                onClose={closeModal}
            >
                <EntityForm
                    entityType={entityType}
                    initialData={formData}
                    onSubmit={onFormSubmit}
                    onCancel={closeModal}
                    editContext="self"
                    mode ={isEditingProfile ? 'edit' : isEditingAppointment ? 'edit' : isCreatingAppointment ? 'create':''}
                />
            </FormModal>

            {/* modal de confirmación */}
            {showModal2 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Cancel appointment</h2>
                        <p className="text-sm mb-6 text-gray-600 dark:text-neutral-300">
                            Are you sure you want to cancel this appointment?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowModal2(false);
                                    setSelectedId(null); 
                                }}
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
                            >
                                Yes, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPatient;