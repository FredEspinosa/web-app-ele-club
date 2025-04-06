// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { IoIosArrowBack, IoIosArrowForward, IoMdCheckmark } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import IOSSwitch from '../inputs/switch'
import HeaderConfiguration from '../headers/header_configuration'
import NavBar from '../nav_bar/navBar'
import AlertSuscribeStatic from '../alertas/alert_suscribete_static'
import { FaArrowLeft } from 'react-icons/fa'

const PerfilConfig = () => {

  const navigate = useNavigate()
  const [ubicacionPerfil, setUbicacionPerfil] = useState('Coyoacán');
  const [idioma, setIdioma] = useState('Español')
  const [userName, setUserName] = useState('Español')


  const redirectHome = () => {
    navigate('/home')
  }

  const closeSesion = () => {
    navigate('/crear_cuenta')
  }

  const goToSuscribe = () => {
    // const location = window.location.href;    
    navigate(
      '/suscripcion',
      // { state: { path: '/configuracion'} }
    )
  }

  const goToSection = (route) => {
    navigate(route);
  };
 
  return (
    <div id='setupPerfil'>
      <HeaderConfiguration 
        isBtnLeft={true}
        handleOnclick={redirectHome}
        iconAction={<FaArrowLeft />}
        txtButton={''}
        nameHeader={<span>Ajustes</span>}
        sizeF={'20px'}
        isBtnRear={false}
        bgColorBar={'club_bg_negro'} 
        textColor={'club_color_fuente_blanco'}
      />

      <div className='club_margin_bar_40'>
        <AlertSuscribeStatic
          mensajeModal={<p>¿Quieres tener todas las funciones de manera ilimitada?</p>}
          btnAceptar={true}
          btnMsjButtom={'SUSCRIBETE'}
          handleOnclick={goToSuscribe}
          bgColorButton={'club_bg_violeta_05'}
        />
      </div>

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris' style={{borderTop:'none'}}>
        <div className='d-flex col-12 align-items-center'
          onClick={() => goToSection('/informacion_de_la_cuenta')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Información de la cuenta</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'
          onClick={() => goToSection('/suscripcion')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Suscripción</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'
          onClick={() => goToSection('/privacidad_y_seguridad')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Privacidad y Seguridad</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris' style={{borderBottom:'none'}}>
        <div className='d-flex col-12 align-items-center justify-content-center'>
          <div className='col-6 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'
              onClick={closeSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <NavBar
            currentPage={'config'}
            // onOptionSelect={handleOptionSelect}
        />
    </div>
  )
}

export default PerfilConfig