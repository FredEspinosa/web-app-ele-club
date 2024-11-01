// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importar componentes de Swiper
import { Pagination } from "swiper/modules"; // Importar el módulo de paginación

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

const CarruselPerfilUsuario = ({setNombres, setEdad, setPronombres, userPhotos}) => {

  return (
    <div className="club_carrusel_perfil carousel-container">
      <Swiper
        modules={[Pagination]} // Agregamos el módulo de paginación
        spaceBetween={10} // Espacio entre slides
        slidesPerView={1} // Una foto por slide
        pagination={{ clickable: true }} // Bullets
        className="club_perfil_fotos_swiper"
      >
        {userPhotos.map((photo, index) => (
          <SwiperSlide key={index} className="">
            <img src={photo} alt={`User photo ${index + 1}`} className="club_perfil_fotos_img" />
            <div className="club_datos_perfil club_texto_sombreado_blanco">
              <div className="club_perfil_completado">
                <span>70% completado</span>
              </div>
              <div className="club_perfil_info">
                <p>{setNombres}, {setEdad}</p>
                <div className="club_location_pronombre">
                  <span className="d-flex align-items-center"><FaMapMarkerAlt /> Menos de un km</span>
                  <span className="d-flex align-items-center"><FaUser />{setPronombres}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselPerfilUsuario;
