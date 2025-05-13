// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import PhotoGallery from "../perfil_usuario/galeria_de_fotos";
import ProgressBar from "./ProgressBar";
import { useProgress } from "../../hooks/ProgressContext";

const PrimerasFotos = () => {
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [userPhotosNew, setUserPhotosNew] = useState([]);
  const [tokenSesionStorage, setTokenSesionStorage] = useState([]);
    const { setCurrentStep } = useProgress();
  

  useEffect(() => {
    setCurrentStep(1);
    const datosGuardados = localStorage.getItem("datosUsuario");
    if (datosGuardados) {
      setDatosUsuario(JSON.parse(datosGuardados));
    }
    if (sessionStorage.getItem("AccessToken")) {
      setTokenSesionStorage(sessionStorage.getItem("AccessToken"));
    }
  }, []);

  const [formData] = useState({
    userPhotos: "",
  });

  // Función para añadir una nueva imagen
  const addPhoto = (base64Photo) => {
    setUserPhotosNew((prevPhotos) => [...prevPhotos, base64Photo]);
    setDatosUsuario((prevDatos) => ({
      ...prevDatos,
      userPhotos: [...(prevDatos.userPhotos || []), base64Photo], // Agrega las fotos
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
        userPhotosNew: formData.userPhotosNew,
        userPhotos: userPhotosNew, // Agrega las fotos al guardar
      };
      // Guarda los nuevos datos en el localStorage
      localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
      setTimeout(() => {
        navigate("/pronombres");
      }, 300);
    } else {
      console.log("No se ha seleccionado ninguna opción");
    }
  };

  return (
    <div>
      <div className="club_contenedor_full_height" id="clubDatosPersonales">
        <div className="club_contenedor container-lg club_sub_contenedor">
          <div className="club_crear_cuenta_btn_top">
            <IoIosArrowBack size={24} />
            <span onClick={() => handleRegresar()}>Atrás</span>
          </div>
          <div className="club_cont_info_grow_1">
            <ProgressBar />
            <div className="col-12 club_margin_top_56">
              <PhotoGallery
                  addPhoto={addPhoto}
                  userPhotosNew={userPhotosNew}
                  textoTitulo={"Agrega tus primeras 2 fotos"}
                  dataUser={datosUsuario}
                  token={tokenSesionStorage}
                  type={''}
                />
            </div>
          </div>
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={() => handleContinuar()}>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimerasFotos;
