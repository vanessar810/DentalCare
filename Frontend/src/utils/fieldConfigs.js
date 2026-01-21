export const getFieldConfigs = (modalMode = 'create', editContext ='admin') =>({
    patient: [
        { field: 'user.name', label: 'Name', type: 'text', required: true, disabled: false},
        { field: 'user.lastname', label: 'Last Name', type: 'text', required: true, disabled: false},
        { field: 'user.email', label: 'email', type: 'email', required: true, disabled: editContext === 'self'},
        { field: 'user.password', label: 'password', type: 'password', required: modalMode === 'create', disabled: editContext === 'self'},
        { field: 'user.userRole', label: 'Role', type: 'select', options: ['PATIENT', 'ADMIN', 'DENTIST'], required: true, disabled: editContext === 'self'},
        { field: 'dni', label: 'DNI', type: 'text', required: true, disabled: editContext === 'self'},
        { field: 'birthDate', label: 'birthdate', type: 'date', required: true, disabled: editContext === 'self'},
        { field: 'address.street', label: 'street', type: 'text', required: true, disabled: false},
        { field: 'address.number', label: 'number', type: 'text', required: true, disabled: false},
        { field: 'address.neighborhood', label: 'neighborhood', type: 'text', required: true, disabled: false},],
    odontologist: [
        { field: 'user.name', label: 'Name', type: 'text', required: true, disabled: editContext === 'self' },
        { field: 'user.lastname', label: 'Last Name', type: 'text', required: true, disabled: editContext === 'self' },
        { field: 'user.email', label: 'email', type: 'email', required: true, disabled: editContext === 'self' },
        { field: 'user.password', label: 'password', type: 'password', required: modalMode === 'create', disabled: editContext === 'self' },
        { field: 'user.userRole', label: 'Role', type: 'select', options: ['PATIENT', 'ADMIN', 'DENTIST'], required: true, disabled: editContext === 'self' },
        { field: 'phone', label: 'phone', type: 'text', required: true },
        { field: 'license', label: 'License', type: 'text', required: true, disabled: editContext === 'self' },
        ],
    appointment: [
        { field: 'patient_id', label: 'Patient', type: 'number', required: true, disabled: editContext === 'self'},
        { field: 'odontologist_id', label: 'Odontologist', type: 'number', required: true },
        { field: 'date', label: 'Date', type: 'datetime-local', required: true },
       // { field: 'description', label: 'Description', type: 'text', required: false },
       //{ field: 'status', label: 'Status', type: 'select', required: true, options: ['SCHEDULED', 'COMPLETED', 'CANCELLED'] },
        ]
});

// Función helper para manejar campos anidados
export const getNestedValue = (obj, path) => {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : '';
        }, obj);
    };
export const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key]) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
    return {
        ...obj
    };
};

export const getEntityFields = (entityType, modalMode = 'create', editContext ='admin') => {
    const allConfigs = getFieldConfigs(modalMode,editContext);
    return allConfigs[entityType] || [];
};

export const validateField = (fieldConfig, value) => {
    const errors = [];
// No validar campos vacíos aquí - eso se hace en el formulario para campos required
    if (!value || value.toString().trim() === '') {
        return errors; // Retornar vacío, la validación required se hace aparte
    }

    // Validaciones específicas por tipo
    switch (fieldConfig.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push(`${fieldConfig.label} debe tener un formato válido`);
            }
            break;
            
        case 'number':
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                errors.push(`${fieldConfig.label} debe ser un número válido`);
            }
            break;
            
        case 'date':
            const dateValue = new Date(value);
            if (isNaN(dateValue.getTime())) {
                errors.push(`${fieldConfig.label} debe ser una fecha válida`);
            }
            break;
    }
    
    return errors;
};
