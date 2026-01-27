export const patientFormValidator = ({
    name,
    lastname,
    dni,
    birthDate,
    address= {}
}) => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÀ-ÿ0-9\s]+$/;

    if (name !== undefined) {
        if (!name || !name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!nameRegex.test(name)) {
            newErrors.name = 'Please enter a valid name'
        }
    }
    if (lastname !== undefined) {
        if (!lastname || !lastname.trim()) {
            newErrors.lastname = 'Lastname is required';
        } else if (!nameRegex.test(lastname)) {
            newErrors.lastname = 'Please enter a valid lastname'
        }
    }

    if (dni !== undefined) {
        if (!dni || !dni.trim()) {
            newErrors.dni = 'DNI is required';
        } else if (!/^\d{5,10}$/.test(dni)) {
            newErrors.dni = 'Please enter a valid DNI with at least 5 digits'
        }
    }

    if (birthDate !== undefined) {
        if (!birthDate || !birthDate.trim()) {
            newErrors.birthDate = 'Birthday is required';
        } else {
            const birth = new Date(birthDate);
            const today = new Date();
            if (isNaN(birth.getTime())) {
                newErrors.birthDate = 'Date is not valid';
            } else if (birth > today) {
                newErrors.birthDate = 'Birthdate cant be in the future';
            } else {
                const age = today.getFullYear() - birth.getFullYear();
                if (age > 120) {
                    newErrors.birthDate = 'Birthday is not valid';
                } else if (age < 0) {
                    newErrors.birthDate = 'Birthday is not valid';
                }
            }
        }
    }
    const { street, number, neighborhood } = address;

    if (street !== undefined) {
        if (!street || !street.trim()) {
            newErrors.street = 'Street is required';
        }} else {
        newErrors.street = 'Street is required';
    }

    if (number !== undefined) {
        if (!number || !number.trim()) {
            newErrors.number = 'Number is required';
        }
    }

    if (neighborhood !== undefined) {
        if (!neighborhood || !neighborhood.trim()) {
            newErrors.neighborhood = 'Neighborhood is required';
        }
    }
    return newErrors
};