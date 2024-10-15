/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 
import { useNavigate } from 'react-router-dom';
import PermisosUbi from './popupPermiosUbicacion';

const NotificacionesContenido = () => {

    const navigate = useNavigate()
    const [activeOption, setActiveOption] = useState('Bienvenida');
    const [showBienvenida, setShowBienvenida] = useState (true);
    const [showPermisoUbi, setShowPermisoUbi] = useState (false);
    const [showAceptar, setShowAceptar] = useState (false);
    const [showModal, setShowModal] = useState (false);

    // Función que actualiza la opción activa
    const handleClick = (option) => {
        setActiveOption(option);
        switch (option) {
        case 'Bienvenida':
            setShowPermisoUbi(true);
            setShowBienvenida(false);
            break;
        case 'Permisos':
            setShowAceptar(true);
            setShowPermisoUbi(false);
            setShowModal(true);
            break;
        case 'Aceptar':
            setShowAceptar(true);
            navigate('/home')
            break;
        case 'Omitir':
            navigate('/home')
            break;
        default:
            break;
        }
    };

    const cerrarModal = () => {
        setShowModal(false)
    }

  return (
    <div>
        <div className='club_contenedor_full_height'>
            {showBienvenida &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                        <img src={LogoClubTopBarBig} alt="Logo Club" />
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Te damos la bienvenida a <br />L CLUB!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>Get notified about matches, likes, chats y más</p>
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Bienvenida'); }}>Aceptar notificaciones</button>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_gris club_color_fuente_gris_01' onClick={() => { handleClick('Omitir'); }}>Omitir por ahora</button>
                    </div>
                </div>
            }
            {showPermisoUbi &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                        <img src={LogoClubTopBarBig} alt="Logo Club" />
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Te damos la bienvenida a <br />L CLUB!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>
                                Meet matches and friends nearby. Tu ubicación nos permite mostrarte matches y amigas en tu cerca de tu área.
                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Permisos'); }}>Continuar</button>
                    </div>
                </div>
            }
            {showAceptar &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                        <img src={LogoClubTopBarBig} alt="Logo Club" />
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Te damos la bienvenida a <br />L CLUB!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>
                                Al continuar, aceptas que tienes más de 18 años y que quieres una experiencia personalizada de anuncios.
                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Aceptar'); }}>Continuar</button>
                    </div>
                </div>
            }
        </div>
        {showModal && 
            <PermisosUbi
                cerrarModal={cerrarModal}
            />
        }
    </div>
  )
}

export default NotificacionesContenido