// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const PermisosUbi = ({cerrarModal}) => {
  const [isVisible, setIsVisible] = useState(true); // Controla la visibilidad del popup
  const [location, setLocation] = useState(null); // Almacena la ubicación del usuario
  const [error, setError] = useState(null); // Almacena errores

  // Función para solicitar la ubicación del usuario
  const pedirPermisoUbicacion = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setIsVisible(false); // Ocultar el popup después de obtener la ubicación
        },
        (err) => {
          setError('Permiso de ubicación denegado o no disponible');
          setIsVisible(false); // Ocultar el popup incluso si el usuario deniega el permiso
          console.error(err);
        }
      );
    } else {
      setError('El navegador no soporta la geolocalización');
      setIsVisible(false);
    }
  };

  // Manejar la acción al hacer clic en "Aceptar"
  const handleAceptar = () => {
    pedirPermisoUbicacion();
  };

  // Manejar la acción al hacer clic en "Cancelar"
  const handleCancelar = () => {
    setIsVisible(false); // Ocultar el popup sin solicitar la ubicación
  };

  if (!isVisible) {
    return null; // No mostrar el popup si no es visible
  }

  return (

    <div>
        <div className="club_modal modal fade show">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title club_titulo_3_size_20" id="exampleModalLabel">Permitir acceso a tu ubicación</h5>
                        <button type="button" className="btn-close club_color_fuente_blanco" data-bs-dismiss="modal" aria-label="Close" onClick={cerrarModal}></button>
                    </div>
                    <div className="modal-body club_txt_body">
                        <p>¿Te gustaría compartir tu ubicación actual para obtener servicios personalizados?</p>
                        {error && <p>{error}</p>}
                        {location && (
                            <p>Tu ubicación actual es: Latitud: {location.latitude}, Longitud: {location.longitude}</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className='btn club_btn club_btn_borde_gris club_color_fuente_gris_01' onClick={handleCancelar}>Cancelar</button>
                        <button className='btn club_btn club_bg_violeta_08 club_color_fuente_blanco' onClick={handleAceptar}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default PermisosUbi;
