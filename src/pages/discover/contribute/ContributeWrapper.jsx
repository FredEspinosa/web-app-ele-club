import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { fetcher } from "@/services/api";
import EventOrServiceForm from "@/components/contribute/components/organisms/EventOrServiceForm";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

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

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    console.log({ formData });

    const createPayload = {
      offerTypeId: offerTypeId,
      offerCategoryId: formData.EventCategory || formData.ServiceCategory,
      title: formData.EventTitle || formData.ServiceTitle,
      description: formData.EventAbout || formData.ServiceAbout,
      companyName: formData.EventCompany || formData.ServiceCompany,
      latitude: formData.mapLocation?.lat || 0,
      longitude: formData.mapLocation?.lon || 0,
      formDataJson: JSON.stringify(formData),
    };

    // try {
    //   // Petición 1: Crear
    //   const createResponse = await fetch(API_ENDPOINTS.CREATE_OFFER, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(createPayload),
    //   });
    //   const createResult = await createResponse.json();
    //   if (!createResult.isSuccess) throw new Error(createResult.message);

    //   const newOfferId = createResult.result?.id;
    //   if (!newOfferId) throw new Error("No se recibió un ID para la nueva oferta.");

    //   // Petición 2: Actualizar
    //   const updateResponse = await fetch(API_ENDPOINTS.UPDATE_OFFER(newOfferId), {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ status: "PENDING_APPROVAL" }),
    //   });
    //   const updateResult = await updateResponse.json();
    //   if (!updateResult.isSuccess) throw new Error(updateResult.message);

    //   alert("¡Tu oferta se ha publicado correctamente!");
    //   navigate("/descubre"); // Redirige al usuario tras el éxito
    // } catch (err) {
    //   console.error("Error en el proceso de envío:", err);
    //   setSubmitError(err.message);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la configuración del formulario.</div>;
  if (!formSchema) return <div>No se encontró un formulario para este tipo de oferta.</div>;

  return (
    <div>
      <EventOrServiceForm
        schema={formSchema}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
}
