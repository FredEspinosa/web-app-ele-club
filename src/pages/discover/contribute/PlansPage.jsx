import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";
import ModalHeader from "@/components/bloqueos/atoms/ModalHeader";
import { CrownIcon, CheckIconDos, DiscoverAwardIcon, DiscoverGroupIcon, DiscoverCustomerIcon } from "@/assets/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FreePlanCard from "./FreePlanCard";
import PayPlanCard from "./PayPlanCard";

const basicPlanList = [
  { text: "Funciones básicas de la app", icon: <CheckIconDos /> },
  { text: "Información de eventos y servicios", icon: <CheckIconDos /> },
  { text: "Mensajería básica", icon: <CheckIconDos /> },
];

const premiumPlanList = [
  { text: "Todo lo del plan básico", icon: <CheckIconDos /> },
  { text: "Perfil destacado", icon: <DiscoverAwardIcon /> },
  { text: "Super likes ilimitados", icon: <DiscoverGroupIcon /> },
  { text: "Soporte prioritario", icon: <DiscoverCustomerIcon /> },
];

const PlansContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
  color: #343434;
  background-color: #f0f0f0;
`;

export default function PlansPage() {
  const { offerTypeId } = useParams();
  const navigate = useNavigate();

  // Estado para saber qué plan secundario está seleccionado (Evento o Servicio)
  const [selectedSubPlan, setSelectedSubPlan] = useState(offerTypeId);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const isEvent = offerTypeId === OFFERS_TYPE_IDS.EVENTO;
  const isService = offerTypeId === OFFERS_TYPE_IDS.SERVICIO;

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    console.log(`Iniciando pago para el plan: ${selectedSubPlan}`);
    // --- LÓGICA DE PAGO (STRIPE / APPLE PAY) IRÍA AQUÍ ---
    // 1. Llamar a tu backend para crear una "intención de pago".
    // 2. Usar la respuesta para abrir el modal de pago de Stripe/Apple Pay.
    // 3. Esperar la confirmación del pago.
    // Simulamos un pago exitoso después de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessingPayment(false);

    // 4. Si el pago es exitoso, redirigir al formulario de contribución.
    console.log("Pago exitoso. Redirigiendo al formulario...");
    navigate(`/descubre/contribuir/${selectedSubPlan}`);
  };

  const onCancel = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/descubre");
    }
  };

  const handleSuscribe = () => {
    console.log("Suscribirse al plan seleccionado:", selectedSubPlan);
    navigate("/suscripcion");
  };

  return (
    <PlansContainer>
      <ModalHeader width={"100%"} onCancel={onCancel} marginBottom={"0px"} iconHeight={20} iconWidth={20} />
      <Box textAlign="center" alignItems={"center"} display={"flex"} flexDirection="column" gap={2}>
        <CrownIcon />
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: "24px",
          }}
        >
          Desbloquea todo <br /> el potencial de Helena
        </Typography>
        <Typography>
          Accede a eventos ilimitados, servicios
          <br /> premium y funciones exclusivas
        </Typography>
      </Box>

      <Swiper
        // Añade módulos como la paginación
        modules={[Pagination]}
        // Espacio entre slides
        spaceBetween={20}
        // Cuántos slides se ven a la vez (ideal para mostrar un poco del siguiente)
        slidesPerView={1.1}
        // Centra el slide activo
        centeredSlides={true}
        // Activa la paginación con puntos
        pagination={{ clickable: true }}
        style={{ width: "100%", maxWidth: "400px", paddingBottom: "30px" }}
      >
        <SwiperSlide>
          <FreePlanCard
            planList={basicPlanList}
            selectedSubPlan={selectedSubPlan}
            setSelectedSubPlan={setSelectedSubPlan}
            OFFERS_TYPE_IDS={OFFERS_TYPE_IDS}
          />
        </SwiperSlide>
        <SwiperSlide>
          {/* Por ahora es una copia, aquí pondrías la tarjeta del plan "Premium" */}
          <PayPlanCard basicPlanList={premiumPlanList} />
        </SwiperSlide>
      </Swiper>

      <button className="btn club_btn club_btn_full club_bg_oro" onClick={handlePayment} disabled={isProcessingPayment}>
        {isProcessingPayment
          ? "Procesando..."
          : `Pagar $${selectedSubPlan === OFFERS_TYPE_IDS.EVENTO ? "50.00 por evento" : "150.00 por servicio"}`}
      </button>

      <button
        className="btn club_btn club_btn_full club_btn_borde_oro_lyrics"
        onClick={handleSuscribe}
        disabled={isProcessingPayment}
      >
        Contratar premium
        <CrownIcon width={24} height={24} />
      </button>

      <Typography variant="caption" textAlign="center" mt={2}>
        El pago es auto-renovado y te da acceso a estar visible en Evento o Servicio en la app de HelenaSafica®.
      </Typography>
    </PlansContainer>
  );
}
