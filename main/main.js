import { fetchPosts, fetchPostById, fetchPostsByUserId } from '../api/api.js';
import { applyFilters, CATEGORIES, getCategoryLabelByUserId } from '../filters/filters.js';
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

const enrichPostsWithCategories = (posts) => {
    return posts.map(post => ({
        ...post,
        categoryLabel: getCategoryLabelByUserId(post.userId)
    }));
};

const renderWithFilters = () => {
    const filtered = applyFilters(cachedPosts, activeFilters);
    renderPosts(containerId, filtered);
};

const refreshFeed = async () => {
    showLoading(containerId);

    try {
        if (activeFilters.category) {
            hidePagination(paginationId);
            const categoryUserIds = CATEGORIES[activeFilters.category] ?? [];
            const rawPosts = await fetchPostsByUserId(categoryUserIds);
            cachedPosts = enrichPostsWithCategories(rawPosts);
        } else {
            const userId = activeFilters.userId ? Number(activeFilters.userId) : null;
            const rawPosts = await fetchPosts(currentPage, postsPerPage, userId);
            cachedPosts = enrichPostsWithCategories(rawPosts);
            renderPagination(paginationId, currentPage, totalPages, handlePageChange);
        }

        hideLoading(containerId);
        renderWithFilters();
    } catch (error) {
        console.error('[main] Error al refrescar el feed:', error);
        showError(containerId, 'No se pudieron cargar las publicaciones.');
    }
};

const loadPage = (page) => {
    currentPage = page;
    refreshFeed();
};

const handleApplyFilters = async (newFilters) => {
    const categoryChanged = newFilters.category !== activeFilters.category;
    const userChanged = newFilters.userId !== activeFilters.userId;
    activeFilters = { ...newFilters };

    if (categoryChanged || userChanged) {
        refreshFeed();
        currentPage = 1;
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
        renderWithFilters();
        if (activeFilters.category) {
            hidePagination(paginationId);
        } else {
            renderPagination(paginationId, currentPage, totalPages, handlePageChange);
        }
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
