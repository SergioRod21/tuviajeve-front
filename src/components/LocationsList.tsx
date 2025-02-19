
interface LocationsListProps {
  options: { address1: string, address2: string, lat: number, lon: number }[],
  isOrigin: boolean,
  setSelectedOrigin: (location: Location) => void,
  setSelectedDestination: (location: Location) => void,
  setMapData: (location: selectedLocation) => void;
}

interface Location {
  address1: string;
  lat: number;
  lon: number;
}

interface selectedLocation extends Location {
  type: 'origin' | 'destination';
}

function LocationsList({ options, isOrigin, setSelectedOrigin, setSelectedDestination, setMapData }: LocationsListProps) {

  const handleSelect = (location: Location) => {
    if (isOrigin) {
      setSelectedOrigin(location);
      setMapData({ ...location, type: 'origin' });
    } else {
      setSelectedDestination(location);
      setMapData({ ...location, type: 'destination' });

    }
  }

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
