import React, { useState, useEffect } from 'react';
import { getEntityFields, getNestedValue, setNestedValue, validateField } from "../utils/fieldConfigs";
import api from '../services/api';
//Generic form handling
const EntityForm = ({
    entityType,
    initialData = null,
    onSubmit,
    onCancel,
    editContext,
    mode = null,
}) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [odontologists, setOdontologists] = useState([])

    const modalMode = mode || (initialData ? 'edit' : 'create');
    console.log('mode: ', modalMode)
    const fields = getEntityFields(entityType, modalMode, editContext);;

    useEffect(() => {
        if (entityType === "appointment") {
            const fetchOdontologists = async () => {
                try {
                    const response = await api.get("/odontologist");
                    setOdontologists(response.data);
                } catch (error) {
                    console.error("Error fetching odontologists:", error);
                }
            };
            fetchOdontologists();
        }
    }, [entityType]);

    // Función para hacer copia profunda
    const deepClone = (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => deepClone(item));

        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    };

    //To charge initial data
    useEffect(() => {
        //console.log('🔍 3. EntityForm recibió initialData:', initialData);
        //console.log('🔍 4. Campos esperados:', fields.map(f => f.field));
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(deepClone(initialData));
            console.log('🔍 5. FormData después de cargar:', deepClone(initialData));
        } else {
            // Valores por defecto para campos anidados
            const defaultValues = {};
            fields.forEach(fieldConfig => {
                if (fieldConfig.field.includes('.')) {
                    setNestedValue(defaultValues, fieldConfig.field, '');
                } else {
                    defaultValues[fieldConfig.field] = '';
                }
            });
            console.log('🔍 start form with default values:', defaultValues);
            setFormData(defaultValues);
        }
        setErrors({});

    }, [initialData]);

    const handleInputChange = (fieldPath, value) => {
        setFormData(prev => {
            const newFormData = deepClone(prev);
            if (fieldPath.includes('.')) {
                return setNestedValue(newFormData, fieldPath, value);
            } else {
                newFormData[fieldPath] = value;
                return newFormData;
            }
        });

        // Limpiar error del campo si existe
        if (errors[fieldPath]) {
            setErrors(prev => ({
                ...prev,
                [fieldPath]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        fields.forEach(fieldConfig => {
            const value = getNestedValue(formData, fieldConfig.field);
            if (fieldConfig.required && (!value || value.toString().trim() === '')) {
                newErrors[fieldConfig.field] = `${fieldConfig.label} es requerido`;
                isValid = false;
            }
            const fieldErrors = validateField(fieldConfig, value);
            if (fieldErrors.length > 0) {
                newErrors[fieldConfig.field] = fieldErrors[0];
                isValid = false;
            }
        });
        setErrors(newErrors);
        return isValid;
    };

    // Manejar submit del formulario
    const handleSubmit = async () => {
        if (!validateForm()) {
            console.log('EntityForm: Formulario inválido -', errors);
            return;
        }
        setIsLoading(true);
        try {
            const dataToSubmit = deepClone(formData);
            //console.log('sending form data:', dataToSubmit);
            await onSubmit(dataToSubmit); // call to onFormSubmit of EntityManager
        } catch (error) {
            console.error('EntityForm: Error al enviar -', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderField = (fieldConfig) => {
        const value = getNestedValue(formData, fieldConfig.field) || '';
        const hasError = !!errors[fieldConfig.field];
        //console.log(`🔍 Rendering field ${fieldConfig.field} with value:`, value);
        const commonProps = {
            id: fieldConfig.field,
            name: fieldConfig.field,
            value: value,
            onChange: (e) => handleInputChange(fieldConfig.field, e.target.value),
            disabled: fieldConfig.disabled,
            className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                }`,
        };
        //shows a list of odontologist in appointment form
        if (fieldConfig.field === "odontologist_id") {
            return (
                <select {...commonProps}>
                    <option value="">
                        select an odontologist
                    </option>
                    {odontologists.length === 0 ? (
                        <option disabled>Loading...</option>
                    ) : (
                        odontologists.map((od) => (
                            <option key={od.id} value={od.id}>
                                {od.name} {od.lastname}
                            </option>
                        ))
                    )}
                </select>
            );
        }
        // show name in appointment form in DashboardPatient
        if (fieldConfig.field === 'patient_id' && editContext === 'self') {
            const patientName = `${formData.patient_name || ''}`;
            return (
                <input
                    {...commonProps}
                    type="text"
                    value={patientName || "—"}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
            );
        }
        switch (fieldConfig.type) {
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Choose an option</option>
                        {fieldConfig.options?.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        rows="3"
                    />
                );
            case 'password':
                return (
                    <input
                        {...commonProps}
                        type="password"
                    />
                );

            default:
                return (
                    <input
                        {...commonProps}
                        type={fieldConfig.type}
                    />
                );

        }
    };

    // Si no hay configuración para esta entidad
    if (fields.length === 0) {
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">
                No se encontró configuración de campos para: {entityType}
            </p>
            <p className="text-sm text-red-600 mt-2">
                Modo: {modalMode}
            </p>
        </div>
    }

    return (
        <div className="space-y-4">
            {/* Header informativo */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                    {modalMode === 'edit' ?
                        `Editing ${entityType}: ${getNestedValue(formData, 'user.name') || 'Sin nombre'}` :
                        `Creating new ${entityType}`
                    }
                </p>
                {entityType === 'appointment' && formData.patient_name && (
                    <p className="text-sm text-blue-500 mt-1">
                        Patient: {formData.patient_name}
                    </p>
                )}
                <p className="text-xs text-blue-600">
                    Mode: {modalMode} | fields: {fields.length}
                </p>
            </div>

            {/* formfields */}
            {fields.map((fieldConfig) => (
                <div key={fieldConfig.field} className="space-y-1">
                    <label
                        htmlFor={fieldConfig.field}
                        className="block text-sm font-medium"
                    >
                        {fieldConfig.label}
                        {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {renderField(fieldConfig)}

                    {errors[fieldConfig.field] && (
                        <p className="text-red-500 text-sm">{errors[fieldConfig.field]}</p>
                    )}
                </div>
            ))}

            {/* action buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : modalMode}
                </button>
            </div>
        </div>
    );
};
export default EntityForm