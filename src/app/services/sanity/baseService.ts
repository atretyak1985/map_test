import {client} from "map/sanity/client";

export class BaseService {
    protected async fetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
        try {
            const data = await client.fetch<T>(query, params);
            return data;
        } catch (error) {
            console.error("Failed to fetch data from Sanity:", error);
            throw new Error("Failed to fetch data");
        }
    }
}
