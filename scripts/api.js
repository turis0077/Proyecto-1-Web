const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) throw new Error('Error al cargar publicaciones');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchPostById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) throw new Error('Error al cargar la publicación');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
