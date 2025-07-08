import { AboutDetails, DiscoverInfo, EventGallery } from "@/components/discover/atoms";
import { DetailsTabsInfo, EventAssistants, EventLocation } from "@/components/discover/molecules";
import EventOrganizationInfo from "@/components/discover/molecules/EventOrganizationInfo";
import { useEventDetail } from "@/hooks/discover";
import useFixLeafletIcons from "@/hooks/discover/useFixLeafletIcons";
import { StyledDetailContainer, StyledDetailsActions, StyledDetailsEventContainer } from "@/styles/discover/containers";
import { StyledDetailTitle } from "@/styles/discover/texts";
import { Button } from "@/styles/shared/slider";
import { dateTransform } from "@/utils/functions/discover";

export default function EventDetails() {
  const { data, error, isLoading } = useEventDetail();
  useFixLeafletIcons();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const tabs = [
    {
      label: "Información",
      content: <AboutDetails about={[data.EventAbout]} />,
    },
    {
      label: "Asistentes",
      content: <EventAssistants assistants={data.eventParticipants} />,
    },
    {
      label: "Ubicación",
      content: <EventLocation />,
    },
  ];

  return (
    <>
      <EventGallery /*images={data?.images}*/ image={"https://picsum.photos/200"} />
      <StyledDetailContainer>
        <StyledDetailTitle>{data?.EventTitle}</StyledDetailTitle>
        <StyledDetailsEventContainer $width="fit-content">
          <DiscoverInfo icon={"calendar"}>{dateTransform(data?.EventDate)}</DiscoverInfo>
          {data?.EventTimeStart && <DiscoverInfo icon={"clock"}>{data?.EventTimeStart}</DiscoverInfo>}
          <DiscoverInfo icon={"location"}>{data?.LocationName}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <StyledDetailsEventContainer $width="fit-content">
          <DiscoverInfo icon={"money"}>{data?.EventCost}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <EventOrganizationInfo name={data?.owner || "Anónimo"} profileImage={data?.images} />
        <DetailsTabsInfo tabs={tabs} />
      </StyledDetailContainer>
      <StyledDetailsActions elevation={40}>
        <Button type="button" variant="outlined">
          Contactar
        </Button>
        <Button type="button">Asistiré</Button>
      </StyledDetailsActions>
    </>
  );
}
