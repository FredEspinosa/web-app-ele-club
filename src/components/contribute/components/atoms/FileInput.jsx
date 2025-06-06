import { useFormContext } from 'react-hook-form';
import { InputLabel, Button } from '@mui/material';

export default function FileInput({ name, label }) {
  const { register } = useFormContext();

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Button component="label" variant="outlined">
        Subir archivo
        <input type="file" hidden {...register(name)} />
      </Button>
    </>
  );
}
