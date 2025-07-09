import React, { useMemo } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { fetcher } from "@/services/api";
import EventOrServiceForm from "@/components/contribute/components/organisms/EventOrServiceForm";
import { useParams } from "react-router-dom";

export default function ContributeWrapper() {
  const { offerTypeId } = useParams();
  console.log({ offerTypeId });

  const { data: offerTypesCatalog, error, isLoading } = useSWR(API_ENDPOINTS.GET_OFFER_CATALOG, fetcher);

  const formSchema = useMemo(() => {
    if (!offerTypesCatalog) return null;

    const selectedType = offerTypesCatalog.find((type) => type.id === offerTypeId);

    if (selectedType && selectedType.formSchemaJson) {
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
