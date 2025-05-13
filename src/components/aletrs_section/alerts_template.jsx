// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import NavBarDinamicButtons from "../nav_bar/navBarDinamicButtons";
import HeaderConfiguration from "../headers/header_configuration";
import { useNavigate } from "react-router-dom";
import NavBar from "../nav_bar/navBar";
import MatchesContent from "../matches/matches_content";
import FriendsContent from "../friends/friends_content";
import LikesContent from "../likes/likes_content";
import AlertsContent from "./alerts_content";
import Loader from "../loader/loader";
import { NotificationContext } from "../notifications_context/notification_context";
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"


const AlertsTemplate = () => {
  const navigate = useNavigate();
  const { notifications, markAllAsRead } = useContext(NotificationContext);
  const [vista, setVista] = useState(""); // Vista inicial
  const [vistaActual, setVistaActual] = useState(""); // Vista inicial
  const [showLoader, setShowLoader] = useState(false);
  const [localNotifs, setLocalNotifs] = useState([]);

  useEffect(() => {
    console.log("Opción seleccionada:", vista);
    if (vista === 'likes') {
      navigate('/likes')
    }
  }, [vista])

  useEffect(() => {
    // Captura las notificaciones al entrar
    setLocalNotifs(notifications);
    markAllAsRead(); // Luego márcalas como leídas
  }, []);

  const redirectBack = () => {
    navigate("/home");
  };

  const listaBotones = [
    { texto: "Likes", evento: "likes" },
    { texto: "Matches", evento: "matches" },
    { texto: "Friends", evento: "friends" },
  ];

  const handleButtonClick = (evento) => {
    setVista(evento); // Actualizar la vista activa
    console.log("Vista activa:", evento); // Debug
    // if (vista === 'likes') {
    //   navigate('/likes')
    // }
  };

  const handleOptionSelect = (selectedOption) => {
    console.log("Opción seleccionada:", selectedOption);
    setVistaActual(selectedOption)
    // Aquí puedes manejar la lógica adicional con la opción seleccionada
  };

  const isLoaderShow = (loaderShow) => {
    setShowLoader(loaderShow); // Solo actualizar el estado directamente
  };

  return (
    <div>
      <div id='alertsBox' className="club_contenedor_tres_secciones club_contenedor container-lg">
        <div className="club_contenido_top club_cont_info">
          <HeaderConfiguration
            isBtnLeft={false}
            txtButton={"Volver"}
            nameHeader={"Alertas"}
            sizeF={"20px"}
            isBtnRear={false}
            bgColorBar={"club_bg_blanco"}
            textColor={"club_color_fuente_negro"}
          />
        </div>
        <div className="club_content_central club_force_scroll_y">
          <NavBarDinamicButtons
            buttonsList={listaBotones}
            onButtonClick={handleButtonClick}
            activeButton={vista} // Sincronización con el estado padre
            colBtns={'col-4'}
          />
          <div style={{ marginTop: "20px" }}>
            {/* Renderiza contenido basado en la vista */}
            {vista === "" &&
              <div className="">
                {localNotifs.length === 0 ? (
                  <LikesContent handleOnClick={redirectBack} isLoader={isLoaderShow} />
                ) : (
                  <div className="club_color_fuente_negro">
                    <h1 className="text-center">Mis Notificaciones</h1>
                    <div className="">
                      {localNotifs.map((notify, index) => (
                      <div key={index} className="col-10 d-flex align-items-center container">
                        <div className="club_requqest_content_photo">
                          <img className="club_cont_perfil_img club_img_notify"
                            src={notify?.profilePictureURL || PerfilDefault}
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="club_friends_name club_color_fuente_negro">{notify?.body || "Nueva notificación"}</p>
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            }
            {/* {vista === "" && <AlertsContent handleOnClick={redirectBack} isLoader={isLoaderShow} />} */}
            {vista === "likes" && <LikesContent handleOnClick={redirectBack} isLoader={isLoaderShow} />}
            {vista === "matches" && <MatchesContent handleOnClick={redirectBack} isLoader={isLoaderShow} />}
            {vista === "friends" && <FriendsContent handleOnClick={redirectBack} isLoader={isLoaderShow} />}
          </div>
        </div>
        <div className="club_contenido_bottom club_cont_info">
          <NavBar
            currentPage={'Alertas'}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      </div>
      {(showLoader && <Loader />)}
    </div>
  );
};

export default AlertsTemplate;
