// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';

const OpcionesCheck = ({ opciones, onOptionSelect, tituloDeLista, iconoCheck }) => {

    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionClick = (opcion) => {
      setSelectedOption(opcion);
      onOptionSelect(opcion);  // Devuelve la opción seleccionada al componente padre
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
                {selectedOption === opcion && <div>{iconoCheck}</div>} {/* Muestra el icono de check si está seleccionada */}
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}

export default OpcionesCheck