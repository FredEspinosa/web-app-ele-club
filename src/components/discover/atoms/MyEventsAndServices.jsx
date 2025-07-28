import React from 'react'
import { StyledDetailsActions } from '@/styles/discover/containers'
import { StyledDetailTitle } from '@/styles/discover/texts'
import { Button } from '@/components/shared/atoms'
import { useNavigate } from 'react-router-dom'


const MyEventsAndServices = ({ description, eventOrServiceId }) => {
  const navigate = useNavigate();

  const nextStep = () => {
    // if (!eventOrServiceId) {
    //   console.error("No hay ID para redirigir");
    //   return;
    // }
    navigate(`/edit_post/${eventOrServiceId}`);
  };

  return (
    <div>
      <StyledDetailTitle $size={16}>Acerca del servicio</StyledDetailTitle>
      <p className='club_info_span_card_discover'>
        {description? 'Haz compartido 2 eventos y 1 servicio':'Aún no haz compartido eventos o servicios'}
      </p>
      <Button
        size="normal"
        type="button"
        variant="outlined"
        style={{ padding: '4px 23px' }}
        onClick={nextStep}
      >
        Ver todos
      </Button>
    </div>
  );
};

export default MyEventsAndServices
