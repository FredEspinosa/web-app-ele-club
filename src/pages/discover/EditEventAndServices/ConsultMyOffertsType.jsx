// eslint-disable-next-line no-unused-vars
import React from "react";
import useGetOffertType from "@/hooks/discover/useGetOffertType";
import EventAndServicesDetails from "./serviceConsult";

export default function ConsultMyOffertsType() {
  const { data: categories, isLoading, error } = useGetOffertType();
  console.log("categories", categories);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar categorías</p>;

  return (
    <>
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.some(cat => cat.id) ? (
          (() => {
            const categoryWithId = categories.find(cat => cat.id);
            console.log("categoryWithId", categoryWithId);
            return <EventAndServicesDetails categories={categories} />;
          })()
        ) : null
      ) : (
        <p>No hay datos</p>
      )}
    </>
  );
}