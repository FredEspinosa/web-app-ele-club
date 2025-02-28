// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./foto_de_perfil";
import EditProfileForm from "./editar_perfil";
import PhotoGallery from "./galeria_de_fotos";
import CarruselPerfilUsuario from "../swiper/carrusel_perfil_usuario";
import { IoIosArrowBack, IoIosSettings } from "react-icons/io";
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png";
import SlidePrueba1 from "../../assets/images/imgs_slide/imagen_prueba_1.png";
import SlidePrueba2 from "../../assets/images/imgs_slide/imagen_prueba_2.jpeg";
import SlidePrueba3 from "../../assets/images/imgs_slide/imagen_prueba_3.png";
import SlidePrueba4 from "../../assets/images/imgs_slide/imagen_prueba_4.png";
import { MdOutlineEditNote } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import NavBar from "../nav_bar/navBar";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import Loader from "../loader/loader";
import AlertSuscribe from "../alertas/alert_suscribete";
import { enviarDatosUsuario } from "../../services/data";

const UserProfile = () => {
  const navigate = useNavigate();
  const [editaPerfil, setEditaPerfil] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [topBarTitle, setTopBarTitle] = useState("Mi perfil");
  const [perfilProgress, setPerfilProgress] = useState("65%");
  const [datosUsuario, setDatosUsuario] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [perfilAge, setPerfilAge] = useState("");
  const [dataUser, setDataUser] = useState({
    userId: "",
    userName: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    height: "",
    aboutMe: "",
    match: "",
    friend: "",
    friendRequest: "",
    genders: "",
    lookingFors: "",
    perceptions: "",
    pronouns: "",
    relationshipStatus: "",
    sexualIdentities: "",
    pets: "",
    roles: "",
    interests: "",
    zodiacs: "",
    smokes: "",
    userPhotos: "",
    delegation: "",
    age: "",
    phoneNumber: "",
    photoProfile: "",
  });
  const [profilePicture, setProfilePicture] = useState(PerfilDefault); // Inicializa con una imagen predeterminada
  const [userPhotosNew, setUserPhotosNew] = useState(() => {
    // Obtener fotos del localStorage
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    const storedPhotos= datosUsuario.userPhotos
    console.log('storedPhotos', storedPhotos);
    


    if (!storedPhotos) return []; // Si no hay fotos guardadas, retorna un arreglo vacío

    try {
      // Transformar los datos al formato esperado
      return storedPhotos.map(({ userId, photo }) => ({ userId, photo }));
    } catch (error) {
      console.error("Error al parsear userPhotos desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosUsuario) {
      setDataUser(datosUsuario);
    }
    const tokenStorage = sessionStorage.getItem("AccessToken");
    if (tokenStorage) {
      setTokenSesionStorage(tokenStorage);
    }
  }, []);

  useEffect(() => {
    if (dataUser.birthDate) {
      const edad = calcularEdad(dataUser.birthDate);
      console.log(`La edad es: ${edad} años`);
      setPerfilAge(edad);
    }
    // Verifica si dataUser tiene FotosCarrucel y establece el primer elemento como la imagen de perfil
    if (dataUser?.userPhotos && dataUser.userPhotos.length > 0) {
      setProfilePicture(dataUser.userPhotos[0].photo);
    } else {
      setProfilePicture(PerfilDefault); // Imagen predeterminada
    }
  }, [dataUser]); // Ejecuta el efecto cuando dataUser cambie

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (updatedInfo) => {
    setDataUser({ ...dataUser, ...updatedInfo });
    setIsEditing(false);
  };

  // Función para añadir una nueva imagen
  const addPhoto = (newPhoto) => {
    setUserPhotosNew((prevPhotos) => [...prevPhotos, newPhoto]);
  };

  const redirectBack = () => {
    setTopBarTitle("Mi perfil");
    if (!editaPerfil) {
      setEditaPerfil(true);
    } else {
      navigate("/home");
    }
  };

  const handleProfilePictureChange = (newImageUrl) => {
    // console.log("newImageUrl", newImageUrl);
    setProfilePicture(newImageUrl); // Actualiza la imagen de perfil
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    console.log("topBar", topBarTitle);
  }, [topBarTitle]);

  const goSuscribe = () => {
    navigate("/suscripcion");
  };

  const handleUpdateInfo = () => {
    const nuevosDatos = { ...datosUsuario, ...dataUser };
    localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
    // console.log("Datos actualizados guardados:", nuevosDatos);
    setTimeout(() => {
      updateDataUserInfo();
    }, 300);
  };

  const updateDataUserInfo = async () => {
    setShowLoader(true); // Mostrar el loader al inicio
    const type = "update";
    try {
      const tokenSesion = tokenSesionStorage;
      const response = await enviarDatosUsuario(tokenSesion, type, dataUser);
      console.log("response", response);

      // Validar la respuesta
      if (response?.status === 200) {
        // Ajusta según el código esperado por tu API
        console.log("Datos enviados correctamente:", response);
        // navigate('/notificaciones');
        setMensajeModal(
          <p>
            Información actualizada <b>correctamente</b>.
          </p>
        );
      } else {
        console.error("Ocurrió un error en la API:", response);
      }
    } catch (err) {
      console.error("Error al enviar datos del usuario:", err);
      setShowAlert(true);
      setMensajeModal(
        <p>
          ¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.
        </p>
      );
    } finally {
      setShowLoader(false); // Asegurarse de ocultar el loader siempre
      setShowAlert(true);
      setMensajeModal(
        <p>
          ¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.
        </p>
      );
    }
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date(); // Fecha actual
    const fechaNac = new Date(fechaNacimiento); // Convierte el string a fecha
    let edad = hoy.getFullYear() - fechaNac.getFullYear(); // Diferencia de años

    // Ajusta si el cumpleaños aún no ha pasado este año
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNac.getMonth();
    const diaNacimiento = fechaNac.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }

    return edad;
  };

  return (
    <div id="perfilUsuario">
      <div className="club_perfil_barra">
        <div className="col-12 d-flex club_contenedor club_bg_blanco">
          <div className="col-3 d-flex align-items-center justify-content-start">
            <button className="btn d-flex align-items-center club_color_fuente_negro club_config_btn_back" onClick={redirectBack}>
              {topBarTitle === "Editar perfil" ? (
                <FaArrowLeft size={14} className="club_color_fuente_negro" />
              ) : (
                <IoIosSettings size={24} className="club_color_fuente_negro" />
              )}
            </button>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <h1 className="club_titulo_config club_color_fuente_negro">{topBarTitle}</h1>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end"></div>
        </div>
      </div>

      {editaPerfil ? (
        <div className="club_contenedor club_margin_bar_40 container-lg">
          <div className="col-12 d-flex club_contenedor club_no_wrap_desk">
            <div className="club_cont_perfil_foto">
              <div className="club_cont_perfil_img">
                <img
                  src={dataUser?.userPhotos?.length > 0 ? dataUser.userPhotos[0].photo : `data:image/jpeg;base64,${profilePicture}`}
                  alt="Imagen de Perfil"
                  srcSet="Imagen de Perfil"
                />
                {/* <img src={`data:image/jpeg;base64,${profilePicture}`} alt="" srcSet="Imagen de Perfil" /> */}
                <FaCamera
                  className="club_btn_edit_foto_perfil"
                  size={24}
                  style={{ top: "15%" }}
                  onClick={() => {
                    setEditaPerfil(false);
                    setTopBarTitle("Editar perfil");
                  }}
                />
              </div>
              <div className="col-12 d-flex justify-content-center">
                <h1 className="club_texto_sombreado_negro text-center">¡Hola {dataUser.name}!</h1>
              </div>
            </div>

            <div className="club_cont_barra">
              <span className="club_color_fuente_negro">
                Completa tu perfil <span>{perfilProgress}</span>
              </span>
              <div className="club_barra_progreso">
                <div className="club_progreso club_bg_oro active"></div>
                <div className="club_progreso club_bg_oro active"></div>
                <div className="club_progreso club_bg_oro active animate__animated animate__bounceIn"></div>
                <div className="club_progreso"></div>
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="club_cont_data_perfil">
            <h3 className="club_txt_titular">{perfilAge} años</h3>
            <div className="d-flex flex-wrap">
              {Array.isArray(dataUser.pronouns) &&
                dataUser.pronouns?.map((item, index) => (
                  <li className="club_no_decoration_list club_list_separation" key={index}>
                    <span className="club_txt_caption w-100">{item.name}</span>
                  </li>
                ))}
              {Array.isArray(dataUser.delegation) &&
                dataUser.delegation?.map((item, index) => (
                  <li className="club_no_decoration_list club_list_separation" key={index}>
                    <span className="club_txt_caption w-100">{item.name}</span>
                  </li>
                ))}
            </div>
          </div>
          <div className="club_info_intereses_contenedor">
            <div className="club_cont_data_perfil">
              <h3 className="club_txt_titular">Acerca de mi</h3>
              <div className="d-flex flex-wrap">
                <span className="club_txt_caption w-100">
                  {dataUser.aboutMe ? dataUser.aboutMe : "Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!"}
                </span>
              </div>
            </div>

            <div className="club_cont_data_perfil">
              <h3 className="club_txt_titular">Estoy buscando</h3>
              <div className="d-flex flex-wrap">
                {Array.isArray(dataUser.lookingFors) &&
                  dataUser.lookingFors?.map((item, index) => (
                    <li className="club_no_decoration_list" key={index}>
                      <span className="club_txt_caption w-100 club_texto_capsula">{item.lookingFor ? item.lookingFor.name : item.name}</span>
                    </li>
                  ))}
              </div>
            </div>

            <div className="club_cont_data_perfil">
              <h3 className="club_txt_titular">Identidad de género</h3>
              <div className="d-flex flex-wrap">
                {Array.isArray(dataUser.genders) &&
                  dataUser.genders?.map((item, index) => (
                    <li className="club_no_decoration_list" key={index}>
                      <span className="club_txt_caption w-100 club_texto_capsula">{item.gender ? item.gender.name : item.name}</span>
                    </li>
                  ))}
              </div>
            </div>

            <div className="club_cont_data_perfil">
              <h3 className="club_txt_titular">Identidad sexual</h3>
              <div className="d-flex flex-wrap">
                {Array.isArray(dataUser.sexualIdentities) &&
                  dataUser.sexualIdentities?.map((item, index) => (
                    <li className="club_no_decoration_list" key={index}>
                      <span className="club_txt_caption w-100 club_texto_capsula">{item.sexualIdentity ? item.sexualIdentity.name : item.name}</span>
                    </li>
                  ))}
              </div>
            </div>

            <div className="club_cont_data_perfil">
              <h3 className="club_txt_titular">Percepción sexual</h3>
              <div className="d-flex flex-wrap">
                {Array.isArray(dataUser.perceptions) &&
                  dataUser.perceptions?.map((item, index) => (
                    <li className="club_no_decoration_list" key={index}>
                      <span className="club_txt_caption w-100 club_texto_capsula">{item.perception ? item.perception.name : item.name}</span>
                    </li>
                  ))}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="club_cont_btns_doble club_bienvenida_btns">
            <div className="col-5">
              <button
                className="btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro"
                onClick={() => {
                  setEditaPerfil(false);
                  setTopBarTitle("Editar perfil");
                }}
              >
                Editar perfil
              </button>
            </div>
            <div className="col-5">
              <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={goSuscribe}>
                Suscribirse
              </button>
            </div>
          </div>

          <PhotoGallery
            photos={dataUser.userPhotos}
            onPhotoUpload={(newPhoto) => setDataUser({ ...dataUser, userPhotos: [...dataUser.userPhotos, newPhoto] })}
            addPhoto={addPhoto}
            userPhotosNew={userPhotosNew}
            textoTitulo={"Agregar Fotos"}
          />

          <br />
          <br />

          <br />
          <br />

          <br />
          <br />
        </div>
      ) : (
        <div className="club_contenedor club_margin_bar_40 container-lg">
          <ProfilePicture src={profilePicture} onEdit={handleProfilePictureChange} />
          {isEditing ? (
            <div></div>
          ) : (
            <div className="club_info_personal_perfil">
              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Acerca de mi</h3>
                <div className="d-flex flex-wrap">
                  <span className="club_txt_caption w-100">
                    {dataUser.aboutMe ? dataUser.aboutMe : "Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!"}
                  </span>
                </div>
              </div>
              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Estoy buscando</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.lookingFors) &&
                    dataUser.lookingFors?.map((item, index) => (
                      <li className="club_no_decoration_list club_list_separation" key={index}>
                        <span className="club_txt_caption w-100">{item.lookingFor ? item.lookingFor.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Identidad de género</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.genders) &&
                    dataUser.genders?.map((item, index) => (
                      <li className="club_no_decoration_list club_list_separation" key={index}>
                        <span className="club_txt_caption w-100">{item.gender ? item.gender.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Identidad sexual</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.sexualIdentities) &&
                    dataUser.sexualIdentities?.map((item, index) => (
                      <li className="club_no_decoration_list club_list_separation" key={index}>
                        <span className="club_txt_caption w-100">{item.sexualIdentity ? item.sexualIdentity.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Percepción sexual</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.perceptions) &&
                    dataUser.perceptions?.map((item, index) => (
                      <li className="club_no_decoration_list club_list_separation" key={index}>
                        <span className="club_txt_caption w-100">{item.perception ? item.perception.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>
            </div>
          )}
          {isEditing ? (
            <EditProfileForm dataUser={dataUser} onSave={handleSaveProfile} cancelEdit={cancelEdit} />
          ) : (
            <div>
              <br />
              <div className="club_cont_btns_full club_notificaciones_btns">
                <button type="submit" className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={handleEditToggle}>
                  Editar información personal
                </button>
              </div>
            </div>
          )}
          <PhotoGallery
            photos={dataUser.userPhotos}
            onPhotoUpload={(newPhoto) => setDataUser({ ...dataUser, userPhotos: [...dataUser.userPhotos, newPhoto] })}
            addPhoto={addPhoto}
            userPhotosNew={userPhotosNew}
            textoTitulo={"Agregar Fotos"}
          />
          {/* <PhotoGallery 
                    photos={dataUser.FotosCarrucel} 
                    onPhotoUpload={(newPhoto) => setDataUser({...dataUser, FotosCarrucel: [...dataUser.FotosCarrucel, newPhoto]})} 
                    addPhoto={addPhoto}
                    userPhotosNew={userPhotosNew}
                    textoTitulo={'Agregar Fotos'}
                /> */}

          <br />
          <br />
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button
              type="submit"
              className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
              style={{ marginBottom: "120px" }}
              onClick={() => {
                setEditaPerfil(true);
                handleUpdateInfo();
              }}
            >
              Actualizar Información
            </button>
          </div>
        </div>
      )}
      <NavBar currentPage={"Perfil"} />
      {showLoader && <Loader />}
      {showAlert && (
        <AlertSuscribe mensajeModal={mensajeModal} btnAceptar={true} btnMsjButtom={"CERRAR"} handleOnclick={closeModal} bgColorButton={"club_bg_oro"} />
      )}
    </div>
  );
};

export default UserProfile;
