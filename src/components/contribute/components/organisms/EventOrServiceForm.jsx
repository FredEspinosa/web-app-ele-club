import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Typography, ThemeProvider, createTheme } from "@mui/material";
import TextInput from "../atoms/TextInput";
import FormField from "../molecules/FormField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";

export default function EventOrServiceForm({ schema, onSubmit, offerTypeId }) {
  console.log({ schema });

  const methods = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            display="flex"
            flexDirection="column"
            gap={2} // Aumentamos el gap para mejor espaciado
            padding={"24px 16px"}
            sx={{
              width: 342,
              borderRadius: 4,
              justifySelf: "center",
              bgcolor: "#fff",
              position: "relative",
              top: "16px",
            }}
          >
            {/* Títulos del formulario */}
            <Typography variant="h7" sx={{ fontWeight: "700" }}>
              Descripción general del {schema?.title.split("un")[1].toLowerCase()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {schema?.subtitle}
            </Typography>

            {/* Renderizado dinámico de campos */}
            {schema?.formValues.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
          </Box>

          {offerTypeId === OFFERS_TYPE_IDS.EVENTO && (
            <>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2} // Aumentamos el gap para mejor espaciado
                padding={"24px 16px"}
                sx={{
                  width: 342,
                  borderRadius: 4,
                  justifySelf: "center",
                  bgcolor: "#fff",
                  position: "relative",
                  top: "36px",
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: "700" }}>
                  Fecha y ubicación
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Fecha"}</Typography>
                  <TextInput name={"fecha"} placeholder={"Lunes a Viernes de 12:00 - 13:00"} type={"date"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Ubicación"}</Typography>
                  <TextInput name={"ubicacion"} placeholder={"Ej. Arte Moderno"} type={"text"} />
                </Box>
              </Box>

              <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2} // Aumentamos el gap para mejor espaciado
                padding={"24px 16px"}
                sx={{
                  width: 342,
                  borderRadius: 4,
                  justifySelf: "center",
                  bgcolor: "#fff",
                  position: "relative",
                  top: "56px",
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: "700" }}>
                  Datos del organizador
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Organizador"}</Typography>
                  <TextInput name={"organizador"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Typography variant="h7" sx={{ fontWeight: "700" }}>
                  Redes sociociales
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Sitio web"}</Typography>
                  <TextInput name={"website"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Instagram"}</Typography>
                  <TextInput name={"instagram"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Facebook"}</Typography>
                  <TextInput name={"facebook"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
              </Box>
            </>
          )}

          {offerTypeId === OFFERS_TYPE_IDS.SERVICIO && (
            <>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2} // Aumentamos el gap para mejor espaciado
                padding={"24px 16px"}
                sx={{
                  width: 342,
                  borderRadius: 4,
                  justifySelf: "center",
                  bgcolor: "#fff",
                  position: "relative",
                  top: "36px",
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: "700" }}>
                  Horario y ubicación
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Horario"}</Typography>
                  <TextInput name={"horario"} placeholder={"Lunes a Viernes de 12:00 - 13:00"} type={"text"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Ubicación"}</Typography>
                  <TextInput name={"ubicacion"} placeholder={"Ej. Arte Moderno"} type={"text"} />
                </Box>
              </Box>

              <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2} // Aumentamos el gap para mejor espaciado
                padding={"24px 16px"}
                sx={{
                  width: 342,
                  borderRadius: 4,
                  justifySelf: "center",
                  bgcolor: "#fff",
                  position: "relative",
                  top: "56px",
                }}
              >
                <Typography variant="h7" sx={{ fontWeight: "700" }}>
                  Datos de la empresa
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Empresa"}</Typography>
                  <TextInput name={"empresa"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Typography>{"Whatsapp"}</Typography>
                  <TextInput name={"whatsapp"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Email"}</Typography>
                  <TextInput name={"email"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Typography variant="h7" sx={{ fontWeight: "700" }}>
                  Redes sociociales
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Sitio web"}</Typography>
                  <TextInput name={"website"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Instagram"}</Typography>
                  <TextInput name={"instagram"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{"Facebook"}</Typography>
                  <TextInput name={"facebook"} placeholder={"Escribe aqui..."} type={"text"} />
                </Box>
              </Box>
            </>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button variant="outlined" onClick={() => methods.reset()}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Publicar
            </Button>
          </Box>
        </FormProvider>
      </LocalizationProvider>
    </div>
  );
}
