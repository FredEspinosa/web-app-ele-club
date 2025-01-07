// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../nav_bar/navBar";
import { TopBarClub } from "../top_bar/topBarClub";
import InputDinamico from "../inputs/inputsDinamico";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import TinderLikeCarouselV2 from "../swiper/v2_tinder-swiper";
import { profileUserID, userProfileMe } from "../../services/api";

export const ContenidoHome = () => {
  const formRef = useRef(null); // Crea la referencia al formulario
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
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
    if (datosUsuario) {
      // Si hay datos en el localStorage, actualizamos el estado
      const typeLogin = localStorage.getItem("isLogin");
      if (typeLogin) {
        console.log("typeLogin", typeLogin);
        const tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage) {
          console.log("tokenStorage usse", tokenStorage);
          setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
          getDataProfileMe(tokenStorage);
        }
      } else {
        setDataUser(datosUsuario);
      }
    } else {
      // Si no hay datos en el localStorage, obtenemos el token y llamamos a la API
      const tokenStorage = sessionStorage.getItem("AccessToken");
      if (tokenStorage) {
        console.log("tokenStorage usse", tokenStorage);
        setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
        getDataProfileMe(tokenStorage);
      }
    }
  }, []);

  const getDataProfileMe = async (tokenStorage) => {
    // setShowLoader(true); // Mostrar el loader al inicio
    try {
      // const tokenSesion = tokenSesionStorage;
      // console.log("tokenSesion", tokenSesion);

      const response = await userProfileMe(tokenStorage);
      console.log("response", response.userProfile);

      // ******* Codigo provicional
      const idUser = response.userProfile.userId
      localStorage.setItem("userId", idUser);
      getProfile(tokenStorage, idUser)
      //********* */

      if (response?.status === 200 && response.userProfile) {
        // Ajusta según el código esperado por tu API
        console.log("Datos obtenidos correctamente:", response);
        // setDataUser(response.userProfile);
        // localStorage.setItem("datosUsuario",JSON.stringify(response.userProfile));
        const idUser = response.userProfile.userId
        localStorage.setItem("userId", idUser);
        if (!idUser) {
          getProfile(tokenStorage, idUser)
        }
      } else {
        console.error("Ocurrió un error en la API:", response);
      }
    } catch (err) {
      console.error("Error al enviar datos del usuario:", err);
      // setShowAlert(true);
      // setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>);
    } finally {
      // setShowLoader(false); // Asegurarse de ocultar el loader siempre
      // setShowAlert(true);
      // setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>);
    }
  };

  const getProfile = async (tokenStorage, idUser) => {
    // setShowLoader(true)
    try {
      const data = await profileUserID(tokenStorage, idUser);
      console.log("data", data);
      if (!data.userProfile) {
        // setShowLoader(false);
        // setOpciones(data.map(item => ({ id: item.id, name: item.name })));
        setDataUser(data.userProfile);
        localStorage.setItem("datosUsuario",JSON.stringify(data.userProfile));
      } else {
        console.log("ocurrio un error ☠️");
      }
    } catch (err) {
      console.log(err);
      // setShowLoader(false);
    }
};

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
            <TinderLikeCarouselV2 />
          </div>
        </div>
        <div className="club_contenido_bottom club_cont_info">
          <NavBar currentPage={"Inicio"} />
        </div>
      </div>
    </div>
  );
};
