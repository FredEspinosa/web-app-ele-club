import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckIcon } from '@/assets/icons';
import { StyledDetailTitle } from '@/styles/discover/texts';

export default function AboutServices({ checks = [], description }) {
  return (
    <>
      <StyledDetailTitle $size={16}>Acerca del servicio</StyledDetailTitle>
      <p className='club_info_span_card_discover'>{description}</p>
      <StyledDetailTitle $size={16}>¿Qué incluye?</StyledDetailTitle>
      <List>
        {checks.map((text, index) => (
          <ListItem key={index} sx={{ padding: '0 0 10px 0'}}>
            <ListItemIcon sx={{ minWidth: '25px' }}>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ fontSize: '14px', color: 'var(--color-neutral-gris-02)' }}
            >
              {text}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <StyledDetailTitle $size={16}>También te puede interesar</StyledDetailTitle>
      </>
  );
}
