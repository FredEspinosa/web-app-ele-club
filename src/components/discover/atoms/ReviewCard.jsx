import {
  StyledDetailOwnerContainer,
  StyledEventDetailOrganizationContainer,
} from '@/styles/discover/containers';
import {
  StyledDetailOwner,
  StyledDetailOwnerLabel,
} from '@/styles/discover/texts';
import { getInitials } from '@/utils/functions/discover';
import { Avatar, Rating } from '@mui/material';

export default function ReviewCard({
  userName = 'Usuario desconocido',
  rating = 0,
  timeSincePublished = 'hace un momento',
  comment = '',
  userPhoto = ''
}) {
  return (
    <div>
      <StyledEventDetailOrganizationContainer>
        <Avatar alt={userName} src={userPhoto} sx={{ width: 40, height: 40 }} >
          {!userPhoto && getInitials(userName)}
        </Avatar>
        <StyledDetailOwnerContainer>
          <StyledDetailOwner>{userName}</StyledDetailOwner>
          <Rating name='read-only' value={rating} precision={0.5} readOnly />
        </StyledDetailOwnerContainer>
        <StyledDetailOwnerLabel>{timeSincePublished}</StyledDetailOwnerLabel>
      </StyledEventDetailOrganizationContainer>
      <pre style={{ whiteSpace: 'pre-line', fontSize: '12px', fontWeight: '400', color: 'var(--color-neutral-gris-02)' }}>
        {comment}
      </pre>
    </div>
  );
}
