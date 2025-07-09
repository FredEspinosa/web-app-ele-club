import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";

export const useGoToContribuir = (offerType) => {
  const navigate = useNavigate();

  const goToContribuir = useCallback(() => {
    // if (offerType === OFFERS_TYPE_IDS.EVENTO || offerType === OFFERS_TYPE_IDS.SERVICIO) {
    //   if (offerType === OFFERS_TYPE_IDS.EVENTO) {
    //     navigate("/descubre/contribuir/evento");
    //   } else if (offerType === OFFERS_TYPE_IDS.SERVICIO) {
    //     navigate("/descubre/contribuir/servicio");
    //   }
    // } else {
    //   navigate("/descubre/contribuir/evento");
    // }

    if (offerType === OFFERS_TYPE_IDS.EVENTO || offerType === OFFERS_TYPE_IDS.SERVICIO) {
      navigate(`/descubre/contribuir/${offerType}`);
    } else {
      navigate(`/descubre/contribuir/${OFFERS_TYPE_IDS.EVENTO}`);
    }
  }, [offerType, navigate]);

  return goToContribuir;
};
