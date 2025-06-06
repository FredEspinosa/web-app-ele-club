import { useFieldArray, useFormContext } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';

export default function IncludesInput() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'includes' });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map((field, index) => (
        <Box key={field.id} display="flex" alignItems="center" gap={1}>
          <TextField fullWidth label={`Incluye #${index + 1}`} {...register(`includes.${index}`)} />
          <Button onClick={() => remove(index)} color="error">Eliminar</Button>
        </Box>
      ))}
      <Button onClick={() => append('')}>Agregar ítem</Button>
    </Box>
  );
}
