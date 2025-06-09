import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import TextInput from '../atoms/TextInput';
import SelectInput from '../atoms/SelectInput';
import FileInput from '../atoms/FileInput';
import LocationPicker from '../molecules/LocationPicker';
import IncludesInput from '../molecules/IncludesInput';
import PriceInput from '../molecules/PriceInput';
import SocialLinks from '../molecules/SocialLinks';
import { useEventOrServiceForm } from '../../hooks/useEventOrServiceForm';
import { defaultValues } from '../../types/formTypes';
import DatePickerInput from '../atoms/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const labelMapping = {
  event: 'evento',
  service: 'servicio',
};

export default function EventOrServiceForm({ type }) {
  const methods = useForm({ defaultValues });
  const { onSubmit, showCost, showDateRange, showIncludes, showSchedule } =
    useEventOrServiceForm(methods, type);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>
        <Box
          component='form'
          onSubmit={methods.handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          gap={2}
          padding={'24px 14px'}
        >
          <Typography sx={{ fontWeight: '700', margin: 0 }}>
            Agregar un Servicio
          </Typography>
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '14px',
              color: 'var(--color-neutral-gris-02)',
            }}
          >
            Comparte un evento con la comunidad de Helena.
          </Typography>
          <Typography>Título del {labelMapping[type]}*</Typography>
          <TextInput
            name='title'
            placeholder={'Escribe aquí...'}
          />
          <Typography>Ubicación*</Typography>
          <TextInput name='location' placeholder='Ej. Arte Moderno ' />
          <Typography>Mapa</Typography>
          <LocationPicker name='mapLocation' />

          {showDateRange && (
            <>
              <Typography>Fecha*</Typography>
              <DatePickerInput name={'date'} />
            </>
          )}
          {showSchedule && <TextInput name='schedule' label='Horario' />}

          <SelectInput
            name='category'
            label='Categoría'
            options={['Música', 'Cultura', 'Comida']}
          />
          <PriceInput showCost={showCost} />

          {type === 'service' && (
            <>
              <TextInput name='about' label='Acerca del servicio' multiline />
              {showIncludes && <IncludesInput />}
            </>
          )}

          <TextInput name='phoneCode' label='Código' />
          <TextInput name='phoneNumber' label='Número de teléfono' />

          <TextInput name='website' label='Sitio web' />
          <SocialLinks />

          <FileInput name='image' label='Imagen destacada' />

          <Button variant='contained' type='submit'>
            Guardar
          </Button>
        </Box>
      </FormProvider>
    </LocalizationProvider>
  );
}
