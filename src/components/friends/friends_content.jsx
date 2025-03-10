// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { conversationCreate, friendsRequests, friendsResponse, myFriends } from '../../services/api';
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import { IoClose, IoPersonAdd } from 'react-icons/io5';
// import { PiCheckCircleFill } from 'react-icons/pi';
import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const FriendsContent = ({ handleOnClick, isLoader }) => {

    const navigate = useNavigate()
    const [showFriends, setShowFriends] = useState(true)
    const [tokenSesionStorage, setTokenSesionStorage] = useState('');
    // const [typeResponse, setTypeResponse] = useState('')
    const [requests, setRequests] = useState([])
    const [myFriendsOk, setMyFriendsOk] = useState([])
    const [showListFriends, setShowListFriends] = useState(true)
    const [selectedFriends, setSelectedFriends] = useState([]); // Amigos seleccionados
    const [isGroupMode, setIsGroupMode] = useState(false); // Activar selección múltiple

    useEffect(() => {
        let tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage) {
            setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
            getAllMyFriends(tokenStorage);
            getFriendsRequests(tokenStorage)
        }
    }, []);

    useEffect(() => {
        let tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage) {
            setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
        }
    }, [tokenSesionStorage])

    const getAllMyFriends = async (tokenStorage) => {
        // Obtiene los amigos ya aceptados
        try {
            const response = await myFriends(tokenStorage)
            console.log("response friends", response);
            // Validar la respuesta
            if (response?.status === 200) { // Ajusta según el código esperado por tu API
                const friendsList = response?.data?.userProfiles || [];
                console.log("Contenido de friendsList:", friendsList);
                setMyFriendsOk([]);
                setMyFriendsOk(friendsList);
                setShowListFriends(friendsList.length > 0);
            } else {
                console.error("Ocurrió un error en la API:", response);
                // setShowAlert(true);
                // setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
            }
        } catch (error) {
            console.error("Error al enviar datos del usuario:", error);
            //   setShowAlert(true);
            //   setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
        }
    }

    const sendRequestFriends = async (toUserId, type) => {
        try {
            const tokenSesion = sessionStorage.getItem("AccessToken");
            const response = await friendsResponse(tokenSesion, toUserId, type);

            if (response.isSuccess === true) {
                const tokenStorage = tokenSesion;
                await getFriendsRequests(tokenStorage); // Pasa el token correctamente
            } else {
                console.log('Ocurrió un error al enviar tu respuesta');
            }
        } catch (error) {
            console.error("Error en sendRequestFriends:", error);
        }
    };

    const getFriendsRequests = async (tokenStorage) => {
        isLoader(true);
        try {
            const response = await friendsRequests(tokenStorage);
            const result = response?.result || [];
            console.log("Contenido de result:", result);

            setRequests([]);
            setRequests(result);
            // setTimeout(() => setRequests(result), 0);
            setShowFriends(result.length > 0);
        } catch (error) {
            console.error("Error en getFriendsRequests:", error);
            setRequests([]);
        } finally {
            isLoader(false);
        }
    };

    // Detectar pulsación larga para activar selección múltiple
    let pressTimer;
    const handleLongPress = (friend) => {
        pressTimer = setTimeout(() => {
            setIsGroupMode(true);
            setSelectedFriends([friend]); // Agregar el primer amigo seleccionado
        }, 2000); // 2 segundos
    };

    const handleMouseUp = () => {
        clearTimeout(pressTimer);
    };

    // Seleccionar/deseleccionar amigos
    const handleSelectFriend = (friend) => {
        setSelectedFriends((prevSelected) => {
            if (prevSelected.some((f) => f.userId === friend.userId)) {
                return prevSelected.filter((f) => f.userId !== friend.userId);
            } else {
                return [...prevSelected, friend];
            }
        });
    };

    // Crear conversación grupal o privada
    const createConversation = async () => {
        if (selectedFriends.length === 1) {
            // Conversación privada
            const friend = selectedFriends[0];
            sendConversation(friend.userId, friend.userPhotos[0]?.photo, friend.name, false, "Privado");
        } else {
            // Conversación grupal
            const membersIds = selectedFriends.map((friend) => friend.userId);
            const names = selectedFriends.map((friend) => friend.name).join(", ");
            sendConversation(membersIds, "", names, true, "Grupo de amigos");
        }
    };

    const sendConversation = async (membersIds, perfilPhoto, nameUser, isGroup, category) => {
        const data = {
            isGroup,
            name: nameUser,
            category,
            membersIds: Array.isArray(membersIds) ? membersIds : [membersIds],
        };

        try {
            const tokenSesion = sessionStorage.getItem("AccessToken");
            const response = await conversationCreate(tokenSesion, data);

            if (response.status === 200) {
                navigate("/chat_privado", {
                    state: {
                        membersIds,
                        photoUsers: perfilPhoto,
                        name: nameUser,
                    },
                });
            } else {
                console.log("Ocurrió un error al crear la conversación");
            }
        } catch (error) {
            console.error("Error al crear conversación:", error);
        }
    };

    // conversationCreate
    // const createConversation = async (toUserId, perfilPhoto, nameUser, type, dataCategory) => {
    //     const data = {
    //         isGroup: type,
    //         name: nameUser,
    //         category: dataCategory,
    //         membersIds: Array.isArray(toUserId) ? toUserId : [toUserId]
    //     }
    //     try {
    //         const tokenSesion = sessionStorage.getItem("AccessToken");
    //         const response = await conversationCreate(tokenSesion, data);

    //         if (response.status === 200) {
    //             console.log("Se puede enviar un mensaje");
    //             navigate(
    //                 '/chat_privado',
    //                 { state: { 
    //                     membersIds: toUserId,
    //                     photoUsers: perfilPhoto,
    //                     name: nameUser
    //                 }}
    //             )

    //         } else {
    //             console.log('Ocurrió un error al enviar tu respuesta');
    //         }
    //     } catch (error) {
    //         console.error("Error en sendRequestFriends:", error);
    //     }
    // };


    return (
        <div>
            <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                    {showFriends || showListFriends ? (
                        <div className="club_content club_scroll_y align-items-start">
                            {requests.map((solicitud, index) => (
                                <div key={index} className="club_new_request col-12">
                                    <div className='col-12 d-flex justify-content-center flex-wrap align-items-center'>
                                        <div className='col-10 d-flex align-items-center'>
                                            <div className='club_requqest_content_photo'>
                                                <img 
                                                    className='club_cont_perfil_img'
                                                    src={ solicitud?.fromUser?.userPhotos?.length > 0 ? solicitud.fromUser?.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`}  
                                                    alt="" 
                                                    srcSet="" 
                                                />
                                            </div>
                                            <div>
                                                <p className='club_friends_name '>{solicitud?.fromUser?.name || "Sin nombre"}</p>
                                                <p>te mando una solicitud de amistad aceptala y empieza a chatear</p>
                                            </div>
                                        </div>
                                        <div className='col-2 d-flex align-items-center justify-content-end'>
                                            <div>
                                                {/* <button 
                                                    className='btn' 
                                                    onClick={()=> { sendRequestFriends(solicitud?.id, false)}}
                                                >
                                                    <IoClose size={20} />
                                                </button> */}
                                                <button 
                                                    className='btn'
                                                    onClick={()=> { sendRequestFriends(solicitud?.id, true)}}
                                                >
                                                    <IoPersonAdd className='club_color_fuente_oro' size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {myFriendsOk.map((friend, index) => (
                                <div
                                    key={index}
                                    className={`club_new_request col-12 ${selectedFriends.some(f => f.userId === friend.userId) ? "selected" : ""}`}
                                    onMouseDown={() => handleLongPress(friend)}
                                    onMouseUp={handleMouseUp}
                                    onTouchStart={() => handleLongPress(friend)}
                                    onTouchEnd={handleMouseUp}
                                >
                                    <div className="col-12 d-flex justify-content-center flex-wrap align-items-center">
                                        <div className="col-10 d-flex align-items-center">
                                            <div className="club_requqest_content_photo">
                                                <img
                                                    className="club_cont_perfil_img"
                                                    src={friend?.userPhotos?.length > 0 ? friend.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <p className="club_friends_name">{friend?.name || "Sin nombre"}</p>
                                            </div>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            {isGroupMode ? (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFriends.some(f => f.userId === friend.userId)}
                                                    onChange={() => handleSelectFriend(friend)}
                                                />
                                            ) : (
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        sendConversation(friend.userId, friend?.userPhotos[0]?.photo, friend?.name, false, "Privado")
                                                    }
                                                >
                                                    <AiFillMessage className="club_color_fuente_oro" size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="club_content">
                            <FaRegCircleUser className="club_icon_card_no_notifications" size={85} />
                            <h2 className="club_message-title">No tienes solicitudes de amigas</h2>
                            <p className="club_message-description">
                                Cada vez que alguien te mande solicitud aparecerá aquí.
                            </p>
                            <button className="club_action-button" onClick={handleOnClick}>Ir a Inicio</button>
                        </div>
                    )}
                </div>
            </div>

            {isGroupMode && selectedFriends.length > 1 && (
                <button className="btn btn-primary" onClick={createConversation}>
                    Crear conversación grupal
                </button>
            )}
        </div>
        // <div>
        //     <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
        //         <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
        //         {showFriends || showListFriends ? (
        //             <div className="club_content club_scroll_y align-items-start">
        //                 {/* NOTA No se vizualizan los datos o la parte de solicitudes  */}
        //                 {requests.map((solicitud, index) => (
        //                     <div key={index} className="club_new_request col-12">
        //                         <div className='col-12 d-flex justify-content-center flex-wrap align-items-center'>
        //                             <div className='col-10 d-flex align-items-center'>
        //                                 <div className='club_requqest_content_photo'>
        //                                     <img 
        //                                         className='club_cont_perfil_img'
        //                                         src={ solicitud?.fromUser?.userPhotos?.length > 0 ? solicitud.fromUser?.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`}  
        //                                         alt="" 
        //                                         srcSet="" 
        //                                     />
        //                                 </div>
        //                                 <div>
        //                                     <p className='club_friends_name '>{solicitud?.fromUser?.name || "Sin nombre"}</p>
        //                                     <p>te mando una solicitud de amistad aceptala y empieza a chatear</p>
        //                                 </div>
        //                             </div>
        //                             <div className='col-2 d-flex align-items-center justify-content-end'>
        //                                 <div>
        //                                     {/* <button 
        //                                         className='btn' 
        //                                         onClick={()=> { sendRequestFriends(solicitud?.id, false)}}
        //                                     >
        //                                         <IoClose size={20} />
        //                                     </button> */}
        //                                     <button 
        //                                         className='btn'
        //                                         onClick={()=> { sendRequestFriends(solicitud?.id, true)}}
        //                                     >
        //                                         <IoPersonAdd className='club_color_fuente_oro' size={20} />
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 ))}
        //                 {/* Mapping all friends added */}
        //                 {myFriendsOk.map((solicitud, index) => (
        //                     <div key={index} className="club_new_request col-12">
        //                         <div className='col-12 d-flex justify-content-center flex-wrap align-items-center'>
        //                             <div className='col-10 d-flex align-items-center'>
        //                                 <div className='club_requqest_content_photo'>
        //                                     <img 
        //                                         className='club_cont_perfil_img'
        //                                         src={ solicitud?.userPhotos?.length > 0 ? solicitud.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`}  
        //                                         alt="" 
        //                                         srcSet="" 
        //                                     />
        //                                 </div>
        //                                 <div>
        //                                     <p className='club_friends_name '>{solicitud?.name || "Sin nombre"}</p>
        //                                 </div>
        //                             </div>
        //                             <div className='col-2 d-flex align-items-center justify-content-end'>
        //                                 <div>
        //                                     <button 
        //                                         className='btn'
        //                                         onClick={()=> { 
        //                                             createConversation(
        //                                                 solicitud?.userId,
        //                                                 solicitud?.userPhotos[0].photo,
        //                                                 solicitud?.name,
        //                                                 false,
        //                                                 'Privado'
        //                                             )}
        //                                         }
        //                                     >
        //                                         <AiFillMessage className='club_color_fuente_oro' size={20} />
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         ) : (
        //             <div className="club_content">
        //                 <div className="club_icon-container">
        //                 <FaRegCircleUser className='club_icon_card_no_notifications' size={85} />
        //                 </div>
        //                 <h2 className="club_message-title">No tienes solicitudes de amigas</h2>
        //                 <p className="club_message-description">
        //                 Cada vez que alguien te mande solicitud aparecerá aquí.
        //                 </p>
        //                 <button className="club_action-button" onClick={handleOnClick}>Ir a Inicio</button>
        //             </div>
        //         )}
        //         </div>
        //     </div>
        // </div>
    )
}

export default FriendsContent