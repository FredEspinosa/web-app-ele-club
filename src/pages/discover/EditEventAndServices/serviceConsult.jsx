// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { DetailsHeader } from "@/components/discover/atoms";
import Button from "@/components/shared/atoms/Button";
import { DetailsTabsInfo } from "@/components/discover/molecules";
import { StyledDetailsActions, StyledPageContainer, StyledTopFiltersContainer } from "@/styles/discover/containers";
import ListCardEdit from "@/components/discover/molecules/ListCardEdit";
import useMyEventsAndServices from "@/hooks/discover/useMyEventsAndServices";
import { useNavigate } from "react-router-dom";
import { useHomeFilters } from "@/hooks/discover";
import { useGoToPlans } from "@/hooks/discover/useGoToPlans";

export default function EventAndServicesDetails({ categories }) {
  console.log("consulta servicio de ofertas");
  
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(0);

  // ID dinámico dependiendo de la pestaña
  const activeId = categories?.[activeTab]?.id || null;
  const activeName = categories?.[activeTab]?.name || "";

  // Consulta con el ID dinámico
  const { data, error, isLoading } = useMyEventsAndServices(activeId);
  const goToPlans = useGoToPlans(activeId.categoryValue);
  const { data: eventos } = useMyEventsAndServices(categories[0]?.id);
  const { data: servicios } = useMyEventsAndServices(categories[1]?.id);

  const tabs = [
    { 
      label: "Eventos", 
      content: <> {Array.isArray(data) && data.length > 0 && <ListCardEdit data={eventos} activeId={activeId} activeName={activeName} /> } </>,
    },
    { 
      label: "Servicios", 
      content: <> {Array.isArray(data) && data.length > 0 && <ListCardEdit data={servicios} activeId={activeId} activeName={activeName} /> } </>,
    },
  ];

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los detalles.</div>;

  return (
    <>
      <DetailsHeader />
      <StyledPageContainer style={{ paddingTop: "16px" }}>
        <DetailsTabsInfo
          tabs={tabs}
          onTabChange={(index) => setActiveTab(index)} // 👈 Aquí capturamos el cambio de pestaña
        />
        <StyledDetailsActions style={{display: "block"}}>
          <Button size="full" type="button" onClick={goToPlans}>
            Agregar {activeTab === 0 ? "evento" : "servicio"}
          </Button>
        </StyledDetailsActions>
        <StyledTopFiltersContainer></StyledTopFiltersContainer>
      </StyledPageContainer>
    </>
  );
}
