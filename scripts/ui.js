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
