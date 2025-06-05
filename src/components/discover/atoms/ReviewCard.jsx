import {
  StyledDetailOwnerContainer,
  StyledEventDetailOrganizationContainer,
} from '@/styles/discover/containers';
import {
  StyledDetailOwner,
  StyledDetailOwnerLabel,
} from '@/styles/discover/texts';
import { Avatar, Rating } from '@mui/material';

export default function ReviewCard() {
  return (
    <div>
      <StyledEventDetailOrganizationContainer>
        <Avatar alt={'Laura G.'} src={''} sx={{ width: 40, height: 40 }} />
        <StyledDetailOwnerContainer>
          <StyledDetailOwner>{'Laura G.'}</StyledDetailOwner>
          <Rating name='read-only' value={3.5} precision={0.5} readOnly />
        </StyledDetailOwnerContainer>
        <StyledDetailOwnerLabel>hace 1 mes</StyledDetailOwnerLabel>
      </StyledEventDetailOrganizationContainer>
      <pre  style={{whiteSpace: 'pre-line', fontSize: '12px', fontWeight: '400', color: 'var(--color-neutral-gris-02)'}}>
      Increíble experiencia. Las fotos quedaron mucho mejor de lo 
      que esperaba y he recibido muchos cumplidos en mi perfil.
      </pre>
    </div>
  );
}
