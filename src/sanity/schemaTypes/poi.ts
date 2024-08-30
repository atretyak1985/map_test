// schemas/poi.js

const poi = {
    name: 'poi', // The name of the schema
    title: 'Points of Interest', // The title of the schema displayed in the Studio
    type: 'document', // This is a document type schema
    fields: [
        {
            name: 'imgSrc',
            title: 'Image Source',
            type: 'url',
            description: 'URL of the image for the map-component',
            validation: (Rule: any) => Rule.required().uri({allowRelative: true, scheme: ['http', 'https']}),
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Title of the map-component',
            validation: (Rule: any) => Rule.required().max(100),
        },
        {
            name: 'position',
            title: 'Position',
            type: 'string',
            description: 'Location mentioned in the map-component',
            validation: (Rule: any) => Rule.required().max(100),
        },
        {
            name: 'match',
            title: 'Match Percentage',
            type: 'string',
            description: 'Match percentage (e.g., "20% match")',
            validation: (Rule: any) => Rule.required().max(20),
        },
        {
            name: 'location',
            title: 'Location',
            type: 'geopoint', // This defines a Geopoint field for storing latitude and longitude
            description: 'Geopoint field for storing latitude and longitude',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{type: 'category'}],
        },
    ]
}

export default poi;
