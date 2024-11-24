/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
    const [datosUsuario, setDatosUsuario] = useState({});

    useEffect(() => {
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados));
        }
    }, []);

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
            handleContinuar()
            break;
        case 'Omitir':
            navigate('/home')
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

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const lugar = data.display_name;
                const deleg = data.address?.county || 'Delegación no disponible'; // Usar optional chaining y un valor por defecto
            
                console.log("lugar", lugar);
                console.log("delegación", deleg);
            
                setDatosUsuario((prevDatos) => ({
                    ...prevDatos,
                    // Ubicacion: ubicacion,
                    Delegacion: deleg,
                }));
            });
            
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
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Bienvenida'); }}>Aceptar notificaciones</button>
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
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Permisos'); }}>Continuar</button>
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
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => { handleClick('Aceptar'); }}>Continuar</button>
                    </div>
                </div>
            }
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