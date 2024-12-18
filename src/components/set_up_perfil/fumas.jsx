// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OpcionesCheck from '../inputs/opciones_check'
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { getSmoke } from '../../services/api';
import Loader from '../loader/loader';
import { enviarDatosUsuario } from '../../services/data';
import AlertSuscribe from '../alertas/alert_suscribete';

const Habitos = () => {

    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [opciones, setOpciones] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [mensajeModal, setMensajeModal] = useState("");

    // const opciones = ['Cigarros', 'Vape', 'Weed', 'No'];
    const tituloDeLista = 'Fumas?'
    const iconoCheck = <FaCheck size={24} style={{color:'#BC8D40'}} />
  
    const handleOptionSelect = (idOrIds) => {
        setSelectedValue(idOrIds); // Almacena el ID o array de IDs
        console.log('Opción seleccionada:', idOrIds);
    };    

    const handleRegresar = () => {
        navigate('/signo_zodiacal')
    }

    const handleOmitir = () => {
        navigate('/notificaciones')
    }

    useEffect(() => {
        // Obtener los datos guardados del localStorage al cargar el componente
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados)); // Parsea y guarda los datos en el estado
        }
        listSmoke()
    }, []);

    const listSmoke = async () => {
        setShowLoader(true)
        try {
          const data = await getSmoke();
          console.log("data", data);
          if (!data.code) {
            setShowLoader(false);
            setOpciones(data.map(item => ({ id: item.id, name: item.name })));
          } else {
            console.log("ocurrio un error ☠️");
          }
        } catch (err) {
          console.log(err);
          setShowLoader(false);
        }
    };

    const handleContinuar = () => {
        if (selectedValue) {
            const nuevosDatos = {
                ...datosUsuario, // Mantén los datos actuales
                smokes: selectedValue // Agrega la nueva opción seleccionada
            };
            // Guarda los nuevos datos en el localStorage
            localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
            console.log("Datos actualizados guardados:", nuevosDatos);
            setTimeout(() => {
                // sendDataUserInfo()
                navigate('/notificaciones');
            }, 300);
        } else {
            console.log("No se ha seleccionado ninguna opción");
        }
    }

    const sendDataUserInfo = async () => {
        setShowLoader(true); // Mostrar el loader al inicio
        try {
            // Llamada a la función de envío
            const response = await enviarDatosUsuario();
            // Validar la respuesta
            if (response?.code === 200) { // Ajusta según el código esperado por tu API
                console.log("Datos enviados correctamente:", response);
                navigate('/notificaciones');
            } else {
                console.error("Ocurrió un error en la API:", response);
            }
        } catch (err) {
            console.error("Error al enviar datos del usuario:", err);
            setShowAlert(true);
            setMensajeModal(<p>¡Lo sentimos! ocurrio un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>)
        } finally {
            setShowLoader(false); // Asegurarse de ocultar el loader siempre
            setShowAlert(true);
            setMensajeModal(<p>¡Lo sentimos! ocurrio un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>)
        }
    };    

    const closeModal = () => {
        setShowAlert(false)
    }

  return (
    <div>
        <div className="club_contenedor_full_height" id="clubDatosPersonales">
            <div className="club_contenedor container-lg club_sub_contenedor">
                <div className="club_crear_cuenta_btn_top">
                    <IoIosArrowBack size={24}/>
                    <span onClick={() => handleRegresar()}>Atrás</span>
                </div>
                <div className="club_cont_info_grow_1">
                    <div className="col-12 d-flex justify-content-start">
                    <div className="club_cont_barra">
                        <span>Completa tu perfil</span>
                        <div className='club_barra_progreso'>
                            <div className='club_progreso active'></div>
                            <div className='club_progreso active'></div>
                            <div className='club_progreso active'></div>
                            <div className='club_progreso active animate__animated animate__bounceIn'></div>
                        </div>
                    </div>
                    </div>
                    <div className="col-12 club_margin_top_56">
                        {/* <p>Opción seleccionada: {selectedValue}</p> */}
                        <OpcionesCheck 
                            opciones={opciones} 
                            onOptionSelect={handleOptionSelect} 
                            tituloDeLista = {tituloDeLista}
                            iconoCheck={iconoCheck} 
                            multiselect={true}
                        />
                    </div>
                </div>
                <div className="club_cont_btns_full club_notificaciones_btns">
                    <button
                        className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
                        onClick={() => handleContinuar()}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
        {(showLoader && <Loader /> )}
        {(showAlert && 
            <AlertSuscribe 
            mensajeModal={mensajeModal}
            btnAceptar={true}
            btnMsjButtom={'CERRAR'}
            handleOnclick={closeModal}
            bgColorButton={'club_bg_oro'}
            />
        )}
    </div>
  )
}

export default Habitos