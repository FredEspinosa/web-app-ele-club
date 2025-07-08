import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { DetailsButton, DiscoverInfo } from '../atoms';
import {
  StyledCardContainer,
  StyledDetailsEventContainer,
} from '../../../styles/discover/containers';
import { StyledDiscoverRegularText } from '../../../styles/discover/texts';
import React, { useMemo } from 'react';
import { useGoToEvent } from '@/hooks/discover/useGoToEvent';

function EventCard({
  img,
  title,
  location,
  date,
  hour,
  assistants,
  distance,
  id,
}) {
  const goToEvent = useGoToEvent(id);

  const cardOptions = useMemo(() => {
    if (!distance) return {
      as: 'button',
      onClick: goToEvent,
    };
    return {};
  }, [distance, goToEvent]);

  return (
    <Card
      sx={{
        width: distance ? '100%' : '250px',
        minWidth: '250px',
        maxWidth: distance ? 'auto' : '250px',
        borderRadius: '16px',
        minHeight: distance ? '233px' : '199px',
        maxHeight: distance ? '0' : '199px',
        height: distance ? '233px' : '199px',
      }}
    >
      <StyledCardContainer {...cardOptions}>
        <CardMedia component='img' height='100' image={img} alt={title} />
        <CardContent
          sx={{
            padding: '18px',
            background: 'var(--color-background-blanco)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '10px',
            overflow: 'hidden'
          }}
        >
          <p
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              maxWidth: '100%'
             }}
            
          >
            {title}
          </p>
          <DiscoverInfo icon={'location'} color='var(--color-gris-descubre)'>
            {location}
          </DiscoverInfo>
          <StyledDetailsEventContainer>
            <DiscoverInfo icon={'calendar'}>{date}</DiscoverInfo>
            {hour && <DiscoverInfo icon={'clock'}>{hour}</DiscoverInfo>}
            {assistants && (
              <DiscoverInfo icon={'user'}>{assistants}</DiscoverInfo>
            )}
          </StyledDetailsEventContainer>
          {distance && (
            <StyledDetailsEventContainer
              $width='100%'
              $padding='6px 0 0 0'
              $justify='space-between'
            >
              <StyledDiscoverRegularText $color='var(--color-gris-descubre)'>
                {distance}
              </StyledDiscoverRegularText>
              <DetailsButton action={goToEvent} />
            </StyledDetailsEventContainer>
          )}
        </CardContent>
      </StyledCardContainer>
    </Card>
  );
}


EventCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  hour: PropTypes.string,
  assistants: PropTypes.string,
  distance: PropTypes.string,
  id: PropTypes.string,
};

const MemoizedEventCard = React.memo(EventCard, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.img === nextProps.img &&
    prevProps.title === nextProps.title &&
    prevProps.location === nextProps.location &&
    prevProps.date === nextProps.date &&
    prevProps.hour === nextProps.hour &&
    prevProps.assistants === nextProps.assistants &&
    prevProps.distance === nextProps.distance
  );
});

export default MemoizedEventCard;
