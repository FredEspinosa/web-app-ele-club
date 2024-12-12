// eslint-disable-next-line no-unused-vars
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import HeaderConfiguration from '../headers/header_configuration';
import { useNavigate } from 'react-router-dom';

const ConfigInfoAcount = () => {

  const navigate = useNavigate()

  const redirectBack = () => {
    navigate('/configuracion')
  }

  return (
    <div>
      <div>
        <HeaderConfiguration
          handleOnclick={redirectBack}
          iconAction={<IoIosArrowBack />}
          txtButton={'Volver'}
          nameHeader={'Información de mi cuenta'}
          sizeF={'20px'}
        />
        {/* <div className="club_contenedor_settings club_configuración_barra">
          <div className="col-12 d-flex">
            <div className="col-5 d-flex align-items-center justify-content-start">
              <button className="btn d-flex align-items-center club_color_fuente_blanco club_config_btn_back">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
                </svg>
                Volver
              </button>
            </div>
            <div className="col-7 d-flex align-items-center">
              <h1 className="club_titulo_config">Información de mi cuenta</h1>
            </div>
          </div>
        </div> */}
        <div className="club_contenedor_settings club_contenedor_bg_borde_gris club_margin_bar_40">
          <div className="d-flex col-12 align-items-center">
            <div className="col-11">
              <p className="club_config_parrafo">Nombre</p>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <button className="btn club_btn_padding_0 club_config_btn_arrow">
                <p className="club_config_parrafo_right">Rox</p>
              </button>
            </div>
          </div>
        </div>
        <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
          <div className="d-flex col-12 align-items-center club_config_verifica_perfil">
            <div className="col-11 d-flex align-items-center">
              <IoIosArrowForward size={20} />
              <p className="club_config_parrafo">Edad</p>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <button className="btn club_btn_padding_0 club_config_btn_arrow">
                <p className="club_config_parrafo_right">29</p>
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
          <div className="d-flex col-12 align-items-center">
            <div className="col-11">
              <p className="club_config_parrafo">Correo electrónico</p>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <button className="btn club_btn_padding_0 club_config_btn_arrow">
                <p className="club_config_parrafo_right">roxhelena@gmail.com</p>
                <svg>
                  <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
        <div className="d-flex col-12 align-items-center">
          <div className="col-11">
            <p className="club_config_parrafo">User name</p>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <button className="btn club_btn_padding_0 club_config_btn_arrow">
              <p className="club_config_parrafo_right">roxhelena</p>
              <svg>
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
        <div className="d-flex col-12 align-items-center">
          <div className="col-11">
            <p className="club_config_parrafo">Número de celular</p>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <button className="btn club_btn_padding_0 club_config_btn_arrow">
              <p className="club_config_parrafo_right">Verificado</p>
              <svg>
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="club_contenedor_settings club_contenedor_bg_borde_gris"></div>
    </div>
  );
}

export default ConfigInfoAcount