import { createPost } from '../api/api.js';

const fromContainerId = 'form-container';
const feedbackContainerId = 'form-feedback';
const totalUsers = 10;

const validationRules = {
    title: {
        required: true,
        minLength: 5,
        label: 'Ingresa un título',
    },
    body: {
        required:  true,
        minLength: 20,
        label: 'Ingresa un contenido',
    },
    userId: {
        required: true,
        label: 'Autor',
    },
};

const validateField = (fieldName, value) => {
    const rule = VALIDATION_RULES[fieldName];
    if (!rule) return '';

    const trimmed = value.trim();

    if (rule.required && trimmed === '') {
        return `${rule.label} es obligatorio.`;
    }

    if (rule.minLength && trimmed.length < rule.minLength) {
        return `${rule.label} debe tener al menos ${rule.minLength} caracteres.`;
    }

    return '';
};

const validateForm = () => {
    const fields = {
        title: document.getElementById('post-title')?.value  ?? '',
        body: document.getElementById('post-body')?.value   ?? '',
        userId: document.getElementById('post-userId')?.value ?? '',
    };

    const errors = {};
    let isValid  = true;

    Object.entries(fields).forEach(([fieldName, value]) => {
        const errorMessage = validateField(fieldName, value);
        if (errorMessage) {
            errors[fieldName] = errorMessage;
            isValid = false;
        }
    });

    return { isValid, errors };
};