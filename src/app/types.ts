export interface Category {
    _id: string;
    title: string;
    icon: string;
    selected: boolean;
}

export interface Point {
    _id: string;
    imgSrc: string;
    title: string;
    position: string;
    match: string;
    location: {
        lat: number;
        lng: number;
    };
    category: Category
}

export interface Bounds {
    north: number;
    east: number;
    south: number;
    west: number;
}

export interface LatLng {
    lat: number;
    lng: number;
}
