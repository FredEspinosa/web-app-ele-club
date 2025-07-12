import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { fetcher } from "@/services/api";
import EventOrServiceForm from "@/components/contribute/components/organisms/EventOrServiceForm";
import { useNavigate, useParams } from "react-router-dom";
import { fileToBase64 } from "@/utils/functions/discover";

export default function ContributeWrapper() {
  const { offerTypeId } = useParams();
    const navigate = useNavigate()
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

  const handleFormSubmitee = async (formData) => {
    // setIsSubmitting(true);
    // setSubmitError(null);

    // 1. Extraemos los datos para los campos principales del payload
    const offerCategoryId = formData.EventCategory || formData.ServiceCategory;
    const title = formData.EventTitle || formData.ServiceTitle;
    const description = formData.EventAbout || formData.ServiceAbout;
    const companyName = formData.EventCompany || formData.ServiceCompany;
    const latitude = formData.mapLocation?.lat || 0;
    const longitude = formData.mapLocation?.lon || 0;

    // 2. Creamos una copia de formData para no modificar el original
    const formDataForJson = { ...formData };

    const topLevelKeys = [
      "EventCategory",
      "ServiceCategory",
      "EventTitle",
      "ServiceTitle",
      "EventAbout",
      "ServiceAbout",
      "EventCompany",
      "ServiceCompany",
      "mapLocation",
    ];
    topLevelKeys.forEach((key) => delete formDataForJson[key]);
    const createPayload = {
      offerTypeId,
      offerCategoryId,
      title,
      description,
      companyName,
      latitude,
      longitude,
      formDataJson: JSON.stringify(formDataForJson),
    };

    console.log("Payload que se enviará a la API:", createPayload);
  };

  const handleFormSubmit = async (formData) => {
    // setIsSubmitting(true);
    // setSubmitError(null);

    let finalFormData = { ...formData };

    try {
      const imageFile = formData.EventImage?.[0] || formData.ServiceImage?.[0];
      if (imageFile) {
        const base64Image = await fileToBase64(imageFile);
        const uploadResponse = await fetch(API_ENDPOINTS.UPLOAD_PHOTO, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64: base64Image }),
        });
        const uploadResult = await uploadResponse.json();
        if (!uploadResult.isSuccess) throw new Error(uploadResult.message || "Error al subir la imagen.");
        const imageUrl = uploadResult.result?.url;
        console.log("Imagen subida. URL:", imageUrl);

        const imageFieldName = formData.EventImage ? "EventImage" : "ServiceImage";
        finalFormData = {
          ...finalFormData,
          [imageFieldName]: imageUrl,
        };
      }

      const createPayload = {
        offerTypeId,
        offerCategoryId: finalFormData.EventCategory || finalFormData.ServiceCategory,
        title: finalFormData.EventTitle || finalFormData.ServiceTitle,
        description: finalFormData.EventAbout || finalFormData.ServiceAbout,
        companyName: finalFormData.EventCompany || finalFormData.ServiceCompany,
        latitude: finalFormData.mapLocation?.lat || 0,
        longitude: finalFormData.mapLocation?.lon || 0,
        formDataJson: JSON.stringify(finalFormData),
      };

      console.log("Payload final para crear oferta:", createPayload);

      const createOffer = await fetch(API_ENDPOINTS.CREATE_OFFER, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("AccessToken")}` },
        body: JSON.stringify(createPayload),
      });
      const offerResult = await createOffer.json();
      if (!offerResult.isSuccess) throw new Error(offerResult.message || "Error al subir la imagen.");
      const newOfferId = offerResult.result.id;
      console.log("newOfferId", newOfferId);

      const approbeOffer = await fetch(API_ENDPOINTS.APPROBE_OFFER(newOfferId), {
        method: 'PATCH',
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("AccessToken")}` },
      })
      const approbeResult = await approbeOffer.json();
      console.log({approbeResult});
    } catch (err) {
        console.error("Error en el proceso de envío:", err);
        //   setSubmitError(err.message);
    } finally {
        //   setIsSubmitting(false);
        navigate('/descubre')
    }
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
