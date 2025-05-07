import PropTypes from 'prop-types';
import { createContext, useState, useContext } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  return (
    <ProgressContext.Provider value={{ currentStep, setCurrentStep, totalSteps }}>
      {children}
    </ProgressContext.Provider>
  );
};

ProgressProvider.propTypes = {
    children: PropTypes.node
}

export const useProgress = () => useContext(ProgressContext);
