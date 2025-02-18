import Map from '../components/Map';
import { Button } from './ui/button';

interface MapModalProps {
    location?: SelectedLocation;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

interface SelectedLocation {
    address1: string;
    type: 'origin' | 'destination';
    lat: number;
    lon: number;
}

function MapModal({ location, isModalOpen, setIsModalOpen }: MapModalProps) {
    return (
        <div
            className={`${isModalOpen ? '' : 'hidden'
                } fixed flex flex-col items-center justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-2/4 bg-gray-900 z-50 rounded-lg`}
        >
            <p className='text-white text-xl text-start font-semibold pl-4 py-4'>
                Confirme la ubicación
            </p>
            <Map location={location} />
            <div className='w-5/6 h-1/6 flex justify-around items-center'>
                <Button variant='destructive' className='py-6 text-white w-1/2 m-2 h-1/2'>
                    Cambiar
                </Button>
                <Button
                    onClick={() => setIsModalOpen(false)}
                    className='bg-blue-500 py-6 text-white w-1/2 m-2 h-1/2'
                >
                    Confirmar
                </Button>
            </div>
        </div>
    );
}

export default MapModal;