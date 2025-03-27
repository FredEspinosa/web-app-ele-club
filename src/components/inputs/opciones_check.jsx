/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const OpcionesCheck = ({ opciones, onOptionSelect, tituloDeLista, iconoCheck, multiselect, isDropList, storedOptions }) => {
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newSelectedOption, setNewSelectedOption] = useState("");
  const [listDrop, setListDrop] = useState(false);

  useEffect(() => {
    if (Array.isArray(storedOptions) && storedOptions.length > 0) {
      setSelectedOptions(storedOptions.map((item) => ({ name: item })));
    }
  }, [storedOptions]);
  
  const handleOptionClick = (opcion) => {
    if (multiselect) {
      const isSelected = selectedOptions.some((item) => item.name === opcion.name);
      const updatedOptions = isSelected ? selectedOptions.filter((item) => item.name !== opcion.name) : [...selectedOptions, { name: opcion.name, id: opcion.id }];
      setSelectedOptions(updatedOptions);
      onOptionSelect(updatedOptions);
    } else {
      const selectedOption = [{ name: opcion.name, id: opcion.id }];
      setSelectedOptions(selectedOption);
      onOptionSelect(selectedOption);      
    }
  };

  useEffect(() => {
    setNewSelectedOption(selectedOptions[0]?.name);
  }, [selectedOptions]);

  const dropList = () => {
    setListDrop(!listDrop);
  };

  const getDisplayedText = () => {
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      return selectedOptions.map((item) => item.name).join(", ");
    } else if (newSelectedOption) {
      return newSelectedOption;
    } else {
      return tituloDeLista;
    }
  };

  return (
    <div className="col-12">
      {isDropList ? (
        <div className="club_cont_opciones_check">
          <div className="col-12 d-flex">
            <p className="club_titulo_opciones_check" onClick={dropList}>
              {getDisplayedText()}
            </p>
            <div>{listDrop ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}</div>
          </div>
          {listDrop ? (
            <ul className={`club_cont_lista_opciones_check animate__animated animate__fadeIn`}>
              {opciones.map((opcion) => (
                <li className="club_lista_opciones_check" key={opcion.id} onClick={() => handleOptionClick(opcion)}>
                  {opcion.name}
                  {selectedOptions.some((selected) => selected.name === opcion.name) && <div>{iconoCheck}</div>}
                </li>
              ))}
            </ul>
          ) : (
            <span className="animate__animated animate__fadeInUp"></span>
          )}
        </div>
      ) : (
        <div className="club_cont_opciones_check">
          <p className="club_titulo_opciones_check">{tituloDeLista}</p>
          <ul className={`club_cont_lista_opciones_check`}>
            {opciones.map((opcion) => (
              <li className="club_lista_opciones_check" key={opcion.id} onClick={() => handleOptionClick(opcion)}>
                {opcion.name}
                {selectedOptions.some((selected) => selected.name === opcion.name) && <div>{iconoCheck}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OpcionesCheck;
