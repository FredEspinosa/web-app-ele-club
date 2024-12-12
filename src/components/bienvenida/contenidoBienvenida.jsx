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
import Bienvenida01 from '../../assets/images/bienvenida/bienveida_01.jpg'
import Bienvenida02 from '../../assets/images/bienvenida/bienveida_02.jpg'
import Bienvenida03 from '../../assets/images/bienvenida/bienveida_03.jpg'


const ContenidoBienvenida = () => {
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState (false);
    const [showBienbenida, setShowBienbenida] = useState (true);
    const [showChats, setShowChats] = useState (false);
    const [showPerfil, setShowPerfil] = useState (false);
    const [showClubers, setShowClubers] = useState (false);
    const [showEventos, setShowEventos] = useState (false);
    const [showFooter, setShowFooter] = useState (false);
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
                    setShowFooter(true)
                    break;
                case 'Chats':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(true)
                    setShowPerfil(false)
                    setShowClubers(false)
                    setShowEventos(false)
                    setShowFooter(false)
                    break;
                case 'Perfil':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(false)
                    setShowPerfil(true)
                    setShowClubers(false)
                    setShowEventos(false)
                    setShowFooter(false)
                    break;
                case 'Clubers':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(false)
                    setShowPerfil(false)
                    setShowClubers(true)
                    setShowEventos(false)
                    setShowFooter(false)
                    break;
                case 'Eventos':
                    setShowNav(true)
                    setShowBienbenida(false)
                    setShowChats(false)
                    setShowPerfil(false)
                    setShowClubers(false)
                    setShowEventos(true)
                    setShowFooter(false)
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
            setShowFooter(false)
            break;
        case 'Chats':
            pasoActual = 'Perfil'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(true)
            setShowClubers(false)
            setShowEventos(false)
            setShowFooter(false)
            break;
        case 'ChatsBack':
            pasoActual = 'Bienvenida'
            setShowNav(false)
            setShowBienbenida(true)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            setShowFooter(false)
            break;
        case 'Perfil':
            pasoActual = 'Clubers'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(true)
            setShowEventos(false)
            setShowFooter(false)
            break;
        case 'PerfilBack':
            pasoActual = 'Chats'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(true)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            setShowFooter(false)
            break;
        case 'Clubers':
            pasoActual = 'Eventos'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(true)
            setShowFooter(false)
            navigate('/crear_cuenta')
            break;
        case 'ClubersBack':
            pasoActual = 'Perfil'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(true)
            setShowClubers(false)
            setShowEventos(false)
            setShowFooter(false)
            break;
        case 'Eventos':
            pasoActual = 'Eventos'
            setShowNav(false)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(false)
            setShowEventos(false)
            setShowFooter(false)
            // navigate('/tipo_de_cuenta')
            navigate('/crear_cuenta')
            break;  
        case 'EventosBack':
            pasoActual = 'Clubers'
            setShowNav(true)
            setShowBienbenida(false)
            setShowChats(false)
            setShowPerfil(false)
            setShowClubers(true)
            setShowEventos(false)
            setShowFooter(false)
            break;
        default:
            break;
        }
        localStorage.setItem('currentStep', pasoActual);
    };

    const omitirRecorrido = () => {
        navigate('/crear_cuenta')
        // navigate('/tipo_de_cuenta')
    }

  return (
    <div className='club_contenedor_full_height'>
        {/* {showNav && 
            <NavBienvenida handleClick={omitirRecorrido} />
        } */}
        {showBienbenida && 
            <div className='club_contenedor container-lg club_sub_contenedor'>
                <div className='club_bienvenida_logo active animate__animated animate__bounceInDown'>
                    <img src={LogoClubTopBarBig} alt="Logo Club" />
                </div>
                <div className='col-12 text-center club_bienvenida_info club_cont_info_grow_1'>
                    <h1 className='col-12'>¡Te damos la bienvenida a <br />Helena!</h1>
                    <p className='col-12'>
                        Una aplicación 100% Mexicana hecha para mujeres sáficas.                    
                    </p>
                    {/* <div className='club_bienbenida_bandera_img'>
                        <img src={FlagBienvenida} alt="" />
                    </div> */}
                </div>
                <div className='club_cont_btns_full club_bienvenida_btns'>
                    <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Bienvenida'); }}>Iniciar el recorrido</button>
                    <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro' onClick={() => { omitirRecorrido(); }}>Omitir el recorrido</button>
                </div>
            </div>
        }
        {showChats && 
            <div className='club_sub_contenedor'>
                <div className='club_onboarding_img'>
                    <img src={Bienvenida01} alt="Conoce" width={'100%'}/>
                </div>
                <div className='club_contenedor container-lg'>
                    <div className='club_onboarding_bullets_cont justify-content-start'>
                        <span className='club_onboarding_bullet active'></span>
                        <span className='club_onboarding_bullet'></span>
                        <span className='club_onboarding_bullet'></span>
                    </div>
                    <div className='col-12 text-start club_onboarding_info d-flex align-items-center'>
                        <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                            <h1 className='col-12'>FASE 1</h1>
                            <p className='col-12'>
                                En esta primera fase, puedes ligar haciendo match con otras personas o bien mandarles friend request para platicar con ellas.
                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns'>
                        {/* <div className='col-5'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro' onClick={() => { handleClick('ChatsBack'); }}>Anterior</button>
                        </div> */}
                        <div className='col-12'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Chats'); }} >Siguiente</button>
                        </div>
                    </div>

                    
                </div>
            </div>
        }
        {showPerfil && 
            <div className='club_sub_contenedor'>
                <div className='club_onboarding_img'>
                    <img src={Bienvenida02} alt="Conecta" width={'100%'} />
                </div>
                <div className='club_contenedor container-lg'>
                    <div className='club_onboarding_bullets_cont justify-content-start'>
                        <span className='club_onboarding_bullet active'></span>
                        <span className='club_onboarding_bullet active'></span>
                        <span className='club_onboarding_bullet'></span>
                    </div>
                    <div className='col-12 text-start club_onboarding_info d-flex align-items-center'>
                        <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                            <h1 className='col-12'>FASE 1</h1>
                            <p className='col-12'>
                                Haz nuevas relaciones, vínculos y amistades gracias a los foros abiertos para platicar con otras personas que tengan los mismos intereses o afinidades que tú. Podrás crear tu grupo de chat o bien entrar a los ya creados por la misma comunidad.                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_doble club_bienvenida_btns'>
                        <div className='col-5'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro' onClick={() => { handleClick('PerfilBack'); }}>Anterior</button>
                        </div>
                        <div className='col-5'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Perfil'); }} >Siguiente</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        {showClubers && 
            <div className='club_sub_contenedor'>
                <div className='club_onboarding_img'>
                    <img src={Bienvenida03} alt="Logo Club" width={'100%'} />
                </div>
                <div className='club_contenedor container-lg'>
                    <div className='club_onboarding_bullets_cont justify-content-start'>
                        <span className='club_onboarding_bullet active'></span>
                        <span className='club_onboarding_bullet active'></span>
                        <span className='club_onboarding_bullet active'></span>
                    </div>
                    <div className='col-12 text-start club_onboarding_info d-flex align-items-center'>
                        <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                            <h1 className='col-12'>FASE 2</h1>
                            <p className='col-12'>
                                En esta segunda fase podrás encontrar diversos lugares, planes o actividades que hacer según tus gustos y necesidades. Todo esto podrá será publicado por la misma comunidad de Helena’s.                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_doble club_bienvenida_btns'>
                        <div className='col-5'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro' onClick={() => { handleClick('ClubersBack'); }}>Anterior</button>
                        </div>
                        <div className='col-5'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Clubers'); }} >Siguiente</button>
                        </div>
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
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro' onClick={() => { handleClick('EventosBack'); }}>Anterior</button>
                    </div>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Eventos'); }} >Siguiente</button>
                    </div>
                </div>
            </div>
        }
        {showFooter &&
            <Footer/>
        }
    </div>
  )
}

export default ContenidoBienvenida