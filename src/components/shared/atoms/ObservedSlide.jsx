import { SlideContainer } from '@/styles/shared/slider';
import React from 'react'
import { useInView } from 'react-intersection-observer';

export default function ObservedSlide({
  index,
  onVisible,
  onOutVisible,
  currentIndex,
  setRef,
  children,
}) {
  const [ref, inView] = useInView({ threshold: 0.8 });

  React.useEffect(() => {
    if (inView) {
      // eslint-disable-next-line react/prop-types
      if (!currentIndex.includes(index)) {
        onVisible(index);
      }
      // eslint-disable-next-line react/prop-types
    } else if (!inView && currentIndex.includes(index)) {
      onOutVisible(index);
    }
  }, [inView, index, onVisible, onOutVisible, currentIndex]);

  return (
    <SlideContainer
      ref={(el) => {
        ref(el);
        setRef(el);
      }}
    >
      {children}
    </SlideContainer>
  );
}
