import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface MapProps {
    location?: {
        address1: string;
        type: 'origin' | 'destination';
        lat: number;
        lon: number;
    };
}

function UpdateMapCenter({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.invalidateSize(); // Forza una actualización del mapa
        map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
}

export default function Map({ location }: MapProps) {
    const center: [number, number] = location ? [location.lat, location.lon] : [0, 0];

    return (
        <MapContainer
            center={center}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "80%", width: "90%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <UpdateMapCenter center={center} />
            {location && (
                <Marker position={[location.lat, location.lon]}>
                    <Popup>
                        {location.address1} <br /> ({location.type})
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
}