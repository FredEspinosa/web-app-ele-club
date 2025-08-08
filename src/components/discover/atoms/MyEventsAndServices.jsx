// eslint-disable-next-line no-unused-vars
import React from 'react'
import { StyledDetailTitle } from '@/styles/discover/texts'
import { Button } from '@/components/shared/atoms'
import { useNavigate } from 'react-router-dom'

const MyEventsAndServices = () => {
  const navigate = useNavigate();

  const nextStep = () => {
    navigate(`/edit_post`);
  };

  // const eventos = data?.result?.evento ?? [];
  // const servicios = data?.result?.servicio ?? [];

  // const hasContent = eventos.length > 0 || servicios.length > 0;

  return (
    <div>
      <StyledDetailTitle $size={16}>Mis Eventos y Servicios</StyledDetailTitle>
      <p className='club_info_span_card_discover'>
        Has compartido 2 eventos y 1 servicio.
        {/* {hasContent
          ? `Haz compartido ${eventos.length} evento${eventos.length !== 1 ? 's' : ''} y ${servicios.length} servicio${servicios.length !== 1 ? 's' : ''}`
          : 'Aún no has compartido eventos o servicios'} */}
      </p>
      <Button
        shape='pill' 
        padding='3px 34px'
        size="normal"
        type="button"
        variant="outlined"
        style={{ padding: '4px 23px' }}
        onClick={nextStep}
      >
        Ver todos
        {/* {hasContent ? 'Ver todos' : 'Crear'} */}
      </Button>
    </div>
  );
};

export default MyEventsAndServices;