// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const OpcionesCheck = ({ opciones, onOptionSelect, tituloDeLista, iconoCheck, multiselect, isDropList }) => {
    const [selectedOptions, setSelectedOptions] = useState([]); // Almacena múltiples opciones si multiselect es true
    const [listDrop, setListDrop] = useState(false)
  
    const handleOptionClick = (opcion) => {
        if (multiselect) {
            const isSelected = selectedOptions.some(item => item.id === opcion.id);
            const updatedOptions = isSelected
                ? selectedOptions.filter(item => item.id !== opcion.id) // Remover si ya está seleccionado
                : [...selectedOptions, { id: opcion.id, name: opcion.name }]; // Agregar si no está seleccionado

            setSelectedOptions(updatedOptions);
            onOptionSelect(updatedOptions); // Devuelve los objetos seleccionados al componente padre
        } else {
            const selectedOption = { id: opcion.id, name: opcion.name };
            setSelectedOptions([selectedOption]);
            onOptionSelect(selectedOption); // Devuelve el objeto seleccionado al componente padre
        }
    };  

    const dropList = () => {
        setListDrop(!listDrop);
    }
 
    return (
        <div className='col-12'>
            {isDropList ?
            <div className='club_cont_opciones_check'>
                <div className='col-12 d-flex'>
                    <p className='club_titulo_opciones_check' onClick={dropList}>{tituloDeLista}</p>
                    <div>
                    {listDrop ?
                        <IoIosArrowUp size={24} />
                    :
                        <IoIosArrowDown size={24} />
                    }
                    </div>
                </div>
                {listDrop ?
                <ul className={`club_cont_lista_opciones_check animate__animated animate__fadeIn`}>
                    {opciones.map((opcion) => (
                        <li
                            className='club_lista_opciones_check'
                            key={opcion.id}
                            onClick={() => handleOptionClick(opcion)}
                        >
                            {opcion.name} {/* Mostrar el nombre de la opción */}
                            {selectedOptions.some(selected => selected.id === opcion.id) && (
                                <div>{iconoCheck}</div>
                            )} {/* Muestra el icono de check si está seleccionada */}
                        </li>
                    ))}
                </ul>
                :
                <span className='animate__animated animate__fadeInUp'></span>
                }
            </div>
            :
            <div className='club_cont_opciones_check'>
                <p className='club_titulo_opciones_check'>{tituloDeLista}</p>
                <ul className={`club_cont_lista_opciones_check`}>
                    {opciones.map((opcion) => (
                        <li
                            className='club_lista_opciones_check'
                            key={opcion.id}
                            onClick={() => handleOptionClick(opcion)}
                        >
                            {opcion.name} {/* Mostrar el nombre de la opción */}
                            {selectedOptions.some(selected => selected.id === opcion.id) && (
                                <div>{iconoCheck}</div>
                            )} {/* Muestra el icono de check si está seleccionada */}
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
    );
};

export default OpcionesCheck;
