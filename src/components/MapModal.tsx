import Map from '../components/Map';
import { Button } from './ui/button';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
interface MapModalProps {
    location: SelectedLocation;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    setChangedOrigin: Dispatch<SetStateAction<SelectedLocation | undefined>>;
    setChangedDestination: Dispatch<SetStateAction<SelectedLocation | undefined>>;
}

interface SelectedLocation {
    address1: string;
    type: 'origin' | 'destination';
    lat: number;
    lon: number;
}

function MapModal({ location, isModalOpen, setIsModalOpen, setChangedOrigin, setChangedDestination }: MapModalProps) {

    const [newLocation, setNewLocation] = useState<SelectedLocation>();
    const [changingLocation, setChangingLocation] = useState(false);

    const changeLocation = () => {
        setChangingLocation(true);
    }

    useEffect(() => {
        if (location) {
            setChangingLocation(false);
        }
    }, [isModalOpen])


    useEffect(() => {
        if (newLocation) {
            console.log("Ubicacion actualizada: ", newLocation);
        }
    }, [newLocation])

    return (
        <div
            className={`${isModalOpen ? '' : 'hidden'
                } fixed flex flex-col items-center justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-2/4 bg-gray-900 z-[50] rounded-lg pb-6 max-w-[65ch]`}
        >
            <p
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-2 text-white text-3xl font-semibold cursor-pointer"
            >
                &times;
            </p>
            <p className='text-white text-xl text-start font-semibold pl-4 py-4'>
                Confirme la ubicación
            </p>
            <Map location={location} changingLocation={changingLocation} setNewLocation={setNewLocation} />
            <div className={`w-5/6 h-1/6 flex ${changingLocation ? "flex-col" : ""} justify-around items-center`}>
                <p className={`${changingLocation ? "" : "hidden"}  text-white font-medium text-sm mt-2`}>Por favor, mueva el marcador a la ubicación deseada</p>
                <Button onClick={() => { changeLocation() }} variant='destructive' className={`${changingLocation ? 'hidden' : ""} py-6 text-white w-1/2 m-2 h-1/2`}>
                    Cambiar
                </Button>
                <Button
                    onClick={() => {
                        //Verificar si se está cambiando la ubicacion
                        if (changingLocation) {
                            if (newLocation?.type === 'origin') {
                                setChangedOrigin(newLocation);
                            }
                            if (newLocation?.type === 'destination') {
                                setChangedDestination(newLocation);
                            }
                        }
                        setIsModalOpen(false);
                    }}
                    className='bg-blue-500 py-6 text-white w-1/2 m-2 h-1/2'
                >
                    Confirmar
                </Button>
            </div>
        </div>
    );
}

export default MapModal;