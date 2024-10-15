// eslint-disable-next-line no-unused-vars
import React from 'react';

const InputDinamico = ({ config, value, onChange }) => {
    const { type, name, label, options, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd, help, msjHelp } = config;

    return (
        <div className="input-dinamico">            
            {type === 'select' ? (
                <div>
                    <div className='club_input'>
                        {label && <label className='club_input_label' htmlFor={name}>{label}</label>}
                        <div className='club_input_contenedor'>
                            {iconStart && <div>{iconNameStart}</div> }
                            <select className='club_input_campo' id={name} name={name} value={value} onChange={onChange}>
                                {options.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {iconEnd && <div>{iconNameEnd}</div> }
                        </div>
                        {help && <span className='club_input_span'>{msjHelp}</span>}
                    </div>
                </div>
            ) : (
                <div>
                    <div className='club_input'>
                        {label && <label className='club_input_label' htmlFor={name}>{label}</label>}
                        <div className='club_input_contenedor'>
                            {iconStart && <div>{iconNameStart}</div> }
                            <input className='club_input_campo' 
                                type={type}
                                id={name}
                                name={name}
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder}/>
                            {iconEnd && <div>{iconNameEnd}</div> }
                            {/* <IoIosArrowForward className='club_input_icon_der' size={24} /> */}
                        </div>
                        {help && <span className='club_input_span'>{msjHelp}</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputDinamico;

// Explicación del código:
// Props del componente InputDinamico:

// config: Un objeto que contiene toda la configuración del campo (tipo de input, nombre, opciones si es un select, etiqueta, etc.).
// value: El valor actual del campo.
// onChange: Una función que se ejecuta cuando el valor del campo cambia.
// Renderización condicional:

// Si el tipo es select, renderiza un elemento select con las opciones proporcionadas en config.options.
// Si no, renderiza un elemento input con el tipo especificado (como text, email, number, etc.).
