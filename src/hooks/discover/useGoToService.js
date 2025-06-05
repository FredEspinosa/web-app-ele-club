import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGoToService = (id) => {
  const navigate = useNavigate();

  const goToEvent = useCallback(() => {
    if (id) {
      navigate(`/descubre/servicio/${id}`);
    } else {
      console.warn('useGoToService: id es undefined');
    }
  }, [id, navigate]);

  return goToEvent;
};
