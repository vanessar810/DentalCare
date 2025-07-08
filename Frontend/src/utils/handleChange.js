/**
 * Factory that returns a ready‑to‑use onChange handler.
 *
 * @param {Function} setFormData  - useState setter for the form data object
 * @param {Function} setErrors    - useState setter for the errors object
 *
 * Usage:
 *   const handleChange = createHandleChange(setFormData, setErrors);
 *   <input name="email" onChange={handleChange} ... />
 */

export const createHandleChange = (setFormData, setErrors) => (e) => {
    const {
        name,
        value
    } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));

    // Clear error when user starts typing
    setErrors((prev) => {
        if (!prev[name]) return prev;
        return {
            ...prev,
            [name]: ''
        };
    });
};