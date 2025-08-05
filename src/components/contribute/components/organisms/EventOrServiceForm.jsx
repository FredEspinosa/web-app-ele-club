import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import FormField from "../molecules/FormField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormSection from "../molecules/FormSection";
import { useNavigate } from "react-router-dom";

export default function EventOrServiceForm({ schema, onSubmit, isSubmitting, submitError, defaultValues }) {
  const navigate = useNavigate();
  const sectionTitles = {
    description: "Descripción general",
    location: "Fecha y ubicación",
    contact: "Datos de contacto y redes",
  };
  const methods = useForm({ defaultValues: defaultValues || {} });

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
            padding={"24px 16px 90px"}
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
                  onClick={() => {
                    methods.reset();
                    navigate("/descubre");
                  }}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button className="btn club_btn club_btn_full club_btn_borde_gris" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : "Publicar"}
                </button>
              </Box>
            </Box>
          </Box>
        </FormProvider>
      </LocalizationProvider>
    </div>
  );
}
