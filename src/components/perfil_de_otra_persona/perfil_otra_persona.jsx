// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CarruselPerfilUsuario from '../swiper/carrusel_perfil_usuario';
import { IoMdCheckmark, IoMdHeartEmpty } from 'react-icons/io';
import { IoClose, IoHeart } from 'react-icons/io5';
import AlertSuscribe from '../alertas/alert_suscribete';

const PerfilOtraPersona = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [showAlert,setShowAlert] = useState(false);

    const location = useLocation();
    const profileImages = location.state?.profileImages || [];
    const nameProfile = location.state?.nameProfile || '';
    const age = location.state?.age|| '';

    const toggleIcon = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const goToHome = () => {
        navigate('/home')
    }

    const goToSuscribe = () => {
        navigate('/suscripcion')
    }

    return (
         <div id='profileOtherPerson'>
            <div className="club_contenedor_full_height">
                <div className="club_sub_contenedor">
                    <div className='club_btn_close_float'>
                        <IoClose size={24} onClick={goToHome}/>
                    </div>
                    <div className="club_onboarding_img">
                        <CarruselPerfilUsuario
                            // setNombres={nameProfile}
                            // setEdad={age}
                            // setPronombres={}
                            userPhotos={profileImages}
                            infoPerfil={false}
                        />
                    </div>
                    <div className="club_contenedor container-lg">
                        <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                            <div className="d-flex flex-wrap align-items-left justify-content-left w-100">
                                <div className='col-12 d-flex align-items-center'>
                                    <div className='col-10 d-flex align-items-center'>
                                        <div className='col-11'>
                                            <h1 className="club_identity-h1">{nameProfile}, {age} años</h1>
                                        </div>
                                        <div className='col-1 d-flex justify-content-end align-items-center'>
                                            <IoMdCheckmark className="club_identity-h1 club_color_fuente_violeta_05" size={24} />
                                        </div>
                                    </div>
                                    <div className='col-2 d-flex justify-content-end' onClick={toggleIcon}>
                                        {isMenuOpen ?
                                            <IoHeart className="club_identity-h1 club_color_fuente_violeta_05" size={24} />
                                            :
                                            <IoMdHeartEmpty className="club_identity-h1" size={24}/> 
                                        }
                                    </div>
                                </div>
                                <div className='col-12 d-flex align-items-center club_identity_icon_container'>
                                    <div className='col-10'>
                                        <p className="club_location-profile">Ella <br />Benito Juárez</p>
                                    </div>
                                    <div className='col-2'></div>
                                </div>
                                <section className="club_about-me">
                                    <h2 className='club_identity-h2'>Acerca de mí</h2>
                                    <p>
                                        The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions. 
                                        Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.
                                    </p>
                                </section>
                                <section className="club_preferences">
                                    <h2 className="club_identity-h2">Estoy buscando</h2>
                                    <span className="club_tag">Citas</span>
                                    <span className="club_tag">Hacer amigas</span>

                                    <h2 className="club_identity-h2">Identidad de Género</h2>
                                    <span className="club_tag">Mujer</span>
                                
                                    <h2 className="club_identity-h2">Identidad Sexual</h2>
                                    <span className="club_tag">Lesbiana</span>
                                
                                    <h2 className="club_identity-h2">Apariencia</h2>
                                    <span className="club_tag">FEM</span>
                                </section>
                            
                            </div>
                        </div>
                        <div className="club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns">
                            <div className="col-12">
                                <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={() => {setShowAlert(true)}}>Agregar a amigas</button>
                            </div>
                        </div>
                        <div className="club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns">
                            <div className="col-12">
                                <button className="btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro">Bloquear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showAlert &&
                <AlertSuscribe 
                    mensajeModal={<p>¿Quieres tener todas las funciones de manera ilimitada?</p>}
                    btnAceptar={true}
                    btnMsjButtom={'SUSCRIBETE'}
                    handleOnclick={goToSuscribe}
                    bgColorButton={'club_bg_violeta_05'}
                />
            }
        </div>
  )
}

export default PerfilOtraPersona