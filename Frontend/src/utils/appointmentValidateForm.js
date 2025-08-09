export const getAppoinmentInitialFormData = () => ({
    patientId: '',
    odontologistId: '',
    appointmentDate: '',
    description: '',
    status: 'SCHEDULED'
});

export const appointmentValidateForm = (data) => {
    const errors = {};
    if (!data.patientId) errors.name = 'patient is required';
    if (!data.odontologistId) errors.lastname = 'odontologist Id is required';
    if (!data.appointmentDate) errors.dni = 'Date is required';

    return Object.keys(errors).length ? errors : null;
};