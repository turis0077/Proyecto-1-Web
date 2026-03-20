import { fetchPosts } from './api.js';
import { showLoading, hideLoading, showError, renderPosts } from './ui.js';

const initApp = async () => {
    const containerId = 'app';
    showLoading(containerId);

    try {
        const posts = await fetchPosts();
        hideLoading(containerId);
        renderPosts(containerId, posts);
    } catch (error) {
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

document.addEventListener('DOMContentLoaded', initApp);
