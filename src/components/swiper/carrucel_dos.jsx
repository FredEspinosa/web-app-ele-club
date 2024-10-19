import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { IoHeartCircleSharp, IoCloseCircleSharp } from "react-icons/io5";

const TinderLikeCarousel = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0); // Para manejar la imagen actual

  // Función para obtener personas usando la API randomuser
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10");
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
    goToNextProfile();
  };

  const handleDislike = () => {
    console.log("No me gusta", profiles[currentIndex].name.first);
    goToNextProfile();
  };

  const goToNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    setImageIndex(0); // Reinicia la imagen al cambiar de perfil
  };

  const handleImageClick = () => {
    // Cambia a la siguiente imagen (si existe)
    const totalImages = 3; // Hay 3 imágenes disponibles (large, medium, thumbnail)
    setImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handleSwipe = (swiper) => {
    if (swiper.activeIndex > currentIndex) {
      // Swipe hacia la izquierda (Me gusta)
      handleLike();
    } else if (swiper.activeIndex < currentIndex) {
      // Swipe hacia la derecha (No me gusta)
      handleDislike();
    }
  };

  const getProfileImage = () => {
    // Alterna entre las 3 imágenes disponibles
    const imageOptions = [
      profiles[currentIndex]?.picture.large,
      profiles[currentIndex]?.picture.medium,
      profiles[currentIndex]?.picture.thumbnail,
    ];
    return imageOptions[imageIndex];
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      {profiles.length > 0 && (
        <div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }} // Agrega los bullets
            onSwiper={(swiper) => setCurrentIndex(swiper.activeIndex)} // Inicializa swiper
            onSlideChange={handleSwipe} // Detecta el swipe
          >
            {/* Galería de fotos de la persona */}
            {profiles[currentIndex].picture && (
              <>
                <SwiperSlide>
                  <img
                    src={getProfileImage()} // Obtiene la imagen actual
                    alt="Foto de perfil"
                    onClick={handleImageClick} // Al hacer click cambia la imagen
                    style={{ width: "100%", borderRadius: "8px", cursor: "pointer" }}
                  />
                </SwiperSlide>
              </>
            )}
          </Swiper>

          {/* Botones de Me Gusta y No Me Gusta */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button onClick={handleDislike} style={{ marginRight: "10px" }}>
              <IoCloseCircleSharp size={48.75} color="red" />
            </button>
            <button onClick={handleLike}>
              <IoHeartCircleSharp size={48.75} color="green" />
            </button>
          </div>

          {/* Nombre y Datos de la Persona */}
          <h3>{profiles[currentIndex].name.first} {profiles[currentIndex].name.last}</h3>
          <p>{profiles[currentIndex].location.city}, {profiles[currentIndex].location.country}</p>
        </div>
      )}
    </div>
  );
};

export default TinderLikeCarousel;