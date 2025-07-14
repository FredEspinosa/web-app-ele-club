import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import FormField from "../molecules/FormField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormSection from "../molecules/FormSection";
import { useNavigate } from "react-router-dom";

export default function EventOrServiceForm({ schema, onSubmit, isSubmitting, submitError }) {
  const navigate = useNavigate();
  const sectionTitles = {
    description: "Descripción general",
    location: "Fecha y ubicación",
    contact: "Datos de contacto y redes",
  };
  const methods = useForm();

  const groupedFields = useMemo(() => {
    if (!schema?.formValues) return {};
    return schema.formValues.reduce((acc, field) => {
      const sectionKey = field.section || "default";
      if (!acc[sectionKey]) acc[sectionKey] = [];
      acc[sectionKey].push(field);
      return acc;
    }, {});
  }, [schema]);

  if (!schema) return null;

  const onError = (errors, e) => console.log(errors, e);

  const handleFormSubmit = (data, e) => {
    console.log(data, e);
    onSubmit(data, e);
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormProvider {...methods}>
          <Box
            onSubmit={methods.handleSubmit(handleFormSubmit, onError)}
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            padding={"24px 16px"}
          >
            <Box sx={{ width: 342 }}>
              {Object.keys(groupedFields).map((sectionKey) => (
                <FormSection key={sectionKey} title={sectionTitles[sectionKey] || "Sección Adicional"}>
                  {groupedFields[sectionKey].map((field) => (
                    <FormField key={field.name} field={field} />
                  ))}
                </FormSection>
              ))}

              {submitError && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {submitError}
                </Typography>
              )}

              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    methods.reset();
                    navigate("/descubre");
                  }}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : "Publicar"}
                </Button>
              </Box>
            </Box>
          </Box>
        </FormProvider>
      </LocalizationProvider>
    </div>
  );
}
