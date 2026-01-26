
export const validateForm = async ({name, lastname, email, password}) => {
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

    if (!email || !email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
    } else {
        try {
            const res = await fetch(`http://localhost:8080/api/email/verify?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            console.log(data);
            if (!data.valid) {
                newErrors.email = 'This email address does not seem to exist';
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            newErrors.email = 'Could not verify this email. Try again later.';
        }
    }

    if (!password) {
        newErrors.password = 'Password is required';
    } else if (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
        newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.';
    }
    return newErrors
};