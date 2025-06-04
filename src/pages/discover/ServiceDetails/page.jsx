import {
  AboutServices,
  DiscoverInfo,
  EventGallery,
} from '@/components/discover/atoms';
import {
  DetailsTabsInfo,
  EventLocation,
} from '@/components/discover/molecules';
import EventOrganizationInfo from '@/components/discover/molecules/EventOrganizationInfo';
import { ServiceDetailsReviews } from '@/components/discover/organisms';
import ServiceView from '@/components/discover/organisms/ServiceView';
import { Button } from '@/components/shared/atoms';
import { fetcher } from '@/services/api';
import {
  StyledDetailContainer,
  StyledDetailsActions,
  StyledDetailsEventContainer,
  StyledDetailsRateContainer,
} from '@/styles/discover/containers';
import {
  StyledDetailOwnerLabel,
  StyledDetailTitle,
} from '@/styles/discover/texts';
import { Rating } from '@mui/material';
import useSWR from 'swr';

export default function ServiceDetails() {
  const { data, error, isLoading } = useSWR(() => {
    const params = new URLSearchParams({
      category: 'Servicios',
    }).toString();
    return `/api/items?${params}`;
  }, fetcher);

  const tabs = [
    {
      label: 'Información',
      content: (
        <>
          <AboutServices
            description={`Ofrecemos sesiones de fotos profesionales especializadas en crear imágenes de perfil impactantes para aplicaciones de citas. Nuestro equipo de fotógrafos expertos sabe exactamente cómo capturar tu mejor ángulo y personalidad.

            Cada sesión incluye:
            • 1 hora de fotografía
            • Múltiples cambios de ropa
            • 10 fotos editadas profesionalmente
            • Recomendaciones personalizadas
            • Entrega digital en 48 horas`}
          />
          <ServiceView data={data} />
        </>
      ),
    },
    {
      label: 'Reseña',
      content: <ServiceDetailsReviews />,
    },
    {
      label: 'Ubicación',
      content: <EventLocation />,
    },
  ];

  return (
    <>
      <EventGallery
        images={[
          'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]}
      />
      <StyledDetailContainer>
        <StyledDetailTitle>Sesión de Fotos Profesional</StyledDetailTitle>
        <StyledDetailsRateContainer>
          <Rating name='read-only' value={3.5} precision={0.5} readOnly />
          <p style={{ margin: 0, fontSize: '12px' }}>4.9</p>
          <StyledDetailOwnerLabel>(124 reseñas)</StyledDetailOwnerLabel>
        </StyledDetailsRateContainer>
        <StyledDetailsEventContainer $width='fit-content'>
          <DiscoverInfo icon={'location'}>{'Café Connections'}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <StyledDetailsEventContainer $width='fit-content'>
          <DiscoverInfo icon={'money'}>{'Cotizar'}</DiscoverInfo>
        </StyledDetailsEventContainer>
        <EventOrganizationInfo
          name={'Captura Perfecta'}
          profileImage={''}
          subtitle='Empresa'
          button={false}
        />
        <DetailsTabsInfo tabs={tabs} />
      </StyledDetailContainer>
      <StyledDetailsActions>
        <Button type='button' variant='outlined'>
          Contactar
        </Button>
        <Button type='button'>Asistiré</Button>
      </StyledDetailsActions>
    </>
  );
}
