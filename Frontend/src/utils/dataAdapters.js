/**
 * Adapta datos del backend al formato del formulario
 * @param {Object} backendData - Datos del backend
 * @param {string} entityType - Tipo de entidad (patient, odontologist, appointment)
 * @returns {Object} - Datos adaptados para el formulario
 */

//Adapting data from backend to the form
export const adaptBackendToForm = (backendData, entityType) => {
   // console.log('🔍 Adapting backend data:', backendData, 'for entity:', entityType);
    if (!backendData) return null;
    switch (entityType) {
        case 'patient':
            const adaptedPatient = {
                id: backendData.id,
                dni: backendData.dni,
                birthDate: backendData.birthDate,
                user: {
                    name: backendData.name || '',
                    lastname: backendData.lastname || '',
                    email: backendData.email || '',
                    userRole: backendData.userRole || 'PATIENT',
                },
                address: {
                    street: backendData.address ?.street || '',
                    number: backendData.address ?.number || '',
                    neighborhood: backendData.address ?.neighborhood || '',
                }
            };
            //console.log('🔍 Adapted to form:', adaptedPatient);
            return adaptedPatient;

        case 'odontologist':
            const adaptedOdontologist = {
                id: backendData.id,
                phone: backendData.phone || '',
                license: backendData.license || '',
                user: {
                    name: backendData.name || '',
                    lastname: backendData.lastname || '',
                    email: backendData.email || '',
                    userRole: backendData.role || 'DENTIST',
                }
            };
            return adaptedOdontologist;

        case 'appointment':
            const adaptedAppointment = {
                id: backendData.id,
                date: backendData.date || '',
                patient: {
                    patient_id: backendData.patient.id || '',
                },
                odontologist: {
                    odontologist_id: backendData.odontologist.id || '',
                }             
                // status: backendData.status || 'SCHEDULED',
                // notes: backendData.notes || ''
            };
            return adaptedAppointment;

        default:
            console.warn(`No adapter found for entity type: ${entityType}`);
            return backendData;
    }
};
/**
 * Adapta datos del formulario al formato del backend
 * @param {Object} formData - Datos del formulario
 * @param {string} entityType - Tipo de entidad
 * @param {boolean} isEdit - Si es una operación de edición
 * @returns {Object} - Datos adaptados para el backend
 */

export const adaptFormToBackend = (formData, entityType, isEdit = false) => {
    //console.log('🔍 Adapting form data:', formData, 'isEdit:', isEdit, 'entity:', entityType);
    if (!formData) return null;
    switch (entityType) {
        case 'patient':
            if (isEdit) {
                // Estructura para UPDATE: PatientRequestUpdateByAdminDTO
                const adaptedPatientUpdate = {
                    name: formData.user ?.name,
                    lastname: formData.user ?.lastname,
                    dni: formData.dni,
                    birthDate: formData.birthDate,
                    address: {
                        street: formData.address ?.street,
                        number: formData.address ?.number,
                        neighborhood: formData.address ?.neighborhood,
                    },
                    email: formData.user ?.email,
                    role: formData.user ?.userRole || 'PATIENT',
                };
                //console.log('🔍 Adapted to bacl:', adaptedPatientUpdate);
                return adaptedPatientUpdate;
            } else {
                // ✅ ESTRUCTURA PARA CREATE: PatientByAdminRequestDTO
                const adaptedPatientCreate = {
                    name: formData.user ?.name,
                    lastname: formData.user ?.lastname,
                    dni: formData.dni,
                    birthDate: formData.birthDate,
                    address: {
                        street: formData.address ?.street,
                        number: formData.address ?.number,
                        neighborhood: formData.address ?.neighborhood,
                    },
                    user: {
                        name: formData.user ?.name,
                        lastname: formData.user ?.lastname,
                        email: formData.user ?.email,
                        password: formData.user ?.password,
                        userRole: formData.user ?.userRole || 'PATIENT',
                    }
                };
                return adaptedPatientCreate;
            }

            case 'odontologist':
                if (isEdit) {
                    // Estructura para UPDATE
                    const adaptedOdontologistUpdate = {
                        name: formData.user ?.name,
                        lastname: formData.user ?.lastname,
                        phone: formData.phone,
                        license: formData.license,
                        email: formData.user ?.email,
                        role: formData.user ?.userRole,
                    };
                    return adaptedOdontologistUpdate;
                } else {
                    // Estructura para CREATE
                    const adaptedOdontologistCreate = {
                        name: formData.user ?.name,
                        lastname: formData.user ?.lastname,
                        phone: formData.phone,
                        license: formData.license,
                        user: {
                            name: formData.user ?.name,
                            lastname: formData.user ?.lastname,
                            email: formData.user ?.email,
                            password: formData.user ?.password,
                            userRole: formData.user ?.userRole || 'DENTIST',
                        }
                    };
                    return adaptedOdontologistCreate;
                }
                case 'appointment':
                    // Appointments tienen la misma estructura para CREATE y UPDATE
                    const adaptedAppointment = {
                        patient_id: parseInt(formData.patient_id),
                        odontologist_id: parseInt(formData.odontologist_id),
                        date: formData.date + ":00",
                        //status: formData.status,
                        //notes: formData.notes
                    };
                    return adaptedAppointment;

                default:
                    console.warn(`No adapter found for entity type: ${entityType}`);
                    return formData;
    }
};