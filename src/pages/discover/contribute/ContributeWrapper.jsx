import React, { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { fetcher } from "@/services/api";
import EventOrServiceForm from "@/components/contribute/components/organisms/EventOrServiceForm";
import { useParams } from "react-router-dom";

// Este componente recibe el offerTypeId desde el router (como vimos antes)
export default function ContributeWrapper() {
  const { offerTypeId } = useParams();
  console.log({ offerTypeId });

  // 1. Obtenemos el catálogo de tipos de oferta (que contiene los esquemas)
  const { data: offerTypesCatalog, error, isLoading } = useSWR(API_ENDPOINTS.GET_OFFER_CATALOG, fetcher);

  // 2. Buscamos y parseamos el schema correcto una sola vez con useMemo
  const formSchema = useMemo(() => {
    if (!offerTypesCatalog) return null;

    // Buscamos el tipo de oferta (evento o servicio) por su ID
    const selectedType = offerTypesCatalog.find((type) => type.id === offerTypeId);

    if (selectedType && selectedType.formSchemaJson) {
      // Parseamos el JSON string para convertirlo en un objeto
      return JSON.parse(selectedType.formSchemaJson);
    }

    return null;
  }, [offerTypesCatalog, offerTypeId]);

  const handleFormSubmit = (formData) => {
    console.log("Formulario enviado:", formData);
    // Aquí iría la lógica para enviar los datos a tu API (POST/PUT)
  };

  console.log({ formSchema });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la configuración del formulario.</div>;
  if (!formSchema) return <div>No se encontró un formulario para este tipo de oferta.</div>;

  return (
    <div>
      <EventOrServiceForm schema={formSchema} onSubmit={handleFormSubmit} offerTypeId={offerTypeId} />
    </div>
  );
}
