import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useFormContext } from 'react-hook-form';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

export default function LocationPicker({ name }) {
  const { setValue } = useFormContext();
  const [position, setPosition] = useState([19.4326, -99.1332]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const pos = [e.latlng.lat, e.latlng.lng];
        setPosition(pos);
        setValue(name, pos);
      }
    });
    return <Marker position={position} />;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: 200, width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
}
