// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { DetailsHeader } from "@/components/discover/atoms";
import Button from "@/components/shared/atoms/Button";
import { DetailsTabsInfo } from "@/components/discover/molecules";
import { StyledDetailsActions, StyledPageContainer, StyledTopFiltersContainer } from "@/styles/discover/containers";
import ListCardEdit from "@/components/discover/molecules/ListCardEdit";
import useMyEventsAndServices from "@/hooks/discover/useMyEventsAndServices";

export default function EventAndServicesDetails({ categories }) {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(0);

  // ID dinámico dependiendo de la pestaña
  const activeId = categories?.[activeTab]?.id || null;

  // Consulta con el ID dinámico
  const { data, error, isLoading } = useMyEventsAndServices(activeId);

  const tabs = [
    {
      label: "Eventos",
      content: <> {Array.isArray(data) && data.length > 0 && <ListCardEdit data={data} /> } </>,
    },
    {
      label: "Servicios",
      content: <> {Array.isArray(data) && data.length > 0 && <ListCardEdit data={data} /> } </>,
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
        <StyledDetailsActions>
          <Button size="full" type="button">
            Agregar {activeTab === 0 ? "evento" : "servicio"}
          </Button>
        </StyledDetailsActions>
        <StyledTopFiltersContainer></StyledTopFiltersContainer>
      </StyledPageContainer>
    </>
  );
}
