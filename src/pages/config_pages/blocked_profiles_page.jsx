import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import HeaderConfiguration from "../../components/headers/header_configuration";
import NavBar from "../../components/nav_bar/navBar";
import React from "react";

const PrivacitySecurityContent = () => {
  const navigate = useNavigate();
  const mockUsuarios = [
    "Ana Hill",
    "Lucía Fernández",
    "Lau Clever",
    "Isabela Cruz",
    "Andrea Luna",
    "Lucy",
    "Lowis",
    "Alessandra",
  ];

  const redirecBack = () => {
    navigate("/configuracion");
  };

  const viewBlockedProfile = (usuario) => {
    console.log(`Ver perfil bloqueado de: ${usuario}`);
  };

  const usuariosAgrupados = mockUsuarios.sort().reduce((acc, usuario) => {
    const primeraLetra = usuario.charAt(0).toUpperCase();
    if (!acc[primeraLetra]) {
      acc[primeraLetra] = [];
    }
    acc[primeraLetra].push(usuario);
    return acc;
  }, {});

  const letrasOrdenadas = Object.keys(usuariosAgrupados).sort();

  return (
    <div id="setupPerfil">
      <HeaderConfiguration
        isBtnLeft={true}
        handleOnclick={redirecBack}
        iconAction={<FaArrowLeft />}
        txtButton={""}
        nameHeader={<span>Perfiles bloqueados</span>}
        sizeF={"20px"}
        isBtnRear={false}
        bgColorBar={"club_bg_negro"}
        textColor={"club_color_fuente_blanco"}
      />

      <br />
      <br />

      {letrasOrdenadas.map((letra) => (
        <React.Fragment key={letra}>
          <div className="club_seccion_titulo-container">
            <div className="club_seccion_titulo">
              <div className="club_seccion_titulo-letra">{letra}</div>
            </div>
          </div>
          {usuariosAgrupados[letra].map((usuario, index) => (
            <div key={index} className="club_contenedor_settings club_contenedor_bg_borde_gris" style={{ borderTop: "none" }}>
              <div className="d-flex col-12 align-items-center" onClick={() => viewBlockedProfile(usuario)}>
                <div className="col-11">
                  <p className="club_config_parrafo">{usuario}</p>
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <button className="btn club_btn_padding_0 club_config_btn_arrow">
                    <IoIosArrowForward size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      <NavBar currentPage={"config"} />
    </div>
  );
};

export default PrivacitySecurityContent;
