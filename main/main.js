import { fetchPosts } from '../api/api.js';
import { applyFilters } from '../filters/filters.js';
import { loadFiltersTemplate, renderFilters } from '../filters/ui-filters.js';

import { 
    showLoading,
    hideLoading,
    showError,
    renderPosts,
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
        cachedPosts  = await fetchPosts(currentPage, postsPerPage);
        
        hideLoading(containerId);

        renderWithFilters();
        renderPagination(paginationId, currentPage, totalPages, handlePageChange);
    } catch {
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

const handleApplyFilters = (newFilters) => {
    activeFilters = { ...newFilters };
    renderWithFilters();
};

const handlePageChange = (newPage) => {
    const safePage = Math.max(1, Math.min(newPage, totalPages));
    if (safePage === currentPage) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadPage(safePage);
};

const handlePostClick = (event) => {
    if (event.target.classList.contains('btn-more')) {
        const postId = event.target.getAttribute('data-id');
        console.log("Clic en el post:", postId);
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
