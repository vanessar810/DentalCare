import React, {useState} from 'react';
export function validateForm({
    name,
    lastname,
    email,
    password
}) {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÀ-ÿ0-9\s]+$/;
    if (name !== undefined) {
    if (!name || !name.trim()) {
        newErrors.name = 'Name is required';
    } else if (!nameRegex.test(name)) {
        newErrors.name = 'Please enter a valid name'
    }}
    if (lastname !== undefined) {
    if (!lastname || !lastname.trim()) {
        newErrors.lastname = 'Lastname is required';
    } else if (!nameRegex.test(lastname)) {
        newErrors.lastname = 'Please enter a valid lastname'
    }}

    if (!email || !email.trim()) {
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