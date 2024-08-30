import React, {useCallback, useState} from 'react';
import {InfoWindow, Marker} from "@react-google-maps/api";

interface CustomMarkerProps {
    position: {
        lat: number;
        lng: number;
    };
    icon: any;
    title: string;
    clusterer?: any;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({position, icon, title, clusterer}) => {
    const [infoWindowShown, setInfoWindowShown] = useState(false); // Handle marker click to toggle InfoWindow visibility
    const handleMarkerClick = useCallback(() => {
        setInfoWindowShown((isShown) => !isShown);
    }, []);
// Handle close event to synchronize state
    const handleClose = useCallback(() => {
        setInfoWindowShown(false);
    }, []);

    return (
        <Marker
            position={position}
            onClick={handleMarkerClick}
            clusterer={clusterer}
            icon={icon}
            title={title}
        >
            {infoWindowShown && <InfoWindow onCloseClick={handleClose}>
                <span>title</span>
            </InfoWindow>}
        </Marker>
    );
};

export default CustomMarker;
