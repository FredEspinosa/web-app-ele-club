// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBarDinamicButtons from "../nav_bar/navBarDinamicButtons";
import HeaderConfiguration from "../headers/header_configuration";
import { useNavigate } from "react-router-dom";
import NavBar from "../nav_bar/navBar";
import MatchesContent from "../matches/matches_content";
import FriendsContent from "../friends/friends_content";
import LikesContent from "../likes/likes_content";
import AlertsContent from "./alerts_content";

const AlertsTemplate = () => {
  const navigate = useNavigate();
  const [vista, setVista] = useState(""); // Vista inicial
  const [vistaActual, setVistaActual] = useState(""); // Vista inicial

  useEffect(() => {
    console.log("Opción seleccionada:", vista);
    if (vista === 'likes') {
      navigate('/likes')
    }
  }, [vista])
  
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

  return (
    <div>
      <div className="club_contenedor_full_height">
        <HeaderConfiguration
          isBtnLeft={false}
          txtButton={"Volver"}
          nameHeader={"Alertas"}
          sizeF={"20px"}
          isBtnRear={false}
          bgColorBar={"club_bg_blanco"}
          textColor={"club_color_fuente_negro"}
        />
        <div className="club_contenedor container-lg club_sub_contenedor">
          <NavBarDinamicButtons
            buttonsList={listaBotones}
            onButtonClick={handleButtonClick}
            activeButton={vista} // Sincronización con el estado padre
            colBtns={'col-4'}
          />
          <div style={{ marginTop: "20px" }}>
            {/* Renderiza contenido basado en la vista */}
            {vista === "" && <AlertsContent handleOnClick={redirectBack} />}
            {vista === "likes" && <LikesContent handleOnClick={redirectBack} />}
            {vista === "matches" && <MatchesContent handleOnClick={redirectBack} />}
            {vista === "friends" && <FriendsContent handleOnClick={redirectBack} />}
          </div>
        </div>
        <NavBar
            currentPage={'Alertas'}
            onOptionSelect={handleOptionSelect}
        />
      </div>
    </div>
  );
};

export default AlertsTemplate;
