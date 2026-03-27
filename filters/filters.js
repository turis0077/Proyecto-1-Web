const filterByText = (posts, searchText) => {
    if (!searchText || searchText.trim() === '') return posts;
 
    const normalize = (str) =>
        str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
 
    const query = normalize(searchText.trim());
 
    return posts.filter(post =>
        normalize(post.title).includes(query) ||
        normalize(post.body).includes(query)
    );
};