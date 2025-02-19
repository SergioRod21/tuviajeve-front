import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState, useMemo, Dispatch, SetStateAction } from 'react';

interface Location {
    address1: string;
    type: 'origin' | 'destination';
    lat: number;
    lon: number;
}

interface MapProps {
    location: Location;
    changingLocation: boolean;
    setNewLocation: Dispatch<SetStateAction<Location | undefined>>
}





function UpdateMapCenter({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.invalidateSize(); // Forza una actualización del mapa
        map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
}






export default function Map({ location, changingLocation, setNewLocation }: MapProps) {
    const center: [number, number] = location ? [location.lat, location.lon] : [0, 0];
    const [position, setPosition] = useState(center);
    const markerRef = useRef<L.Marker>(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const { lat, lng } = marker.getLatLng();
                    setPosition([lat, lng]);
                }
            },
        }),
        [],
    )

    useEffect(() => {
        setPosition(center);
    }, [location])


    useEffect(() => {
        if (changingLocation) {
            setNewLocation({ address1: "Nueva ubicacion seleccionada", type: location?.type ?? 'origin', lat: position[0], lon: position[1] });
        }
    }, [position]);



    return (
        <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "80%", width: "90%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <UpdateMapCenter center={position} />
            {location && (
                <Marker
                    draggable={changingLocation}
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                    position={position}>
                    <Popup>
                        {location.address1} <br /> ({location.type})
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
}