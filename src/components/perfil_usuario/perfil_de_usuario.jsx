/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./foto_de_perfil";
import EditProfileForm from "./editar_perfil";
import PhotoGallery from "./galeria_de_fotos";
import { IoIosSettings } from "react-icons/io";
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png";
import NavBar from "../nav_bar/navBar";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../loader/loader";
import AlertSuscribe from "../alertas/alert_suscribete";
import ProgressBar from "../set_up_perfil/ProgressBar";
import { useProgress } from "../../hooks/ProgressContext";
import { userProfileMe } from "../../services/api";
import { use } from "react";
import { useCalcProgress } from "../../hooks/useCalcProgress";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [topBarTitle, setTopBarTitle] = useState("Mi perfil");
  const [perfilProgress, setPerfilProgress] = useState("45%");
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [userPhotosNew, setUserPhotosNew] = useState([]);
  const [dataUser, setDataUser] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("datosUsuario"));
    return (
      storedData || {
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
        userPhotos: [],
        delegation: "",
        age: "",
        phoneNumber: "",
        photoProfile: "",
      }
    );
  });
  const { setCurrentStep } = useProgress();
  const progressValueCalc = useCalcProgress(dataUser);


  const calcularEdad = useCallback((fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    if (hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }, []);

  const profilePicture = useMemo(() => {
    return dataUser?.userPhotos?.length > 0 ? dataUser.userPhotos[0].photo : PerfilDefault;
  }, [dataUser.userPhotos]);

  const perfilAge = useMemo(() => {
    return dataUser.birthDate ? calcularEdad(dataUser.birthDate) : "";
  }, [dataUser.birthDate]);

  const scrollToTop = useCallback(() => {
    scrollTo(0,0, { behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("AccessToken")) {
      setTokenSesionStorage(sessionStorage.getItem("AccessToken"));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("datosUsuario", JSON.stringify(dataUser));
  }, [dataUser]);
  
  useEffect(() => {
    setCurrentStep(progressValueCalc);
  }, [dataUser, setCurrentStep, progressValueCalc]);

  useEffect(() => {
    scrollToTop();
  }, [isEditing]);

  const handleSaveProfile = useCallback((updatedUser) => {
    setDataUser(updatedUser);
    setIsEditing(false);
    setShowLoader(true);
    setTopBarTitle("Mi perfil");
  }, []);

  const addPhoto = useCallback((newPhoto) => {
    setUserPhotosNew((prevPhotos) => [...prevPhotos, newPhoto]);
  }, []);

  const redirectBack = useCallback(() => {
    setTopBarTitle("Mi perfil");
    if (isEditing) {
      setIsEditing(false);
    } else {
      navigate("/home");
    }
  }, [isEditing, navigate]);

  const handleProfilePictureChange = useCallback((newImageUrl) => {
    if (newImageUrl) {
      setDataUser((prevData) => ({ ...prevData, userPhotos: [{ photo: newImageUrl }, ...prevData.userPhotos.slice(1)] }));
    }
  }, []);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setTopBarTitle("Mi perfil");
  }, []);

  const goSuscribe = useCallback(() => {
    navigate("/suscripcion");
  }, [navigate]);

  const closeModal = useCallback(() => {
    setShowAlert(false);
  }, []);

  return (
    <div id="perfilUsuario">
      <div className="club_perfil_barra">
        <div className="col-12 d-flex club_contenedor club_bg_blanco">
          <div className="col-3 d-flex align-items-center justify-content-start">
            <button className="btn d-flex align-items-center club_color_fuente_negro club_config_btn_back" onClick={redirectBack}>
              <FaArrowLeft size={14} className="club_color_fuente_negro" />

              {/* {topBarTitle === "Editar perfil" ? (
                <FaArrowLeft size={14} className="club_color_fuente_negro" />
              ) : (
                <IoIosSettings size={24} className="club_color_fuente_negro" />
              )} */}
            </button>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <h1 className="club_titulo_config club_color_fuente_negro">{topBarTitle}</h1>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end"></div>
        </div>
      </div>
      <div className="club_contenedor club_margin_bar_40 container-lg">
        <div className="col-12 d-flex club_contenedor club_no_wrap_desk">
          <div className="club_cont_perfil_foto">
            {!isEditing ? (
              <div className="club_cont_perfil_img">
                <img
                  // src={JSON.parse(localStorage.getItem("datosUsuario")).userPhotos[0].photo || `data:image/jpeg;base64,${profilePicture}`}
                  src={
                    (() => {
                      const storedData = JSON.parse(localStorage.getItem("datosUsuario"));
                      if (storedData && storedData.userPhotos && storedData.userPhotos.length > 0) {
                        return storedData.userPhotos[0].photo || `data:image/jpeg;base64,${profilePicture}`;
                      }
                      return PerfilDefault;
                    })() }
                  alt="Imagen de Perfil"
                  srcSet="Imagen de Perfil"
                />
              </div>
            ) : (
              <ProfilePicture src={profilePicture} onEdit={handleProfilePictureChange} />
            )}

            <div className="col-12 d-flex justify-content-center">
              <h1 className="club_texto_sombreado_negro text-center">
                ¡Hola <b>{dataUser.name}</b>!
              </h1>
            </div>
          </div>
        </div>

        {!isEditing ? (
          <>
            <ProgressBar porcentaje={progressValueCalc / 4 * 100} />
            <br />
            <br />

            <div className="club_cont_data_perfil club_info_me">
              <h3 className="club_txt_titular">{perfilAge} años</h3>
              <div className="d-flex flex-wrap">
                {Array.isArray(dataUser.pronouns) &&
                  dataUser.pronouns?.map((item, index) => (
                    <li className="club_no_decoration_list col-12" key={index}>
                      <span className="club_txt_caption w-100 club_texto_capsula club_color_fuente_negro">{item.pronoun ? item.pronoun.name : item.name}</span>
                    </li>
                  ))}
                {/* {Array.isArray(dataUser.userLocation) &&
                  dataUser.userLocation?.map((item, index) => ( */}
                    {/* <li className="club_no_decoration_list col-12" key={index}> */}
                    <li className="club_no_decoration_list col-12" >
                      <span className="club_txt_caption w-100 club_texto_capsula club_color_fuente_negro">{dataUser.userLocation?.location ? dataUser.userLocation?.location : 'Prueba'}</span>
                    </li>
                  {/* ))} */}
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

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Intereses</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.interests) &&
                    dataUser.interests?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.interest ? item.interest.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Pets</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.pets) &&
                    dataUser.pets?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.pet ? item.pet.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">Pronouns</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.pronouns) &&
                    dataUser.pronouns?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.pronoun ? item.pronoun.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">RelationshipStatus</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.relationshipStatus) &&
                    dataUser.relationshipStatus?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.relationshipStatus ? item.relationshipStatus.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">¿Cuál es tu rol?</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.roles) &&
                    dataUser.roles?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.role ? item.role.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">¿Fumas?</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.smokes) &&
                    dataUser.smokes?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.smoke ? item.smoke.name : item.name}</span>
                      </li>
                    ))}
                </div>
              </div>

              <div className="club_cont_data_perfil">
                <h3 className="club_txt_titular">¿Cuál es tu signo zodiacal?</h3>
                <div className="d-flex flex-wrap">
                  {Array.isArray(dataUser.zodiacs) &&
                    dataUser.zodiacs?.map((item, index) => (
                      <li className="club_no_decoration_list" key={index}>
                        <span className="club_txt_caption w-100 club_texto_capsula">{item.zodiac ? item.zodiac.name : item.name}</span>
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
                    setIsEditing(true);
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
          </>
        ) : (
          <EditProfileForm
            onSave={handleSaveProfile}
            dataUser={dataUser}
            cancelEdit={cancelEdit}
            token={tokenSesionStorage}
            setShowLoader={setShowLoader}
            setMensajeModal={setMensajeModal}
            setShowAlert={setShowAlert}
          />
        )}
      </div>
      <PhotoGallery
        photos={dataUser.userPhotos}
        onPhotoUpload={(newPhoto) => setDataUser({ ...dataUser, userPhotos: [...dataUser.userPhotos, newPhoto] })}
        addPhoto={addPhoto}
        userPhotosNew={userPhotosNew}
        textoTitulo={"Agregar Fotos"}
        token={tokenSesionStorage}
        dataUser={dataUser}
        type={'update'}
      />
      <div className="p-5 m-5"></div>
      <NavBar currentPage={"Perfil"} />
      {showLoader && <Loader />}
      {showAlert && (
        <AlertSuscribe mensajeModal={mensajeModal} btnAceptar={true} btnMsjButtom={"CERRAR"} handleOnclick={closeModal} bgColorButton={"club_bg_oro"} />
      )}
    </div>
  );
};

export default UserProfile;
