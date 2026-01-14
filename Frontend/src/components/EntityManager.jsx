import CrudOperations from '../hooks/CrudOperations';
import { useState, useMemo } from "react";
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

/*console.log('🔍 EntityManager - data type:', typeof data);
console.log('🔍 EntityManager - data isArray:', Array.isArray(data));*/
console.log('🔍 EntityManager - data value:', data);

    //filter based on search
    const filteredData = useMemo(() => {
        if (!data || !Array.isArray(data)) {
            // console.log('🔍 Data is not an array:', data);
            return [];
        }
        return data.filter(item => {
            const searchableFields = Object.values(item).join('').toLowerCase();
            return searchableFields.includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm]);

    const openCreateModal = () => {
        console.log('🔍 EntityManager - selectedItem:', selectedItem);
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (item, editContext= 'admin') => {
        console.log('🔍 EntityManager openEditModal - Original item:', item);
        const adaptedItem = adaptBackendToForm(item, entityType);
        handleEdit(adaptedItem);
        setEditContext(editContext);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const onFormSubmit = async (entityFormData) => {
        console.log('🔍 EntityManager onFormSubmit - Form data:', entityFormData);
        console.log('🔍 EntityManager onFormSubmit - selectedItem:', selectedItem);

        try {
            const isEdit = selectedItem && selectedItem.id; //de crudOperations
            console.log('🔍 Operation type:', isEdit ? 'UPDATE' : 'CREATE');

            // Adaptar datos según el tipo de operación
            const backendData = adaptFormToBackend(entityFormData, entityType, isEdit);

            if (isEdit) {
                await put(selectedItem.id, backendData);
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
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
                <DataTable
                    entityType={entityType}
                    data={filteredData}
                    loading={loading}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                />
            </div>

            <FormModal
                isOpen={showModal}
                title={`${selectedItem ? 'Edit' : 'Create'} ${config.singularName}`}
                onClose={closeModal}
            >
                <EntityForm
                    entityType={entityType}
                    initialData={selectedItem}
                    onSubmit={onFormSubmit}
                    onCancel={closeModal}
                    editContext="admin"
                />
            </FormModal>
        </div>
    );
};
export default EntityManager
