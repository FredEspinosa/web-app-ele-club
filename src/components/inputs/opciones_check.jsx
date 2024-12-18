// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const OpcionesCheck = ({ opciones, onOptionSelect, tituloDeLista, iconoCheck, multiselect }) => {

    const [selectedOptions, setSelectedOptions] = useState([]); // Almacena múltiples opciones si multiselect es true
  
    const handleOptionClick = (opcion) => {
      if (multiselect) {
        // Si es multiselección, agrega o elimina el ID de la opción del array
        const updatedOptions = selectedOptions.includes(opcion.id)
        ? selectedOptions.filter(item => item !== opcion.id)
        : [...selectedOptions, opcion.id];

        setSelectedOptions(updatedOptions);
        onOptionSelect(updatedOptions); // Devuelve los IDs seleccionados al componente padre
      } else {
        // Si no es multiselección, reemplaza la opción seleccionada
        setSelectedOptions([opcion.id]);
        onOptionSelect(opcion.id); // Devuelve el ID seleccionado al componente padre
      }
      // onOptionSelect(multiselect ? [...selectedOptions, opcion] : opcion); // Devuelve la opción seleccionada al componente padre
    };

  return (
    <div>
        <div className='club_cont_opciones_check'>
            <p className='club_titulo_opciones_check'>{tituloDeLista}</p>
            <ul className='club_cont_lista_opciones_check'>
            {opciones.map((opcion) => (
              <li
                className='club_lista_opciones_check'
                key={opcion.id}
                onClick={() => handleOptionClick(opcion)}
              >
                {opcion.name} {/* Mostrar el nombre de la opción */}
                {selectedOptions.includes(opcion.id) && <div>{iconoCheck}</div>} {/* Muestra el icono de check si está seleccionada */}
              </li>
            ))}
            </ul>
        </div>
    </div>
  );
}

export default OpcionesCheck;
