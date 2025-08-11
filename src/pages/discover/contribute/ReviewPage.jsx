import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { dateTransform, fileToBase64 } from "@/utils/functions/discover";
import { API_ENDPOINTS } from "@/descubreApi";
import FormSection from "@/components/contribute/components/molecules/FormSection";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";
import { EditIcon } from "@/assets/icons";
import WarningMessage from "./WarningMessage";
import EventInfoBlock from "./EventInfoBlock";
import ServiceInfoBlock from "./ServiceInfoBlock";
import useSWR from "swr";
import { fetcher } from "@/services/api";

export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { offerTypeId } = useParams();
  const { formData } = location.state || {};
  const isEvent = offerTypeId === OFFERS_TYPE_IDS.EVENTO;
  const isService = offerTypeId === OFFERS_TYPE_IDS.SERVICIO;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: categoryCatalogData, isLoading: isLoadingCatalog } = useSWR(
    offerTypeId ? API_ENDPOINTS.GET_OFFER_CATEGORY_CATALOG_BY_ID(offerTypeId) : null,
    fetcher
  );

  const handleEdit = () => {
    navigate(`/descubre/contribuir/${offerTypeId}`, { state: { formData } });
    console.log({state: { formData }});
  };

  const categoryName = useMemo(() => {
    if (isLoadingCatalog) return "Cargando categoría...";
    if (!categoryCatalogData?.result) return "Categoría no encontrada";
    const categoryId = formData.EventCategory || formData.ServiceCategory;
    const catalogArray = Object.values(categoryCatalogData.result);
    const foundCategory = catalogArray.find((cat) => cat.id === categoryId);
    return foundCategory ? foundCategory.name : "Categoría desconocida";
  }, [categoryCatalogData, formData, isLoadingCatalog]);

  const handlePublish = async () => {
    setIsSubmitting(true);
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
      //Creacion de la oferta
      const createOffer = await fetch(API_ENDPOINTS.CREATE_OFFER, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("AccessToken")}` },
        body: JSON.stringify(createPayload),
      });
      const offerResult = await createOffer.json();
      if (!offerResult.isSuccess) throw new Error(offerResult.message || "Error al subir la imagen.");
      const newOfferId = offerResult.result.id;
      console.log("newOfferId", newOfferId);

      // PATCH para aprobar la oferta
      const approbeOffer = await fetch(API_ENDPOINTS.APPROBE_OFFER(newOfferId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("AccessToken")}` },
      });
      const approbeResult = await approbeOffer.json();
      console.log({ approbeResult });
      const finalOfferData = offerResult.result;
      const formDataObject = JSON.parse(finalOfferData.formDataJson);
      const imageUrl = formDataObject.EventImage || formDataObject.ServiceImage;
      const imageFieldName = formDataObject.EventImage ? "EventImage" : "ServiceImage";
      const createdOfferFormData = {
        ...formData,
        [imageFieldName]: imageUrl,
      };
      navigate(`../exito`, { state: { createdOffer: createdOfferFormData }, replace: true });
    } catch (err) {
      console.error("Error al publicar:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <div>No hay datos para revisar. Por favor, vuelve a empezar.</div>;
  }

  const image = formData.EventImage?.[0] || formData.ServiceImage?.[0];

  const eventData = {
    title: formData.EventTitle,
    category: categoryName,
    date: dateTransform(formData.EventDate),
    hour: formData.EventTimeStart,
    about: formData.EventAbout,
    locationName: formData.EventLocationName,
    company: formData.EventCompany,
    cost: formData.EventCost || formData.EventPrice,
  };

  const serviceData = {
    title: formData.ServiceTitle,
    category: categoryName,
    about: formData.ServiceAbout,
    includes: formData.ServiceIncludes,
    cost: formData.ServiceCost,
    schedule: formData.ServiceSchedule,
    locationName: formData.ServiceLocationName,
    company: formData.ServiceCompany,
    phoneNumber: formData.ServicePhoneNumber,
    email: formData.ServiceEmail,
    webSite: formData.ServiceWebSite,
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0", color: "#343434" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} padding={"24px 16px 90px"}>
        <Box>
          <FormSection>
            <Typography fontSize={"24px"} fontWeight={700}>
              Revisar tu {isEvent ? "evento" : "servicio"}
            </Typography>

            <Box backgroundColor="#F0F0F0" borderRadius={"16px"} display={"flex"} flexDirection={"column"} gap={2}>
              <Box>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    style={{ width: "100%", borderRadius: "16px 16px 0px 0px" }}
                  />
                )}
              </Box>

              {isEvent && <EventInfoBlock {...eventData} />}

              {isService && <ServiceInfoBlock {...serviceData} />}
            </Box>

            <WarningMessage title={"Importante"}>
              • Tu evento/servicio será revisado por nuestro equipo antes de ser publicado. <br />
              • Recibirás una notificación cuando tu publicación sea aprobada. <br />
              • Podrás editar o eliminar tu publicación en cualquier momento desde tu perfil. <br />
            </WarningMessage>
          </FormSection>
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 84,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 -2px 4px rgba(0,0,0,0.2)",
            zIndex: 1100,
          }}
        >
          <Box display="flex" justifyContent="flex-end" gap={2} width={342}>
            <button
              className="btn club_btn club_btn_full club_btn_borde_violeta"
              style={{ justifyContent: "center", gap: "8px" }}
              onClick={handleEdit}
              disabled={isSubmitting}
            >
              <EditIcon />
              Editar
            </button>
            <button className="btn club_btn club_btn_full club_bg_violeta_08" onClick={handlePublish} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Publicar"}
            </button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
