import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/services/api";
import { SubFilterButton, SubFiltersContainer } from "@/styles/discover/containers";
import { API_ENDPOINTS } from "@/descubreApi";

export default function SubCategoryFilters({ offerTypeId, onFilterChange }) {
  const [activeFilterId, setActiveFilterId] = useState(null);
  const {
    data: rawData,
    isLoading,
    error,
  } = useSWR(offerTypeId ? API_ENDPOINTS.GET_OFFER_CATEGORY_CATALOG_BY_ID(offerTypeId) : null, fetcher);

  const subCategories = useMemo(() => {
    const eventResponse = rawData?.result;
    if (!eventResponse) {
      return null;
    }
    try {
      const processedOffer = Object.values(subCategories);
      console.log({ processedOffer });
      return processedOffer;
    } catch (error) {
      console.error("Error al parsear formDataJson:", error);
      return eventResponse;
    }
  }, [rawData]);

  useEffect(() => {
    setActiveFilterId(null);
    onFilterChange("");
  }, [offerTypeId]);

  const handleFilterClick = (subCategoryId) => {
    setActiveFilterId(subCategoryId);
    onFilterChange(subCategoryId || "");
  };

  if (isLoading) return <div>Cargando filtros...</div>;
  if (error) return <div>Error al cargar filtros.</div>;
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <SubFiltersContainer>
      <SubFilterButton isActive={activeFilterId === null} onClick={() => handleFilterClick(null)}>
        TODOS
      </SubFilterButton>

      {subCategories?.map((subCategory) => (
        <SubFilterButton
          key={subCategory.id}
          isActive={activeFilterId === subCategory.id}
          onClick={() => handleFilterClick(subCategory.id)}
        >
          {subCategory.name.toUpperCase()}
        </SubFilterButton>
      ))}
    </SubFiltersContainer>
  );
}
