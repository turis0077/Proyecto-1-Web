export const showLoading = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<div class="loading">Cargando publicaciones...</div>';
    }
};

export const hideLoading = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
};

export const showError = (containerId, message) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
};
