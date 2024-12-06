// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./foto_de_perfil";
import EditProfileForm from "./editar_perfil";
import PhotoGallery from "./galeria_de_fotos";
import CarruselPerfilUsuario from '../swiper/carrusel_perfil_usuario';
import { IoIosArrowBack, IoIosSettings } from "react-icons/io";
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import SlidePrueba1 from "../../assets/images/imgs_slide/imagen_prueba_1.png"
import SlidePrueba2 from "../../assets/images/imgs_slide/imagen_prueba_2.jpeg";
import SlidePrueba3 from "../../assets/images/imgs_slide/imagen_prueba_3.png";
import SlidePrueba4 from "../../assets/images/imgs_slide/imagen_prueba_4.png";
import { MdOutlineEditNote } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import NavBar from "../nav_bar/navBar";
import { FaArrowLeft, FaCamera } from "react-icons/fa";

const UserProfile = () => {
    const navigate = useNavigate();
    const [editaPerfil,setEditaPerfil] = useState(true)
    const [isEditing, setIsEditing] = useState(false);
    const [topBarTitle, setTopBarTitle] = useState('Mi perfil');
    const [perfilProgress, setPerfilProgress]= useState('65%')
    const [dataUser, setDataUser] = useState({
        Apellidos: "",
        Busca: "",
        CodigoPais: "",
        Correo: "",
        Delegacion:"",
        Edad:"",
        Estatura:"",
        EstatusRelacion: "",
        FechaNacimiento: "",
        Fumas:"",
        IdentidadDeGenero: "",
        IdentidadSexual: "",
        Intereses:"",
        Mascotas:[],
        Nombres: "",
        Pronombre: "",
        SignoZodiacal:"",
        Telefono: "",
        FotoPerfil: "",
        FotosCarrucel: [],
        Bio:"",
    })
    const [profilePicture, setProfilePicture] = useState(PerfilDefault); // Inicializa con una imagen predeterminada
    const [userPhotos, setUserPhotos] = useState([
        // Inicializa con algunas imágenes si deseas
        SlidePrueba1,
        SlidePrueba2,
        SlidePrueba3,
        SlidePrueba4,
    ]);
    // const infoSeleccionadsPerfil = [
    //     "Edad", 
    //     "Pronombre", 
    //     "Delegación",
    // ]; // Hace un filtrado de los campos que quiero mostrar
    
    useEffect(() => {
        const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
        if (datosUsuario) {
            setDataUser(datosUsuario);
        }
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = (updatedInfo) => {
        setDataUser({ ...dataUser, ...updatedInfo });
        setIsEditing(false);
    };
    
    // Función para añadir una nueva imagen
    const addPhoto = (newPhoto) => {
        setUserPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    };

    const redirectBack = () => {
        setTopBarTitle('Mi perfil')
        if (!editaPerfil) {
            setEditaPerfil(true)
        } else {
            navigate('/home')
        }
    }

    const redirectSettings = () => {
        navigate('/configuracion')
    }

    const handleProfilePictureChange = (newImageUrl) => {
        setProfilePicture(newImageUrl); // Actualiza la imagen de perfil
    };

    const cancelEdit = () => {
        setIsEditing(false)
    }

    useEffect(() => {
        console.log("topBar", topBarTitle);
    }, [topBarTitle]);

    const goSuscribe = () => {
        navigate('/suscripcion')
    }

  return (
    <div id="perfilUsuario">
        <div className='club_perfil_barra'>
            <div className='col-12 d-flex club_contenedor club_bg_blanco'>
                <div className='col-3 d-flex align-items-center justify-content-start'>
                    <button className='btn d-flex align-items-center club_color_fuente_negro club_config_btn_back'
                        onClick={ redirectBack }
                    >
                        { topBarTitle === 'Editar perfil' ?
                            <FaArrowLeft size={14} className='club_color_fuente_negro' />
                            :
                            <IoIosSettings size={24} className='club_color_fuente_negro' />
                        }
                    </button>
                </div>
                <div className='col-6 d-flex align-items-center justify-content-center'>
                    <h1 className='club_titulo_config club_color_fuente_negro'>{topBarTitle}</h1>
                </div>
                <div className='col-3 d-flex align-items-center justify-content-end'>
                    {/* {editaPerfil &&
                        <button className='btn d-flex align-items-center club_color_fuente_negro club_config_btn_back'
                            onClick={redirectSettings}
                        >
                        <IoIosSettings size={24} className='club_color_fuente_negro' />
                        </button>
                    } */}
                </div>
            </div>
        </div>
        
        {editaPerfil ?
        // <div>
            <div className='club_contenedor club_margin_bar_40 container-lg'>
                {/* <div className='col-12 d-flex club_contenedor' style={{paddingTop:'5%', paddingBottom:'3%'}}>
                    <div className='col-3 d-flex align-items-center justify-content-end'>
                        <button className='btn d-flex align-items-center club_color_fuente_negro club_config_btn_back'
                            onClick={() => {setEditaPerfil(false); setTopBarTitle('Editar perfil')}}
                        >
                            <MdOutlineEditNote size={30} className='club_color_fuente_negro' />
                        </button>
                    </div>
                </div> */}

                <div className='col-12 d-flex club_contenedor club_no_wrap_desk'>
                    <div className="club_cont_perfil_foto">
                        <div className="club_cont_perfil_img">
                            <img src={profilePicture} alt="" srcSet="Imagen de Perfil" />
                            <FaCamera 
                                className="club_btn_edit_foto_perfil" 
                                size={24}
                                style={{top:'15%'}}
                                onClick={() => {setEditaPerfil(false); setTopBarTitle('Editar perfil')}}
                            />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <h1 className="club_texto_sombreado_negro">¡Hola {dataUser.Nombres}!</h1>
                        </div>
                    </div>
                    {/* <div className='club_perfil_cont_fotos'>
                        <CarruselPerfilUsuario
                            setNombres={dataUser.Nombres}
                            setEdad={'24'}
                            setPronombres={dataUser.Pronombre}
                            userPhotos={userPhotos}
                        />
                    </div> */}

                    <div className="club_cont_barra">
                        <span className="club_color_fuente_negro">Completa tu perfil <span>{perfilProgress}</span></span>
                        <div className='club_barra_progreso'>
                            <div className='club_progreso club_bg_oro active'></div>
                            <div className='club_progreso club_bg_oro active'></div>
                            <div className='club_progreso club_bg_oro active animate__animated animate__bounceIn'></div>
                            <div className='club_progreso'></div>
                        </div>
                    </div>
                </div>
                <br />
                <br />

                <div className="club_cont_data_perfil">
                    <h3 className="club_txt_titular">{dataUser.Edad} años</h3>
                    <div className="d-flex flex-wrap">
                        <span className="club_txt_caption w-100">{dataUser.Pronombre}</span>
                        <span className="club_txt_caption w-100">{dataUser.Delegacion ? dataUser.Delegacion : 'CDMX'}</span>
                    </div>
                </div>
                <div className="club_info_intereses_contenedor">
                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Acerca de mi</h3>
                        <div className="d-flex flex-wrap">
                            <span className="club_txt_caption w-100">{dataUser.Bio ? dataUser.Bio : 'Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!'}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Estoy buscando</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 club_texto_capsula">{dataUser.Busca}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Identidad de género</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 club_texto_capsula">{dataUser.IdentidadDeGenero}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Identidad sexual</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 club_texto_capsula">{dataUser.IdentidadSexual}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Identidad sexual</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 club_texto_capsula">{dataUser.Percibes}</span>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className='club_cont_btns_doble club_bienvenida_btns'>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro' onClick={() => {setEditaPerfil(false); setTopBarTitle('Editar perfil')}}>Editar perfil</button>
                    </div>
                    <div className='col-5'>
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={goSuscribe}>Suscribirse</button>
                    </div>
                </div>

                <br />
                <br />

                {/* <div className='col-12 d-flex flex-wrap club_contenedor flex-wrap'>
                    <div className="club_perfil_pensamiento">
                        <h3 className="club_perfil_pensamiento_titulo club_texto_sombreado_blanco">Mis preferencias</h3>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="col-4">
                            <div className={`club_perfil_preferencias ${animPreferencias}`}>
                                <p>{dataUser.EstatusRelacion}</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className={`club_perfil_preferencias ${animPreferencias}`}>
                                <p>{dataUser.IdentidadDeGenero}</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className={`club_perfil_preferencias ${animPreferencias}`}>
                                <p>{dataUser.IdentidadSexual}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="col-6">
                            <div className={`club_perfil_preferencias ${animPreferencias}`}>
                                <p>{dataUser.Busca}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className={`club_perfil_preferencias ${animPreferencias}`}>
                                <p>{dataUser.Pronombre}</p>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div> */}

                <br />
                <br />

            </div>
            :
            <div className='club_contenedor club_margin_bar_40 container-lg'>
                <ProfilePicture  
                    src={profilePicture} 
                    onEdit={handleProfilePictureChange}
                />
                <div className="club_info_personal_perfil">
                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Acerca de mi</h3>
                        <div className="d-flex flex-wrap">
                            <span className="club_txt_caption w-100">{dataUser.Bio ? dataUser.Bio : 'Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!'}</span>
                        </div>
                    </div>
                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Estoy buscando</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 ">{dataUser.Busca}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Identidad de género</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 ">{dataUser.IdentidadDeGenero}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Identidad sexual</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 ">{dataUser.IdentidadSexual}</span>
                        </div>
                    </div>

                    <div className="club_cont_data_perfil">
                        <h3 className="club_txt_titular">Identidad sexual</h3>
                        <div className="">
                            <span className="club_txt_caption w-100 ">{dataUser.Percibes}</span>
                        </div>
                    </div>

                    {/* Muestra toda la data en contenedores de div como los de arriba */}
                    {/* <div className="club_cont_data_perfil">
                    {dataUser &&
                        Object.entries(dataUser).map(([key, value]) => (
                            <div key={key}>
                                <h3 className="club_txt_titular">{key}</h3>
                                <div className="d-flex flex-wrap">
                                    <span className="club_txt_caption w-100 ">{value}</span>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    {/* Muestra toda la data en un listado */}
                    {/* <u className="club_lista_ul">
                    {dataUser &&
                        Object.entries(dataUser).map(([key, value]) => (
                        <li className="club_lista_li club_contenedor_settings club_contenedor_bg_borde_gris club_margin_bar_40 d-flex justify-content-between" key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                        ))}
                    </u> */}
                </div>
                {isEditing ? (
                    <EditProfileForm dataUser={dataUser} onSave={handleSaveProfile} cancelEdit={cancelEdit} />
                ) : (
                    <div>
                        <br />
                        {/* <h2>{dataUser.Nombres}</h2>
                        <p>{dataUser.Bio}</p> */}
                        {/* <button onClick={handleEditToggle}>Editar Perfil</button> */}
                        <div className="club_cont_btns_full club_notificaciones_btns">
                            <button
                                type="submit"
                                className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
                                onClick={handleEditToggle}
                            >
                                Editar información personal
                            </button>
                        </div>
                    </div>
                )}
                <PhotoGallery 
                    photos={dataUser.FotosCarrucel} 
                    onPhotoUpload={(newPhoto) => setDataUser({...dataUser, FotosCarrucel: [...dataUser.FotosCarrucel, newPhoto]})} 
                    addPhoto={addPhoto}
                    userPhotos={userPhotos}
                    textoTitulo={'Agregar Fotos'}
                />

                <br/>
                <br />
                <div className="club_cont_btns_full club_notificaciones_btns">
                    <button
                        type="submit"
                        className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
                        style={{marginBottom:'120px'}}
                        onClick={() => {setEditaPerfil(true)}}
                    >
                        Actualizar Información
                    </button>
                </div>
            </div>
        // </div>
        }
        <NavBar />
    </div>
  );
};

export default UserProfile;
