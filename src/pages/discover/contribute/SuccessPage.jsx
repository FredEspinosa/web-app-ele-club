import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button as MuiButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventsView from "@/components/discover/organisms/EventsView";
import ServiceView from "@/components/discover/organisms/ServiceView";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";
import { AddIcon, CheckboxCircleLine, EditIcon } from "@/assets/icons";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { offerTypeId } = useParams();
  const { createdOffer } = location.state || {};
  const isEvent = offerTypeId === OFFERS_TYPE_IDS.EVENTO;
  const isService = offerTypeId === OFFERS_TYPE_IDS.SERVICIO;
  console.log({ createdOffer });

  if (!createdOffer) {
    return <div>No hay información del evento creado.</div>;
  }

  const data = {
    evento: [
      {
        id: crypto.randomUUID(),
        offerImage: createdOffer.EventImage,
        offerTitle: createdOffer.EventTitle,
        offerLocationName: createdOffer.EventLocationName,
        offerDate: createdOffer.EventDate,
        offerTimeStart: createdOffer.EventTimeStart,
        participantCount: createdOffer.Count,
        distance: createdOffer.distance,
      },
    ],
    servicio: [
      {
        id: crypto.randomUUID(),
        offerTitle: createdOffer.ServiceTitle,
        offerImage: createdOffer.ServiceImage,
        offerCost: createdOffer.ServiceCost || createdOffer.ServicePrice,
        reviewRate: 0,
      },
    ],
  };

  return (
    //1
    <div style={{ backgroundColor: "#F0F0F0", color: "#343434", height: "100vh" }}>
      <Box padding={"24px"}>
        <Box
          backgroundColor="#FFF"
          borderRadius={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"23px"}
          padding={"24px 16px"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"center"}>
            <CheckboxCircleLine />
            <Typography fontSize={"24px"} fontWeight={700}>
              ¡{isEvent ? "Evento" : "Servicio"} Pagado!
            </Typography>
          </Box>
          <Typography textAlign={"center"} fontSize={"16px"} letterSpacing={".5px"}>
            Tu evento ha sido pagado exitosamente
            <br />
            y está siendo revisada por nuestro
            <br />
            equipo. Te aparecerá en tus Eventos
            <br />
            cuando sea aprobado.
          </Typography>

          <Typography variant="h6" align="left" fontWeight="bold">
            Previsualización
          </Typography>

          {isEvent && <Box sx={{pointerEvents:'none'}}><EventsView {...{ data }} /></Box> }

          {isService && (
            <Box sx={{ boxShadow: "0px 4px 11px 0px rgba(151, 151, 151, 0.25)", borderRadius:"16px", pointerEvents: 'none', }}>
              <ServiceView {...{ data }} />
            </Box>
          )}

          <Typography fontSize={"11px"} color={"#98989A"}>
            *Estará visible en la sección de {isEvent ? "eventos" : "servicios"} una vez aprobada
          </Typography>

          <button
            className="btn club_btn club_btn_full club_btn_borde_violeta"
            onClick={() => navigate("/descubre")}
            style={{ justifyContent: "center", gap: "8px" }}
          >
            <EditIcon />
            Ver mis {isEvent ? "eventos" : "servicios"}
          </button>
          <button
            className="btn club_btn club_btn_full club_bg_violeta_08"
            onClick={() => navigate(`/descubre/contribuir/${offerTypeId}`)}
            style={{ justifyContent: "center", gap: "8px" }}
          >
            <AddIcon />
            Crear otro {isEvent ? "evento" : "servicio"}
          </button>
        </Box>
      </Box>
    </div>
  );
}
