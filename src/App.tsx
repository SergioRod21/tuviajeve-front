import './App.css';
import Header from './components/Header';
import QuoteForm from './components/QuoteForm';
import Footer from './components/Footer';
import MapModal from './components/MapModal';
import { useState, useEffect } from 'react';

function App() {
  interface SelectedLocation {
    address1: string;
    type: 'origin' | 'destination';
    lat: number;
    lon: number;
  }

  const [mapData, setMapData] = useState<SelectedLocation>({ address1: '', type: 'origin', lat: 0, lon: 0 });
  const [changedOrigin, setChangedOrigin] = useState<SelectedLocation>();
  const [changedDestination, setChangedDestination] = useState<SelectedLocation>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mapData && mapData.lat !== 0 && mapData.lon !== 0) {
      setIsModalOpen(true);
    }
  }, [mapData]);

  useEffect(() => {
    console.log("Origen modificado: ", changedOrigin);
  }, [changedOrigin])

  useEffect(() => {
    console.log("Destino modificado: ", changedDestination);
  }, [changedDestination])

  return (
    <div className='w-full h-screen flex flex-col justify-between items-center bg-gray-900 relative'>
      <Header />
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50'></div>
      )}
      <MapModal
        location={mapData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setChangedOrigin={setChangedOrigin}
        setChangedDestination={setChangedDestination}
      />
      <QuoteForm setMapData={setMapData} changedOrigin={changedOrigin} changedDestination={changedDestination} />
      <Footer />
    </div>
  );
}

export default App;