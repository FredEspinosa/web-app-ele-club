import { StyledDetailOwnerContainer, StyledEventDetailOrganizationContainer } from '@/styles/discover/containers'
import { StyledDetailOwner, StyledDetailOwnerLabel } from '@/styles/discover/texts'
import { Avatar } from '@mui/material'
import { Button } from '../atoms'

export default function EventOrganizationInfo({ name, profileImage }) {
  return (
    <StyledEventDetailOrganizationContainer>
      <Avatar
        alt={name}
        src={profileImage}
        sx={{ width: 40, height: 40 }}
      />
      <StyledDetailOwnerContainer>
        <StyledDetailOwnerLabel>Organizado por</StyledDetailOwnerLabel>
        <StyledDetailOwner >{name}</StyledDetailOwner>
      </StyledDetailOwnerContainer>
      <Button shape='pill' padding='5px 33px' variant='outlined'>
        Ver perfil
      </Button>
    </StyledEventDetailOrganizationContainer>
  )
}
