import CrudOperations from '../hooks/CrudOperations';
import { useState, useMemo, useEffect } from "react";
import { appointmentValidateForm, getAppoinmentInitialFormData } from '../utils/appointmentValidateForm';
import { patientValidateForm, getPatientInitialFormData } from '../utils/patientValidateForm';
import { odontologistValidateForm, getOdontologistInitialFormData } from '../utils/odontologistValidateForm';
import SearchBar from './SearchBar';
import DataTable from "./DataTable";
import EntityForm from "./EntityForm";
import FormModal from "./FormModal";
import { adaptBackendToForm, adaptFormToBackend } from '../utils/dataAdapters';

const EntityManager = ({ entityType, onBack }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editContext, setEditContext] = useState();
    const [modalMode, setModalMode] = useState('create')
    const [originalData, setOriginalData] = useState(null);
    

    const getEntityConfig = (type) => {
        const configs = {
            patient: {
                validateForm: patientValidateForm,
                getInitialFormData: getPatientInitialFormData,
                singularName: 'Patient',
                pluralName: 'Patients'
            },
            odontologist: {
                validateForm: odontologistValidateForm,
                getInitialFormData: getOdontologistInitialFormData,
                singularName: 'Odontologist',
                pluralName: 'Odontologists'
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
    const config = getEntityConfig(entityType);
    const {
        items: data,
        loading,
        error,
        selectedItem,
        handleEdit,
        handleDelete,
        resetForm,
        put, post, get
    } = CrudOperations({
        endpoint: `/${entityType}`,
        getInitialFormData: config.getInitialFormData,
        validateForm: config.validateForm
    })

    useEffect(() => {
        get();
    }, [entityType]);


    //filter based on search
    const filteredData = useMemo(() => {
        if (!data || !Array.isArray(data)) {
            // console.log('🔍 Data is not an array:', data);
            return [];
        }
        return data.filter(item => {
            if (entityType === 'appointment') {
                const searchLower = searchTerm.toLowerCase();
                return (
                    String(item.id || '').toLowerCase().includes(searchLower) ||
                    String(item.date || '').toLowerCase().includes(searchLower) ||
                    String(item.patient?.id || '').toLowerCase().includes(searchLower) ||
                    String(item.patient?.name || '').toLowerCase().includes(searchLower) ||
                    String(item.patient?.lastname || '').toLowerCase().includes(searchLower) ||
                    String(item.patient?.dni || '').toLowerCase().includes(searchLower) ||
                    String(item.odontologist?.id || '').toLowerCase().includes(searchLower) ||
                    String(item.odontologist?.name || '').toLowerCase().includes(searchLower) ||
                    String(item.odontologist?.lastname || '').toLowerCase().includes(searchLower) ||
                    String(item.odontologist?.license || '').toLowerCase().includes(searchLower)
                );
            }
            const searchableFields = Object.values(item).join('').toLowerCase();
            return searchableFields.includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm, entityType]);

    const openCreateModal = () => {
        console.log('🔍 EntityManager - selectedItem:', selectedItem);
        resetForm();
        setModalMode('create');
        setShowModal(true);
    };

    const openEditModal = (item, editContext = 'admin') => {
        //console.log('1. Original item:', item);
        const adaptedItem = adaptBackendToForm(item, entityType);
        //.log('2. Adapted item:', adaptedItem);
        setOriginalData(adaptedItem);
        console.log('originalData: ',originalData)
        handleEdit(adaptedItem);
        setEditContext(editContext);
        setModalMode('edit'); 
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
        setModalMode('create');
    };

    const onFormSubmit = async (entityFormData) => {
        console.log('🔍 EntityManager onFormSubmit - Form data(lo que se edito):', entityFormData);
        console.log('🔍 EntityManager onFormSubmit - selectedItem:', selectedItem);
        const selectedDate = new Date(entityFormData.date);
        const hours = selectedDate.getHours();
        const day = selectedDate.getDay();
        //console.log('hora  y dia cita: ', hours, day)
        if (hours < 6 || hours > 20) {
            alert("Appointments can only be scheduled between 6:00 AM and 8:00 PM.");
            return;
        }
        if (day === 0) {
                alert("Appointments cannot be scheduled on Sundays.");
                return;
            }

        try {
            const isEdit = entityFormData && entityFormData.id; //de crudOperations
            console.log('🔍 Operation type:', isEdit ? 'UPDATE' : 'CREATE');

            // Adaptar datos según el tipo de operación
            const backendData = adaptFormToBackend(entityFormData, entityType, isEdit);

            if (isEdit) {
                await put(entityFormData.id, backendData);
                console.log(backendData)
                console.log(`${config.singularName} actualizado exitosamente`);
            } else {
                await post(backendData);
                console.log(backendData)
                console.log(`${config.singularName} creado exitosamente`);
            }
            await get();
            closeModal();
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <button
                        onClick={onBack}
                        className="text-blue-600 hover:text-blue-800 mb-2"
                    >
                        ← Back to Dashboard
                    </button>
                    <h2 className="text-2xl font-bold text capitalize">
                        {entityType} Management
                    </h2>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add {config.singularName}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            )}

            <div className="rounded-lg shadow-sm p-4">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={`Search ${config.pluralName.toLowerCase()}...`}
                />
            </div>

            <div className="rounded-lg shadow-sm">
                {entityType === 'GUS' ? (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Upcoming Appointments</h3>
                            <DataTable
                                entityType={entityType}
                                data={filteredData.upcoming}
                                loading={loading}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Past Appointments</h3>
                            <DataTable
                                entityType={entityType}
                                data={filteredData.past}
                                loading={loading}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                ) : (
                    <DataTable
                        entityType={entityType}
                        data={filteredData}
                        loading={loading}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <FormModal
                isOpen={showModal}
                title={`${selectedItem ? 'Edit' : 'Create'} ${config.singularName}`}
                onClose={closeModal}
            >
                <EntityForm
                    entityType={entityType}
                    initialData={selectedItem}
                    originalData={originalData}
                    onSubmit={onFormSubmit}
                    onCancel={closeModal}
                    editContext="admin"
                    mode= {modalMode}
                />
            </FormModal>
        </div>
    );
};
export default EntityManager
