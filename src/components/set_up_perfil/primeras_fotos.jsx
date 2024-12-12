// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InputDinamico from '../inputs/inputsDinamico';
import { IoIosArrowBack } from 'react-icons/io';
import PhotoGallery from '../perfil_usuario/galeria_de_fotos';

const PrimerasFotos = () => {
    const formRef = useRef(null); // Crea la referencia al formulario
    const navigate = useNavigate();
    const [datosUsuario, setDatosUsuario] = useState({});
    const [userPhotos, setUserPhotos] = useState([]);
  
    useEffect(() => {
      // Obtener los datos guardados del localStorage al cargar el componente
      const datosGuardados = localStorage.getItem("datosUsuario");
      if (datosGuardados) {
        setDatosUsuario(JSON.parse(datosGuardados)); // Parsea y guarda los datos en el estado
      }
    }, []);
  
    const [formData, setFormData] = useState({
        FotosCarrucel: "",
    });
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    // Función para añadir una nueva imagen
    const addPhoto = (base64Photo) => {
      setUserPhotos((prevPhotos) => [...prevPhotos, base64Photo]);
      setDatosUsuario((prevDatos) => ({
        ...prevDatos,
        FotosCarrucel: [...(prevDatos.FotosCarrucel || []), base64Photo], // Agrega las fotos
      }));
    };
  
    const handleRegresar = () => {
      navigate("/datos_personales");
    };
  
    const handleOmitir = () => {
      navigate("/notificaciones");
    };
  
    const handleContinuar = () => {
      if (formData) {
        const nuevosDatos = {
          ...datosUsuario, // Mantén los datos actuales
          userPhotos: formData.userPhotos,
          FotosCarrucel: userPhotos, // Agrega las fotos al guardar
        };
        // Guarda los nuevos datos en el localStorage
        localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
        console.log("Datos actualizados guardados:", nuevosDatos);
        setTimeout(() => {
          navigate("/pronombres");
        }, 300);
      } else {
        console.log("No se ha seleccionado ninguna opción");
      }
    };
  
    const campos = [
      {
        type: "text",
        name: "userPhotos",
        label: "Cuánto mides?",
        placeholder: "165 cm",
        iconStart: false,
        iconNameStart: "",
        iconEnd: false,
        iconNameEnd: "",
        help: false,
      },
    ];
  
    return (
      <div>
        <div className="club_contenedor_full_height" id="clubDatosPersonales">
          <div className="club_contenedor container-lg club_sub_contenedor">
            <div className="club_crear_cuenta_btn_top">
              <IoIosArrowBack size={24} />
              <span onClick={() => handleRegresar()}>Atrás</span>
            </div>
            <div className="club_cont_info_grow_1">
              <div className="col-12 d-flex justify-content-start">
                <div className="club_cont_barra">
                  <span>Completa tu perfil</span>
                  <div className="club_barra_progreso">
                    <div className="club_progreso active"></div>
                    <div className="club_progreso active animate__animated animate__bounceIn"></div>
                    <div className="club_progreso"></div>
                    <div className="club_progreso"></div>
                  </div>
                </div>
              </div>
              <div className="col-12 club_margin_top_56">
                <PhotoGallery
                  addPhoto={addPhoto}
                  userPhotos={userPhotos}
                  textoTitulo={"Agrega tus primeras 2 fotos"}
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
      </div>
    );
  };
  
  export default PrimerasFotos;
  