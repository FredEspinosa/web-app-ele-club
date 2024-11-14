// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const OpcionesCheck = ({ opciones, onOptionSelect, tituloDeLista, iconoCheck, multiselect }) => {

    const [selectedOptions, setSelectedOptions] = useState([]); // Almacena múltiples opciones si multiselect es true
  
    const handleOptionClick = (opcion) => {
      if (multiselect) {
        // Si es multiselección, agrega o elimina la opción del array
        setSelectedOptions(prevOptions => 
          prevOptions.includes(opcion) 
            ? prevOptions.filter(item => item !== opcion)
            : [...prevOptions, opcion]
        );
      } else {
        // Si no es multiselección, reemplaza la opción seleccionada
        setSelectedOptions([opcion]);
      }
      onOptionSelect(multiselect ? [...selectedOptions, opcion] : opcion); // Devuelve la opción seleccionada al componente padre
    };

  return (
    <div>
        <div className='club_cont_opciones_check'>
            <p className='club_titulo_opciones_check'>{tituloDeLista}</p>
            <ul className='club_cont_lista_opciones_check'>
            {opciones.map((opcion, index) => (
                <li
                className='club_lista_opciones_check'
                key={index}
                onClick={() => handleOptionClick(opcion)}
                >
                {opcion}
                {selectedOptions.includes(opcion) && <div>{iconoCheck}</div>} {/* Muestra el icono de check si está seleccionada */}
                </li>
            ))}
            </ul>
        </div>
    </div>
  );
}

export default OpcionesCheck;
