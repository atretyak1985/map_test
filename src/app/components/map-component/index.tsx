import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Bounds, LatLng, Point} from 'map/app/types';
import Cards from 'map/app/components/map-component/components/cards';
import Paginate from './components/paginate';
import Map from 'map/app/components/map-component/components/map';
import {POIService} from 'map/app/services/sanity/poiService';

interface MapComponentProps {
    handleCardClick: (cardTitle: string) => void;
    selectedCategory: string | null;
    center: LatLng;
}

const MapComponent = ({handleCardClick, selectedCategory, center}: MapComponentProps) => {
    // State to hold fetched points of interest
    const [points, setPoints] = useState<Point[]>([]);

    // State to hold the current map bounds (north, east, south, west coordinates)
    const [bounds, setBounds] = useState<Bounds | null>(null);

    // State to track which marker is currently hovered
    const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

    // State to track which marker is currently clicked
    const [clickedMarkerId, setClickedMarkerId] = useState<string | null>(null);

    // Reference to the Google Map instance
    const mapRef = useRef<google.maps.Map | null>(null);

    // Instantiate the service to interact with Sanity
    const poiService = new POIService();

    // Effect hook to fetch points of interest whenever selectedCategory or bounds change
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch POIs based on the current category and bounds
                const data = await poiService.getPOIs(selectedCategory, bounds);
                setPoints(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [selectedCategory, bounds]); // Dependencies: run the effect when these values change

    // Function to update the URL parameters based on map center, zoom, and selected category
    const updateURLParams = useCallback((center: LatLng, zoom: number, selectedCategory: string | null) => {
        const params = new URLSearchParams(window.location.search);

        // Update URL with current map center coordinates and zoom level
        params.set('lat', center.lat.toString());
        params.set('lng', center.lng.toString());
        params.set('zoom', zoom.toString());

        // Update URL with the selected category if available
        if (selectedCategory) {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }

        // Modify the URL without reloading the page
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, []);

    // Handler for when the map bounds change (i.e., user pans or zooms the map)
    const handleBoundsChanged = useCallback(() => {
        if (mapRef.current) {
            const mapBounds = mapRef.current.getBounds();
            if (mapBounds) {
                // Update the bounds state with the new map bounds
                const newBounds = {
                    north: mapBounds.getNorthEast().lat(),
                    east: mapBounds.getNorthEast().lng(),
                    south: mapBounds.getSouthWest().lat(),
                    west: mapBounds.getSouthWest().lng(),
                };
                setBounds(newBounds);

                // Get the map center and zoom level
                const mapCenter = mapRef.current.getCenter();
                const zoom = mapRef.current.getZoom() || 10;

                // Update URL parameters based on the new center and zoom
                if (mapCenter) {
                    updateURLParams(
                        {lat: mapCenter.lat(), lng: mapCenter.lng()},
                        zoom,
                        selectedCategory
                    );
                }
            }
        }
    }, [selectedCategory, updateURLParams]);

    // Handler for when the map is initially loaded
    const handleMapLoad = useCallback((map: google.maps.Map | null) => {
        if (map) {
            mapRef.current = map;
        }
    }, []);

    // Handler for when a card is clicked, setting the clicked marker ID
    const handleCardClickInternal = useCallback(
        (title: string) => {
            const clickedPoint = points.find(point => point.title === title);
            if (clickedPoint) {
                setClickedMarkerId(clickedPoint._id);
                handleCardClick(title);
            }
        },
        [points, handleCardClick]
    );

    return (
        <>
            {/* Main section containing the cards and the map */}
            <section className="container w-[1376px] mx-auto grid grid-cols-3 gap-8 pt-4">
                {/* Cards component for displaying a list of POIs */}
                <Cards
                    cardsData={points}
                    onClick={handleCardClickInternal}
                    onHover={setHoveredMarkerId} // Set the hovered marker when a card is hovered
                    onHoverOut={() => setHoveredMarkerId(null)} // Clear hovered marker on hover out
                />
                {/* Map component to display the map and markers */}
                <Map
                    center={center} // Pass in the map center
                    points={points} // Pass in the points to display on the map
                    hoveredMarkerId={hoveredMarkerId} // Pass the hovered marker ID
                    clickedMarkerId={clickedMarkerId} // Pass the clicked marker ID
                    handleBoundsChanged={handleBoundsChanged} // Handle bounds change
                    handleMapLoad={handleMapLoad} // Handle map load
                />
            </section>
            {/* Pagination component */}
            <Paginate/>
        </>
    );
}

export default MapComponent;
