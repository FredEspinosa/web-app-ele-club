// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const InputCodigo = ({ setCodigo }) => {
  const [codigo, setCodigoState] = useState(["", "", "", ""]);

  useEffect(() => {
    if (setCodigo) {
      const codigoCompleto = codigo.join("");
      setCodigo(codigoCompleto);
    }
  }, [codigo, setCodigo]);

  const manejadorCodigo = (e, position) => {
    const valor = e.target.value;
  
    if (/^\d$/.test(valor)) { // Solo aceptar un dígito
      const nuevoCodigo = [...codigo];
      nuevoCodigo[position] = valor;
      setCodigoState(nuevoCodigo);
  
      // Mover el foco al siguiente input
      const inputs = document.querySelectorAll(".input_code");
      if (inputs.length > position + 1) {
        inputs[position + 1].focus();
      }
    }
  };

  const manejadorFocusCodigo = (e, position) => {
    const inputs = document.querySelectorAll(".club_input_codigo");
    if (position >= 0 && position < inputs.length && inputs[position]) {
      const nuevoCodigo = [...codigo];
      nuevoCodigo[position] = ""; // Borra el valor del estado
      setCodigoState(nuevoCodigo);
      inputs[position].value = ""; // Borra visualmente el input
    } else {
      console.error("El índice está fuera de rango o el input no existe.");
    }
  };

  const manejadorPasteCode = (e, position) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, ""); // Solo números
    const inputs = document.querySelectorAll(".input_code");
    const nuevoCodigo = [...codigo];
  
    for (let i = 0; i < paste.length; i++) {
      if (position + i < inputs.length) {
        nuevoCodigo[position + i] = paste[i];
        inputs[position + i].value = paste[i];
      }
    }
  
    setCodigoState(nuevoCodigo);
  
    // Mueve el foco al siguiente input
    if (position + paste.length < inputs.length) {
      inputs[position + paste.length].focus();
    }
  };

  return (
    <div id="clubCodigoVerify" className="w-100">
      <div className="club_cont_inputs_codigo col-12">
        {codigo.map((_, index) => (
          <input
            key={index}
            className="club_input_codigo"
            onPaste={(e) => manejadorPasteCode(e, index)}
            onFocus={(e) => manejadorFocusCodigo(e, index)}
            onChange={(e) => manejadorCodigo(e, index)}
            type="tel"
            maxLength={1}
          />
        ))}
      </div>
    </div>
  );
};

export default InputCodigo;
