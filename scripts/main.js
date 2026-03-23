import { fetchPosts, fetchPostById } from './api.js';
import { showLoading, hideLoading, showError, renderPosts, renderPostDetail } from './ui.js';

const containerId = 'app';

const handlePostClick = async (e) => {
    if (e.target.classList.contains('btn-more')) {
        const id = e.target.getAttribute('data-id');
        showLoading(containerId);
        try {
            const post = await fetchPostById(id);
            hideLoading(containerId);
            renderPostDetail(containerId, post);
        } catch (error) {
            showError(containerId, 'No se pudo cargar el detalle de la publicación.');
        }
    }

    if (e.target.id === 'btn-back') {
        initApp();
    }
};

const initApp = async () => {
    showLoading(containerId);
    try {
        const posts = await fetchPosts();
        hideLoading(containerId);
        renderPosts(containerId, posts);
    } catch (error) {
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    document.getElementById(containerId).addEventListener('click', handlePostClick);
});
