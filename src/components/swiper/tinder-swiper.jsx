// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { IoHeartCircleSharp, IoCloseCircleSharp } from "react-icons/io5";
import { obtenerImagenPerfilAleatoria } from "../../services/api";
import { TiDelete } from "react-icons/ti";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const TinderLikeCarousel = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0); // Para manejar la imagen actual

  // Función para obtener personas usando la API randomuser
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10");
    //   const response = await obtenerImagenPerfilAleatoria();
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
    goToNextProfile();
  };

  const handleDislike = () => {
    console.log("No me gusta", profiles[currentIndex].name.first);
    goToNextProfile();
  };

  const goToNextProfile = () => {
    setImageIndex(0); // Reinicia la imagen cuando cambia de perfil
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleImageClick = () => {
    // Cambia a la siguiente imagen (si existe)
    console.log("Click");
    const totalImages = 3; // Hay 3 imágenes disponibles (large, medium, thumbnail)
    setImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
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
    if (direction === "right") {
      handleDislike();
    } else if (direction === "left") {
      handleLike();
    }
  };

  return (
    // <div style={{ width: "300px", margin: "0 auto" }}>
    <div className="club_cont_tinder_swipe">
      {profiles.length > 0 && (
        <div className="club_centrar_swiper_tinder">
            <TinderCard
                onSwipe={handleSwipe} // Detecta swipe
                key={profiles[currentIndex].login.uuid}
                preventSwipe={["up", "down"]}
                className="club_contenedor_diamante"
            >
            {profiles[currentIndex].picture && (
                <Swiper
                    onClick={handleImageClick} // Sigue capturando el evento click en escritorio
                    onTouchEnd={handleImageClick} // Añade el evento touch para móviles
                    modules={[Pagination]} // Añade el módulo de paginación
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true, dynamicBullets: true }} // Configura la paginación con bullets
                >
                    <SwiperSlide>
                        <img
                            src={getProfileImage()} // Obtiene la imagen actual
                            alt="Foto de perfil"
                            style={{ width: "100%", borderRadius: "8px", cursor: "pointer" }}
                        />
                    </SwiperSlide>

                    {/* Añade más imágenes si las tienes */}
                    <SwiperSlide>
                        <img
                            src={profiles[currentIndex]?.picture.medium}
                            alt="Foto secundaria"
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={profiles[currentIndex]?.picture.thumbnail}
                            alt="Miniatura"
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    </SwiperSlide>
                </Swiper>
            )}
            </TinderCard>

          {/* <TinderCard
            onSwipe={handleSwipe} // Detecta swipe
            key={profiles[currentIndex].login.uuid}
            preventSwipe={["up", "down"]}
            className="club_contenedor_diamante"
          > */}
            {/* Galería de fotos de la persona */}
            {/* {profiles[currentIndex].picture && (
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
            )} */}
            {/* Imagen del perfil */}
            {/* <div onClick={handleImageClick} style={{ cursor: "pointer", width:'100%', display:'flex' }}>
              <img
                className="club_diamante_img"
                src={getProfileImage()}
                alt="Foto de perfil"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div> */}
          {/* </TinderCard> */}

          {/* Nombre y Datos de la Persona */}
          <div className="col-12">
            <h3 className="col-12">{profiles[currentIndex].name.first} {profiles[currentIndex].name.last}</h3>
            <p className="col-12">{profiles[currentIndex].location.city}, {profiles[currentIndex].location.country}</p>
          </div>
        </div>
      )}

        <div className="club_swiper_tache">
            <TiDelete size={48.75} onClick={handleDislike} />
        </div>
        <div className="club_swiper_corazon">
            <IoHeartCircleSharp size={48.75} onClick={handleLike} />
        </div>
    </div>
  );
};

export default TinderLikeCarousel;