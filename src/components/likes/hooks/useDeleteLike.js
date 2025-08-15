import { API_ENDPOINTS } from "@/descubreApi";
import { useState } from "react";

export const useDeleteLike = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLike = async ({ userId, likedUserId, token }) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = API_ENDPOINTS.LIKES.DELETE_LIKE(userId, likedUserId);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error en el servidor." }));
        throw new Error(errorData.message || "No se pudo eliminar el like.");
      }
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteLike, isLoading, error };
};
