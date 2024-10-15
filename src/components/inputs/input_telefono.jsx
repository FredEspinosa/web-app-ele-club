// eslint-disable-next-line no-unused-vars
import React from 'react'

const InputTelefono = ({ config, value, onChange, paises, onCountryChange, codigoPais }) => {
    const { type, name, label, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd } = config;
  return (
    <div>
        <div className="input-dinamico">
            {label && <label className='club_input_label' htmlFor={name}>{label}</label>}
            <div className='club_input_contenedor'>
                <div className='club_input_campo'>
                    {iconStart && <div>{iconNameStart}</div>}
                    <select 
                        className='club_select_paises'
                        value={codigoPais}
                        onChange={onCountryChange}
                    >
                        {paises.map((pais, index) => (
                            <option key={index} value={pais.codigo}>
                                {pais.bandera} {pais.codigo}
                            </option>
                        ))}
                    </select>
                    <input
                        className='club_input_campo_tel'
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                    {iconEnd && <div>{iconNameEnd}</div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default InputTelefono