import ArrowRight from '@/assets/icons/arrow_right';
import {
  NextButton,
  PrevButton,
  StyledSlideControlsContainer,
} from '@/styles/shared/slider';
import React from 'react';

export default function SliderControls({
  handlePrevClick,
  handleNextClick,
  prevDisabled,
  nextDisabled
}) {
  return (
    <StyledSlideControlsContainer>
      <PrevButton
        onClick={handlePrevClick}
        disabled={prevDisabled }
      >
        <ArrowRight color='var(--color-neutral-gris-02)' />
      </PrevButton>

      <NextButton
        onClick={handleNextClick}
        disabled={nextDisabled}
      >
        <ArrowRight color='var(--color-neutral-gris-02)' />
      </NextButton>
    </StyledSlideControlsContainer>
  );
}
