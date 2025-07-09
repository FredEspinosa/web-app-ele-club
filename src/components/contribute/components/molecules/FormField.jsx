import React from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Typography, Box } from "@mui/material";
import TextInput from "../atoms/TextInput";
import SelectInput from "../atoms/SelectInput";
import FileInput from "../atoms/FileInput";
import DatePickerInput from "../atoms/DatePicker";

export default function FormField({ field }) {
  const { control } = useFormContext();

  const watchedFieldValue = field.condition ? useWatch({ name: field.condition.field }) : null;
  if (field.condition && watchedFieldValue !== field.condition.value) {
    return null;
  }

  const costOptions = ["Costo", "Gratuito", "Cotizar"];

  const renderField = (controllerProps) => {
    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return <TextInput name={field.name} placeholder={field.label} type={field.type} {...controllerProps.field} />;
      case "textarea":
        return <TextInput name={field.name} placeholder={field.label} multiline rows={4} {...controllerProps.field} />;
      case "select":
        return <SelectInput name={field.name} label={field.label} options={costOptions} {...controllerProps.field} />;
      case "date":
        return <DatePickerInput name={field.name} {...controllerProps.field} />;
      case "time":
        return <TextInput name={field.name} type="time" {...controllerProps.field} />;
      case "file":
        return <FileInput name={field.name} label={field.label} />;

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
      <Controller name={field.name} control={control} rules={{ required: field.required }} render={renderField} />
    </Box>
  );
}
