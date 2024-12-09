// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InputDinamico from '../inputs/inputsDinamico';
import { IoIosArrowBack } from 'react-icons/io';
import { getInterest } from '../../services/api';
import Loader from '../loader/loader';

const Intereses = () => {

    const formRef = useRef(null); // Crea la referencia al formulario
    const navigate = useNavigate();
    const [datosUsuario, setDatosUsuario] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        // Obtener los datos guardados del localStorage al cargar el componente
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados)); // Parsea y guarda los datos en el estado
        }
        listInterest()
    }, []);

    const listInterest = async () => {
        setShowLoader(true);
        try {
            const data = await getInterest();
            if (!data.code) {
                // Agregar una propiedad `selected` para rastrear el estado de selección
                const opcionesConSeleccion = data.map(item => ({
                    ...item,
                    selected: false
                }));
                setOpciones(opcionesConSeleccion);
                setShowLoader(false);
            } else {
                console.log('Ocurrió un error ☠️');
            }
        } catch (err) {
            console.log(err);
            setShowLoader(false);
        }
    };

    const handleCheckboxChange = (id) => {
        const nuevasOpciones = opciones.map(item => 
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setOpciones(nuevasOpciones);

        // Actualizar el estado con las opciones seleccionadas
        const seleccionados = nuevasOpciones.filter(item => item.selected).map(item => item.name);
        setFormData(seleccionados);
    };

    const [formData, setFormData] = useState({
        Intereses: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegresar = () => {
        navigate('/cuanto_mides')
    }

    const handleOmitir = () => {
        navigate('/notificaciones')
    }

    const handleContinuar = () => {
        if (formData.length > 0) {
            const nuevosDatos = {
                ...datosUsuario,
                Intereses: formData, // Guardar las opciones seleccionadas
            };
            localStorage.setItem('datosUsuario', JSON.stringify(nuevosDatos));
            console.log('Datos actualizados guardados:', nuevosDatos);
            setTimeout(() => {
                navigate('/tienes_mascotas');
            }, 300);
        } else {
            console.log('No se ha seleccionado ninguna opción');
        }
    };

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
                            {opciones.map((item) => (
                                <div key={item.id}>
                                    <label className="club_txt_caption w-100 club_texto_capsula">
                                        <input
                                            type="checkbox"
                                            checked={item.selected}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                        {item.name}
                                    </label>
                                </div>
                            ))}
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

export default Intereses