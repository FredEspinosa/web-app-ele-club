// eslint-disable-next-line no-unused-vars
import React from 'react'
import HeaderConfiguration from '../headers/header_configuration'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const TermsConditionsContent = () => {

  const navigate = useNavigate()

  const redirecBack = () => {
    navigate('/privacidad_y_seguridad')
  }

  return (
  <div id='setupPerfil'>
      <HeaderConfiguration 
        isBtnLeft={true}
        handleOnclick={redirecBack}
        iconAction={<FaArrowLeft />}
        txtButton={''}
        nameHeader={<span>Términos y condiciones</span>}
        sizeF={'20px'}
        isBtnRear={false}
        bgColorBar={'club_bg_negro'} 
        textColor={'club_color_fuente_blanco'}
      />
      <br />
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_center_content'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'><a className='club_links club_color_fuente_blanco' href="https://helenaapp.com/terms/">https://helenaapp.com/terms/</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditionsContent