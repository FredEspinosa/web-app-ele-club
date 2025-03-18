// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBarDinamicButtons from "../nav_bar/navBarDinamicButtons";
import HeaderConfiguration from "../headers/header_configuration";
import { useNavigate } from "react-router-dom";
import LikesContent from "./likes_content";
import NavBar from "../nav_bar/navBar";
import MatchesContent from "../matches/matches_content";
import FriendsContent from "../friends/friends_content";
import Loader from "../loader/loader";

const LikesTemplate = () => {
  const navigate = useNavigate();
  const [vista, setVista] = useState("likes"); // Vista inicial
  const [vistaActual, setVistaActual] = useState(""); // Vista inicial
  const [showLoader, setShowLoader] = useState(false);

  // useEffect(() => {
  //   console.log("Opción seleccionada:", vistaActual);
  // }, [vistaActual])
  
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
      <div id="friendsBox" className="club_contenedor_tres_secciones club_contenedor container-lg">
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
            {vista === "likes" && <LikesContent handleOnClick={redirectBack} />}
            {vista === "matches" && <MatchesContent handleOnClick={redirectBack} />}
            {vista === "friends" && <FriendsContent handleOnClick={redirectBack} isLoader={isLoaderShow} />}
          </div>
        </div>
        <div className="club_contenido_bottom club_cont_info">
          <NavBar
              currentPage={'Likes'}
              onOptionSelect={handleOptionSelect}
          />
        </div>
      </div>
      {(showLoader && <Loader />)}
    </div>
  );
};

export default LikesTemplate;
