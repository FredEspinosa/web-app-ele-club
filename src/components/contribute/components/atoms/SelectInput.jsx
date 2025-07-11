import { TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectInput({ name, label, options }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField select fullWidth label={label} {...field} error={!!fieldState.error} helperText={fieldState.error?.message}>
          {options?.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
