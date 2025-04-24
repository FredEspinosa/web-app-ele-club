import { messaging } from './firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
import { askNotificationPermission } from './services/data';

export const requestAndSetupNotifications = async () => {
    const permission = await askNotificationPermission();
    if (permission === 'granted') {
        setupFCM();
    } else {
        console.warn("Permiso denegado para notificaciones");
    }
};

export const setupFCM = async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log("entro a notifications");

        try {
            const token = await getToken(messaging, {
                vapidKey: 'BLGzBu_jD9zIhiUhD-M_eimbYRPS0Ppto9yZ9VhA3MvIIfkCnHeTcbP41KgD7Mt77D68Joxg6V3vBANZoHQdHPE', // 🔐 Este lo sacas de Firebase Console > Cloud Messaging
                serviceWorkerRegistration: registration,
            });

            if (token) {
                console.log("📲 FCM Token:", token);
                sessionStorage.setItem("FCMToken", token)
                // Aquí puedes enviar el token a tu back
            } else {
                console.warn("🚫 No se obtuvo token. Verifica los permisos.");
            }
        } catch (err) {
            console.error("❌ Error al obtener token FCM:", err);
        }

        // Escucha notificaciones en primer plano
        onMessage(messaging, (payload) => {
            console.log("🔔 Mensaje recibido en primer plano:", payload);
            // Puedes mostrar una alerta personalizada si quieres
        });
    }
};
