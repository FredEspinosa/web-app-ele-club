import React, { createContext, useState, useEffect } from 'react';
import { messaging } from '../../services/firebaseConfig';
import { onMessage } from 'firebase/messaging';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(() => {
        const stored = localStorage.getItem("unreadNotifications");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (messaging) {
            onMessage(messaging, (payload) => {
                console.log("data onMessage", payload);
                
                const newNotif = payload.data;
                // const newNotif = payload.notification;
                console.log("🔔 Nueva notificación recibida:", newNotif);

                setNotifications((prev) => {
                    const updated = [...prev, newNotif];
                    localStorage.setItem("unreadNotifications", JSON.stringify(updated));
                    return updated;
                });
            });
        }
    }, []);

    const markAllAsRead = () => {
        setNotifications([]);
        localStorage.removeItem("unreadNotifications");
    };

    const removeNotification = (index) => {
        const updated = [...notifications];
        updated.splice(index, 1);
        setNotifications(updated);
        localStorage.setItem("unreadNotifications", JSON.stringify(updated));
    };

    return (
        <NotificationContext.Provider value={{ notifications, markAllAsRead, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
