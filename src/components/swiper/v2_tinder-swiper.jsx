// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { IoHeartCircleSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { likeSend, locationFeed } from "../../services/api";
import AlertSuscribe from "../alertas/alert_suscribete";
import Loader from "../loader/loader";
import { FaCheck } from "react-icons/fa6";
import ProfilePicture from "../../assets/images/perfil/blank-profile-picture.png";


const TinderLikeCarouselV2 = ({ubicationData}) => {
  
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0); // Para manejar la imagen actual
  const [animacionBtnLike, setAnimacionBtnLike] = useState ('');
  const [animacionBtnDislike, setAnimacionBtnDislike] = useState ('');
  const [imageProfile, setImageProfile] = useState ('');
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [gpsData, setGpsData] = useState (ubicationData);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const totalImages = 3; // Número total de imágenes (large, medium, thumbnail)

  useEffect(() => {
    let tokenStorage = sessionStorage.getItem("AccessToken");
      if (tokenStorage) {
        // console.log("gpsData swiper v2", gpsData);        
        setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
        // updateUbication(tokenStorage); 
        sendLocationToServer(tokenStorage)
      }
  }, []);

  // const updateUbication = (tokenStorage) => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude });
  //         // Enviar ubicación al servicio
  //         console.log("location", location);
          
  //         sendLocationToServer(tokenStorage, { latitude, longitude });
  //       },
  //       (error) => {
  //         console.error("Error obteniendo la ubicación:", error);
  //         setError(error.message);
  //         setShowAlert(true);
  //         setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
  //       }
  //     );
  //   } else {
  //     setError("La geolocalización no está soportada en este navegador.");
  //   }
  // }

  const sendLocationToServer = async (tokenStorage) => {
    setShowLoader(true)
    try {
      let location = {
        latitude: gpsData.latitude,
        longitude: gpsData.longitude,
      }      
      const tokenSesion = tokenStorage;
      const response = await locationFeed(tokenSesion, location)
      
      if (response?.status === 200) {
        const result = response.data?.result;
        if (Array.isArray(result) && result.length > 0) {
          console.log("Feed Datos enviados correctamente:", result);
          setShowLoader(false); // Asegurarse de ocultar el loader siempre
          setProfiles(result);
        } else {
            console.warn("La API respondió con éxito, pero no hay datos disponibles.");
            setShowLoader(false); // Asegurarse de ocultar el loader siempre
            setShowAlert(true);
            setMensajeModal(<p>¡Lo sentimos! no hay nada más que mostrar.</p>);
        }
      } else {
        console.error("Ocurrió un error en la API:", response);
        setShowAlert(true);
        setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
      }
    } catch (error) {
      console.error("Error al enviar datos del usuario:", error);
      setShowLoader(false); // Asegurarse de ocultar el loader siempre
      setShowAlert(true);
      setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
    }
  }

  useEffect(() => {
    console.log("tokenSesionStorage", tokenSesionStorage);
  }, [tokenSesionStorage])
  

  useEffect(() => {
    if (profiles.length > 0 && profiles[currentIndex]?.userPhotos?.length > 0) {
      const imageOptions = profiles[currentIndex].userPhotos.map(photo => photo.photo);
      setImageProfile(imageOptions);
      setImageIndex(0); // Reiniciar el índice de imágenes al cambiar de perfil
    } else {
      setImageProfile([]);
    }
  }, [currentIndex, profiles]);

  const handleLike = () => {
    // console.log("Me gusta", profiles[currentIndex].name);
    setAnimacionBtnLike('animate__flip');    // Activa la animación
    let user = profiles[currentIndex].userId
    let liked = true
    setTimeout(() => {    // Reinicia la animación después de que termine (duración de animate__rubberBand es ~1s)
      setAnimacionBtnLike(''); // Resetea la animación
      sendDataLike(user, liked)
    }, 1000); 
    goToNextProfile(); // Cambia al siguiente perfil
  };

  const handleDislike = () => {
    // console.log("No me gusta", profiles[currentIndex].name);
    setAnimacionBtnDislike('animate__rotateOut'); // Activa la animación
    let user = profiles[currentIndex].userId
    let liked = false
    setTimeout(() => {  // Reinicia la animación después de que termine
      setAnimacionBtnDislike(''); // Resetea la animación
      sendDataLike(user, liked)
    }, 1000); 
    goToNextProfile(); // Cambia al siguiente perfil
  };

  const goToNextProfile = () => {
    setImageIndex(0); // Reinicia la imagen cuando cambia de perfil
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleImageClick = () => {
    if (imageProfile.length === 0) return; // Evita errores si no hay imágenes
  
    setImageIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % imageProfile.length; // Vuelve a 0 cuando llegue al final
      // console.log("Cambiando imagen a:", imageProfile[nextIndex]); // Debug
      return nextIndex;
    });
  };

  const getProfileImage = () => {
    // console.log("Imagen actual:", imageProfile[imageIndex]); // Debug
    return imageProfile[imageIndex];
  };
  
  // const getProfileImage = () => {
  //   const image = imageProfile?.[imageIndex];
  //   return image || ProfilePicture;
  // };

  const handleSwipe = (direction) => {
    if (direction === "left") {
      handleDislike();
    } else if (direction === "right") {
      handleLike();
    }
  };

  const goPersonProfile = () => {
    // perfil_amigo 
    // Aqui hay dos opciones
    // Desde aqui se podria tomar el userId y hacer la peticion de profile, y cuando responda correctamente, pasar los states necesarios del usuario
    navigate(
      '/perfil_otra_persona',
      { state: { 
        tokenSesion: tokenSesionStorage,
        likedUserId: profiles[currentIndex].userId,
        profileImages: imageProfile, 
        nameProfile: profiles[currentIndex].name + ' ' + profiles[currentIndex].lastName,
        // age: profiles[currentIndex].age,
        aboutMe: profiles[currentIndex].aboutMe,
        lookingFors: profiles[currentIndex].lookingFors,
        genders: profiles[currentIndex].genders,
        sexualIdentities: profiles[currentIndex].sexualIdentities,
        perceptions: profiles[currentIndex].perceptions,
        relationshipStatus: profiles[currentIndex].relationshipStatus
      } }
    )
  }

  const sendDataLike= async (user, liked) => {
    const data = {
      "likedUserId": user,
      "liked": liked
    }
    try {
      const tokenSesion = tokenSesionStorage;
      const response = await likeSend(tokenSesion, data);
      // Validar la respuesta
      if (response?.isSuccess === true) { // Ajusta según el código esperado por tu API
        console.log("Datos enviados correctamente:", response);
        // getDataProfileMe(tokenSesion)
      } else {
        console.error("Ocurrió un error en la API:", response);
      }
    } catch (err) {
      console.error("Error al enviar datos del usuario:", err);
    } finally {
      // setShowLoader(false); // Asegurarse de ocultar el loader siempre
    }
  };   

  const closeModal = () => {
    setShowAlert(false)
  }

  return (
    <div className="club_cont_tinder_swipe">
      {profiles.length > 0 && (
        <div className="club_centrar_swiper_tinder">
          {/* Bullets manuales para las imágenes */}
          {/* <div className="club_bullets_imgs">
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
          </div> */}
          <TinderCard
            onSwipe={handleSwipe} // Detecta swipe
            key={profiles[currentIndex].userId}
            preventSwipe={["up", "down"]}
            className="club_contenedor_diamante"
          >
            {imageProfile.length > 0 && (
              <img
                className="club_imagen_fondo"
                src={getProfileImage()} // Obtiene la imagen actual
                alt="Foto de perfil"
                onClick={handleImageClick} // Cambia la imagen al hacer click
                onTouchEnd={handleImageClick} // Soporte para móviles
              />
            )}
          </TinderCard>

          {/* Nombre y Datos de la Persona */}
          <div className="col-12 club_carrucel_datos_persona">
            <h3 className="col-12" onClick={goPersonProfile}>
              {profiles[currentIndex].name} {profiles[currentIndex].lastName}, {profiles[currentIndex].age} <FaCheck className='club_color_fuente_violeta_05' size={24} />
            </h3>
            <p className="col-12">
              {profiles[currentIndex] ? profiles[currentIndex].userLocation?.location : 'Missing data...'}
              {/* {profiles[currentIndex].delegation}, {profiles[currentIndex].delegation} */}
            </p>
          </div>
        </div>
      )}

      <div className={`club_swiper_tache`}>
        <TiDelete size={60} onClick={handleDislike} className={`active animate__animated ${animacionBtnDislike}`} />
      </div>
      <div className={`club_swiper_corazon`}>
        <IoHeartCircleSharp size={60} onClick={handleLike} className={`active animate__animated ${animacionBtnLike}`} />
      </div>
      {(showAlert && 
            <AlertSuscribe 
            mensajeModal={mensajeModal}
            btnAceptar={true}
            btnMsjButtom={'CERRAR'}
            handleOnclick={closeModal}
            bgColorButton={'club_bg_oro'}
            />
      )}
      {(showLoader && <Loader />)}
    </div>
  );
};

export default TinderLikeCarouselV2;
