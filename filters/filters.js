export const CATEGORIES = {
    tecnologia: [1, 2, 3],
    ciencia:    [4, 5, 6],
    cultura:    [7, 8],
    negocios:   [9, 10],
};
 
export const CATEGORY_LABELS = {
    tecnologia: 'Tecnología',
    ciencia:    'Ciencia',
    cultura:    'Cultura',
    negocios:   'Negocios',
};

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

const filterByCategory = (posts, category) => {
    if (!category || category === '') return posts;
    const allowedUserIds = CATEGORIES[category] ?? [];
    return posts.filter(post => allowedUserIds.includes(post.userId));
};

export const applyFilters = (posts, activeFilters) => {
    const { searchText, category} = activeFilters;
 
    let result = filterByText(posts, searchText);
    result = filterByCategory(result, category);
 
    return result;
};