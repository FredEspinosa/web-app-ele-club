// eslint-disable-next-line no-unused-vars
import React from 'react'

const HeaderConfiguration = ({handleOnclick, iconAction, txtButton, nameHeader, sizeF}) => {
  return (
    <div>
        <div className='club_configuración_barra'>
        <div className='col-12 d-flex'>
          <div className='col-3 d-flex align-items-center justify-content-start'>
            <button className='btn d-flex align-items-center club_color_fuente_blanco club_config_btn_back'
              onClick={ handleOnclick }
            >
              <div>{iconAction}</div>
              {txtButton}
            </button>
          </div>
          <div className='col-6 d-flex align-items-center justify-content-center'>
            <h1 className='club_titulo_config club_color_fuente_blanco' style={{fontSize:{sizeF}}}>{nameHeader}</h1>
          </div>
          <div className='col-3 d-flex align-items-center justify-content-end'></div>
        </div>
      </div>
    </div>
  )
}

export default HeaderConfiguration