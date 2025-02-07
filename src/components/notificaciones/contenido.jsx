/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 
import { useNavigate } from 'react-router-dom';
import PermisosUbi from './popupPermiosUbicacion';
import FooterDinamico from '../footer/footer_dinamico';
import Welcome from '../../assets/images/notificaciones/welcome.jpg'
import { ubicationAdd } from '../../services/api';
import Loader from '../loader/loader';

const NotificacionesContenido = () => {

    const navigate = useNavigate()
    const [activeOption, setActiveOption] = useState('Bienvenida');
    const [showBienvenida, setShowBienvenida] = useState (true);
    const [showPermisoUbi, setShowPermisoUbi] = useState (false);
    const [showAceptar, setShowAceptar] = useState (false);
    const [showModal, setShowModal] = useState (false);
    const [datosUsuario, setDatosUsuario] = useState({});
    const [showReglas, setShowReglas] = useState (false);
    const [showDiviertete, setShowDiviertete] = useState (false);
    const [isChecked, setIsChecked] = useState(false);
    const [tokenSesionStorage, setTokenSesionStorage] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados));
        }

        // Si no hay datos en el localStorage, obtenemos el token y llamamos a la API
        const tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage) {
            console.log("tokenStorage usse", tokenStorage);
            setTokenSesionStorage(tokenStorage)
        }
    }, []);

    useEffect(() => {
        console.log("Update tokenSesionStorage");
    }, [tokenSesionStorage])

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
            setShowAceptar(false);
            setShowReglas(true)
            break;
        case 'Continuar':
            setShowReglas(true);
            setShowDiviertete(false)
            break;
        case 'Entrar':
            setShowReglas(false);
            setShowDiviertete(true)        
            break;
        case 'Acepto':
            handleContinuar()
            break;
        default:
            break;
        }
    };

    const guardarUbicacion = (ubicacion) => {
        console.log("ubicacion", ubicacion);

        //Funcion para obtener el nombre de la ubicación
        const lat = ubicacion.latitude;
        const lng = ubicacion.longitude;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

        if (ubicacion) {
            ubicationAddService(ubicacion)
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const lugar = data.display_name;
                const deleg = data.address?.county || 'Delegación no disponible'; // Usar optional chaining y un valor por defecto
            
                console.log("lugar", lugar);
                console.log("delegación", deleg);
            
                setDatosUsuario((prevDatos) => ({
                    ...prevDatos,
                    delegation: deleg,
                }));
            });
            
    };

    const ubicationAddService = async (ubicacion) => {
        console.log("ubicacion ubicationAddService", ubicacion);
        setShowLoader(true)
        try {
          const response = await ubicationAdd(tokenSesionStorage, ubicacion);
          console.log("response ubicationAdd", response);
          if (response?.isSuccess) {
            setShowLoader(false);
            setDatosUsuario((prevDatos) => ({
                ...prevDatos,
                location: ubicacion,
            }));
          } else {
            console.log("ocurrio un error ☠️");
            setShowLoader(false);
          }
        } catch (err) {
          console.log(err);
          setShowLoader(false);
        }
    };

    const handleCerrarModal = () => {
        setShowModal(false)
    }

    const handleContinuar = () => {
        const nuevosDatos = { ...datosUsuario };
        localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
        console.log("Datos actualizados guardados:", nuevosDatos);
        setTimeout(() => {
            navigate('/home');
        }, 300);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

  return (
    <div>
        <div className='club_contenedor_full_height'>
            {showBienvenida &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                        <img className='w-100' src={LogoClubTopBarBig} alt="Logo Club" />
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Te damos la bienvenida!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>Recibe notificaciones sobre coincidencias, me gusta, chats y más.</p>
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Bienvenida'); }}>Aceptar notificaciones</button>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_gris club_color_fuente_gris_01' onClick={() => { handleClick('Omitir'); }}>Omitir por ahora</button>
                    </div>
                </div>
            }
            {showPermisoUbi &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                        <img className='w-100' src={LogoClubTopBarBig} alt="Logo Club" />
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Te damos la bienvenida!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>
                                Al continuar, aceptas que tienes más de 18 años y que quieres una experiencia personalizada de anuncios.
                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Permisos'); }}>Continuar</button>
                    </div>
                </div>
            }
            {showAceptar &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info'>
                        <img className='w-100' src={LogoClubTopBarBig} alt="Logo Club"/>
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Te damos la bienvenida!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>
                                Al continuar, aceptas que tienes más de 18 años y que quieres una experiencia personalizada de anuncios.
                            </p>
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Aceptar'); }}>Continuar</button>
                    </div>
                    <FooterDinamico 
                        textoFooter={<p>Al continuar, aceptas a nuestros <b>términos y condiciones</b> y a la <br /> <b>política de privacidad</b>. HelenaSafica® 2024</p>}
                        redirectLink={true}
                    />
                </div>
            }

            {showReglas &&
                <div className='club_contenedor container-lg club_sub_contenedor'>
                    <div className='club_cont_info active animate__animated animate__bounceInDown club_notific_info_2'>
                        <img className='w-100' src={LogoClubTopBarBig} alt="Logo Club" style={{maxWidth:'240px'}} />
                    </div>
                    <div className='club_cont_info_grow_1'>
                        <div className='col-12'>
                            <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¡Reglas de Convivencia!</h1>
                        </div>
                        <div className='col-12'>
                            <p className='club_notificaciones_txt'>
                                Queremos que Helena sea un espacio cómodo y seguro para todas así que al ser parte de esta comunidad te comprometes a cumplir las siguientes reglas:
                            </p>
                            <p className='club_notificaciones_txt text-start'>
                                No seas bully o uses lenguaje ofensivo ni por raza, religion, cultura, género o identidad.
                            </p>
                            <hr />
                            <p className='club_notificaciones_txt text-start'>
                                Respeta la privacidad, Recuerda que tus conversaciones son confidenciales. lo que pasa en Helena se queda en Helena                             
                            </p>
                            <hr />
                            <p className='club_notificaciones_txt text-start'>
                                No te pongas a vender u ofrecer servicios, además de que es incomodisimo, esta app no es para eso bb
                            </p>
                            <hr />
                            <p className='club_notificaciones_txt text-start'>
                                Se respetuosa, ayudanos a fomentar un entorno agradable en el que nos tratemos cool. No hate y no Pasivo agresividad
                            </p>
                            <hr />
                            <div className="club_checkbox_wrapper_1">
                                <input 
                                    id="aceptoReglas"
                                    className="club_check_style"
                                    type="checkbox"
                                    aria-hidden="true"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange} 
                                />
                                <label htmlFor="aceptoReglas">Acepto todas las reglas de convivencia</label>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className='club_cont_btns_full club_notificaciones_btns'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' disabled={!isChecked} onClick={() => { handleClick('Entrar'); }}>Acepto</button>
                    </div>
                </div>
            }

            {showDiviertete &&
                <div className='club_sub_contenedor'>
                    <div className='club_onboarding_img'>
                        <img src={Welcome} alt="Logo Club" width={'100%'} />
                    </div>
                    <div className='club_contenedor container-lg'>
                        <div className='col-12 text-start club_onboarding_info d-flex align-items-center'>
                            <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                                <h1 className='col-12 club_txt_titulo text-start' style={{marginTop:'20px'}}>DIVIERTETE</h1>
                                <p className='col-12'>
                                    Esta es la última regla y la más importante de todas 
                                </p>
                            </div>
                        </div>
                        <div className='club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns'>
                            <div className='col-12'>
                                <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Acepto'); }} >Entrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {(showLoader && <Loader /> )}
        </div>
        {showModal && 
            <PermisosUbi
                cerrarModal={handleCerrarModal} 
                guardarUbicacion={guardarUbicacion}
            />
        }
    </div>
  )
}

export default NotificacionesContenido