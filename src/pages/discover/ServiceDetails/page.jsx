import { AboutServices, DiscoverInfo, EventGallery } from "@/components/discover/atoms";
import { DetailsTabsInfo, EventLocation } from "@/components/discover/molecules";
import ContactInformation from "@/components/discover/molecules/ContactInformation";
import EventOrganizationInfo from "@/components/discover/molecules/EventOrganizationInfo";
import { ServiceDetailsReviews } from "@/components/discover/organisms";
import ServiceView from "@/components/discover/organisms/ServiceView";
import { Button } from "@/components/shared/atoms";
import useServiceDetail from "@/hooks/discover/useServiceDetail";
import {
  StyledDetailContainer,
  StyledDetailsActions,
  StyledDetailsEventContainer,
  StyledDetailsRateContainer,
} from "@/styles/discover/containers";
import { StyledDetailOwnerLabel, StyledDetailTitle } from "@/styles/discover/texts";
import { Rating } from "@mui/material";

export default function ServiceDetails() {
  const { data, error, isLoading } = useServiceDetail();
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los detalles del servicio.</div>;
  console.log("data pages", data);

  const tabs = [
    {
      label: "Información",
      content: (
        <>
          <AboutServices description={data?.ServiceAbout || "Descripción no disponible."} checks={[data?.ServiceIncludes]} />
          <ServiceView data={data} />
        </>
      ),
    },
    {
      label: "Reseña",
      content: <ServiceDetailsReviews data={data} />,
      // content: <ServiceDetailsReviews />,
    },
    {
      label: "Contacto",
      content: <ContactInformation data={data} />,
      // content: <EventLocation address={data.ServiceLocationName} mapLocation={data.mapLocation} />,
    },
  ];

  const handleCall = () => {
    window.location.href = `tel:${data.ServicePhoneNumber}`;
  };

  const handleWhatsApp = () => {
    // 👇 importante: WhatsApp usa número internacional, sin "+" ni espacios
    const phone = data.ServicePhoneNumber.replace(/\D/g, ""); 
    const message = "Hola, quiero más información sobre el evento";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <EventGallery image={data?.ServiceImage ? data?.ServiceImage : "https://picsum.photos/200"} />
      <StyledDetailContainer>
        <StyledDetailTitle>{data?.ServiceTitle}</StyledDetailTitle>
        <StyledDetailsRateContainer>
          {/* <Rating name="read-only" value={data?.reviews[0] || 3.6} precision={0.5} readOnly />
          <p style={{ margin: 0, fontSize: "12px" }}>{data?.reviews[0] || 3.6}</p> */}
          <Rating name="read-only" value={data?.reviews?.[0]?.rating || 3.6} precision={0.5} readOnly style={{color:'#FFD942'}} />
          <p style={{ margin: 0, fontSize: "12px" }}>{data?.reviews?.[0]?.rating || 3.6}</p>
          <StyledDetailOwnerLabel>{data?.reviews?.length || 2} reseñas</StyledDetailOwnerLabel>
        </StyledDetailsRateContainer>
        <StyledDetailsEventContainer $width="fit-content">
          <DiscoverInfo icon={"location"}>{data?.LocationName ? data?.LocationName : data?.ServiceLocationName}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <StyledDetailsEventContainer $width="fit-content">
          <DiscoverInfo icon={"money"}>{data?.ServicePrice || 0}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <EventOrganizationInfo name={data?.companyName} profileImage={""} subtitle="Empresa" button={false} />
        <DetailsTabsInfo tabs={tabs} />
      </StyledDetailContainer>
      <StyledDetailsActions>
        <Button size="full" type="button" variant="outlined" onClick={handleCall} >
          Llamar
        </Button>
        <Button size="full" type="button" onClick={handleWhatsApp} >
          WhatsApp
        </Button>
      </StyledDetailsActions>
    </>
  );
}
