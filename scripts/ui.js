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

    const postsHtml = posts.map(post => `
        <article class="post-card">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body.substring(0, 100)}...</p>
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
            <button id="btn-back" class="btn-back">← Volver</button>
            <h2 class="post-title-detail">${post.title}</h2>
            <p class="post-body-detail">${post.body}</p>
        </article>
    `;
};

export const renderPagination = (paginationId, totalPages, currentPage) => {
    const wrapper = document.getElementById(paginationId);
    if (!wrapper) return;
 
    wrapper.innerHTML = '';
 
    const btnPrev = document.createElement('button');
    btnPrev.className = 'btn-page';
    btnPrev.textContent = '< Anterior';
    btnPrev.disabled = currentPage <= 1;
    btnPrev.addEventListener('click', () => onPageChange(currentPage - 1));
 
    const pageIndicator = document.createElement('span');
    pageIndicator.className = 'page-indicator';
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
 
    const btnNext = document.createElement('button');
    btnNext.className = 'btn-page';
    btnNext.textContent = 'Siguiente >';
    btnNext.disabled = currentPage >= totalPages;
    btnNext.addEventListener('click', () => onPageChange(currentPage + 1));
 
    wrapper.appendChild(btnPrev);
    wrapper.appendChild(pageIndicator);
    wrapper.appendChild(btnNext);
};

export const hidePagination = (paginationId) => {
    const wrapper = document.getElementById(paginationId);
    if (wrapper) wrapper.innerHTML = '';
};
