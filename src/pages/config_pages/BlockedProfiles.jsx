import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import HeaderConfiguration from "../../components/headers/header_configuration";
import NavBar from "../../components/nav_bar/navBar";
import React, { useState } from "react";

const MOCK_BLOCKED_USERS = [
  "Ana Hill",
  "Lucía Fernández",
  "Lau Clever",
  "Isabela Cruz",
  "Andrea Luna",
  "Lucy",
  "Lowis",
  "Alessandra",
];

const BlockedProfiles = () => {
  const navigate = useNavigate();
  const [usuariosBloqueados, setUsuariosBloqueados] = useState(MOCK_BLOCKED_USERS);

//   useEffect(() => {
//     const fetchBlockedUsers = async () => {
//       try {
//         const response = await fetch("/api/usuarios-bloqueados");
//         if (!response.ok) {
//           throw new Error("No se pudo obtener la lista de usuarios bloqueados.");
//         }
//         const data = await response.json();
//         setUsuariosBloqueados(data.blockedUsers);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error al obtener usuarios bloqueados:", err);
//       } finally {
//         setLoading(false); // La carga termina, ya sea con éxito o con error
//       }
//     };

//     fetchBlockedUsers();
//   }, []);

  const handleDesbloquear = async (usuarioADesbloquear) => {
    console.log(`Intentando desbloquear a: ${usuarioADesbloquear}`);
    const originalUsers = [...usuariosBloqueados];
    setUsuariosBloqueados((prev) => prev.filter((u) => u !== usuarioADesbloquear));

    try {
    //   const response = await fetch(`/api/desbloquear`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ usuarioId: usuarioADesbloquear }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Error en la respuesta del servidor al desbloquear.");
    //   }

      console.log(`Usuario ${usuarioADesbloquear} desbloqueado exitosamente en el backend.`);
    } catch (error) {
      console.error("Error al desbloquear el usuario:", error);
      alert(`Hubo un problema al intentar desbloquear a ${usuarioADesbloquear}.`);
      setUsuariosBloqueados(originalUsers);
    }
  };

  const redirecBack = () => {
    navigate("/configuracion");
  };

  const viewBlockedProfile = (usuario) => {
    console.log(`Ver perfil bloqueado de: ${usuario}`);
  };

  const usuariosAgrupados = usuariosBloqueados.sort().reduce((acc, usuario) => {
    const primeraLetra = usuario.charAt(0).toUpperCase();
    if (!acc[primeraLetra]) {
      acc[primeraLetra] = [];
    }
    acc[primeraLetra].push(usuario);
    return acc;
  }, {});

  const letrasOrdenadas = Object.keys(usuariosAgrupados).sort();

  const unlockButtonStyle = {
    backgroundColor: "transparent",
    border: "1px solid #BC8D40",
    color: "#BC8D40",
    borderRadius: "16px",
    padding: "0px 8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  };

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
              <div className="d-flex col-12 align-items-center">
                <div className="col-9">
                  <p className="club_config_parrafo">{usuario}</p>
                </div>
                <div className="col-3 d-flex justify-content-center">
                  <button style={unlockButtonStyle} onClick={() => handleDesbloquear(usuario)}>
                    Desbloquear
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

export default BlockedProfiles;
