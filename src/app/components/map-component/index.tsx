import React, {useEffect, useRef, useState} from 'react';
import {client} from 'map/sanity/client';
import {Bounds, LatLng, Point} from 'map/app/types';
import Cards from 'map/app/components/map-component/components/cards';
import Paginate from './components/paginate';
import Map from "map/app/components/map-component/components/map";

interface CardProps {
    handleCardClick: (cardTitle: string) => void;
    selectedCategory: string | null;
    center: { lat: number; lng: number }; // Accept center as a prop
}

const MapComponent = ({
                          handleCardClick,
                          selectedCategory,
                          center, // Receive center as a prop
                      }: CardProps) => {
    const [points, setPoints] = useState<Point[]>([]); // State to hold points data
    const [bounds, setBounds] = useState<Bounds | null>(null);
    const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null); // State for hovered marker
    const [clickedMarkerId, setClickedMarkerId] = useState<string | null>(null); // State for clicked marker

    const mapRef = useRef<google.maps.Map | null>(null); // Define mapRef here

    useEffect(() => {
        const buildQuery = (categoryId?: string | null, bounds?: {
            north: number;
            east: number;
            south: number;
            west: number
        } | null) => {
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
        };

        const fetchData = async () => {
            const query = buildQuery(selectedCategory, bounds);
            try {
                const data = await client.fetch<Point[]>(query);
                setPoints(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [selectedCategory, bounds]);

    // Update the URL search parameters when selectedCategory or map changes
    useEffect(() => {
        if (mapRef.current) {
            const center = mapRef.current.getCenter();
            const zoom = mapRef.current.getZoom() || 10;

            if (center) {
                updateURLParams(
                    {
                        lat: center.lat() || 0,
                        lng: center.lng() || 0,
                    },
                    zoom,
                    selectedCategory
                );
            }
        }
    }, [selectedCategory]);

    const updateURLParams = (center: LatLng, zoom: number, selectedCategory: string | null) => {
        const params = new URLSearchParams(window.location.search);

        params.set('lat', center.lat.toString());
        params.set('lng', center.lng.toString());
        params.set('zoom', zoom.toString());

        if (selectedCategory) {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }

        // Update the URL without reloading the page
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    };


    // Handle changes in map bounds
    const handleBoundsChanged = () => {
        if (mapRef.current) {
            const mapBounds = mapRef.current.getBounds();
            if (mapBounds) {
                setBounds({
                    north: mapBounds.getNorthEast()?.lat() || 0,
                    east: mapBounds.getNorthEast()?.lng() || 0,
                    south: mapBounds.getSouthWest()?.lat() || 0,
                    west: mapBounds.getSouthWest()?.lng() || 0,
                });

                const center = mapRef.current.getCenter();
                const zoom = mapRef.current.getZoom() || 10; // Default zoom level if undefined

                if (center) {
                    updateURLParams(
                        {
                            lat: center.lat() || 0, // Default lat if undefined
                            lng: center.lng() || 0, // Default lng if undefined
                        },
                        zoom,
                        selectedCategory
                    );
                }
            }
        }
    };

    const handleMapLoad = (map: google.maps.Map | null) => {
        if (map) {
            mapRef.current = map;
            // No need to set center here since it's controlled by the parent
        }
    };

    return (
        <>
            <section className="container w-[1376px] mx-auto grid grid-cols-3 gap-8 pt-4">
                <Cards
                    cardsData={points}
                    onClick={(title) => {
                        setClickedMarkerId(points.find(point => point.title === title)?._id || null);
                        handleCardClick(title);
                    }}
                    onHover={(id) => setHoveredMarkerId(id)} // Set hovered marker
                    onHoverOut={() => setHoveredMarkerId(null)} // Clear hovered marker
                />
                <Map
                    center={center} // Use the external center prop
                    points={points}
                    hoveredMarkerId={hoveredMarkerId}
                    clickedMarkerId={clickedMarkerId}
                    handleBoundsChanged={handleBoundsChanged}
                    handleMapLoad={handleMapLoad}
                />
            </section>
            <Paginate/>
        </>
    );
}

export default MapComponent;
