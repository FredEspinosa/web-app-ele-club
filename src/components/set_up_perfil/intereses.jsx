// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { getInterest } from '../../services/api';
import Loader from '../loader/loader';

const Intereses = () => {
    const navigate = useNavigate();
    const [datosUsuario, setDatosUsuario] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [opciones, setOpciones] = useState([]);
    const [formData, setFormData] = useState([]); // Almacena las opciones seleccionadas como array de objetos [{ id, name }]

    useEffect(() => {
        const datosGuardados = localStorage.getItem('datosUsuario');
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados)); // Parsea y guarda los datos en el estado
        }
        listInterest();
    }, []);

    const listInterest = async () => {
        setShowLoader(true);
        try {
            const data = await getInterest();
            if (!data.code) {
                // Agregar una propiedad `selected` para rastrear el estado de selección
                const opcionesConSeleccion = data.map(item => ({
                    ...item,
                    selected: false,
                }));
                setOpciones(opcionesConSeleccion);
                setShowLoader(false);
            } else {
                console.error('Error al obtener los intereses');
            }
        } catch (err) {
            console.error(err);
            setShowLoader(false);
        }
    };

    const handleCheckboxChange = (id) => {
        const nuevasOpciones = opciones.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setOpciones(nuevasOpciones);

        // Actualizar el estado con las opciones seleccionadas
        const seleccionados = nuevasOpciones
            .filter(item => item.selected)
            // .map(item => ({ id: item.id }));
            .map(item => ({ id: item.id, name: item.name })); // En caso que se necesiten ambos datos
        setFormData(seleccionados);
    };

    const handleRegresar = () => {
        navigate('/cuanto_mides');
    };

    const handleContinuar = () => {
        if (formData.length >= 5) {
            const nuevosDatos = {
                ...datosUsuario,
                interests: formData, // Guardar los intereses seleccionados
            };
            localStorage.setItem('datosUsuario', JSON.stringify(nuevosDatos));
            console.log('Datos actualizados guardados:', nuevosDatos);
            setTimeout(() => {
                navigate('/tienes_mascotas');
            }, 300);
        } else {
            console.error('Debe seleccionar al menos 5 intereses');
        }
    };

    return (
        <div>
            <div className="club_contenedor_full_height" id="clubDatosPersonales">
                <div className="club_contenedor container-lg club_sub_contenedor">
                    <div className="club_crear_cuenta_btn_top">
                        <IoIosArrowBack size={24} />
                        <span onClick={handleRegresar}>Atrás</span>
                    </div>
                    <div className="club_cont_info_grow_1">
                        <div className="col-12 d-flex justify-content-start">
                            <div className="club_cont_barra">
                                <span>Completa tu perfil</span>
                                <div className="club_barra_progreso">
                                    <div className="club_progreso active"></div>
                                    <div className="club_progreso active"></div>
                                    <div className="club_progreso active animate__animated animate__bounceIn"></div>
                                    <div className="club_progreso"></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '20px 0px' }}>
                            <p>Escoge mínimo 5 intereses para tu perfil</p>
                        </div>
                        <div className="col-12 club_intereses_bg_negro">
                            {opciones.map(item => (
                                <div key={item.id}>
                                    <label
                                        className={
                                            item.selected
                                                ? 'club_txt_caption club_texto_capsula cap_active'
                                                : 'club_txt_caption club_texto_capsula'
                                        }
                                    >
                                        <input
                                            className="btn-check"
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
                            onClick={handleContinuar}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
            {showLoader && <Loader />}
        </div>
    );
};

export default Intereses;