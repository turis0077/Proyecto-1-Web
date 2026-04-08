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

export const renderPosts = (containerId, posts) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = '<div class="loading">No se encontraron publicaciones con los filtros aplicados.</div>';
        return;
    }

    const postsHtml = posts.map(post => `
        <article class="post-card">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body.substring(0, 100)}...</p>
            <span class="post-category" style="font-size: 0.8em; color: #666; text-transform: uppercase; font-weight: bold;">
                ${post.categoryLabel || 'Sin categoría'}
            </span>
            <button class="btn-more" data-id="${post.id}">Ver más</button>
        </article>
    `).join('');

    container.innerHTML = `<div class="posts-grid">${postsHtml}</div>`;
};

export const renderPostDetail = (containerId, post) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <article class="post-detail">
            <div class="detail-actions">
                <button id="btn-back" class="btn-back">← Volver</button>
                <button id="btn-delete-post" class="btn-delete" data-id="${post.id}">Eliminar Publicación</button>
            </div>
            <h2 class="post-title-detail">${post.title}</h2>
            <span class="post-category" style="font-size: 0.8em; color: #666; text-transform: uppercase; font-weight: bold;">
                ${post.categoryLabel || 'Sin categoría'}
            </span>
            <p class="post-body-detail">${post.body}</p>
        </article>
    `;
};

export const renderPagination = (paginationId, currentPage, totalPages, onPageChange) => {
    const wrapper = document.getElementById(paginationId);
    if (!wrapper) return;
 
    wrapper.innerHTML = '';
 
    const createButton = (text, disabled, onClick) => {
        const btn = document.createElement('button');
        btn.className  = 'btn-page';
        btn.textContent = text;
        btn.disabled   = disabled;
        btn.addEventListener('click', onClick);
        return btn;
    };
 
    const pageIndicator = document.createElement('span');
    pageIndicator.className   = 'page-indicator';
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
 
    wrapper.appendChild(createButton('«', currentPage <= 1, () => onPageChange(1)));
    wrapper.appendChild(createButton('<', currentPage <= 1, () => onPageChange(currentPage - 1)));
    wrapper.appendChild(pageIndicator);
    wrapper.appendChild(createButton('>', currentPage >= totalPages, () => onPageChange(currentPage + 1)));
    wrapper.appendChild(createButton('»', currentPage >= totalPages, () => onPageChange(totalPages)));
    };

export const hidePagination = (paginationId) => {
    const wrapper = document.getElementById(paginationId);
    if (wrapper) wrapper.innerHTML = '';
};
