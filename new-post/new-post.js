import { createPost } from '../api/api.js';

const form = document.getElementById('new-post-form');
const btnSubmit = document.getElementById('btn-submit');
const errorMsg = document.getElementById('form-error');
const successMsg = document.getElementById('form-success');

const validateForm = (data) => {
    if (!data.title || data.title.length < 5) {
        return 'El título debe tener al menos 5 caracteres.';
    }
    if (!data.body || data.body.length < 10) {
        return 'El contenido debe tener al menos 10 caracteres.';
    }
    if (!data.userId) {
        return 'Debe ingresar un ID de usuario.';
    }
    return null;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar estados previos
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    const postData = {
        title: document.getElementById('title').value.trim(),
        body: document.getElementById('body').value.trim(),
        userId: Number(document.getElementById('userId').value)
    };

    const error = validateForm(postData);
    if (error) {
        errorMsg.textContent = error;
        errorMsg.style.display = 'block';
        return;
    }

    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    try {
        const result = await createPost(postData);
        console.log('Post creado:', result);
        
        successMsg.style.display = 'block';
        form.reset();

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);

    } catch (err) {
        errorMsg.textContent = 'Ocurrió un error al intentar crear la publicación.';
        errorMsg.style.display = 'block';
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Publicar';
    }
};

if (form) {
    form.addEventListener('submit', handleSubmit);
}
