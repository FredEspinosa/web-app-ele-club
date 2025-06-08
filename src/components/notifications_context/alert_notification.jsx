import { useContext, useEffect, useRef } from 'react';
import { NotificationContext } from './notification_context';
import { toast, ToastContainer } from 'react-toastify';
import PerfilDefault from '../../assets/images/perfil/blank-profile-picture.png';
import 'react-toastify/dist/ReactToastify.css';

const STORAGE_KEY = 'shownNotificationHashes';

async function hashNotification(notification) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(notification));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getStoredHashes() {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored ? new Set(JSON.parse(stored)) : new Set();
}

function saveHashes(hashes) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(hashes)));
}

const AlertaNotificacion = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);
  const shownHashes = useRef(getStoredHashes());

  useEffect(() => {
    const mostrarNotificaciones = async () => {
      let updated = false;

      for (const notif of notifications) {
        const hash = await hashNotification(notif);

        if (!shownHashes.current.has(hash)) {
          toast(
            <div
              className='col-12 d-flex align-items-center justify-content-around'
              onClick={() => removeNotification(hash)}
              style={{ cursor: 'pointer' }}
            >
              <div className='col-2'>
                <img
                  className='club_cont_perfil_img club_img_notify'
                  src={notif?.profilePictureURL || PerfilDefault}
                />
              </div>
              <div className='col-10'>
                <strong>{notif?.title || 'Nueva notificación'}</strong>
                <div>{notif?.body || 'Tienes una nueva alerta'}</div>
              </div>
            </div>,
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },
          );
          shownHashes.current.add(hash);
          updated = true;
        }
      }

      if (updated) {
        saveHashes(shownHashes.current);
      }
    };

    if (notifications.length > 0) {
      mostrarNotificaciones();
    }
  }, [notifications, removeNotification]);

  return <ToastContainer />;
};

export default AlertaNotificacion;
