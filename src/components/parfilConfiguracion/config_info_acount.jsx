// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import HeaderConfiguration from '../headers/header_configuration';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import NavBar from '../nav_bar/navBar';

const ConfigInfoAcount = () => {

  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    lastName: "",
    lookingFors: "",
    codeCountry: "",
    email: "",
    delegation:"",
    age:"",
    height:"",
    relationshipStatus: "",
    birthDate: "",
    smokes:"",
    genders: "",
    sexualIdentities: "",
    interests:"",
    pets:"",
    name: "",
    pronouns: "",
    zodiacs:"",
    perceptions:"",
    phoneNumber: "",
    photoProfile: "",
    FotosCarrucel: "",
    aboutMe:"",
})

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosUsuario) {
        setDataUser(datosUsuario);
    }
}, []);

  const redirectBack = () => {
    navigate('/configuracion')
  }

  return (
    <div id='setupPerfil'>
      <HeaderConfiguration 
        isBtnLeft={true}
        handleOnclick={redirectBack}
        iconAction={<FaArrowLeft />}
        txtButton={''}
        nameHeader={'Información de mi cuenta'}
        sizeF={'20px'}
        isBtnRear={false}
        handleOnclickBtn2={redirectBack}
        // iconActionBtn2={''}
        txtButtonbtn2={'Guardar'}
        bgColorBar={'club_bg_negro'} 
        textColor={'club_color_fuente_blanco'}
      />
    <br />
    <br />
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_margin_bar_40'style={{borderTop:'none'}}>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-6 d-flex justify-content-start'>
            <p className='club_config_parrafo'>Nombre</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <p className='club_config_parrafo'>{dataUser?.name ? dataUser?.name : ''}</p>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-6 d-flex justify-content-start'>
            <p className='club_config_parrafo'>Edad</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <p className='club_config_parrafo'>{dataUser?.age ? dataUser?.age : ''}</p>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-6 d-flex justify-content-start'>
            <p className='club_config_parrafo'>Correo electrónico</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <p className='club_config_parrafo'>{dataUser?.email ? dataUser?.email : ''}</p>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-6 d-flex justify-content-start'>
            <p className='club_config_parrafo'>Username</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <p className='club_config_parrafo'>{dataUser?.UserName ? dataUser?.UserName :'Sin username'}</p>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-6 d-flex justify-content-start'>
            <p className='club_config_parrafo'>Número de Celular</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <p className='club_config_parrafo'>{dataUser?.phone ? dataUser?.phone : 'Sin no. celular'}</p>
          </div>
        </div>
      </div>
      <br />

      <NavBar
            currentPage={'config'}
            // onOptionSelect={handleOptionSelect}
        />
    </div>
  );
}

export default ConfigInfoAcount