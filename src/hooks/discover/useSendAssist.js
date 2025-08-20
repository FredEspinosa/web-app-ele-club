import { API_ENDPOINTS } from "@/descubreApi";

const useSendAssist = () => {
  const sendAssist = async ({ offerId }) => {
    const userId = localStorage.getItem("userId");
    const token = sessionStorage.getItem("AccessToken");

    if (!userId || !offerId || !token) {
      throw new Error("Faltan datos para enviar la asistencia o token no disponible");
    }

    try {
      const response = await fetch(API_ENDPOINTS.POST_PARTICIPANTS_ASSIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ offerId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar la asistencia");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en sendAssist:", error);
      throw error;
    }
  };

  return { sendAssist };
}; 

export default useSendAssist;
