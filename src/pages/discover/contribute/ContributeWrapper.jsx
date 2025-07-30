import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { fetcher } from "@/services/api";
import EventOrServiceForm from "@/components/contribute/components/organisms/EventOrServiceForm";
import { useNavigate, useParams } from "react-router-dom";
import { fileToBase64 } from "@/utils/functions/discover";

export default function ContributeWrapper() {
  const { offerTypeId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
    console.log("Datos del formulario listos para revisar:", formData);
    // Navega a la página de revisión, pasando los datos en el 'state'
    navigate("revisar", { state: { formData } });
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la configuración del formulario.</div>;
  if (!formSchema) return <div>No se encontró un formulario para este tipo de oferta.</div>;

  return (
    <div>
      <EventOrServiceForm schema={formSchema} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} submitError={submitError} />
    </div>
  );
}
