// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from '../nav_bar/navBar'
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 
import HeaderConfiguration from '../headers/header_configuration';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AboutContent = () => {

  const navigate = useNavigate()

  const redirecBack = () => {
        navigate('/privacidad_y_seguridad')
  }

  return (
    <div id='setupPerfil'>
      <div id='chatsBox' className="club_contenedor_tres_secciones club_contenedor container-lg">
        <div className="club_contenido_top club_cont_info">
          <HeaderConfiguration 
            isBtnLeft={true}
            handleOnclick={redirecBack}
            iconAction={<FaArrowLeft />}
            txtButton={''}
            nameHeader={<span>Acerca de</span>}
            sizeF={'20px'}
            isBtnRear={false}
            bgColorBar={'club_bg_negro'} 
            textColor={'club_color_fuente_blanco'}
          />
        </div>
        <div className="club_content_central d-flex flex-wrap justify-content-center align-items-center">
          <div className='d-flex justify-content-center'>
            <img className='w-100' src={LogoClubTopBarBig} alt="HelenaLogo" />
          </div>
          <div className='d-flex text-center flex-wrap justify-content-center align-items-center'>
            <h2>Somos Helena Sáfica®</h2>
            <div>
              <p>
                App Helena Sáfica® 2024
                <br />
                Versión 1.0
                <br />
                helenaapp.com.mx
              </p>
            </div>
          </div>
        </div>
        <div className="club_contenido_bottom club_cont_info">
          <NavBar currentPage={"acercaDe"} />
        </div>
      </div>
    </div>
  )
}

export default AboutContent