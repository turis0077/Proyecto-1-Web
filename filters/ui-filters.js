import { CATEGORY_LABELS } from './filters.js';

export const loadFiltersTemplate = async () => {
    const response = await fetch('./templates/filters.html');
    if (!response.ok) throw new Error('No se pudo cargar el template de filtros.');
 
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#tmpl-filters');
 
    if (!template) throw new Error('Template #tmpl-filters no encontrado.');
 
    document.head.appendChild(document.adoptNode(template));
};

export const renderFilters = (filterId, current, onApply) => {
    const container = document.getElementById(filterId);
    const template  = document.getElementById('tmpl-filters');
    if (!container || !template) return;
 
    const clone = template.content.cloneNode(true);
 
    fillCategoryOptions(clone, current.category);
    fillUserOptions(clone, current.userId);
    restoreValues(clone, current);
 
    container.innerHTML = '';
    container.appendChild(clone);
 
    attachFilterEvents(onApply);
};

const fillCategoryOptions = (clone, selectedCategory) => {
    const select = clone.querySelector('#filter-category');
    if (!select) return;
 
    Object.entries(CATEGORY_LABELS).forEach(([key, label]) => {
        const option    = document.createElement('option');
        option.value    = key;
        option.textContent = label;
        option.selected = key === selectedCategory;
        select.appendChild(option);
    });
};

const fillUserOptions = (clone, selectedUserId) => {
    const select = clone.querySelector('#filter-user');
    if (!select) return;
 
    Array.from({ length: 10 }, (_, i) => {
        const uid       = i + 1;
        const option    = document.createElement('option');
        option.value    = uid;
        option.textContent = `Usuario ${uid}`;
        option.selected = String(uid) === String(selectedUserId);
        select.appendChild(option);
    });
};

const restoreValues = (clone, current) => {
    const searchInput = clone.querySelector('#filter-search');
 
    if (searchInput) searchInput.value = current.searchText ?? '';
};

const collectFilters = () => ({
    searchText: document.getElementById('filter-search').value.trim(),
    category: document.getElementById('filter-category').value,
    userId: document.getElementById('filter-user').value,
});

const attachFilterEvents = (onApply) => {
    document.getElementById('btn-apply-filters').addEventListener('click', () => {
        onApply(collectFilters());
    });
 
    document.getElementById('btn-clear-filters').addEventListener('click', () => {
        document.getElementById('filter-search').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-user').value = '';
        onApply({ searchText: '', category: '', userId: '' });
    });
};