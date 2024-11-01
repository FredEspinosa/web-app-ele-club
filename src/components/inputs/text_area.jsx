// eslint-disable-next-line no-unused-vars
import React from 'react'

const TextAreaDinamico = ({ config, value, onChange }) => {
    const { name, label, placeholder, help, msjHelp } = config;
  return (
    <div>
        <div>
            <div className='club_input'>
                {label && <label className='club_input_label' htmlFor={name}>{label}</label>}
                <div className='club_input_contenedor'>
                    <textarea className='club_input_campo'
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                </div>
                {help && <span className='club_input_span'>{msjHelp}</span>}
            </div>
        </div>
    </div>
  )
}

export default TextAreaDinamico