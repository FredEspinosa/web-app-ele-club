// eslint-disable-next-line no-unused-vars
import React from 'react'
import HeaderConfiguration from '../headers/header_configuration'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import NavBar from '../nav_bar/navBar'
import { FaArrowLeft } from 'react-icons/fa'

const PrivacitySecurityContent = () => {

    const navigate = useNavigate()

    const redirecBack = () => {
        navigate('/configuracion')
    }

    const closeSesion = () => {
        navigate('/crear_cuenta')
    }

    const goToSection = (route) => {
        navigate(route);
    };
    
  return (
    <div id='setupPerfil'>
      <HeaderConfiguration 
        isBtnLeft={true}
        handleOnclick={redirecBack}
        iconAction={<FaArrowLeft />}
        txtButton={''}
        nameHeader={<span>Privacidad y <br />Seguridad</span>}
        sizeF={'20px'}
        isBtnRear={false}
        bgColorBar={'club_bg_negro'} 
        textColor={'club_color_fuente_blanco'}
      />

      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_margin_bar_40' style={{borderTop:'none'}}>
        <div className='d-flex col-12 align-items-center'
          onClick={() => goToSection('/soporte_tecnico')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Soporte técnico</p>
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
          onClick={() => goToSection('/terminos_y_condiciones')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Términos y Condiciones</p>
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
          onClick={() => goToSection('/politica_de_privacidad')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Política de privacidad</p>
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
          onClick={() => goToSection('/acerca_de')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Acerca de</p>
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
          onClick={() => goToSection('/')}
        >
          <div className='col-11'>
            <p className='club_config_parrafo'>Eliminar mi cuenta y datos</p>
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

      <NavBar currentPage={'config'} />
    </div>
  )
}

export default PrivacitySecurityContent