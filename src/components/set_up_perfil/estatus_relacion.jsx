// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import OpcionesCheck from '../inputs/opciones_check';
import { IoIosArrowBack } from 'react-icons/io';
import { getRelationshipStatus } from '../../services/api';
import Loader from '../loader/loader';

const EstatusDeRelacion = () => {

    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [opciones, setOpciones] = useState([]);

    // const opciones = ['Soltera', 'En pareja', 'Casada', 'Divorciada', 'En Citas', 'Relación Abierta'];
    const tituloDeLista = 'Cual es tu estatus de relación?'
    const iconoCheck = <FaCheck size={24} style={{color:'#BC8D40'}} />
  
    const handleOptionSelect = (value) => {
      setSelectedValue(value);
      console.log('Opción seleccionada:', value); // Aquí recibes la opción seleccionada
    };

    const handleRegresar = () => {
        navigate('/identidad_de_genero')
    }

    useEffect(() => {
        // Obtener los datos guardados del localStorage al cargar el componente
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados)); // Parsea y guarda los datos en el estado
        }
        listRelationshipStatus();
    }, []);
    
    const listRelationshipStatus = async () => {
        setShowLoader(true)
        try {
          const data = await getRelationshipStatus();
          console.log("data", data);
          if (!data.code) {
            setShowLoader(false);
            setOpciones(data.map(item => item.name))
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
                EstatusRelacion: selectedValue // Agrega la nueva opción seleccionada
            };
            // Guarda los nuevos datos en el localStorage
            localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
            console.log("Datos actualizados guardados:", nuevosDatos);
            setTimeout(() => {
                navigate('/que_buscas');
            }, 300);
        } else {
            console.log("No se ha seleccionado ninguna opción");
        }
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
                            <div className='club_progreso active animate__animated animate__bounceIn'></div>
                            <div className='club_progreso'></div>
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
    </div>
  )
}

export default EstatusDeRelacion