// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OpcionesCheck from '../inputs/opciones_check'
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { getPerception } from '../../services/api';
import Loader from '../loader/loader';
import ProgressBar from './ProgressBar';
import { useProgress } from '../../hooks/ProgressContext';

const TePercibes = () => {

    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [opciones, setOpciones] = useState([]);
    const { setCurrentStep } = useProgress();

    const tituloDeLista = '¿Cómo te percibes?'
    const iconoCheck = <FaCheck size={24} style={{color:'#BC8D40'}} />
  
    const handleOptionSelect = (selectedOptions) => {
        setSelectedValue(selectedOptions);
        console.log('Opciones seleccionadas:', selectedOptions);
    };

    const handleRegresar = () => {
        navigate('/identidad_sexual')
    }

    const listPerception = async () => {
        setShowLoader(true)
        try {
          const data = await getPerception();
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

    useEffect(() => {
        setCurrentStep(3);
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados));
        }
        listPerception()
    }, []);
    

    const handleContinuar = () => {
        if (selectedValue && selectedValue.length > 0) {
            console.log("selectedValue", selectedValue);
            const nuevosDatos = {
                ...datosUsuario,
                perceptions: Array.isArray(selectedValue) 
                    ? selectedValue.map(item => ({ id: item.id, name: item.name })) 
                    : { id: selectedValue.id, name: selectedValue.name }
            };
            localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
            setTimeout(() => {
                navigate('/identidad_de_genero');
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
                    <ProgressBar/>
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

export default TePercibes