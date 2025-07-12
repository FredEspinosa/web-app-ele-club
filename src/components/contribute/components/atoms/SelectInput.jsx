import { TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectInput({ name, label, options = [] }) {
  const { control } = useFormContext();
  const hasObjectOptions = options?.length > 0 && typeof options[0] === "object";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField select fullWidth label={label} {...field} error={!!fieldState.error} helperText={fieldState.error?.message}>
          {options?.map((opt) => (
            <MenuItem key={hasObjectOptions ? opt.id : opt} value={hasObjectOptions ? opt.id : opt}>
              {hasObjectOptions ? opt.name : opt}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
