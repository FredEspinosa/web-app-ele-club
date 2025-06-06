import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

const useMotionSlider = ({ children }) => {
  const totalSlides = React.Children.count(children);
  const [currentIndex, setCurrentIndex] = useState([0]);
  const slideRefs = useRef([]);

  const handleInView = (index) => {
    const newState = [...currentIndex, index];
    const orderedState = newState.sort((a, b) => a - b);
    setCurrentIndex(orderedState);
  };

  const handleOutOfView = (index) => {
    const newState = currentIndex.filter((current) => current !== index);
    const orderedState = newState.sort((a, b) => a - b);
    setCurrentIndex(orderedState);
  };

  useLayoutEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, totalSlides);
  }, [children, totalSlides]);

  const handlePrevClick = () => {
    const prev = Math.max(0, currentIndex[0] - 1);
    slideRefs.current[prev]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  };

  const handleNextClick = () => {
    const next = Math.min(totalSlides - 1, currentIndex.at(-1) + 1);
    slideRefs.current[next]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  };
  const prevDisabled = useMemo(() => {
    if (!totalSlides) return true;
    if (currentIndex.length === 0) return true;
    return currentIndex[0] === 0;
  }, [currentIndex, totalSlides]);

  const nextDisabled = useMemo(() => {
    if (!totalSlides) return true;
    if (currentIndex.length === 0) return true;
    return currentIndex.at(-1) === totalSlides - 1;
  }, [currentIndex, totalSlides]);

  return {
    handlePrevClick,
    handleNextClick,
    prevDisabled,
    nextDisabled,
    handleInView,
    handleOutOfView,
    currentIndex,
    slideRefs,
  };
};

export default useMotionSlider;
