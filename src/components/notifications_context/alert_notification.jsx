import { useContext, useEffect, useRef } from 'react';
import { NotificationContext } from './notification_context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertaNotificacion = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);
    const lastShownIndex = useRef(0);

    useEffect(() => {
        if (notifications.length < lastShownIndex.current) {
            lastShownIndex.current = 0; // Reinicia si se vació el array
        }

        if (notifications.length > lastShownIndex.current) {
            const newNotifications = notifications.slice(lastShownIndex.current);

            newNotifications.forEach((notif, idx) => {
                toast.info(
                    <div
                        onClick={() => removeNotification(lastShownIndex.current + idx)}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong>{notif.title || "Nueva notificación"}</strong>
                        <div>{notif.body || "Tienes una nueva alerta"}</div>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    }
                );
            });

            lastShownIndex.current = notifications.length;
        }
    }, [notifications]);


    return <ToastContainer />;
};

export default AlertaNotificacion;
