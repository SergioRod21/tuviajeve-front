import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

import { Navigate, useNavigate } from 'react-router';

import LocationList from '@/components/LocationsList'
import Spinner from "./Spinner";
import { isPromise } from "util/types";

function QuoteForm() {

  const navigate = useNavigate();

  interface Location {
    address1: string;
    lat: number;
    lon: number;
  }

  const [origin, setOrigin] = useState("");
  const [originOptions, setOriginOptions] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState<Location>();
  const [selectedDestination, setSelectedDestination] = useState<Location>();

  const [consultingData, setConsultingData] = useState(false);

  const apikey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  var requestOptions = {
    method: "GET",
  };

  const getQuote = async () => {
    if (!selectedOrigin || !selectedDestination) return;
    await setConsultingData(true);
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
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apikey}`,
      requestOptions
    )
      .then((response) => response.json())
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
          <Button onClick={() => setSelectedOrigin(undefined)} className={`${selectedOrigin ? "flex" : "hidden"} items-center absolute right-0 top-0 h-full bg-slate-200 font-semibold text-slate-800 hover:text-slate-200 p-6 text-lg`}>
            X
          </Button>
        </div>
        <LocationList options={originOptions} isOrigin={true} setSelectedOrigin={setSelectedOrigin} setSelectedDestination={setSelectedDestination} />
      </div>
      <div className="bg-blue-500 w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-transfer text-white p-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 10h-16l5.5 -6" /><path d="M4 14h16l-5.5 6" /></svg>
      </div>
      <div className="flex flex-col w-5/6 items-center relative">
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
        <LocationList options={destinationOptions} isOrigin={false} setSelectedOrigin={setSelectedOrigin} setSelectedDestination={setSelectedDestination} />
      </div>
      <Button className="bg-blue-500 font-semibold text-white p-6 text-lg rounded-xl w-2/6" onClick={() => getQuote()}>
        {consultingData ? <Spinner /> : "Consultar"}
      </Button>
    </div>
  );
}

export default QuoteForm;
