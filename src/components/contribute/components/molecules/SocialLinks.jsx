import TextInput from '../atoms/TextInput';
import { Box } from '@mui/material';

export default function SocialLinks() {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <TextInput name="instagram" label="Instagram (link)" />
      <TextInput name="facebook" label="Facebook (link)" />
      <TextInput name="website" label="Sitio web" />
    </Box>
  );
}