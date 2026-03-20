import { fetchPosts } from './api.js';
import { showLoading, hideLoading, showError } from './ui.js';

const initApp = async () => {
    const containerId = 'app';
    showLoading(containerId);

    try {
        const posts = await fetchPosts();
        console.log('Posts loaded:', posts);
        hideLoading(containerId);
        // Next: renderPosts
    } catch (error) {
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

document.addEventListener('DOMContentLoaded', initApp);
