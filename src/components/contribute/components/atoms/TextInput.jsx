import { TextField } from '@mui/material';
import { styled } from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 16px;
    padding: 8px 12px;
  }

  & input {
    padding: 16px;
  }
`;

export default function TextInput({ name, ...props }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledTextField
          {...field}
          fullWidth
          hiddenLabel
          {...props}
        />
      )}
    />
  );
}
