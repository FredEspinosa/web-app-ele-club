import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DatePickerInput({ name, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          label={label}
          value={field.value || null}
          onChange={(date) => field.onChange(date)}
          renderInput={(params) => (
            <TextField {...params} fullWidth />
          )}
        />
      )}
    />
  );
}
