import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useGoToPlans = (offerType) => {
  const navigate = useNavigate();

  const goToPlans = useCallback(() => {
    if (offerType) {
      navigate(`/descubre/planes/${offerType}`);
    } else {
      // Si el usuario no ha seleccionado "Evento" o "Servicio", podemos llevarlo a una vista por defecto o mostrar un error.
      // Por ahora, lo llevaremos a la de evento por defecto.
      navigate(`/descubre/planes/b42b18cc-8777-477a-b0ad-1a66c558b976`);
    }
  }, [offerType, navigate]);

  return goToPlans;
};
