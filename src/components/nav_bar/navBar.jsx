import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBellAlert } from "react-icons/hi2";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { IoHeart, IoHeartCircleOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { NotificationContext } from "../notifications_context/notification_context";
import DescubreIcon from "../../assets/images/icons/events.svg"

const NavBar = ({ currentPage, onOptionSelect }) => {
  const navigate = useNavigate();

  // Estado para manejar la opción activa
  const [activeOption, setActiveOption] = useState(currentPage || "Inicio");
  const { notifications } = useContext(NotificationContext);

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
      case "Descubre":
        navigate("/descubre");
        break;
      case "Chats":
        navigate("/chatbox");
        break;
      case "Inicio":
        navigate("/home");
        break;
      case "Alertas":
        navigate("/alertas");
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
      <div className="club_nav_opciones col-12">
        <div
          className={`club_nav_opcion_icono col-2 ${activeOption === "Descubre" ? "active animate__animated animate__fadeInUp" : ""
            }`}
          onClick={() => handleClick("Descubre")}
        >
          <div>
            <img src={DescubreIcon} alt="events_icon" />
          </div>
          <span>Directorio</span>
        </div>
        <div
          className={`club_nav_opcion_icono col-2 ${activeOption === "Chats" ? "active animate__animated animate__fadeInUp" : ""
            }`}
          onClick={() => handleClick("Chats")}
        >
          <div>
            <BsChatSquareDotsFill size={24} />
          </div>
          <span>Chats</span>
        </div>
        <div
          className={`club_nav_opcion_icono col-2 ${activeOption === "Inicio" ? "active animate__animated animate__fadeInUp" : ""
            }`}
          onClick={() => handleClick("Inicio")}
        >
          <div>
            <IoHeartCircleOutline size={24} />
          </div>
          <span>Inicio</span>
        </div>
        <div
          className={`club_nav_opcion_icono col-2 ${activeOption === "Alertas" ? "active animate__animated animate__fadeInUp" : ""
            }`}
          onClick={() => handleClick("Alertas")}
        >
          <div>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
            <HiBellAlert size={24} />
          </div>
          <span>Alertas</span>
        </div>
        <div
          className={`club_nav_opcion_icono col-2 ${activeOption === "Perfil" ? "active animate__animated animate__fadeInUp" : ""
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
