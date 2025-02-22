import Footer from "@/components/Footer"
import { useLocation, useNavigate } from "react-router"
import CollapsibleTable from "@/components/QuotesTable"
import { useState, useEffect } from 'react'

function Trip() {
    const navigate = useNavigate();
    const location = useLocation()
    const tripData: { name: string, quotation: { [key: string]: { services: { name: string, price: number }[] } } }[] = location.state.tripData
    const [selectedVehicle, setSelectedVehicle] = useState('Automovil');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const VehicleSwitch = () => {
        return (
            <div className="flex justify-center items-center">
                <button onClick={() => setSelectedVehicle('Automovil')} className={`text-black py-2 px-4 ${selectedVehicle === 'Automovil' ? 'bg-blue-500' : 'bg-white'} rounded-l-lg`}>Carro</button>
                <button onClick={() => setSelectedVehicle('Moto')} className={`text-black py-2 px-4 ${selectedVehicle === 'Moto' ? 'bg-blue-500' : 'bg-white'} rounded-r-lg`}>Moto</button>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center bg-gray-900 relative">
                <div onClick={() => navigate("/")} className="bg-blue-500 flex justify-center items-center h-6 w-6 relative rounded-2xl top-6 -left-[40%] cursor-pointer mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 14l-4 -4l4 -4" /><path d="M5 10h11a4 4 0 1 1 0 8h-1" /></svg>
                </div>
                <div className="self-center mt-12 flex flex-col">
                    <div className="self-start pl-8">
                        <VehicleSwitch />
                    </div>
                    <CollapsibleTable tripdata={tripData} selectedVehicle={selectedVehicle} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Trip