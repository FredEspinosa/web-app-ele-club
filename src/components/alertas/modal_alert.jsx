// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const ModalAlertas = ({ cerrarModal, tituloModal, mensajeModal, btnCancelar, btnMsjCancelar, btnAceptar, btnMsjAceptar }) => {
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
        <div className="club_modal modal fade show">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title club_titulo_3_size_20" id="exampleModalLabel">
                            {tituloModal}
                        </h5>
                        <button type="button" className="btn-close club_color_fuente_blanco" onClick={cerrarModal}></button>
                    </div>
                    <div className="modal-body club_txt_body">
                        {mensajeModal}
                    </div>
                    <div className="modal-footer">
                        {btnCancelar && 
                            <button className="btn club_btn club_btn_borde_gris club_color_fuente_gris_01" onClick={handleCancelar}>{btnMsjCancelar}</button>
                        }
                        {btnAceptar && 
                            <button className="btn club_btn club_bg_oro club_color_fuente_blanco" onClick={handleAceptar}>{btnMsjAceptar}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default ModalAlertas;
