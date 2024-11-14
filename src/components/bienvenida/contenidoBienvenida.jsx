// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import NavBienvenida from './navBienvenida';
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 
import FlagBienvenida from '../../assets/images/onboarding/Flag2_1.png';
import ImgChats from '../../assets/images/onboarding/Chats.png';
import ImgPerfil from '../../assets/images/onboarding/Perfil.png';
import ImgClubers from '../../assets/images/onboarding/Clubers.png';
import ImgEventos from '../../assets/images/onboarding/Eventos.png'

const ContenidoBienvenida = () => {
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState (false);
    const [showBienbenida, setShowBienbenida] = useState (true);
    const [showChats, setShowChats] = useState (false);
    const [showPerfil, setShowPerfil] = useState (false);
    const [showClubers, setShowClubers] = useState (false);
    const [showEventos, setShowEventos] = useState (false);
    const [activeOption, setActiveOption] = useState('');
    let pasoActual = ''

    useEffect(() => {
        const savedStep = localStorage.getItem('currentStep');
        
        if (savedStep) {
            setActiveOption(savedStep);
            // Ajustar el estado de las vistas según el paso guardado
            switch (savedStep) {
                case 'Bienvendia':
                    setShowNav(false)
                    setShowBienbenida(true)
                    setShowChats(false)
                    setShowPerfil(false)
                    setShowClubers(false)
                    setShowEventos(false)
                    break;
                case 'Chats':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(true)
                    setShowPerfil(false)
                    setShowClubers(false)
                    setShowEventos(false)
                    break;
                case 'Perfil':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(false)
                    setShowPerfil(true)
                    setShowClubers(false)
                    setShowEventos(false)
                    break;
                case 'Clubers':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(false)
                    setShowPerfil(false)
                    setShowClubers(true)
                    setShowEventos(false)
                    break;
                case 'Eventos':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(false)
                    setShowPerfil(false)
                    setShowClubers(false)
                    setShowEventos(true)
                    break;
                default:
                    break;
            }
        }
    }, []);

    // Función que actualiza la opción activa
    const handleClick = (option) => {
        setActiveOption(option);
        switch (option) {
        case 'Bienvenida':
            pasoActual = 'Chats'
            setShowNav(true);
            setShowBienbenida(false);
            setShowChats(true);
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            break;
        case 'Chats':
            pasoActual = 'Perfil'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(true)
            setShowClubers(false)
            setShowEventos(false)
            break;
        case 'ChatsBack':
            pasoActual = 'Bienvenida'
            setShowNav(false)
            setShowBienbenida(true)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            break;
        case 'Perfil':
            pasoActual = 'Clubers'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(true)
            setShowEventos(false)
            break;
        case 'PerfilBack':
            pasoActual = 'Chats'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(true)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            break;
        case 'Clubers':
            pasoActual = 'Eventos'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(true)
            break;
        case 'ClubersBack':
            pasoActual = 'Perfil'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(true)
            setShowClubers(false)
            setShowEventos(false)
            break;
        case 'Eventos':
            pasoActual = 'Eventos'
            setShowNav(false)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            navigate('/tipo_de_cuenta')
            break;  
        case 'EventosBack':
            pasoActual = 'Clubers'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(true)
            setShowEventos(false)
            break;
        default:
            break;
        }
        localStorage.setItem('currentStep', pasoActual);
    };

    const omitirRecorrido = () => {
        navigate('/tipo_de_cuenta')
    }

  return (
    <div className='club_contenedor_full_height'>
        {showNav && 
            <NavBienvenida handleClick={omitirRecorrido} />
        }
        {showBienbenida && 
            <div className='club_contenedor container-lg club_sub_contenedor'>
                <div className='club_bienvenida_logo active animate__animated animate__bounceInDown'>
                    <img src={LogoClubTopBarBig} alt="Logo Club" />
                </div>
                <div className='col-12 text-center club_bienvenida_info club_cont_info_grow_1'>
                    <h1 className='col-12'>¡Te damos la bienvenida a <br />Helena!</h1>
                    <p className='col-12'>
                        Este mundo mágico esta hecho para mujeres sáficas como tú, que quieren conocer el amor, crear un nuevo grupito de amigas y sobre todo estar informadas de los próximos planes, solo para mujeres.
                    </p>
                    {/* <div className='club_bienbenida_bandera_img'>
                        <img src={FlagBienvenida} alt="" />
                    </div> */}
                </div>
                <div className='club_cont_btns_full club_bienvenida_btns'>
                    <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Bienvenida'); }}>Iniciar el recorrido</button>
                    <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta' onClick={() => { omitirRecorrido(); }}>Omitir el recorrido</button>
                </div>
            </div>
        }
        {showChats && 
            <div className='club_contenedor container-lg club_sub_contenedor'>
                {/* <div className='club_onboarding_img'>
                    <img src={ImgChats} alt="Logo Club" />
                </div> */}
                <div className='col-12 text-center club_onboarding_info d-flex align-items-center'>
                    <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                        <h1 className='col-12'>CONECTA</h1>
                        <p className='col-12'>
                            Copy
                        </p>
                    </div>
                </div>
                <div className='club_onboarding_bullets_cont'>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet'></span>
                    <span className='club_onboarding_bullet'></span>
                    <span className='club_onboarding_bullet'></span>
                </div>
                <div className='club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns'>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta' onClick={() => { handleClick('ChatsBack'); }}>Anterior</button>
                    </div>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Chats'); }} >Siguiente</button>
                    </div>
                </div>
            </div>
        }
        {showPerfil && 
            <div className='club_contenedor container-lg club_sub_contenedor'>
                {/* <div className='club_onboarding_img'>
                    <img src={ImgPerfil} alt="Logo Club" />
                </div> */}
                <div className='col-12 text-center club_onboarding_info d-flex align-items-center'>
                    <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                        <h1 className='col-12'>DESCUBRE</h1>
                        <p className='col-12'>
                            Copy
                        </p>
                    </div>
                </div>
                <div className='club_onboarding_bullets_cont'>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet'></span>
                    <span className='club_onboarding_bullet'></span>
                </div>
                <div className='club_cont_btns_doble club_bienvenida_btns'>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta' onClick={() => { handleClick('PerfilBack'); }}>Anterior</button>
                    </div>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Perfil'); }} >Siguiente</button>
                    </div>
                </div>
            </div>
        }
        {showClubers && 
            <div className='club_contenedor container-lg club_sub_contenedor'>
                {/* <div className='club_onboarding_img'>
                    <img src={ImgClubers} alt="Logo Club" />
                </div> */}
                <div className='col-12 text-center club_onboarding_info d-flex align-items-center'>
                    <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                        <h1 className='col-12'>HANGUEA</h1>
                        <p className='col-12'>
                            Copy
                        </p>
                    </div>
                </div>
                <div className='club_onboarding_bullets_cont'>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet'></span>
                </div>
                <div className='club_cont_btns_doble club_bienvenida_btns'>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta' onClick={() => { handleClick('ClubersBack'); }}>Anterior</button>
                    </div>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Clubers'); }} >Siguiente</button>
                    </div>
                </div>
            </div>
        }

        {showEventos && 
            <div className='club_contenedor container-lg club_sub_contenedor'>
                {/* <div className='club_onboarding_img'>
                    <img src={ImgEventos} alt="Logo Club" />
                </div> */}
                <div className='col-12 text-center club_onboarding_info d-flex align-items-center'>
                    <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                        <h1 className='col-12'>DISFRUTA</h1>
                        <p className='col-12'>
                            Copy
                        </p>
                    </div>
                </div>
                <div className='club_onboarding_bullets_cont'>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet active'></span>
                    <span className='club_onboarding_bullet active'></span>
                </div>
                <div className='club_cont_btns_doble club_bienvenida_btns'>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta' onClick={() => { handleClick('EventosBack'); }}>Anterior</button>
                    </div>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08' onClick={() => { handleClick('Eventos'); }} >Siguiente</button>
                    </div>
                </div>
            </div>
        }
        <Footer/>
    </div>
  )
}

export default ContenidoBienvenida