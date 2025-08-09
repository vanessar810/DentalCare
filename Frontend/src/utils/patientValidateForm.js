export const getPatientInitialFormData = () => ({
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
});

export const patientValidateForm = (data) => {
    const errors = {};
    if (!data.user.name) errors.name = 'Name is required';
    if (!data.user.lastname) errors.lastname = 'Lastname is required';
    if (!data.dni) errors.dni = 'DNI is required';
    if (!data.birthDate) errors.birthDate = 'Birth date is required';

    return Object.keys(errors).length ? errors : null;
};