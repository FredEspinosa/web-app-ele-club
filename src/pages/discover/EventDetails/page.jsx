import { AboutDetails, DiscoverInfo, EventGallery } from "@/components/discover/atoms";
import { DetailsTabsInfo, EventAssistants, EventLocation } from "@/components/discover/molecules";
import EventOrganizationInfo from "@/components/discover/molecules/EventOrganizationInfo";
import { useEventDetail } from "@/hooks/discover";
import useFixLeafletIcons from "@/hooks/discover/useFixLeafletIcons";
import { StyledDetailContainer, StyledDetailsActions, StyledDetailsEventContainer } from "@/styles/discover/containers";
import { StyledDetailTitle } from "@/styles/discover/texts";
// import { Button } from "@/styles/shared/slider";
import { dateTransform } from "@/utils/functions/discover";
import { Button } from "@/components/shared/atoms";
import useSendAssist from "@/hooks/discover/useSendAssist";
import { useState } from "react";
import ConfirmationModal from "@/components/bloqueos/organisms/ConfirmationModal";


export default function EventDetails() {
  const [showModal, setShowModal] = useState(false);
  const [textTitleModal, setTextTitleModal] = useState('');
  const [textBodyModal, setTextBodyModal] = useState('');
  const { sendAssist } = useSendAssist();
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
      content: <EventAssistants assistants={data.offerParticipants} />,
    },
    {
      label: "Ubicación",
      content: <EventLocation address={data.EventLocationName}/>,
    },
  ];

  const handleClick = async () => {
    try {
      const res = await sendAssist({ offerId: data.id });
      console.log('Asistencia enviada', res);
      if (res.isSuccess === true) {
        setShowModal(true);
        setTextTitleModal(<p style={{fontSize:'23px'}}>¡Confirmaste tu asistencia!</p>);
        setTextBodyModal(<p>Gracias por confirmar tu asistencia. No olvides la fecha del evento.</p>)
      }
    } catch (err) {
      console.error('Error al enviar asistencia', err);
      if (err.message === 'User already exists') {
        setShowModal(true);
        setTextTitleModal(<p style={{fontSize:'23px'}}>¡Asistencia ya confirmada!</p>);
        setTextBodyModal(<p>Gracias por confirmar tu asistencia.<br />No olvides la fecha del evento.</p>)
      }
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <EventGallery /*images={data?.images}*/ image={data?.EventImage ? data?.EventImage : "https://picsum.photos/200"} />
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
      <StyledDetailsActions>
        <Button size="full" type="button" variant="outlined">
          Contactar
        </Button>
        <Button size="full" type="button" onClick={handleClick}>
          Asistiré
        </Button>
      </StyledDetailsActions>
      {showModal && 
        <ConfirmationModal 
          isDynamic={true}
          textTitleModal={textTitleModal}
          textBodyModal={textBodyModal}
          onClose={handleCloseConfirmationModal}
        />
      }
    </>
  );
}
