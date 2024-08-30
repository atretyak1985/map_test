import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {Point} from 'map/app/types';

interface MapProps {
    center: {
        lat: number;
        lng: number;
    };
    points: Point[];
    hoveredMarkerId: string | null;
    clickedMarkerId: string | null;
    handleBoundsChanged: () => void;
    handleMapLoad: (map: google.maps.Map | null) => void;
}

const Map: React.FC<MapProps> = ({
                                     center,
                                     points,
                                     hoveredMarkerId,
                                     clickedMarkerId,
                                     handleBoundsChanged,
                                     handleMapLoad
                                 }) => {
    const [googleLoaded, setGoogleLoaded] = useState(false);

    const handleApiLoaded = () => {
        setGoogleLoaded(true);
    };

    const getMarkerSize = (id: string) => {
        if (clickedMarkerId === id) {
            return new google.maps.Size(48, 48);
        } else if (hoveredMarkerId === id) {
            return new google.maps.Size(36, 36);
        } else {
            return new google.maps.Size(24, 24);
        }
    };

    return (
        <div
            className="w-[436px] h-[750px] relative bg-zinc-500 rounded-3xl shadow border
            border-neutral-200 overflow-hidden">
            <LoadScript googleMapsApiKey="AIzaSyB2LScKwxDcryYSGkA22w26b7oEfUBIYpE" onLoad={handleApiLoaded}>
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={center}
                    zoom={10}
                    onBoundsChanged={handleBoundsChanged}
                    onLoad={handleMapLoad}
                >
                    {googleLoaded && points.map((point) => (
                        <Marker
                            key={point._id}
                            position={{lat: point.location.lat, lng: point.location.lng}}
                            icon={{
                                url: point.category?.icon || '',
                                scaledSize: getMarkerSize(point._id),
                                fillColor: clickedMarkerId === point._id ? 'green' : hoveredMarkerId === point._id ? 'blue' : 'red',
                                fillOpacity: 1,
                                strokeWeight: 2,
                                strokeColor: 'white',
                            }}
                            title={point.title}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
