import React, { useState, useEffect } from 'react';
import { getEntityFields, getNestedValue, setNestedValue, validateField } from "../utils/fieldConfigs";
//Generic form handling
const EntityForm = ({
    entityType,
    initialData = null,
    onSubmit,
    onCancel,
}) => {
    // Estado local del formulario
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const modalMode = initialData ? 'edit' : 'create';
    const fields = getEntityFields(entityType, modalMode);;

    console.log('EntityForm - modalMode:', modalMode);
    console.log('EntityForm - entityType:', entityType);
    console.log('EntityForm - fields found:', fields.length);
    console.log('EntityForm - initialData:', initialData);

    //To charge initial data
    useEffect(() => {
        console.log('🔍 EntityForm useEffect ejecutándose');
        console.log('🔍 initialData en useEffect:', initialData);
        if (initialData && Object.keys(initialData).length > 0) {
            console.log('🔍 Cargando datos iniciales en el formulario:', initialData);
            setFormData({ ...initialData });
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
            console.log('🔍 Inicializando formulario con valores por defecto:', defaultValues);
            setFormData(defaultValues);
        }
        // Limpiar errores cuando se inicializa
        setErrors({});

    }, [initialData]);
    // Función para hacer merge profundo de objetos
    const mergeDeep = (target, source) => {
        const result = { ...target };

        Object.keys(source).forEach(key => {
            if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = mergeDeep(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        });

        return result;
    };

    const handleInputChange = (fieldPath, value) => {
        console.log(`🔍 handleInputChange - Field: ${fieldPath}, Value: ${value}`);
        setFormData(prev => {
            const newFormData = { ...prev };
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
            console.log('Enviando datos del formulario:', formData);
            await onSubmit(formData); // Llamar al onFormSubmit de EntityManager
        } catch (error) {
            console.error('EntityForm: Error al enviar -', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderField = (fieldConfig) => {
        const value = getNestedValue(formData, fieldConfig.field) || '';
        const hasError = !!errors[fieldConfig.field];
        console.log(`🔍 Rendering field ${fieldConfig.field} with value:`, value);
        const commonProps = {
            id: fieldConfig.field,
            name: fieldConfig.field,
            value: value,
            onChange: (e) => handleInputChange(fieldConfig.field, e.target.value),
            className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                }`,
        };
        switch (fieldConfig.type) {
            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Seleccione una opción</option>
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
                    {initialData ?
                        `Editando ${entityType}: ${getNestedValue(formData, 'user.name') || 'Sin nombre'}` :
                        `Creando nuevo ${entityType}`
                    }
                </p>
                <p className="text-xs text-blue-600">
                    Modo: {modalMode} | Campos: {fields.length}
                </p>
            </div>

            {/* Campos del formulario */}
            {fields.map((fieldConfig) => (
                <div key={fieldConfig.field} className="space-y-1">
                    <label
                        htmlFor={fieldConfig.field}
                        className="block text-sm font-medium text-gray-700"
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

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={isLoading}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear')}
                </button>
            </div>
        </div>
    );
};
export default EntityForm