// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";

const InputCodigo = ({ setCodigo }) => {
  const [codigo, setCodigoState] = useState(["", "", "", ""]);
  const inputsRef = useRef([]); // Crear referencias para los inputs

  useEffect(() => {
    if (setCodigo) {
      const codigoCompleto = codigo.join("");
      setCodigo(codigoCompleto);
    }
  }, [codigo, setCodigo]);

  const manejadorCodigo = (e, position) => {
    const valor = e.target.value;
    if (/^\d$/.test(valor)) {
      const nuevoCodigo = [...codigo];
      nuevoCodigo[position] = valor;
      setCodigoState(nuevoCodigo);

      // Mover el foco al siguiente input si existe
      if (position < 3) {
        inputsRef.current[position + 1]?.focus();
      }
    }
  };

  const manejadorPasteCode = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, ""); // Solo números
    const nuevoCodigo = [...codigo];

    for (let i = 0; i < paste.length; i++) {
      if (i < 4) {
        nuevoCodigo[i] = paste[i];
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = paste[i]; // Actualizar visualmente
        }
      }
    }

    setCodigoState(nuevoCodigo);

    // Mover el foco al último input completado
    const lastIndex = Math.min(paste.length - 1, 3);
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div id="clubCodigoVerify" className="w-100">
      <div className="club_cont_inputs_codigo col-12">
        {codigo.map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)} // Asignar referencia
            className="club_input_codigo"
            onPaste={manejadorPasteCode}
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
