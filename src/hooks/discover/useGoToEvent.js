import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGoToEvent = (id) => {
  const navigate = useNavigate();

  const goToEvent = useCallback(() => {
    if (id) {
      navigate(`/descubre/evento/${id}`);
    } else {
      console.warn('useGoToEvent: id es undefined');
    }
  }, [id, navigate]);

  return goToEvent;
};
