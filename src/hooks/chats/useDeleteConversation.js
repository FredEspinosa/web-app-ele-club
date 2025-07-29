import { API_ENDPOINTS } from '@/descubreApi';
import useSWRMutation from 'swr/mutation';

async function deleteConversationFetcher(url, { arg }) {
  const { id, token } = arg;
  if (!token) {
    throw new Error('El token de autenticación es requerido.');
  }
  const response = await fetch(`${url}?id=${id}`, {
    method: 'DELETE',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({ message: 'Error al eliminar la conversación.' }));
    throw new Error(errorInfo.message || `Error: ${response.status}`);
  }
  return true;
}


export function useDeleteConversation() {
  const endpoint = API_ENDPOINTS.CHATBOX.DELETE_CHAT;
  const { trigger, isMutating, error } = useSWRMutation(
    endpoint,
    deleteConversationFetcher
  );
  return {
    deleteConversation: trigger, // 'trigger' es la función que ejecuta la mutación
    isDeleting: isMutating,      // 'isMutating' es un booleano que indica si la petición está en curso
    deleteError: error,          // 'error' contendrá el objeto de error si la petición falla
  };
}