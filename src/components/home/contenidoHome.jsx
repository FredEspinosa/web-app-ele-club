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
import { getLocationName, getUserLocation } from "../../services/data";

export const ContenidoHome = () => {
  const formRef = useRef(null); // Crea la referencia al formulario
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [textModalButton, setTextModalButton] = useState("");
  const [ubicationData, setUbicationData] = useState({});
  const [ubicationDataName, setUbicationDataName] = useState({});
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

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    const tokenStorage = sessionStorage.getItem("AccessToken");

    if (tokenStorage) {
      setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
      // Siempre priorizamos la API si hay un token disponible
      getDataProfileMe(tokenStorage);
      obtenerUbicacionCompleta()
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
        setShowLoader(false); // Asegurarse de ocultar el loader siempre
        const userProfile = response.userProfile;
        // console.log("Datos obtenidos correctamente:", userProfile);

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
      setTextModalButton('CERRAR')
    }
  };

  const obtenerUbicacionCompleta = () => {
    getUserLocation({
      onSuccess: async ({ latitude, longitude }) => {
        setUbicationData({ latitude, longitude})          
        try {
          const { locationName, delegation } = await getLocationName(latitude, longitude);
          // setDatosUsuario((prev) => ({
          //   ...prev,
          //   delegation,
          // }));
          setUbicationDataName({ latitude, longitude, locationName, delegation })          
          // console.log("✅ Todo listo:", { latitude, longitude, locationName, delegation });
        } catch (e) {
          console.error("Error en la ubicación completa:", e.message);
          setShowLoader(false); // Asegurarse de ocultar el loader siempre
          setShowAlert(true);
          setMensajeModal(<p>¡Lo sentimos! la aplicación <b>no peude obtener tu ubicación</b>.<br /> Estamos trabajando para resolver el problema</p>);
          setTextModalButton('CERRAR')
        }
      },
      onError: (e) => {
        console.error("Error obteniendo coordenadas:", e.message);
        setShowLoader(false); // Asegurarse de ocultar el loader siempre
        setShowAlert(true);
        setMensajeModal(<p>¡Lo sentimos! la aplicación <b>no cuenta</b> con los servicios de <b>ubicación</b> activados.<br /> Por favor permite los servicios de <b>ubicación</b>.</p>);
        setTextModalButton('REFRESCAR')
      },
    });
  };

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
      placeholder: dataUser.userLocation?.location ? dataUser.userLocation?.location : ubicationDataName.delegation ? ubicationDataName?.delegation : 'Buscar',
      disabled: true,
      iconStart: false,
      iconNameStart: <IoSearch className="club_input_icon_izq" size={24} />,
      iconEnd: true,
      iconNameEnd: <FiFilter className="club_input_icon_der" size={24} />,
      help: false,
    },
  ];

  // useEffect(() => {
  //   // Actualiza isLoading cuando los datos estén listos
  //   setShowLoader(false);
  // }, [dataUser]);

  const closeModal = () => {
    if (textModalButton === 'CERRAR'){
      setShowAlert(false)
    } else {
      window.location.reload();
    }
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
            {ubicationData.latitude && (
              <TinderLikeCarouselV2 token={tokenSesionStorage} ubicationData={ubicationData} />
            )}
            {/* <TinderLikeCarouselV2 token={tokenSesionStorage} /> */}
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
          btnMsjButtom={textModalButton}
          handleOnclick={closeModal}
          bgColorButton={'club_bg_oro'}
        />
      )}
    </div>
  );
};
