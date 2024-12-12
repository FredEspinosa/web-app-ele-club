// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import IOSSwitch from '../inputs/switch'
import HeaderConfiguration from '../headers/header_configuration'

const PerfilConfig = () => {

  const navigate = useNavigate()
  const [ubicacionPerfil, setUbicacionPerfil] = useState('Coyoacán');
  const [idioma, setIdioma] = useState('Español')
  const [userName, setUserName] = useState('Español')


  const redirectHome = () => {
    navigate('/home')
  }
  
  const redirectInfoAcount = () => {
    navigate('/informacion_de_la_cuenta')
  }
 
  return (
    <div id='setupPerfil'>
      <HeaderConfiguration 
        isBtnLeft={true}
        handleOnclick={redirectHome}
        iconAction={<IoIosArrowBack />}
        txtButton={'Volver'}
        nameHeader={'Configuración'}
        sizeF={'20px'}
        isBtnRear={false}
        bgColorBar={'club_bg_negro'} 
        textColor={'club_color_fuente_blanco'}
      />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_margin_bar_40'>
        <div className='d-flex col-12 align-items-center'
          onClick={redirectInfoAcount}
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
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Cuentas conectadas</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center club_config_verifica_perfil'>
          <div className='col-11 d-flex align-items-center'>
            <PiWarningCircle className='club_config_perfil_icon_warning' size={20} />
            <p className='club_config_parrafo'>Verificar perfil</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <AiOutlineSafetyCertificate className='club_config_perfil_icon_safe' size={20} />
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Filtros</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Créditos de Thirst Mode</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Perfiles bloqueados</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Suscribirse a HER Premium</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings'>
        <p  style={{marginBottom:'0px'}}><b>Configuración Premium</b></p>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_padding_right_0 club_padding_top_0 club_padding_bottom_0'>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Filtros Premium</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs club_no_border_bottom'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Cambiar ubicación</p>
              <br />
              <p className='club_config_parrafo club_color_fuente_gris_03'>
                Ubicación actual: {ubicacionPerfil}
              </p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_color_fuente_gris_03'>
                Cambiar
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings'>
        <p  style={{marginBottom:'0px'}}><b>Visibilidad</b></p>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_padding_right_0 club_padding_top_0 club_padding_bottom_0'>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
          <div className='col-12'>
              <p className='club_config_parrafo'>Incógnito <span className='club_bg_premium'>Premium</span></p>
          </div>
          <br />
          </div>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-9'>
              <p className='club_config_parrafo club_color_fuente_gris_03'>
                Otras personas no pueden verte hasta que les des Me gusta o
                las agregues como amigas primero
              </p>
            </div>
            <div className='col-3 d-flex justify-content-end' style={{paddingRight:'5px'}}>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
          <div className='col-12'>
              <p className='club_config_parrafo'>Sapphic Mode</p>
          </div>
          <br />
          </div>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-9'>
              <p className='club_config_parrafo club_color_fuente_gris_03'>
                Solo verás y serás visto por mujeres queer, personas
                no binarias, no conformes con su género y trans
              </p>
            </div>
            <div className='col-3 d-flex justify-content-end' style={{paddingRight:'5px'}}>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings'>
        <p  style={{marginBottom:'0px'}}><b>Funciones Premium</b></p>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris club_padding_right_0 club_padding_top_0 club_padding_bottom_0'>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Experiencia sin publicidad</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Deslizamientos ilimitados</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Ver a quién le gustas</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Retroceder perfiles</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Ver quién está en línea</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Leer recibos</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Cerca</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
        <div className='club_sub_contenedor_serttigs club_no_border_bottom'>
          <div className='d-flex col-12 align-items-center'>
            <div className='col-10'>
              <p className='club_config_parrafo'>Visualizaciones</p>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn club_btn_padding_0 club_config_btn_arrow'>
                <IOSSwitch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Restaurar compra</p>
          </div>
          <div className='col-1 d-flex justify-content-center'></div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Apoya a nuestra comunidad 🏳️‍🌈 </p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center club_config_verifica_perfil'>
          <div className='col-11 d-flex align-items-center'>
            <PiWarningCircle className='club_config_perfil_icon_warning' size={20} />
            <p className='club_config_parrafo'>Configuración de notificaciones push</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Opciones de privacidad</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-11'>
            <p className='club_config_parrafo'>Apoyo</p>
          </div>
          <div className='col-1 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-10'>
            <p className='club_config_parrafo'>Idioma</p>
          </div>
          <div className='col-2 d-flex justify-content-center'>
            <p className='club_config_parrafo club_color_fuente_gris_03'>
              {idioma}
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center'>
          <div className='col-10'>
            <p className='club_config_parrafo'>Nombre de usuario</p>
          </div>
          <div className='col-2 d-flex justify-content-center'>
            <p className='club_config_parrafo club_color_fuente_gris_03'>
              {userName}
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='club_contenedor_settings club_contenedor_bg_borde_gris'>
        <div className='d-flex col-12 align-items-center justify-content-center'>
          <div className='col-6 d-flex justify-content-center'>
            <button className='btn club_btn_padding_0 club_config_btn_arrow'>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PerfilConfig