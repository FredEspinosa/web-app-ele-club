import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { flex } from '@mixins';

export const SliderWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  position: relative;
`;

export const SliderTrack = styled(motion.div)`
  display: flex;
  padding: 4px 0;
  gap: 1rem;
`;

export const SlideContainer = styled.div`
  flex-shrink: 0;
  scroll-snap-align: center;
`;

export const StyledHeaderContainer = styled.div`
  ${flex({
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10px',
  })}
`;

export const StyledSlideControlsContainer = styled.div`
  ${flex({
    flexDirection: 'row',
    gap: '3px',
  })}
`;

export const Button = styled.button`
  ${flex({})}
  background: var(--color-background-blanco);
  border: 1px solid var(--color-neutral-gris-04);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }
`;

export const PrevButton = styled(Button)`
  transform: rotate(-180deg);
`;

export const NextButton = styled(Button)``;
