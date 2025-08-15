import { useState } from "react";
import { API_ENDPOINTS } from "@/descubreApi";

export const useDeleteFriends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteFriend = async ({ friendId, token }) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = API_ENDPOINTS.FRIENDS.DELETE_FRIEND(friendId);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error en el servidor." }));
        throw new Error(errorData.message || "No se pudo eliminar al amigo.");
      }

      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteFriend, isLoading, error };
};
