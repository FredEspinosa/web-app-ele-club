import { AnimatedCheckIcon, CloseIcon } from '@/assets/icons';
import AnimatedCheckCircle from '@/assets/icons/AnimatedCheck';
import { Button } from '@/components/shared/atoms';
import useReviewForm from '@/hooks/discover/useReviewForm';
import {
  StyledDetailOwnerLabel,
  StyledDetailTitle,
} from '@/styles/discover/texts';
import { flex } from '@/styles/globals/mixins';
import styled from '@emotion/styled';
import { Rating, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';

const StyledFormContainer = styled.form`
  ${flex({
    alignItems: 'flex-start',
    gap: '24px'
  })}
  padding: 26px;
`;

const StyledHeaderContainer = styled.div`
  ${flex({
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  })}
  width: 100%;
`;

const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const StyledRateContainer = styled.div`
  ${flex({
    gap: '8px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  })}
  width: 100%;
`;

const StyledActionsContainer = styled.div`
  ${flex({
    gap: '16px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  })}
  width: 100%;
  padding: 0 7.5px;
`;

export default function ReviewForm({ handleClose }) {
  const { values, onSubmit, handleSetValue, handleSubmit, watch, rateLabel } =
    useReviewForm();

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
      <AnimatedCheckCircle />
      <StyledHeaderContainer>
        <StyledDetailTitle $size={'20px'}>
          Reseñar Sesión de Fotos Profesional
        </StyledDetailTitle>
        <StyledCloseButton onClick={handleClose} type='button'>
          <CloseIcon />
        </StyledCloseButton>
      </StyledHeaderContainer>
      <StyledDetailOwnerLabel>
        Comparte tu experiencia para ayudar a otros usuarios.
      </StyledDetailOwnerLabel>
      <StyledRateContainer>
        <Rating
          name='rate'
          value={values.ratingValue}
          onChange={(event, newValue) => {
            handleSetValue(event.target.name, newValue);
          }}
        />
        <StyledDetailOwnerLabel>{rateLabel}</StyledDetailOwnerLabel>
      </StyledRateContainer>

      <TextareaAutosize
        name='opinion'
        aria-label='Opinioninput'
        placeholder='Cuéntanos tu experiencia con este servicio...'
        style={{ width: '100%', height: '90px' }}
        maxLength={500}
        value={values.opinionValue}
        onChange={(e) => handleSetValue(e.target.name, e.target.value)}
      />
      <StyledActionsContainer>
        <Button
          size='full'
          variant='outlined'
          bgColorType='neutral-gris-02'
          type='submit'
        >
          Publicar reseña
        </Button>
        <Button
          size='full'
          variant='outlined'
          type='button'
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </StyledActionsContainer>
    </StyledFormContainer>
  );
}
