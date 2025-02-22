const path = require('path');

const getFormattedPath = (filePath) => {
    const parts = filePath.split(path.sep);
    return `${parts[parts.length - 3]}/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};

const createSlug = (name) => {
    return name
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};


module.exports = { getFormattedPath, createSlug }