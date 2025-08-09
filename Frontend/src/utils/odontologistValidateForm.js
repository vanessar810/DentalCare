export const getOdontologistInitialFormData = () => ({
    phone: '',
    license: '',
    user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        userRole: '',
    }
});

export const odontologistValidateForm = (data) => {
    const errors = {};
    if (!data.user.name) errors.name = 'Name is required';
    if (!data.user.lastname) errors.lastname = 'Lastname is required';
    if (!data.phone) errors.dni = 'phone is required';
    if (!data.license) errors.birthDate = 'license is required';

    return Object.keys(errors).length ? errors : null;
};