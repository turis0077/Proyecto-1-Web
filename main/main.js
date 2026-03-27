import { fetchPosts, fetchPostById } from '../api/api.js';
import { applyFilters } from '../filters/filters.js';
import { loadFiltersTemplate, renderFilters } from '../filters/ui-filters.js';

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
const filtersId = 'filters';
const paginationId = 'paginacion';
const postsPerPage = 10;
const totalPosts = 100;
const totalPages = Math.ceil(totalPosts / postsPerPage);

let currentPage = 1;

let activeFilters = {
    searchText: '',
    category: '',
    userId: '',
    sortField: '',
    sortDir: 'asc',
};

let cachedPosts = [];

const renderWithFilters = () => {
    const filtered = applyFilters(cachedPosts, activeFilters);
    renderPosts(containerId, filtered);
};

const loadPage = async (page) => {
    currentPage = page;
    showLoading(containerId);
    hidePagination(paginationId);
 
    try {
        const userId = activeFilters.userId ? Number(activeFilters.userId) : null;
        cachedPosts  = await fetchPosts(currentPage, postsPerPage, userId);
        
        hideLoading(containerId);

        renderWithFilters();
        renderPagination(paginationId, currentPage, totalPages, handlePageChange);
    } catch {
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

const handleApplyFilters = (newFilters) => {
    const userChanged = newFilters.userId !== activeFilters.userId;
    activeFilters = { ...newFilters };
 
    if (userChanged) {
        loadPage(currentPage);
    } else {
        renderWithFilters();
    }
};

const handlePageChange = (newPage) => {
    const safePage = Math.max(1, Math.min(newPage, totalPages));
    if (safePage === currentPage) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadPage(safePage);
};

const handlePostClick = async (e) => {
    if (e.target.classList.contains('btn-more')) {
        const postId = e.target.getAttribute('data-id');
        showLoading(containerId);
        hidePagination(paginationId)
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

const initApp = async () => {
    try {
        await loadFiltersTemplate();
        renderFilters(filtersId, activeFilters, handleApplyFilters);

    } catch (error) {
        console.error('[main] No se pudo cargar el template de filtros:', error);
        showError(filtersId, 'No se pudo cargar la barra de filtros.');
    }

    const container = document.getElementById(containerId);
    if (container) {
        container.addEventListener('click', handlePostClick);
    }
 
    loadPage(currentPage);
};
 
document.addEventListener('DOMContentLoaded', initApp);
