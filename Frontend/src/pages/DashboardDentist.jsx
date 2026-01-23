import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import { User2, Calendar, Settings, Clock, FileText, ChevronRight, Bell, Edit } from 'lucide-react';
import { adaptFormToBackend, adaptBackendToForm } from '../utils/dataAdapters';
import FormModal from "../components/FormModal";
import EntityForm from "../components/EntityForm";


const DashboardDentist = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { User } = useAuth();
    const [dentistData, setDentisttData] = useState(null);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editContext, setEditContext] = useState();

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
        if (isEditingProfile) {setShowModal(true)}
    }, [isEditingProfile])

    useEffect(() => {       
        const fetchData = async () => {
            try {
                const response = await api.get('/odontologist/profile');
                setDentisttData(response.data)
                const dentistId = response.data.id;
                const appointmentsResponse = await api.get('/appointment/odontologist', { params: { odontologistId: dentistId } });
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
        setFormData(null);
    };
    const openEditModal = (item, type, editContext = 'self') => {
        console.log('🔍1. DashDentist openEditModal item:', item, 'entityType: ', type);
        const adaptedItem = adaptBackendToForm(item, type);
        console.log('2. Adapted item:', adaptedItem);
        setIsEditingProfile(true);
        setFormData(adaptedItem);
        setEditContext(editContext);

    };

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

    const handleSubmit = async (entityFormData) => {
        const backendData = adaptFormToBackend(entityFormData, 'odontologist', isEditingProfile)
        console.log('DashDentist DentisToBackend: ', backendData)
        try {
            const response = await api.put(`odontologist/${dentistData.id}`, backendData)
            setDentisttData(response.data)
            console.log('DashDentist from back ', response.data)
            closeModal()
        } catch (error) {
            console.error("Error updating data: ", error);
            alert("There was an error updating your dentist details");
        }
    };
    const tableConfigs = {
        headers: ['ID', 'Patient ID', 'Patient name', 'Odontologist ID', 'Date'],
        renderRow: (item) => {
            if (!item)
                return ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
            return [
                item.id,
                item.patient.id,
                `${item.patient.name || ''} ${item.patient.lastname || ''}`.trim() || 'N/A',
                item.odontologist.id,
                item.date ? new Date(item.date).toLocaleString() : 'N/A',
            ];
        }
    }
    if (!dentistData) return <p>Cargando...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Role and Quick Stats */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-blue-100">Welcome, Dentist {dentistData.name} {dentistData.lastname}!</h2>

                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold  text-blue-100">{upcomingAppointments.length}</div>
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
                            { id: 'appointmentsup', label: 'Upcoming appointments', icon: Calendar },
                            { id: 'pastappointments', label: 'Past appointmentsup', icon: Clock }
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeTab === 'overview' && (
                    <>
                        {/* Personal Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-400">Personal Information</h3>
                                    <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => {
                                        const type = 'odontologist';
                                        openEditModal(dentistData, type, 'self')
                                    }} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Full Name</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{dentistData.name + " " + dentistData.lastname}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">Email</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{dentistData.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">License number</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{dentistData.license}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-neutral-400">phone</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-neutral-400">{dentistData.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'appointmentsup' && (
                    <div className="lg:col-span-3 space-y-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="">
                                <tr>
                                    {tableConfigs.headers.map(header => (
                                        <th key={header} className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200">
                                {upcomingAppointments.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 ">
                                        {tableConfigs.renderRow(item).map((cell, index) => (
                                            <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'pastappointments' && (
                    <div className="lg:col-span-3 space-y-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="">
                                <tr>
                                    {tableConfigs.headers.map(header => (
                                        <th key={header} className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200">
                                {pastAppointments.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 ">
                                        {tableConfigs.renderRow(item).map((cell, index) => (
                                            <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <FormModal
                isOpen={showModal}
                title={'Edit your information'}
                onClose={closeModal}
            >
                <EntityForm
                    entityType={'odontologist'}
                    initialData={formData}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                    editContext="self"
                />
            </FormModal>
        </div>
    );
};

export default DashboardDentist;