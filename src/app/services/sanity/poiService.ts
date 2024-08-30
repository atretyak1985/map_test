// src/services/sanity/poiService.ts

import {client} from 'map/sanity/client';
import {Bounds, Point} from 'map/app/types';

export class POIService {
    public async getPOIs(categoryId?: string | null, bounds?: Bounds | null): Promise<Point[]> {
        const query = this.buildQuery(categoryId, bounds);
        try {
            return await client.fetch<Point[]>(query);
        } catch (error) {
            console.error("Failed to fetch POIs:", error);
            throw new Error("Failed to fetch POIs");
        }
    }

    private buildQuery(categoryId?: string | null, bounds?: Bounds | null): string {
        const filters: string[] = [];
        if (categoryId) {
            filters.push(`category._ref == "${encodeURIComponent(categoryId)}"`);
        }
        if (bounds) {
            filters.push(
                `location.lat > ${bounds.south}`,
                `location.lat < ${bounds.north}`,
                `location.lng > ${bounds.west}`,
                `location.lng < ${bounds.east}`
            );
        }
        const filterString = filters.length > 0 ? `[${filters.join(' && ')}]` : '';
        return `*[_type == "poi"]${filterString} | order(title asc){
            _id,
            imgSrc,
            title,
            position,
            match,
            location {
                lat,
                lng
            },
            category->{
                _id,
                title,
                "icon": icon.asset->url
            }
        }`;
    }
}
