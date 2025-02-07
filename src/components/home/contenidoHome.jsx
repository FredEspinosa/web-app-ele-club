// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../nav_bar/navBar";
import { TopBarClub } from "../top_bar/topBarClub";
import InputDinamico from "../inputs/inputsDinamico";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import TinderLikeCarouselV2 from "../swiper/v2_tinder-swiper";
import { userProfileMe } from "../../services/api";
import Loader from "../loader/loader";
import AlertSuscribe from "../alertas/alert_suscribete";

export const ContenidoHome = () => {
  const formRef = useRef(null); // Crea la referencia al formulario
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [dataUser, setDataUser] = useState({
    lastName: "",
    lookingFors: "",
    codeCountry: "",
    email: "",
    delegation: "",
    age: "",
    height: "",
    relationshipStatus: "",
    birthDate: "",
    smokes: "",
    genders: "",
    sexualIdentities: "",
    interests: "",
    pets: "",
    name: "",
    pronouns: "",
    zodiacs: "",
    perceptions: "",
    phoneNumber: "",
    photoProfile: "",
    FotosCarrucel: "",
    aboutMe: "",
  });

  const [formData, setFormData] = useState({
    Colonia: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const campos = [
    {
      type: "text",
      name: "Colonia",
      label: "Colonia",
      placeholder: "Álvaro Obregón",
      disabled: true,
      iconStart: false,
      iconNameStart: <IoSearch className="club_input_icon_izq" size={24} />,
      iconEnd: true,
      iconNameEnd: <FiFilter className="club_input_icon_der" size={24} />,
      help: false,
    },
  ];

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    // const typeLogin = localStorage.getItem("isLogin");
    const tokenStorage = sessionStorage.getItem("AccessToken");

    if (tokenStorage) {
      setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
      // Siempre priorizamos la API si hay un token disponible
      getDataProfileMe(tokenStorage);
    } else if (datosUsuario) {
      setDataUser(datosUsuario);
    } else {
      console.log("No se encontró información válida en el almacenamiento");
    }
  }, []);

  const getDataProfileMe = async (tokenStorage) => {
    setShowLoader(true)
    try {
      const response = await userProfileMe(tokenStorage);

      if (response?.isSuccess && response.userProfile) {
        const userProfile = response.userProfile;
        console.log("Datos obtenidos correctamente:", userProfile);

        // Actualiza el estado y guarda los datos en localStorage
        setDataUser(userProfile);
        localStorage.setItem("datosUsuario", JSON.stringify(userProfile));

        // Si necesitas el userId, también puedes guardarlo aquí
        const idUser = userProfile.userId;
        localStorage.setItem("userId", idUser);
      } else {
        console.error("Error: Respuesta inesperada de la API:", response);
        setShowLoader(false); // Asegurarse de ocultar el loader siempre
        setShowAlert(true);
        setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>);
      }
    } catch (err) {
      console.error("Error al obtener los datos del perfil:", err);
      setShowLoader(false); // Asegurarse de ocultar el loader siempre
      setShowAlert(true);
      setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>);
    }
  };

  useEffect(() => {
    // Actualiza isLoading cuando los datos estén listos
    setShowLoader(false);
  }, [dataUser]);

  const closeModal = () => {
    setShowAlert(false)
  }

  return (
    <div id="homeHelena">
      <div className="club_contenedor_tres_secciones club_contenedor container-lg">
        <div className="club_contenido_top club_cont_info">
          <TopBarClub />
        </div>
        <div className="club_content_central">
          <div id="clubHome">
            <div className="col-12" style={{ marginBottom: "10px" }}>
              <form ref={formRef}>
                {" "}
                {campos.map((campo, index) => (
                  <InputDinamico
                    key={index}
                    config={campo}
                    value={formData[campo.name] || ""}
                    onChange={handleInputChange}
                  />
                ))}
              </form>
            </div>
            <TinderLikeCarouselV2 token={tokenSesionStorage} />
          </div>
        </div>
        <div className="club_contenido_bottom club_cont_info">
          <NavBar currentPage={"Inicio"} />
        </div>
      </div>
      {(showLoader && <Loader />)}
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
  );
};
