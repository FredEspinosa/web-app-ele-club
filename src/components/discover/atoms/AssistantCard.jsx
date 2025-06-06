import {
  StyledAssistantCard,
  StyledDetailOwnerContainer,
} from '@/styles/discover/containers';
import { StyledDetailOwner } from '@/styles/discover/texts';
import { Avatar, Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function AssistantCard({
  name = '',
  profileImage = '',
  profileLink = '',
}) {
  return (
    <StyledAssistantCard>
      <Avatar alt={name} src={profileImage} sx={{ width: 40, height: 40 }} />
      <StyledDetailOwnerContainer>
        <StyledDetailOwner>{name}</StyledDetailOwner>
        <Button
          sx={{
            textTransform: 'none',
            color: 'var(--color-primario-violeta-08)',
            fontSize: '14px',
            fontWeight: '500',
          }}
          onClick={() => console.log(profileLink)}
        >
          Ver perfil
        </Button>
      </StyledDetailOwnerContainer>
    </StyledAssistantCard>
  );
}

AssistantCard.propTypes = {
  name: PropTypes.string,
  profileImage: PropTypes.string,
  profileLink: PropTypes.string,
};
