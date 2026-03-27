import { fetchPosts, fetchPostById } from '../api/api.js';
import { 
    showLoading,
    hideLoading,
    showError,
    renderPosts,
    renderPostDetail,
    renderPagination,
    hidePagination,
} from '../ui/ui.js';

const containerId = 'app';
const paginationId = 'paginacion';
const postsPerPage = 10;
const totalPosts = 100;
const totalPages = Math.ceil(totalPosts / postsPerPage);

let currentPage = 1;

const loadPage = async (page) => {
    currentPage = page;
    showLoading(containerId);
    hidePagination(paginationId);
 
    try {
        const posts = await fetchPosts(currentPage, postsPerPage);
        hideLoading(containerId);
        renderPosts(containerId, posts);
 
        renderPagination(paginationId, currentPage, totalPages, handlePageChange);
    } catch {
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadPage(newPage);
};

const handlePostClick = async (e) => {
    if (e.target.classList.contains('btn-more')) {
        const postId = e.target.getAttribute('data-id');
        showLoading(containerId);
        hidePagination(paginationId);
        
        try {
            const post = await fetchPostById(postId);
            hideLoading(containerId);
            renderPostDetail(containerId, post);
        } catch (error) {
            showError(containerId, 'No se pudo cargar el detalle de la publicación.');
        }
    }

    if (e.target.id === 'btn-back') {
        loadPage(currentPage);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadPage(currentPage);
    document.getElementById(containerId).addEventListener('click', handlePostClick);
});
