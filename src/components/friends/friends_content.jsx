// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { conversationCreate, friendsRequests, friendsResponse, myFriends } from '../../services/api';
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import { IoClose, IoPersonAdd } from 'react-icons/io5';
// import { PiCheckCircleFill } from 'react-icons/pi';
import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import InputDinamico from '../inputs/inputsDinamico';

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
    const [nameGroup, setNameGroup] = useState('');
    const [formData, setFormData] = useState({ nameOfGroup: '' });


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
    useEffect(() => {
        if (selectedFriends.length > 1 && nameGroup) {
            const membersIds = selectedFriends.map((friend) => friend.userId);
            const names = selectedFriends.map((friend) => friend.name).join(", ");
            sendConversation(membersIds, "", names, true, nameGroup);
        }
    }, [nameGroup]);

    const createConversation = async () => {
        if (selectedFriends.length === 1) {
            const friend = selectedFriends[0];
            sendConversation(friend.userId, friend.userPhotos[0]?.photo, friend.name, false, "Privado");
        } else {
            setNameGroup(formData.nameOfGroup || 'Grupo de amigas');
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
            console.log("response sendConversation", response);

            if (response.status === 200 && response.data?.conversations?.length > 0) {
                const conversationsId = response.data.conversations[0].id;
                navigate("/history_chat", {
                    state: {
                        membersIds,
                        photoUsers: perfilPhoto,
                        name: nameUser,
                        conversationsId,
                        category: category,
                        isGroup: isGroup,
                    },
                });
            } else {
                console.log("Ocurrió un error al crear la conversación");
            }
        } catch (error) {
            console.error("Error al crear conversación:", error);
        }
    };


    return (
        <div>
            <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                    {showFriends || showListFriends ? (
                        <div className="club_content_scroll club_scroll_y align-items-start">
                            {requests.map((solicitud, index) => (
                                <div key={index} className="club_new_request col-12">
                                    <div className='col-12 d-flex justify-content-center flex-wrap align-items-center'>
                                        <div className='col-10 d-flex align-items-center'>
                                            <div className='club_requqest_content_photo'>
                                                <img
                                                    className='club_cont_perfil_img'
                                                    src={solicitud?.fromUser?.userPhotos?.length > 0 ? solicitud.fromUser?.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`}
                                                    alt=""
                                                    srcSet=""
                                                />
                                            </div>
                                            <div>
                                                <p className='club_friends_name club_color_fuente_negro'>{solicitud?.fromUser?.name || "Sin nombre"}</p>
                                                <p className='club_color_fuente_negro'>te mando una solicitud de amistad aceptala y empieza a chatear</p>
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
                                                    onClick={() => { sendRequestFriends(solicitud?.id, true) }}
                                                >
                                                    <IoPersonAdd className='club_color_fuente_violeta_04' size={20} />
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
                                                <p className="club_friends_name club_color_fuente_negro">{friend?.name || "Sin nombre"}</p>
                                            </div>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            {isGroupMode ? (
                                                // <input
                                                //     type="checkbox"
                                                //     checked={selectedFriends.some(f => f.userId === friend.userId)}
                                                //     onChange={() => handleSelectFriend(friend)}
                                                // />
                                                <div className="club_checkbox_wrapper_1">
                                                    <input 
                                                        id={friend.userId}
                                                        className="club_check_style"
                                                        type="checkbox"
                                                        aria-hidden="true"
                                                        checked={selectedFriends.some(f => f.userId === friend.userId)}
                                                        onChange={() => handleSelectFriend(friend)} 
                                                    />
                                                    <label htmlFor={friend.userId}> </label>
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        sendConversation(friend.userId, friend?.userPhotos[0]?.photo, friend?.name, false, "Privado")
                                                    }
                                                >
                                                    <AiFillMessage className="club_color_fuente_violeta_04" size={20} />
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
                <div>
                    {/* <form ref={formRef}> */}
                    <InputDinamico
                        config={{
                            type: 'input',
                            name: 'nameOfGroup',
                            // label: 'Escribe algo',
                            placeholder: 'Nombre del grupo',
                            iconStart: false,
                            iconEnd: false,
                            help: false
                        }}
                        value={formData.nameOfGroup}
                        onChange={(e) => setFormData({ ...formData, nameOfGroup: e.target.value })}
                    />
                    {/* </form> */}
                    <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={createConversation}>Crear conversación grupal</button>
                </div>
            )}
        </div>
    )
}

export default FriendsContent