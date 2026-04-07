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

const setFieldError = (fieldName, errorMessage) => {
    const input = document.getElementById(`post-${fieldName}`);
    const errorSpan = document.getElementById(`error-${fieldName}`);
    const group     = document.getElementById(`group-${fieldName}`);

    if (!input || !errorSpan || !group) return;

    if (errorMessage) {
        errorSpan.textContent = errorMessage;
        group.classList.add('form-group--error');
    } else {
        errorSpan.textContent = '';
        group.classList.remove('form-group--error');
    }
};

const clearAllFieldErrors = () => {
    Object.keys(VALIDATION_RULES).forEach(fieldName => setFieldError(fieldName, ''));
};

const showFeedback = (type, message) => {
    const feedbackContainer = document.getElementById(FEEDBACK_ID);
    if (!feedbackContainer) return;

    feedbackContainer.className = `form-feedback form-feedback--${type}`;
    feedbackContainer.textContent = message;

    if (type === 'success') {
        setTimeout(() => {
            feedbackContainer.textContent = '';
            feedbackContainer.className   = '';
        }, 5000);
    }
};

const clearFeedback = () => {
    const feedbackContainer = document.getElementById(FEEDBACK_ID);
    if (feedbackContainer) {
        feedbackContainer.textContent = '';
        feedbackContainer.className   = '';
    }
};

const setSubmitLoading = (isLoading) => {
    const btn = document.getElementById('btn-submit-post');
    if (!btn) return;
    btn.disabled     = isLoading;
    btn.textContent  = isLoading ? 'Publicando…' : 'Publicar';
};

const collectFormData = () => ({
    title:  document.getElementById('post-title').value.trim(),
    body:   document.getElementById('post-body').value.trim(),
    userId: Number(document.getElementById('post-userId').value),
});

const handleSubmit = async () => {
    clearFeedback();
    clearAllFieldErrors();

    const { isValid, errors } = validateForm();

    if (!isValid) {
        Object.entries(errors).forEach(([fieldName, message]) => {
            setFieldError(fieldName, message);
        });
        const firstErrorField = Object.keys(errors)[0];
        document.getElementById(`post-${firstErrorField}`)?.focus();
        return;
    }

    setSubmitLoading(true);

    try {
        const postData    = collectFormData();
        const createdPost = await createPost(postData);

        showFeedback('success', `Publicación "${createdPost.title}" creada con ID #${createdPost.id}.`);
        resetForm();
    } catch {
        showFeedback('error', 'No se pudo crear la publicación. Intenta de nuevo.');
    } finally {
        setSubmitLoading(false);
    }
};

const resetForm = () => {
    const title  = document.getElementById('post-title');
    const body   = document.getElementById('post-body');
    const userId = document.getElementById('post-userId');

    if (title)  title.value  = '';
    if (body)   body.value   = '';
    if (userId) userId.value = '';

    clearAllFieldErrors();
};

const loadAndRenderForm = async () => {
    const response = await fetch('../templates/new-post.html');
    if (!response.ok) throw new Error('No se pudo cargar el template del formulario.');

    const html     = await response.text();
    const parser   = new DOMParser();
    const doc      = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#tmpl-new-post');

    if (!template) throw new Error('Template #tmpl-new-post no encontrado.');

    document.head.appendChild(document.adoptNode(template));

    const container = document.getElementById(FORM_CONTAINER_ID);
    const clone     = document.getElementById('tmpl-new-post').content.cloneNode(true);

    fillUserOptions(clone);
    container.innerHTML = '';
    container.appendChild(clone);

    attachFormEvents();
};

const fillUserOptions = (clone) => {
    const select = clone.querySelector('#post-userId');
    if (!select) return;

    Array.from({ length: TOTAL_USERS }, (_, i) => {
        const uid          = i + 1;
        const option       = document.createElement('option');
        option.value       = uid;
        option.textContent = `Usuario ${uid}`;
        select.appendChild(option);
    });
};