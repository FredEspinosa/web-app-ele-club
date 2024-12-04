// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCodigo from "./input_codigo";
import { obtenerCodigo, validaCodigoToken } from "../../services/api";
import Loader from "../loader/loader";
import ModalAlertas from "../alertas/modal_alert";

const CodigoValidacion = ({ avanzarPagina }) => {
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [codigoCorrecto, setCodigoCorrecto] = useState("0000");
  const [codigoIngresado, setCodigoIngresado] = useState(""); // Cambia este estado
  const [reenviado, setReenviado] = useState(false);
  const [telUsuario, setTelUsuario] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // Mensajes de modal
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const [showBtnCancel, setShowBtnCancel] = useState(true);
  const [textoBtnCancel, setTextoBtnCancel] = useState("");
  const [showBtnAcept, setShowBtnAcept] = useState(true);
  const [textoBtnAcept, setTextoBtnAcept] = useState("");

  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosUsuario");
    if (datosGuardados) {
      const parsedDatos = JSON.parse(datosGuardados);
      setDatosUsuario(parsedDatos);
      if (parsedDatos?.Telefono) {
        const numeroTel = parsedDatos.CodigoPais + parsedDatos.Telefono;
        setTelUsuario(numeroTel);
        consultaTuCodigo(numeroTel)
      } else {
        console.log("No se encontró el dato 'Telefono'.");
      }
    } else {
      console.log("No se encontraron datos guardados en el localStorage.");
    }
  }, []);

  const consultaTuCodigo = async (numeroTel) => {
    setShowLoader(true)
    try {
      const data = await obtenerCodigo(numeroTel);
      console.log("data", data);
      if (!data.code) {
        setShowLoader(false);
        setCodigoCorrecto(data.code)
      } else {
        console.log("ocurrio un error ☠️");
      }
    } catch (err) {
      console.log(err);
      setShowLoader(false);
      // setShowAlert(true);
      // setTituloModal('Ocurrio un error ☠️')
      // setMensajeModal(<p>No se pudo enviar el código. <br /> Por favor intenta pedir un código nuevo</p>)
      // setShowBtnCancel(true)
      // setTextoBtnCancel('Cerrar')
      // setShowBtnAcept(false)
      // setTextoBtnAcept('Aceptar')
    }
  };

  const confirmarCodigo = async (telUsuario, codigoIngresado) => {
    console.log("parametros funcion", telUsuario, codigoIngresado);
    setShowLoader(true);
    try {
      const data = await validaCodigoToken(telUsuario, codigoIngresado);
      console.log("data", data);
      if (data.accessToken) {
        setShowLoader(false)
        setCodigoCorrecto(data.code)
        // localStorage.setItem('AccessToken', data.accessToken);
        sessionStorage.setItem('AccessToken', data.accessToken);
        navigate("/datos_personales");
      } else {
        console.log("ocurrio un error ☠️");
        
      }
    } catch (err) {
      console.log(err);
      setShowLoader(false);
      // setShowAlert(true);
      // setTituloModal('Ocurrio un error ☠️')
      // setMensajeModal(<p>Error de autenticación</p>)
      // setShowBtnCancel(true)
      // setTextoBtnCancel('Cerrar')
      // setShowBtnAcept(false)
      // setTextoBtnAcept('Aceptar')
    }
};

  // Validar el código
  const validarCodigo = () => {
    console.log("clic en validarCodigo");
    if (codigoIngresado) {
      console.log("Código correcto. Avanzando...");
      confirmarCodigo(telUsuario, codigoIngresado)
    } else {
      console.log("Ocurrio un error ☠️");
      // setShowAlert(true)
      // setTituloModal('Ocurrio un error')
      // setMensajeModal(<p>El código es incorrecto. Inténtalo nuevamente. ☠️</p>);
    }
  };

  // Generar un nuevo código
  const reenviarCodigo = () => {
    console.log("telUsuario", telUsuario);
    consultaTuCodigo(telUsuario)
  };

  const handleCerrarModal = () => {
    showAlert(false)
}

  return (
    <div>
      <div className="club_contenedor_full_height">
        <div id="clubCrearCuentaTel" className="club_contenedor container-lg club_sub_contenedor">
          <div className="club_cont_info_grow_1">
            <div className="col-12 d-flex justify-content-center club_cont_info_codigo">
              <h1 className="col-10 club_txt_titulo club_font_regular text-center">
                Entra código de confirmación
              </h1>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <p className="col-10 club_notificaciones_txt text-center">
                Un código de 4 dígitos fue enviado a: <br />
                {telUsuario}
              </p>
            </div>
            <div className="col-12 club_margin_top_56">
              <InputCodigo setCodigo={setCodigoIngresado} />
            </div>
          </div>
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button
              className="btn club_btn club_btn_full club_btn_full_general club_color_fuente_oro"
              onClick={reenviarCodigo}
            >
              Reenviar código
            </button>
          </div>
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button
              className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
              onClick={validarCodigo}
            >
              Continuar
            </button>
          </div>
          {/* {mensaje && <p>{mensaje}</p>} */}
        </div>
      </div>
      {(showLoader && <Loader /> )}
      {(showAlert && 
        <ModalAlertas 
          cerrarModal={handleCerrarModal}
          tituloModal={tituloModal}
          mensajeModal={mensajeModal}
          btnCancelar={true}
          btnMsjCancelar={textoBtnCancel}
          btnAceptar={true}
          btnMsjAceptar={textoBtnAcept}
        /> 
      )}
    </div>
  );
};

export default CodigoValidacion;

