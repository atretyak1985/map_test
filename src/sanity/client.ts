import {QueryParams} from "sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: '2024-08-21',
    useCdn: true,
});

export async function sanityFetch<const QueryString extends string>({
                                                                        query,
                                                                        params = {},
                                                                        tags,
                                                                    }: {
    query: QueryString;
    params?: QueryParams;
    tags?: string[];
}) {
    return client.fetch(query, params, {
        next: {
            revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
            tags,
        },
    });
}
