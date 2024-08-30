// src/services/sanity/queries.ts

export const POI_AND_RESTAURANT_QUERY = `
  *[
    _type in ["poi", "restaurant"] &&
    defined(location) &&
    location.lat > $south &&
    location.lat < $north &&
    location.lng > $west &&
    location.lng < $east
  ] {
    _id,
    _type,
    title,
    location {
      lat,
      lng
    },
    category->{
      title,
      "icon": icon.asset->url
    }
  }
`;

export const CATEGORY_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "icon": icon.asset->url
  }
`;
