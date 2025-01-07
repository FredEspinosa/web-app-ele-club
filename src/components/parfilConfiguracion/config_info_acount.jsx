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
        isBtnRear={true}
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
            <p className='club_config_parrafo'>{dataUser?.UserName ? dataUser?.UserName :''}</p>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-6 d-flex justify-content-start'>
            <p className='club_config_parrafo'>Número de Celular</p>
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <p className='club_config_parrafo'>{dataUser?.phoneNumber ? dataUser?.phoneNumber : ''}</p>
          </div>
        </div>
      </div>
      <br />

      <NavBar
            currentPage={'config'}
            // onOptionSelect={handleOptionSelect}
        />
    </div>
    // <div>
    //   <div>
    //     <HeaderConfiguration
    //       isBtnLeft={true}
    //       handleOnclick={redirectBack}
    //       iconAction={<IoIosArrowBack />}
    //       txtButton={'Volver'}
    //       nameHeader={'Información de mi cuenta'}
    //       sizeF={'20px'}
    //       isBtnRear={false}
    //       bgColorBar={'club_bg_negro'} 
    //       textColor={'club_color_fuente_blanco'}
    //     />
    //     <div className="club_contenedor_settings club_contenedor_bg_borde_gris club_margin_bar_40">
    //       <div className="d-flex col-12 align-items-center">
    //         <div className="col-11">
    //           <p className="club_config_parrafo">Nombre</p>
    //         </div>
    //         <div className="col-1 d-flex justify-content-center">
    //           <button className="btn club_btn_padding_0 club_config_btn_arrow">
    //             <p className="club_config_parrafo_right">Rox</p>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
    //       <div className="d-flex col-12 align-items-center club_config_verifica_perfil">
    //         <div className="col-11 d-flex align-items-center">
    //           <IoIosArrowForward size={20} />
    //           <p className="club_config_parrafo">Edad</p>
    //         </div>
    //         <div className="col-1 d-flex justify-content-center">
    //           <button className="btn club_btn_padding_0 club_config_btn_arrow">
    //             <p className="club_config_parrafo_right">29</p>
    //             <IoIosArrowForward size={20} />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
    //       <div className="d-flex col-12 align-items-center">
    //         <div className="col-11">
    //           <p className="club_config_parrafo">Correo electrónico</p>
    //         </div>
    //         <div className="col-1 d-flex justify-content-center">
    //           <button className="btn club_btn_padding_0 club_config_btn_arrow">
    //             <p className="club_config_parrafo_right">roxhelena@gmail.com</p>
    //             <svg>
    //               <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
    //     <div className="d-flex col-12 align-items-center">
    //       <div className="col-11">
    //         <p className="club_config_parrafo">User name</p>
    //       </div>
    //       <div className="col-1 d-flex justify-content-center">
    //         <button className="btn club_btn_padding_0 club_config_btn_arrow">
    //           <p className="club_config_parrafo_right">roxhelena</p>
    //           <svg>
    //             <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
    //     <div className="d-flex col-12 align-items-center">
    //       <div className="col-11">
    //         <p className="club_config_parrafo">Número de celular</p>
    //       </div>
    //       <div className="col-1 d-flex justify-content-center">
    //         <button className="btn club_btn_padding_0 club_config_btn_arrow">
    //           <p className="club_config_parrafo_right">Verificado</p>
    //           <svg>
    //             <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="club_contenedor_settings club_contenedor_bg_borde_gris"></div>
    // </div>
  );
}

export default ConfigInfoAcount