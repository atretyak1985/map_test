import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker, MarkerClusterer} from '@react-google-maps/api';
import {Point} from 'map/app/types';
import Size = google.maps.Size;

interface MapProps {
    center: {
        lat: number; // Latitude for the center of the map
        lng: number; // Longitude for the center of the map
    };
    points: Point[]; // Array of points containing data for each marker
    hoveredMarkerId: string | null; // ID of the marker that is currently hovered over
    clickedMarkerId: string | null; // ID of the marker that is currently clicked
    handleBoundsChanged: () => void; // Function to handle changes in the map's bounds
    handleMapLoad: (map: google.maps.Map | null) => void; // Function to handle when the map is loaded
}

const Map: React.FC<MapProps> = ({
                                     center, // Center of the map
                                     points, // Points to display as markers on the map
                                     hoveredMarkerId, // Currently hovered marker's ID
                                     clickedMarkerId, // Currently clicked marker's ID
                                     handleBoundsChanged, // Function to handle map bounds changes
                                     handleMapLoad, // Function to handle when the map is loaded
                                 }) => {
    const [markerSize, setMarkerSize] = useState<Size | null>(null); // State to manage marker size, though it's not used directly in this component

    // Function to determine the size of the marker based on its state (clicked, hovered, or default)
    const getMarkerSize = (id: string) => {
        if (clickedMarkerId === id) {
            return new google.maps.Size(48, 48); // Larger size for clicked markers
        } else if (hoveredMarkerId === id) {
            return new google.maps.Size(36, 36); // Medium size for hovered markers
        } else {
            return new google.maps.Size(24, 24); // Default size for all other markers
        }
    };

    return (
        <div
            className="w-[436px] h-[750px] relative bg-zinc-500 rounded-3xl shadow border border-neutral-200 overflow-hidden">
            {/* Load the Google Maps API using the provided API key */}
            <LoadScript googleMapsApiKey="AIzaSyB2LScKwxDcryYSGkA22w26b7oEfUBIYpE">
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}} // Style for the map container
                    center={center} // Center of the map
                    zoom={10} // Initial zoom level
                    onBoundsChanged={handleBoundsChanged} // Triggered when the map's bounds change
                    onLoad={handleMapLoad} // Triggered when the map has finished loading
                >
                    {/* MarkerClusterer groups close markers together into clusters */}
                    <MarkerClusterer>
                        {(clusterer) => (
                            <>
                                {points.map((point: Point) => (
                                    <Marker
                                        key={point._id} // Unique key for each marker
                                        position={{
                                            lat: point.location.lat,
                                            lng: point.location.lng
                                        }} // Position of the marker
                                        clusterer={clusterer} // Assign this marker to a clusterer
                                        icon={{
                                            url: point.category?.icon || '', // URL for the marker icon (from the category)
                                            scaledSize: getMarkerSize(point._id), // Size of the marker based on its state
                                            fillOpacity: 1, // Opacity of the marker
                                            strokeWeight: 2, // Border thickness of the marker
                                            strokeColor: 'white', // Border color of the marker
                                        }}
                                        title={point.title} // Title of the marker, shown on hover
                                    />
                                ))}
                            </>
                        )}
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
