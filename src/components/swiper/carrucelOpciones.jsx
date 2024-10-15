import { useEffect, useState } from "react";
// import Swiper core and required modules Documentación https://swiperjs.com/react
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Imagen de prueba en slide
import SlidePrueba2 from "../../assets/images/imgs_slide/imagen_prueba_2.jpeg";
import { obtenerImagenPerfil } from "../../services/api";
import { TiDelete } from "react-icons/ti";
import { IoHeartCircleSharp } from "react-icons/io5";

export const CarrucelOpciones = () => {
    const [imagenesPerfiles, setImagenesPerfiles] = useState([SlidePrueba2]); // Estado con imágenes
    const [error, setError] = useState(null); // Estado para manejar errores
    const [swiperInstance, setSwiperInstance] = useState(null); // Estado para guardar la instancia del Swiper

    // Función para cargar una nueva imagen de perfil
    const cargarImagenPerfil = async () => {
        try {
        const data = await obtenerImagenPerfil();
        console.log("data", data.message);
        setImagenesPerfiles((prev) => [...prev, data.message]); // Concervamos las imagenes anteriores y se añade la nueva imagen
        } catch (err) {
        setError("Error al obtener imagen");
        console.log(err);
        }
    };

    // Se ejecuta cuando cambia el slide
    const handleSlideChange = (swiper) => {
        // Si estamos en el último slide visible, cargar una nueva imagen
        if (swiper.activeIndex === imagenesPerfiles.length - 1) {
        cargarImagenPerfil();
        }
    };

    // useEffect para cargar la primera imagen
    useEffect(() => {
        cargarImagenPerfil(); // Carga inicial de una imagen
    }, []); // Ejecuta solo una vez al montar el componente

  return (
    <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: false }}
        nextEl ={false}
        loop={true} // Hace que el carrusel sea infinito
        onSwiper={(swiper) => setSwiperInstance(swiper)} // Guarda la instancia del Swiper
        onSlideChange={handleSlideChange} // Maneja el cambio de slide
    >
        <div className="club_swiper_tache">
            <TiDelete size={48.75} />
        </div>
        <div className="club_swiper_corazon">
            <IoHeartCircleSharp size={48.75} />
        </div>
        {/* Mapeamos las imágenes en el Swiper */}
        {imagenesPerfiles.map((imagen, index) => (
            <SwiperSlide key={index}>
                <div className="club_contenedor_diamante">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <img
                            className="club_diamante_img"
                            src={imagen}
                            alt={`Imagen ${index + 1}`}
                        />
                    )}
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
  );
};
