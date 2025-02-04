import { useState, useEffect } from "react";

interface LocationsListProps {
  options: { address1: string , address2: string, lat: number, lon: number}[],
  isOrigin: boolean,
  setSelectedOrigin: (location: Location) => void,
  setSelectedDestination: (location: Location) => void,
}

interface Location {
  address1: string;
  lat: number;
  lon: number;
}

function LocationsList({ options, isOrigin, setSelectedOrigin, setSelectedDestination }: LocationsListProps) {
 
  const handleSelect = (location: Location) => {
    if (isOrigin) {
      setSelectedOrigin(location);
    } else {
      setSelectedDestination(location);
    }
  }

  useEffect(() => {
    console.log("Opciones: ", options);
  }, [options]);

  return (
    <div className={`w-full bg-white rounded-md mt-[4px] shadow-2xl z-10 absolute top-full ${options.length > 0 ? "block" : "hidden"}`}>
      <ul>
        {options.map((item) => {
          return (
            <li className="border-b-[0.1px] border-black p-4 cursor-pointer" onClick={() => handleSelect(item)}>
              {item.address1}
              <p className="text-sm text-gray-700">{item.address2}</p>
            </li>
          );
          })
        }
      </ul>
    </div>
  );
}

export default LocationsList;
