import { Button } from '@/components/shared/atoms'
import { StyledDetailOwnerContainer, StyledEventDetailOrganizationContainer } from '@/styles/discover/containers'
import { StyledDetailOwner, StyledDetailOwnerLabel } from '@/styles/discover/texts'
import { Avatar } from '@mui/material'

export default function EventOrganizationInfo({ name, profileImage, subtitle = 'Organizado por', button = true }) {
  return (
    <StyledEventDetailOrganizationContainer>
      <Avatar
        alt={name}
        src={profileImage}
        sx={{ width: 40, height: 40 }}
      />
      <StyledDetailOwnerContainer>
        <StyledDetailOwnerLabel>{subtitle}</StyledDetailOwnerLabel>
        <StyledDetailOwner >{name}</StyledDetailOwner>
      </StyledDetailOwnerContainer>
      {/* {button && <Button shape='pill' padding='5px 33px' variant='outlined'>
        Ver perfil
      </Button>} */}
    </StyledEventDetailOrganizationContainer>
  )
}
