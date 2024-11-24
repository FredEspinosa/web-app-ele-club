// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { IoHeartCircleSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const TinderLikeCarouselV2 = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0); // Para manejar la imagen actual
  const [animacionBtnLike, setAnimacionBtnLike] = useState ('');
  const [animacionBtnDislike, setAnimacionBtnDislike] = useState ('');

  const totalImages = 3; // Número total de imágenes (large, medium, thumbnail)

  // Función para obtener personas usando la API randomuser
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10");
      console.log("response", response);
      setProfiles(response.data.results);
    } catch (error) {
      console.error("Error al obtener perfiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Llama a la función cuando el componente se monta
  }, []);

  const handleLike = () => {
    console.log("Me gusta", profiles[currentIndex].name.first);
    setAnimacionBtnLike('animate__flip');    // Activa la animación
    setTimeout(() => {    // Reinicia la animación después de que termine (duración de animate__rubberBand es ~1s)
      setAnimacionBtnLike(''); // Resetea la animación
    }, 1000); 
    goToNextProfile(); // Cambia al siguiente perfil
  };

  const handleDislike = () => {
    console.log("No me gusta", profiles[currentIndex].name.first);
    setAnimacionBtnDislike('animate__rotateOut'); // Activa la animación
    setTimeout(() => {  // Reinicia la animación después de que termine
      setAnimacionBtnDislike(''); // Resetea la animación
    }, 1000); 
    goToNextProfile(); // Cambia al siguiente perfil
  };

  const goToNextProfile = () => {
    setImageIndex(0); // Reinicia la imagen cuando cambia de perfil
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleImageClick = () => {
    console.log("Click");
    setImageIndex((prevIndex) => (prevIndex + 1) % totalImages); // Cambia a la siguiente imagen
  };

  const getProfileImage = () => {
    const imageOptions = [
      profiles[currentIndex]?.picture.large,
      profiles[currentIndex]?.picture.medium,
      profiles[currentIndex]?.picture.thumbnail,
    ];
    return imageOptions[imageIndex];
  };

  const handleSwipe = (direction) => {
    if (direction === "left") {
      handleDislike();
    } else if (direction === "right") {
      handleLike();
    }
  };

  return (
    <div className="club_cont_tinder_swipe">
      {profiles.length > 0 && (
        <div className="club_centrar_swiper_tinder">
          {/* Bullets manuales para las imágenes */}
          <div className="club_bullets_imgs">
            {Array.from({ length: totalImages }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: imageIndex === idx ? "#FFFFFF" : "#6F7271",
                  margin: "0 5px",
                }}
              ></div>
            ))}
          </div>
          <TinderCard
            onSwipe={handleSwipe} // Detecta swipe
            key={profiles[currentIndex].login.uuid}
            preventSwipe={["up", "down"]}
            className="club_contenedor_diamante"
          >
            {profiles[currentIndex].picture && (
              <>
                <img
                  className="club_imagen_fondo"
                  src={getProfileImage()} // Obtiene la imagen actual
                  alt="Foto de perfil"
                  onClick={handleImageClick} // Cambia la imagen al hacer click
                  onTouchEnd={handleImageClick}
                />
              </>
            )}
          </TinderCard>

          {/* Nombre y Datos de la Persona */}
          <div className="col-12 club_carrucel_datos_persona">
            <h3 className="col-12">
              {profiles[currentIndex].name.first} {profiles[currentIndex].name.last}
            </h3>
            <p className="col-12">
              {profiles[currentIndex].location.city}, {profiles[currentIndex].location.country}
            </p>
          </div>
        </div>
      )}

      <div className={`club_swiper_tache`}>
        <TiDelete size={48.75} onClick={handleDislike} className={`active animate__animated ${animacionBtnDislike}`} />
      </div>
      <div className={`club_swiper_corazon`}>
        <IoHeartCircleSharp size={48.75} onClick={handleLike} className={`active animate__animated ${animacionBtnLike}`} />
      </div>
    </div>
  );
};

export default TinderLikeCarouselV2;
