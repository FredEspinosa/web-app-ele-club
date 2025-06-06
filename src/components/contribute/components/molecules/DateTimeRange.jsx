import { Box } from '@mui/material';
import TextInput from '../atoms/TextInput';

export default function DateTimeRange() {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <TextInput name="startDate" label="Fecha y hora de inicio" type="datetime-local" InputLabelProps={{ shrink: true }} />
      <TextInput name="endDate" label="Fecha y hora de término" type="datetime-local" InputLabelProps={{ shrink: true }} />
    </Box>
  );
}