import {
  StyledButtonHowToGoContainer,
  StyledDetailsDirectioncontainer,
} from '@/styles/discover/containers';
import {
  StyledDetailsDistance,
  StyledDetailTitle,
} from '@/styles/discover/texts';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import DiscoverInfo from '../atoms/discover_info';
import Button from '../../shared/atoms/Button';

export default function EventLocation({address, mapLocation }) {
  return (
    <>
      <StyledDetailTitle $size={16}>Ubicación del evento</StyledDetailTitle>
      <MapContainer
        // center={[19.4326, -99.1332]}
        center={ mapLocation ? [mapLocation?.[0], mapLocation?.[1]] : [19.4326, -99.1332] }
        zoom={13}
        style={{ height: '181px', width: '100%', marginTop: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* <Marker position={[19.4326, -99.1332]}> */}
        <Marker position={ mapLocation ? [mapLocation?.[0], mapLocation?.[1]] : [19.4326, -99.1332] }>
          <Popup>¡Hola desde la CDMX!</Popup>
        </Marker>
      </MapContainer>
      <StyledDetailsDirectioncontainer>
        <StyledDetailTitle $size={16}>Dirección</StyledDetailTitle>
        <StyledDetailsDistance>2.2km de distancia</StyledDetailsDistance>
      </StyledDetailsDirectioncontainer>
      <DiscoverInfo icon={'location'}>
        {address}
      </DiscoverInfo>
      <StyledButtonHowToGoContainer>
        <Button shape='pill' variant='outlined' padding='4px 45px'>
          Cómo llegar
        </Button>
      </StyledButtonHowToGoContainer>
    </>
  );
}
