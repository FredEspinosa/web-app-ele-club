import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBellAlert } from "react-icons/hi2";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { IoHeart, IoHeartCircleOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";

const NavBar = ({ currentPage, onOptionSelect }) => {
  const navigate = useNavigate();

  // Estado para manejar la opción activa
  const [activeOption, setActiveOption] = useState(currentPage || "Inicio");

  // Sincronizar estado si `currentPage` cambia
  useEffect(() => {
    if (currentPage) {
      setActiveOption(currentPage);
    }
  }, [currentPage]);

  // Función que actualiza la opción activa y notifica al padre
  const handleClick = (option) => {
    setActiveOption(option);
    onOptionSelect?.(option); // Llama a la función del padre si está definida

    switch (option) {
      case "Alertas":
        navigate("/alertas");
        break;
      case "Chats":
        navigate("/chatbox");
        break;
      case "Inicio":
        navigate("/home");
        break;
      case "Likes":
        navigate("/likes");
        break;
      case "Perfil":
        navigate("/mi_perfil");
        break;
      default:
        break;
    }
  };

  return (
    <div className="club_nav_bar">
      <div className="club_nav_opciones">
        <div
          className={`club_nav_opcion_icono ${
            activeOption === "Alertas" ? "active animate__animated animate__fadeInUp" : ""
          }`}
          onClick={() => handleClick("Alertas")}
        >
          <div>
            <HiBellAlert size={24} />
          </div>
          <span>Alertas</span>
        </div>
        <div
          className={`club_nav_opcion_icono ${
            activeOption === "Chats" ? "active animate__animated animate__fadeInUp" : ""
          }`}
          onClick={() => handleClick("Chats")}
        >
          <div>
            <BsChatSquareDotsFill size={24} />
          </div>
          <span>Chats</span>
        </div>
        <div
          className={`club_nav_opcion_icono ${
            activeOption === "Inicio" ? "active animate__animated animate__fadeInUp" : ""
          }`}
          onClick={() => handleClick("Inicio")}
        >
          <div>
            <IoHeartCircleOutline size={24} />
          </div>
          <span>Inicio</span>
        </div>
        <div
          className={`club_nav_opcion_icono ${
            activeOption === "Likes" ? "active animate__animated animate__fadeInUp" : ""
          }`}
          onClick={() => handleClick("Likes")}
        >
          <div>
            <IoHeart size={24} />
          </div>
          <span>Likes</span>
        </div>
        <div
          className={`club_nav_opcion_icono ${
            activeOption === "Perfil" ? "active animate__animated animate__fadeInUp" : ""
          }`}
          onClick={() => handleClick("Perfil")}
        >
          <div>
            <IoMdPerson size={24} />
          </div>
          <span>Perfil</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
