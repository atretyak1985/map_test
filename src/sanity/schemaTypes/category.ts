// schemas/category.js

const category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'file', // Use the file type to upload SVG files
            options: {
                accept: 'image/svg+xml', // Restrict uploads to SVG files
            },
        }
    ],
};

export default category;
