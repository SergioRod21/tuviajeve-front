import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LocationList from '@/components/LocationsList'

import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from 'react-router';
import Spinner from "./Spinner";
import MapModal from "./MapModal";



interface Location {
  address1: string;
  type: 'origin' | 'destination';
  lat: number;
  lon: number;
}


interface QuoteFormProps {
  setMapData: (location: Location) => void;
}

function QuoteForm({ setMapData }: QuoteFormProps) {

  const navigate = useNavigate();

  interface Location {
    address1: string;
    lat: number;
    lon: number;
  }

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [origin, setOrigin] = useState("");
  const [originOptions, setOriginOptions] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState<Location>();
  const [selectedDestination, setSelectedDestination] = useState<Location>();

  const [consultingData, setConsultingData] = useState(false);




  const getQuote = async () => {
    if (!selectedOrigin || !selectedDestination) return;
    await setConsultingData(true);
    console.log("selectedOrigin: ", selectedOrigin);
    console.log("selectedDestination: ", selectedDestination);
    const response = await fetch(`http://localhost:3000/api/quotation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: {
          lat: selectedOrigin?.lat,
          lon: selectedOrigin?.lon,
        },
        destination: {
          lat: selectedDestination?.lat,
          lon: selectedDestination?.lon,
        },
      })
    });
    const data = await response.json();
    await setConsultingData(false);
    await navigate('/trip', { state: { tripData: data } });
  }
  const getAutocomplete = (text: string, isOrigin: boolean) => {
    if (text === "") return;

    fetch(`http://localhost:3000/api/autocompletation`, {
      method: "POST", // Cambiado a POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (!result.features) return;

        const newOptions = result.features.map(
          (item: {
            properties: {
              address_line1: string;
              address_line2: string;
              lat: number;
              lon: number;
            };
          }) => ({
            address1: item.properties.address_line1,
            address2: item.properties.address_line2,
            lat: item.properties.lat,
            lon: item.properties.lon,
          })
        );

        isOrigin ? setOriginOptions(newOptions) : setDestinationOptions(newOptions);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (!selectedOrigin) {
      const getData = setTimeout(() => {
        getAutocomplete(origin, true);
      }, 400);

      return () => clearTimeout(getData);
    }
  }, [origin]);

  useEffect(() => {
    if (!selectedDestination) {
      const getData = setTimeout(() => {
        getAutocomplete(destination, false);
      }, 400);

      return () => clearTimeout(getData);
    }
  }, [destination]);

  useEffect(() => {
    selectedOrigin ? setOrigin(`${selectedOrigin.address1}`) : setOrigin("");
    setOriginOptions([]);
  }, [selectedOrigin])

  useEffect(() => {
    selectedDestination ? setDestination(`${selectedDestination.address1}`) : setDestination("");
    setDestinationOptions([]);
  }, [selectedDestination])

  useEffect(() => {
    if (currentLocation) {
      setSelectedOrigin(currentLocation);
      setOrigin(currentLocation.address1);
    }
  }, [currentLocation]);


  const switchLocations = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setOrigin(selectedDestination?.address1 || "");
    setSelectedDestination(temp);
    setDestination(temp?.address1 || "");
  }


  const fetchCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        address1: "Ubicación actual",
      };
      setCurrentLocation(location);
      setMapData({ ...location, type: 'origin' });
      console.log("location", location);
    }, (error) => {
      console.error("Error getting current location", error);
    });
  }



  return (
    <div className="absolute top-1/3 flex flex-col justify-start gap-y-8 items-center h-3/6 w-full">
      <div className="flex flex-col w-5/6 items-center relative">
        <Label className="self-start mb-2 text-white text-lg">
          Punto de Salida
        </Label>
        <div className="relative w-full">
          <Input
            placeholder="Seleccione una ubicación"
            className="bg-white w-full py-6 pr-12"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            disabled={!!selectedOrigin}
          />
          <Button onClick={() => { fetchCurrentLocation() }} className={`${currentLocation || selectedOrigin ? "hidden" : ""} items-center absolute right-0 top-0 h-full bg-blue-500 font-semibold text-slate-200 p-6 text-xl`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 icon icon-tabler icons-tabler-filled icon-tabler-current-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1a1 1 0 0 1 1 1v1.055a9.004 9.004 0 0 1 7.946 7.945h1.054a1 1 0 0 1 0 2h-1.055a9.004 9.004 0 0 1 -7.944 7.945l-.001 1.055a1 1 0 0 1 -2 0v-1.055a9.004 9.004 0 0 1 -7.945 -7.944l-1.055 -.001a1 1 0 0 1 0 -2h1.055a9.004 9.004 0 0 1 7.945 -7.945v-1.055a1 1 0 0 1 1 -1m0 4a7 7 0 1 0 0 14a7 7 0 0 0 0 -14m0 3a4 4 0 1 1 -4 4l.005 -.2a4 4 0 0 1 3.995 -3.8" /></svg>
          </Button>
          <Button onClick={() => setSelectedOrigin(undefined)} className={`${selectedOrigin ? "flex" : "hidden"} items-center absolute right-0 top-0 h-full bg-slate-200 font-semibold text-slate-800 hover:text-slate-200 p-6 text-lg`}>
            X
          </Button>
        </div>
        <LocationList options={originOptions} isOrigin={true} setMapData={setMapData} setSelectedOrigin={setSelectedOrigin} setSelectedDestination={setSelectedDestination} />
      </div>
      {/* Switch Location Button */}
      <div onClick={() => { switchLocations() }} className="bg-blue-500 w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-transfer text-white p-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 10h-16l5.5 -6" /><path d="M4 14h16l-5.5 6" /></svg>
      </div>
      <div className="flex flex-col w-5/6 items-center relative -mt-6">
        <Label className="self-start mb-2 text-white text-lg">
          Punto de Llegada
        </Label>
        <div className="relative w-full">
          <Input
            placeholder="Seleccione una ubicación"
            className="bg-white w-full py-6"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            disabled={!!selectedDestination}
          />
          <Button onClick={() => setSelectedDestination(undefined)} className={`${selectedDestination ? "flex" : "hidden"} items-center absolute right-0 top-0 h-full bg-slate-200 font-semibold text-slate-800 hover:text-slate-200 p-6 text-lg`}>
            X
          </Button>
        </div>
        <LocationList options={destinationOptions} setMapData={setMapData} isOrigin={false} setSelectedOrigin={setSelectedOrigin} setSelectedDestination={setSelectedDestination} />
      </div>
      <Button className="bg-blue-500 font-semibold text-white p-6 text-lg rounded-xl w-2/6" onClick={() => getQuote()}>
        {consultingData ? <Spinner /> : "Consultar"}
      </Button>
    </div>
  );
}

export default QuoteForm;
