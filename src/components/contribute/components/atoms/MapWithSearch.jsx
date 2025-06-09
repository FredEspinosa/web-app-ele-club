import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useState } from 'react';
import { geocodePlace } from '../../utils/location';

function SearchInput({ onPositionChange }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const map = useMap();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const coords = await geocodePlace(query);
      map.flyTo(coords, 14);
      onPositionChange(coords);
    } catch (err) {
      alert('Location not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1000,
      background: 'white',
      padding: '8px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
    }}>
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        style={{ padding: '6px', width: '200px', marginRight: '6px' }}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}

export default function MapWithSearch() {
  const [position, setPosition] = useState([19.4326, -99.1332]); // Mexico City

  return (
    <div style={{ height: 400, position: 'relative' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} />
        <SearchInput onPositionChange={setPosition} />
      </MapContainer>
    </div>
  );
}
