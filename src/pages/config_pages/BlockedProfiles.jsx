import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import HeaderConfiguration from "../../components/headers/header_configuration";
import NavBar from "../../components/nav_bar/navBar";
import React, { useEffect, useState } from "react";
import { useBlockedUsers, useUnblockUser } from "@/hooks/blockedUsers/useBlockedUsers";

// const MOCK_BLOCKED_USERS = [
//   "Ana Hill",
//   "Lucía Fernández",
//   "Lau Clever",
//   "Isabela Cruz",
//   "Andrea Luna",
//   "Lucy",
//   "Lowis",
//   "Alessandra",
// ];

const BlockedProfiles = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  //   const [usuariosBloqueados, setUsuariosBloqueados] = useState(MOCK_BLOCKED_USERS);
  const { blockedUsers, isLoading, error, mutateBlockedUsers } = useBlockedUsers(token);
  const { unblockUser, isUnblocking } = useUnblockUser();
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

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("AccessToken");
    setToken(sessionToken);
  }, []);

  console.log({ blockedUsers });

  const handleDesbloquear = async (usuarioADesbloquear) => {
    const usuariosActuales = [...blockedUsers];
    const nuevosUsuarios = usuariosActuales.filter((u) => u.id !== usuarioADesbloquear.id);
    // El primer 'mutate' actualiza la caché local sin volver a validar. La UI cambia al instante.
    mutateBlockedUsers(nuevosUsuarios, false);
    try {
      await unblockUser({ userId: usuarioADesbloquear.blockedUserId, token });
      console.log(`Usuario ${usuarioADesbloquear.name} desbloqueado exitosamente.`);
    } catch (error) {
      console.error("Error al desbloquear el usuario:", error);
      alert(`Hubo un problema al intentar desbloquear a ${usuarioADesbloquear.name}.`);
      mutateBlockedUsers(usuariosActuales, false);
    }
  };

  const redirecBack = () => {
    navigate("/configuracion");
  };

  const viewBlockedProfile = (usuario) => {
    console.log(`Ver perfil bloqueado de: ${usuario}`);
  };

  const usuariosAgrupados = (blockedUsers || [])
    .sort((a, b) => {
      const nameA = a.name || a.blockReason || ""; // Usa el nombre o el motivo para ordenar
      const nameB = b.name || b.blockReason || "";
      return nameA.localeCompare(nameB);
    })
    .reduce((acc, usuario) => {
      const sortableField = usuario.name || usuario.blockReason || "#"; // El campo para obtener la primera letra
      const primeraLetra = sortableField.charAt(0).toUpperCase();

      if (!acc[primeraLetra]) {
        acc[primeraLetra] = [];
      }
      acc[primeraLetra].push(usuario); // Se agrega el objeto completo al grupo
      return acc;
    }, {});

  const letrasOrdenadas = Object.keys(usuariosAgrupados).sort();

  if (isLoading) {
    return <div>Cargando perfiles bloqueados...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>;
  }

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

      {letrasOrdenadas.length > 0 ? (
        letrasOrdenadas.map((letra) => (
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
                    <p className="club_config_parrafo">{usuario.name || usuario.blockReason}</p>
                  </div>
                  <div className="col-3 d-flex justify-content-center">
                    <button style={unlockButtonStyle} onClick={() => handleDesbloquear(usuario)} disabled={isUnblocking}>
                      {isUnblocking ? "..." : "Desbloquear"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "white" }}>No tienes perfiles bloqueados.</p>
      )}

      <NavBar currentPage={"config"} />
    </div>
  );
};

export default BlockedProfiles;
