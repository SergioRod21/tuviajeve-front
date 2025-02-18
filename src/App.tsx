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

  const [mapData, setMapData] = useState<SelectedLocation>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mapData) {
      setIsModalOpen(true);
    }
  }, [mapData]);

  return (
    <div className='w-full h-screen flex flex-col justify-between bg-gray-900 relative'>
      <Header />
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50'></div>
      )}
      <MapModal
        location={mapData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <QuoteForm setMapData={setMapData} />
      <Footer />
    </div>
  );
}

export default App;