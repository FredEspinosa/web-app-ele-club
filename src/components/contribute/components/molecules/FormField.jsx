import React, { useMemo } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Typography, Box } from "@mui/material";
import TextInput from "../atoms/TextInput";
import SelectInput from "../atoms/SelectInput";
import DatePickerInput from "../atoms/DatePicker";
import LocationPicker from "./LocationPicker";
import useSWR from "swr";
import { API_ENDPOINTS } from "@/descubreApi";
import { fetcher } from "@/services/api";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";
import FileUploader from "@/components/reportes/atoms/FileUploader";

export default function FormField({ field }) {
  const { control } = useFormContext();
  const watchedFieldValue = field.condition ? useWatch({ name: field.condition.field }) : null;
  const isCategoryField = field.name === "EventCategory" || field.name === "ServiceCategory";
  const offerTypeIdForCategory =
    field.name === "EventCategory" ? OFFERS_TYPE_IDS.EVENTO : field.name === "ServiceCategory" ? OFFERS_TYPE_IDS.SERVICIO : null;
  const { data } = useSWR(
    isCategoryField ? API_ENDPOINTS.GET_OFFER_CATEGORY_CATALOG_BY_ID(offerTypeIdForCategory) : null,
    fetcher
  );
  const categoryOptions = useMemo(() => {
    const eventResponse = data?.result;
    if (!eventResponse) {
      return null;
    }
    try {
      const processedOffer = Object.values(eventResponse);
      return processedOffer.map((offer) => offer.name);
    } catch (error) {
      console.error("Error al parsear formDataJson:", error);
      return eventResponse;
    }
  }, [data]);

  if (field.condition && watchedFieldValue !== field.condition.value) {
    return null;
  }

  const locationFieldNames = ["EventLocationName", "ServiceLocationName"];

  const renderField = (controllerProps) => {
    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return <TextInput name={field.name} placeholder={field.label} type={field.type} {...controllerProps.field} />;
      case "textarea":
        return <TextInput name={field.name} placeholder={field.label} multiline rows={4} {...controllerProps.field} />;
      case "select":
        const options = isCategoryField ? categoryOptions : field.options;
        return <SelectInput name={field.name} label={field.label} options={options} {...controllerProps.field} />;
      case "date":
        return <DatePickerInput name={field.name} {...controllerProps.field} />;
      case "time":
        return <TextInput name={field.name} type="time" {...controllerProps.field} />;
      case "file":
        return <FileUploader name={field.name} label={field.label} />;
      case "group":
        return (
          <Box display="flex" flexDirection="column" gap={2} border="1px solid #ddd" p={2} borderRadius={2}>
            <Typography variant="subtitle1">{field.label}</Typography>
            {field.fields.map((subField) => (
              <FormField key={subField.name} field={subField} />
            ))}
          </Box>
        );

      default:
        return <p>Tipo de campo desconocido: {field.type}</p>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>
        {field.label}
        {field.required ? "*" : ""}
      </Typography>
      <Controller
        name={field.name}
        control={control}
        rules={{ required: field.required ? "Este campo es obligatorio" : false }}
        render={renderField}
      />
      {locationFieldNames.includes(field.name) && (
        <Box mt={2}>
          <Typography>Mapa</Typography>
          <LocationPicker name="mapLocation" />
        </Box>
      )}
    </Box>
  );
}
