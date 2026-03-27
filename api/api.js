const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (page = 1, limit = 10) => {
    try {
        const url = `${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al cargar publicaciones');
        return await response.json();
    } catch (error) {
        console.error('[api] fetchPosts:', error);
        throw error;
    }
};

export const fetchPostById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) throw new Error('Error al cargar la publicación');
        return await response.json();
    } catch (error) {
        console.error('[api] fetchPostById:', error);
        throw error;
    }
};
