import React, { useState } from "react";
import { Categories } from "../../components/discover/molecules";
import { StyledPageContainer, StyledTopFiltersContainer } from "../../styles/discover/containers";
import { useHomeFilters } from "@/hooks/discover";
import { AllView } from "@/components/discover/organisms";
import { SearchInput } from "@/components/discover/atoms";
import Button from "@/components/shared/atoms/Button";
import { WorldIcon, PlusIcon, ListIcon } from "@/assets/icons";
import EventsView from "@/components/discover/organisms/EventsView";
import ServiceView from "@/components/discover/organisms/ServiceView";
import NavBar from "@/components/nav_bar/navBar";
import { TopBarClub } from "@/components/top_bar/topBarClub";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";
import SubCategoryFilters from "@/components/discover/molecules/SubCategoryFilters";
// import { useGoToContribuir } from "@/hooks/discover/useGoToContribuir";
import { useGoToPlans } from "@/hooks/discover/useGoToPlans";
import MapWithCluster from "@/components/contribute/components/molecules/MapWithCluster";

export default function Discover() {
  const { data, handleSetValue, values } = useHomeFilters();
  //   const goToContribuir = useGoToContribuir(values.categoryValue);
  const goToPlans = useGoToPlans(values.categoryValue);

  const [viewMode, setViewMode] = useState("lista");
  const handleToggleView = () => {
    setViewMode((currentMode) => (currentMode === "lista" ? "mapa" : "lista"));
  };  

  return (
    <>
      <TopBarClub />
      <StyledPageContainer>
        <StyledTopFiltersContainer>
          <SearchInput value={values.searchValue} onChange={handleSetValue} />
          <Button padding="13px 16px" icon={viewMode === "lista" ? <WorldIcon /> : <ListIcon />} onClick={handleToggleView}>
            {viewMode === "lista" ? "Mapa" : "Lista"}
          </Button>
        </StyledTopFiltersContainer>
        {viewMode === "lista" && (
          <>
            <Categories value={values.categoryValue} handleSetValue={handleSetValue} />
            {values.categoryValue === "" && <AllView {...{ data }} />}
            {values.categoryValue === OFFERS_TYPE_IDS.EVENTO && (
              <>
                <SubCategoryFilters
                  offerTypeId={OFFERS_TYPE_IDS.EVENTO}
                  onFilterChange={(subCategoryId) => handleSetValue("subcategory", subCategoryId)}
                />
                <EventsView {...{ data }} />
              </>
            )}
            {values.categoryValue === OFFERS_TYPE_IDS.SERVICIO && (
              <>
                <SubCategoryFilters
                  offerTypeId={OFFERS_TYPE_IDS.SERVICIO}
                  onFilterChange={(subCategoryId) => handleSetValue("subcategory", subCategoryId)}
                />
                <ServiceView {...{ data }} />
              </>
            )}
          </>
        )}
        {viewMode === "mapa" && <MapWithCluster {...{data}} />}
        <Button onClick={goToPlans} isFloating={true} right={"30px"} bottom={"110px"} icon={<PlusIcon />}>
          Agregar
        </Button>
      </StyledPageContainer>
      <NavBar currentPage={"Descubre"} />
    </>
  );
}
