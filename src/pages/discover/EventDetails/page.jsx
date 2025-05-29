import { AboutDetails, DiscoverInfo, EventGallery } from '@/components/discover/atoms';
import { DetailsTabsInfo, EventAssistants } from '@/components/discover/molecules';
import EventOrganizationInfo from '@/components/discover/molecules/EventOrganizationInfo';
import { useEventDetail } from '@/hooks/discover';
import useFixLeafletIcons from '@/hooks/discover/useFixLeafletIcons';
import {
  StyledDetailContainer,
  StyledDetailsEventContainer,
} from '@/styles/discover/containers';
import { StyledDetailTitle } from '@/styles/discover/texts';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function EventDetails() {
  const { data, error, isLoading } = useEventDetail();
  useFixLeafletIcons();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const tabs = [
    {
      label: 'Información',
      content: (
          <AboutDetails about={[data.about]} />
      ),
    },
    {
      label: 'Asistentes',
      content: <EventAssistants />,
    },
    {
      label: 'Ubicación',
      content: (
        <MapContainer
          center={[19.4326, -99.1332]}
          zoom={13}
          style={{ height: '181px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[19.4326, -99.1332]}>
            <Popup>¡Hola desde la CDMX!</Popup>
          </Marker>
        </MapContainer>
      ),
    },
  ];

  return (
    <>
      <EventGallery images={data.images} />
      <StyledDetailContainer>
        <StyledDetailTitle>{data.title}</StyledDetailTitle>
        <StyledDetailsEventContainer $width='fit-content'>
          <DiscoverInfo icon={'calendar'}>{data.date}</DiscoverInfo>
          {data.start && (
            <DiscoverInfo icon={'clock'}>{data.start}</DiscoverInfo>
          )}
          <DiscoverInfo icon={'location'}>{data.location}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <StyledDetailsEventContainer $width='fit-content'>
          <DiscoverInfo icon={'money'}>{data.amount}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <EventOrganizationInfo
          name={data.owner}
          profileImage={data.images[0]}
        />
        <DetailsTabsInfo tabs={tabs} />
      </StyledDetailContainer>
    </>
  );
}
