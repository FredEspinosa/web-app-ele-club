import React, { createContext, useState, useEffect } from 'react';
import { messaging } from '../../services/firebaseConfig';
import { onMessage } from 'firebase/messaging';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState(() => {
        const stored = localStorage.getItem("unreadNotifications");
        return stored ? JSON.parse(stored) : [];
    });

    // Crea un identificador unico para las notificaciones
    const generateNotificationKey = (notif) => {
        return `${notif.type}-${notif.userId}-${notif.title}`;
    };


    useEffect(() => {
        if (messaging) {
            // onMessage(messaging, (payload) => {
            //     console.log("data onMessage", payload);

            //     const newNotif = payload.data;
            //     // const newNotif = payload.notification;
            //     console.log("🔔 Nueva notificación recibida:", newNotif);

            //     setNotifications((prev) => {
            //         const updated = [...prev, newNotif];
            //         localStorage.setItem("unreadNotifications", JSON.stringify(updated));
            //         return updated;
            //     });
            // });

            // Evita duplicado de notificaciones
            onMessage(messaging, (payload) => {
                const newNotif = payload.data;
                const key = generateNotificationKey(newNotif);

                // const dismissed = JSON.parse(localStorage.getItem("dismissedNotifications")) || [];

                // if (dismissed.includes(key)) {
                //     console.log("🔕 Notificación ya eliminada anteriormente, no se mostrará.");
                //     return;
                // }

                // const alreadyInState = notifications.some(n => generateNotificationKey(n) === key);
                // if (alreadyInState) {
                //     console.log("🔄 Notificación ya está en el estado, no se agregará de nuevo.");
                //     return;
                // }

                // ✅ Asigna un ID único temporal para control interno
                newNotif._id = key;

                setNotifications((prev) => {
                    const updated = [...prev, newNotif];
                    localStorage.setItem("unreadNotifications", JSON.stringify(updated));
                    return updated;
                });
            });
        }
    }, [notifications]);

    const markAllAsRead = () => {
        setNotifications([]);
        localStorage.removeItem("unreadNotifications");
    };

    // const removeNotification = (index) => {
    //     const updated = [...notifications];
    //     updated.splice(index, 1);
    //     setNotifications(updated);
    //     localStorage.setItem("unreadNotifications", JSON.stringify(updated));
    // };

    // Función para ir eliminando notificacion por notificacion con identificador unico
    const removeNotification = (index) => {
        const updated = [...notifications];
        const removed = updated.splice(index, 1)[0];

        const key = generateNotificationKey(removed);
        // const dismissed = JSON.parse(localStorage.getItem("dismissedNotifications")) || [];

        // if (!dismissed.includes(key)) {
        //     dismissed.push(key);
        //     localStorage.setItem("dismissedNotifications", JSON.stringify(dismissed));
        // }

        setNotifications(updated);
        localStorage.setItem("unreadNotifications", JSON.stringify(updated));
    };


    return (
        <NotificationContext.Provider value={{ notifications, markAllAsRead, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
