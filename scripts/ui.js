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
            <button class="btn-more">Ver más</button>
        </article>
    `).join('');

    container.innerHTML = `<div class="posts-grid">${postsHtml}</div>`;
};
