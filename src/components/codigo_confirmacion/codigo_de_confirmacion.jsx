// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCodigo from "./input_codigo";

const CodigoValidacion = ({ avanzarPagina }) => {
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [codigoCorrecto, setCodigoCorrecto] = useState("0000");
  const [codigoIngresado, setCodigoIngresado] = useState(""); // Cambia este estado
  const [mensaje, setMensaje] = useState("");
  const [reenviado, setReenviado] = useState(false);
  const [telUsuario, setTelUsuario] = useState("");

  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosUsuario");
    if (datosGuardados) {
      const parsedDatos = JSON.parse(datosGuardados);
      setDatosUsuario(parsedDatos);
      if (parsedDatos?.Telefono) {
        const numeroTel = parsedDatos.CodigoPais + parsedDatos.Telefono;
        setTelUsuario(numeroTel);
        alert(`Tu código de teléfon es: ${codigoCorrecto}`);
      } else {
        console.log("No se encontró el dato 'Telefono'.");
      }
    } else {
      console.log("No se encontraron datos guardados en el localStorage.");
    }
  }, []);

  // Validar el código
  const validarCodigo = () => {
    if (codigoIngresado === codigoCorrecto) {
      setMensaje("Código correcto. Avanzando...");
      navigate("/datos_personales");
    } else {
      setMensaje("El código es incorrecto. Inténtalo nuevamente.");
    }
  };

  // Generar un nuevo código
  const reenviarCodigo = () => {
    const nuevoCodigo = Math.floor(1000 + Math.random() * 9000).toString();
    setCodigoCorrecto(nuevoCodigo);
    setReenviado(true);
    setTimeout(() => setReenviado(false), 2000);
    console.log("Nuevo código reenviado:", nuevoCodigo);
    alert(`Tu código de teléfon es: ${nuevoCodigo}`);
  };

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
    </div>
  );
};

export default CodigoValidacion;

