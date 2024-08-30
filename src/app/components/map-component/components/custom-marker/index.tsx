import React, {useCallback, useState} from 'react';
import {InfoWindow, Marker} from "@react-google-maps/api";

interface CustomMarkerProps {
    position: {
        lat: number; // Latitude for the marker's position
        lng: number; // Longitude for the marker's position
    };
    icon: any; // Icon for the marker (e.g., a URL or a custom SVG component)
    title: string; // Title for the marker, which appears on hover
    clusterer?: any; // Optional clusterer for grouping markers when zoomed out
}

const CustomMarker: React.FC<CustomMarkerProps> = ({position, icon, title, clusterer}) => {
    // State to manage the visibility of the InfoWindow
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    // useCallback to memoize the function that toggles InfoWindow visibility on marker click
    const handleMarkerClick = useCallback(() => {
        setInfoWindowShown((isShown) => !isShown); // Toggle the state
    }, []);

    // useCallback to memoize the function that closes the InfoWindow
    const handleClose = useCallback(() => {
        setInfoWindowShown(false); // Set state to false to close the InfoWindow
    }, []);

    return (
        <Marker
            position={position} // Marker position on the map
            onClick={handleMarkerClick} // Trigger InfoWindow toggle on marker click
            clusterer={clusterer} // Optional clustering functionality
            icon={icon} // Custom icon for the marker
            title={title} // Title shown on hover
        >
            {/* Conditional rendering of InfoWindow based on state */}
            {infoWindowShown && (
                <InfoWindow onCloseClick={handleClose}>
                    {/* Content of the InfoWindow, in this case, just the title */}
                    <span>{title}</span>
                </InfoWindow>
            )}
        </Marker>
    );
};

export default CustomMarker;
