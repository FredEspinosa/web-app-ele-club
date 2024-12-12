// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const AlertSuscribe = ({ cerrarModal, tituloModal, mensajeModal, btnCancelar, btnMsjCancelar, btnAceptar, btnMsjButtom, handleSuscribe }) => {
  const [isVisible, setIsVisible] = useState(true); // Controla la visibilidad del popup

  const handleAceptar = () => {
    setIsVisible(false); // Ocultar el popup sin solicitar la ubicación
    cerrarModal();
  };

  const handleCancelar = () => {
    setIsVisible(false); // Ocultar el popup sin solicitar la ubicación
    cerrarModal();
  };

  if (!isVisible) {
    return null; // No mostrar el popup si no es visible
  }

  return (
    <div>
        <div className="club_modal modal fade show club_modal_suscribe">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-body club_txt_body_suscribe">
                        {mensajeModal}
                    </div>
                    <div className="modal-footer">
                        {btnAceptar && 
                            <button className="btn club_btn club_btn_full club_btn_full_general club_bg_violeta_05" onClick={handleSuscribe}>{btnMsjButtom}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default AlertSuscribe;
