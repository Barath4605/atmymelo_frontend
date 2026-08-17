const MAX_RECENT = 10;

export const addRecentSearch = (type, item) => {
    const key = `recent_${type}`;

    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    const updated = [
        item,
        ...existing.filter(search => search.id !== item.id)
    ].slice(0, MAX_RECENT);

    localStorage.setItem(key, JSON.stringify(updated));
};

export const getRecentSearches = (type) => {
    return JSON.parse(localStorage.getItem(`recent_${type}`) || "[]");
};

export const clearRecentSearches = (type) => {
    localStorage.removeItem(`recent_${type}`);
};