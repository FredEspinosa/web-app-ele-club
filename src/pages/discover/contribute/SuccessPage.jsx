import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button as MuiButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventsView from "@/components/discover/organisms/EventsView";
import ServiceView from "@/components/discover/organisms/ServiceView";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { offerTypeId } = useParams();

  // Obtenemos los datos del evento creado que pasamos desde la página de revisión
  const { createdOffer } = location.state || {};

  if (!createdOffer) {
    return <div>No hay información del evento creado.</div>;
  }

  // Adaptamos los datos al formato que esperan EventsView/ServiceView
  const formattedDataForPreview = {
    id: createdOffer.id,
    offerImage: createdOffer.formDataJson.EventImage || createdOffer.formDataJson.ServiceImage,
    offerTitle: createdOffer.title,
    offerLocationName: createdOffer.formDataJson.LocationName,
    offerDate: createdOffer.formDataJson.EventDate,
    offerTimeStart: createdOffer.formDataJson.EventTimeStart,
    // ... y así sucesivamente para las demás props que necesiten tus vistas
  };

  const isEvent = offerTypeId === OFFERS_TYPE_IDS.EVENTO;

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" component="h1" fontWeight="bold">
        ¡Evento enviado!
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Tu publicación ha sido enviada con éxito y está siendo revisada por nuestro equipo. Te notificaremos cuando sea aprobada.
      </Typography>

      <Typography variant="h6" align="left" fontWeight="bold">
        Previsualización
      </Typography>

      {/* Reutilizamos tus componentes de vista */}
      {isEvent ? (
        <EventsView data={{ evento: [formattedDataForPreview] }} />
      ) : (
        <ServiceView data={{ servicio: [formattedDataForPreview] }} />
      )}

      <MuiButton variant="outlined" fullWidth sx={{ mt: 3 }} onClick={() => navigate("/descubre")}>
        Ver mis eventos
      </MuiButton>
      <MuiButton variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => navigate(`/descubre/contribuir/${offerTypeId}`)}>
        + Crear otro evento
      </MuiButton>
    </Box>
  );
}
