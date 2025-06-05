import { SliderTrack, SliderWrapper, StyledHeaderContainer } from '@/styles/shared/slider';
import React from 'react'
import { SliderControls, ObservedSlide } from '@/components/shared/atoms';
import useMotionSlider from '@/hooks/shared/useMotionSlider';

export default function MotionSlider({ title, children }) {
  const {
    handlePrevClick,
    handleNextClick,
    prevDisabled,
    nextDisabled,
    handleInView,
    handleOutOfView,
    currentIndex,
    slideRefs,
  } = useMotionSlider({ children })
  return (
    <>
      <StyledHeaderContainer>
        {title}
        <SliderControls 
        {...{
          handlePrevClick,
          handleNextClick,
          prevDisabled,
          nextDisabled
        }}
        />
      </StyledHeaderContainer>
      <SliderWrapper>
        <SliderTrack>
          {React.Children.map(children, (child, i) => (
            <ObservedSlide
              index={i}
              onVisible={handleInView}
              onOutVisible={handleOutOfView}
              currentIndex={currentIndex}
              setRef={(el) => (slideRefs.current[i] = el)}
            >
              {child}
            </ObservedSlide>
          ))}
        </SliderTrack>
      </SliderWrapper>
    </>
  );
}