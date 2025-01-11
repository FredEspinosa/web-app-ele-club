// eslint-disable-next-line no-unused-vars
import React from 'react'
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 
import { useNavigate } from 'react-router-dom';

const ThankyouContent = () => {
    const navigate = useNavigate();

  return (
    <div>
        <div className='club_contenedor_full_height'>
            <div className='club_contenedor container-lg club_sub_contenedor'>
                <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                    <img className='w-100' src={LogoClubTopBarBig} alt="Logo Club" />
                </div>
                <div className='club_cont_info_grow_1'>
                    <div className='col-12'>
                        <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Gracias por suscribirte!</h1>
                    </div>
                    <div className='col-12'>
                        <p className='club_notificaciones_txt'>Ahora puedes disfrutar la experiencia al máximo.</p>
                    </div>
                </div>
                <div className='club_cont_btns_full club_notificaciones_btns'>
                    <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { navigate('/home') }}>Volver al inicio</button>
                    {/* <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_gris club_color_fuente_gris_01' onClick={() => { handleClick('Omitir'); }}>Omitir por ahora</button> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ThankyouContent