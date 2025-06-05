import { Box } from '@mui/material';
import SelectInput from '../atoms/SelectInput';
import TextInput from '../atoms/TextInput';

export default function PriceInput({ showCost }) {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <SelectInput name="price" label="Precio" options={['free', 'paid']} />
      {showCost && <TextInput name="cost" label="Costo" type="number" />}
    </Box>
  );
}