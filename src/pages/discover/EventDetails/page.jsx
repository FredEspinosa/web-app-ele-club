import { AboutDetails, DiscoverInfo, EventGallery } from '@/components/discover/atoms';
import { DetailsTabsInfo, EventAssistants, EventLocation } from '@/components/discover/molecules';
import EventOrganizationInfo from '@/components/discover/molecules/EventOrganizationInfo';
import { useEventDetail } from '@/hooks/discover';
import useFixLeafletIcons from '@/hooks/discover/useFixLeafletIcons';
import {
  StyledDetailContainer,
  StyledDetailsActions,
  StyledDetailsEventContainer,
} from '@/styles/discover/containers';
import { StyledDetailTitle } from '@/styles/discover/texts';
import { Button } from '@/styles/shared/slider';

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
        <EventLocation />
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
      <StyledDetailsActions elevation={40}>
        <Button type='button' variant='outlined'>Contactar</Button>
        <Button type='button'>Asistiré</Button>
      </StyledDetailsActions>
    </>
  );
}
