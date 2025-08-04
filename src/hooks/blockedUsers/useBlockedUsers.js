import { API_ENDPOINTS } from "@/descubreApi";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const fetchWithToken = async ([url, token]) => {
  if (!token) throw new Error("Token no proporcionado.");

  const response = await fetch(url, {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(errorInfo.message || "Error en la petición a la API.");
  }
  return response.json();
};

const unblockUserFetcher = async (url, { arg }) => {
  const { userId, token } = arg;
  if (!userId || !token) throw new Error("Se requiere userId y token.");

  const response = await fetch(`${url}/${userId}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(errorInfo.message || "Error al desbloquear el usuario.");
  }
  return true;
};

const blockUserFetcher = async (url, { arg }) => {
  const { targetUserId, reason, additionalInfo, token } = arg;
  if (!targetUserId || !token) throw new Error("Se requiere targetUserId y token.");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      targetUserId,
      reason,
      additionalInfo,
    }),
  });
  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(errorInfo.message || "Error al bloquear el usuario.");
  }
  return response.json();
};

export const useBlockedUsers = (token) => {
  const endpoint = API_ENDPOINTS.BLOCKED_USERS.GET_BLOCKED_USERS;
  const { data, error, isLoading, mutate } = useSWR(token ? [endpoint, token] : null, fetchWithToken);

  return {
    blockedUsers: data?.result || [],
    isLoading,
    error,
    mutateBlockedUsers: mutate,
  };
};

export const useUnblockUser = () => {
  const endpoint = API_ENDPOINTS.BLOCKED_USERS.UNBLOCK_USER;
  const { trigger, isMutating } = useSWRMutation(endpoint, unblockUserFetcher);

  return {
    unblockUser: trigger, // 'trigger' es la función que ejecuta la mutación
    isUnblocking: isMutating, // 'isMutating' indica si la petición está en curso
  };
};

export const useBlockUser = () => {
  const endpoint = API_ENDPOINTS.BLOCKED_USERS.BLOCK_USER;
  const { trigger, isMutating, error } = useSWRMutation(endpoint, blockUserFetcher);

  return {
    blockUser: trigger, // 'trigger' es la función que ejecuta la mutación
    isBlocking: isMutating, // 'isMutating' indica si la petición está en curso
    blockError: error, // 'error' contendrá el objeto de error si la petición falla
  };
};
