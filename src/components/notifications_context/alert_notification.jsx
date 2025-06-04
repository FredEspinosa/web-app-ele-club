import { useContext, useEffect, useRef } from 'react';
import { NotificationContext } from './notification_context';
import { toast, ToastContainer } from 'react-toastify';
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import 'react-toastify/dist/ReactToastify.css';

const AlertaNotificacion = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);     // Mantén una referencia de notificaciones ya mostradas por su ID
    const lastShownIndex = useRef(0);
    const shownNotifs = useRef(new Set());


    useEffect(() => {
        if (notifications.length < lastShownIndex.current) {
            lastShownIndex.current = 0; // Reinicia si se vació el array            
        }

        if (notifications.length > lastShownIndex.current) {
            const newNotifications = notifications.slice(lastShownIndex.current);
            console.log("newNotifications", newNotifications);

            newNotifications.forEach((notif, idx) => {
                // toast.info( // Para agregar un icono en el alert
                const key = notif._id || `${notif.type}-${notif.userId}-${notif.title}`;

                if (!shownNotifs.current.has(key)) {
                    shownNotifs.current.add(key); // Marca como mostrada
                    toast(
                        <div
                            className='col-12 d-flex align-items-center justify-content-around'
                            onClick={() => removeNotification(lastShownIndex.current + idx)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className='col-2'>
                                <img className='club_cont_perfil_img club_img_notify' src={notif?.profilePictureURL || PerfilDefault} />
                            </div>
                            <div className='col-10'>
                                <strong>{notif?.title || "Nueva notificación"}</strong>
                                <div>{notif?.body || "Tienes una nueva alerta"}</div>
                            </div>
                        </div>,
                        {
                            position: "top-right",
                            autoClose: 5000,
                            // autoClose: false,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        }
                    );
                }
            });

            lastShownIndex.current = notifications.length;
        }

        // notifications.forEach((notif, idx) => {
        //     const key = notif._id || `${notif.type}-${notif.userId}-${notif.title}`;

        //     if (!shownNotifs.current.has(key)) {
        //         shownNotifs.current.add(key); // Marca como mostrada

        //         toast(
        //             <div
        //                 className='col-12 d-flex align-items-center justify-content-around'
        //                 onClick={() => removeNotification(idx)}
        //                 style={{ cursor: 'pointer' }}
        //             >   
        //                 <div className='col-2'>
        //                     <img className='club_cont_perfil_img club_img_notify' src={notif?.profilePictureURL || PerfilDefault }/>
        //                 </div>
        //                 <div className='col-10'>
        //                     <strong>{notif?.title || "Nueva notificación"}</strong>
        //                     <div>{notif?.body || "Tienes una nueva alerta"}</div>
        //                 </div>
        //             </div>,
        //             {
        //                 position: "top-right",
        //                 autoClose: 5000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //             }
        //         );
        //     }
        // });

    }, [notifications]);

    return <ToastContainer />;

};

export default AlertaNotificacion;
