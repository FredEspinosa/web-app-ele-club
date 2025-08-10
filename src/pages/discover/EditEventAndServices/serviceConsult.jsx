// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { DetailsHeader } from "@/components/discover/atoms";
import Button from "@/components/shared/atoms/Button";
import { DetailsTabsInfo } from "@/components/discover/molecules";
import { StyledDetailsActions, StyledPageContainer, StyledTopFiltersContainer } from "@/styles/discover/containers";
import ListCardEdit from "@/components/discover/molecules/ListCardEdit";
import useMyEventsAndServices from "@/hooks/discover/useMyEventsAndServices";
import { useNavigate } from "react-router-dom";

export default function EventAndServicesDetails({ categories}) {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // ID dinámico dependiendo de la pestaña
  const activeId = categories?.[activeTab]?.id || null;
  const activeName = categories?.[activeTab]?.name || "";

  // Consulta con el ID dinámico
  const { data, error, isLoading } = useMyEventsAndServices(activeId);

  const tabs = [
    {
      label: "Eventos",
      content: <> {Array.isArray(data) && data.length > 0 && <ListCardEdit data={data} activeId={activeId} activeName={activeName} /> } </>,
    },
    {
      label: "Servicios",
      content: <> {Array.isArray(data) && data.length > 0 && <ListCardEdit data={data} activeId={activeId} activeName={activeName} /> } </>,
    },
  ];

  const redirectAddOffert = () => {
    if (!activeId) {
      console.error("No hay ID en categories");
      return;
    }
    
    if (activeId === "Evento") {
      navigate(`/descubre/evento/${activeId}`);
    } else {
      navigate(`/descubre/servicio/${activeId}`);
    }
  };
 
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
        <StyledDetailsActions>
          <Button size="full" type="button" onClick={redirectAddOffert}>
            Agregar {activeTab === 0 ? "evento" : "servicio"}
          </Button>
        </StyledDetailsActions>
        <StyledTopFiltersContainer></StyledTopFiltersContainer>
      </StyledPageContainer>
    </>
  );
}
