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

export const getCategoryLabelByUserId = (userId) => {
    for (const [categoryKey, userIds] of Object.entries(CATEGORIES)) {
        if (userIds.includes(userId)) {
            return CATEGORY_LABELS[categoryKey];
        }
    }
    return 'General';
};

const filterByUserId = (posts, userId) => {
    if (!userId || userId === '') return posts;
    return posts.filter(post => String(post.userId) === String(userId));
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

const sortPosts = (posts, field, direction) => {
    if (!field || !direction) return posts;
 
    return [...posts].sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];
 
        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
 
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

export const applyFilters = (posts, activeFilters) => {
    const { searchText, category, sortField, sortDir } = activeFilters;
 
    let result = filterByText(posts, searchText);
    result = filterByCategory(result, category);
    result = filterByUserId(result, activeFilters.userId);
    result = sortPosts(result, sortField, sortDir);
 
    return result;
};