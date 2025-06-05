import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export default function TextInput({ name, label, ...props }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          hiddenLabel
          {...props}
          slotProps={{
            input: {
              sx: { 
                borderRadius: '16px',
              },
            },
            htmlInput: {
              sx: { 
                padding: '16px',
              },
            },
          }}
        />
      )}
    />
  );
}
