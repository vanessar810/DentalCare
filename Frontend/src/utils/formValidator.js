import React, { useState } from 'react';
export function validateForm({
    email,
    password
}) {
    const newErrors = {};
    if (!email) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
        newErrors.password = 'Password is required';
    } else if (password.length < 3) {
        newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors
};
