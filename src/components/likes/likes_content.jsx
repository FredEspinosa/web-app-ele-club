import React, { useEffect, useState } from "react";
import { IoHeartCircleOutline } from "react-icons/io5";
import { likesMyLikes } from "../../services/api";
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png";
import { SwipeableList, SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import SwipeToDeleteContent from "../swiper/SwipeToDeleteContent";
import { useDeleteLike } from "./hooks/useDeleteLike";
import { DefaultImage } from "@/assets/icons";

const LikesContent = ({ handleOnClick, isLoader }) => {
  const [showFriends, setShowFriends] = useState(true);
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [myFriendsOk, setMyFriendsOk] = useState([]);
  const [showListFriends, setShowListFriends] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { deleteLike, isLoading: isDeleting, error: deleteError } = useDeleteLike();

  useEffect(() => {
    let tokenStorage = sessionStorage.getItem("AccessToken");
    if (tokenStorage) {
      setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
      getMyLikes(tokenStorage);
    }
  }, []);

  useEffect(() => {
    let tokenStorage = sessionStorage.getItem("AccessToken");
    if (tokenStorage) {
      setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
    }
  }, [tokenSesionStorage]);

  const getMyLikes = async (tokenStorage) => {
    // Obtiene los amigos ya aceptados
    isLoader(true);
    try {
      const response = await likesMyLikes(tokenStorage);
      // Validar la respuesta
      if (response?.isSuccess === true) {
        // Ajusta según el código esperado por tu API
        const friendsList = response?.result || [];
        // const friendsList = response?.userProfiles || [];
        setMyFriendsOk([]);
        setMyFriendsOk(friendsList);
        setShowListFriends(friendsList.length > 0);
      } else {
        console.error("Ocurrió un error en la API:", response);
        setShowFriends(false);
        // setShowAlert(true);
        // setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
      }
    } catch (error) {
      console.error("Error al enviar datos del usuario:", error);
      setShowFriends(false);
      //   setShowAlert(true);
      //   setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al cargar la información, estamos trabajando para <b>resolverlo</b>.</p>);
    } finally {
      isLoader(false);
    }
  };

  const handleDelete = async (friendId) => {
    const currentUserId = localStorage.getItem("userId");
    const originalFriends = [...myFriendsOk];
    setMyFriendsOk((prevFriends) => prevFriends.filter((friend) => friend.userId !== friendId));
    try {
      await deleteLike({
        userId: friendId,
        likedUserId: currentUserId,
        token: tokenSesionStorage,
      });
      console.log(`Like con ID: ${friendId} eliminado exitosamente del servidor.`);
    } catch (error) {
      console.error("Fallo al eliminar:", error);
      setMyFriendsOk(originalFriends);
    }
  };

  return (
    <div>
      <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
        <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
          {showFriends || showListFriends.length > 0 ? (
            <div className="club_content_scroll club_scroll_y align-items-start">
              <SwipeableList>
                {myFriendsOk.map((friend, index) => (
                  <SwipeableListItem
                    key={friend.id}
                    swipeLeft={{
                      content: <SwipeToDeleteContent />,
                      action: () => handleDelete(friend.userId),
                    }}
                  >
                    <div
                      key={index}
                      className={`club_new_request col-12 ${selectedFriends.some((f) => f.userId === friend.userId) ? "selected" : ""}`}
                      // onMouseDown={() => handleLongPress(friend)}
                      // onMouseUp={handleMouseUp}
                      // onTouchStart={() => handleLongPress(friend)}
                      // onTouchEnd={handleMouseUp}
                    >
                      <div className="col-12 d-flex justify-content-center flex-wrap align-items-center">
                        <div className="col-10 d-flex align-items-center">
                          <div className="club_requqest_content_photo">
                            {friend?.userPhotos?.length > 0 ? (
                              // Si hay foto, renderiza la etiqueta <img> con la URL
                              <img
                                className="club_cont_perfil_img"
                                src={friend.userPhotos[0].photo}
                                alt={friend.name || "Foto de perfil"}
                              />
                            ) : (
                              // Si NO hay foto, renderiza tu componente de ícono <DefaultImage />
                              <DefaultImage />
                            )}
                          </div>
                          <div>
                            <p className="club_friends_name club_color_fuente_negro">{friend?.name || "Sin nombre"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwipeableListItem>
                ))}
              </SwipeableList>
            </div>
          ) : (
            <div className="club_content">
              <div className="club_icon-container">
                <div>
                  <IoHeartCircleOutline className="club_icon_card_no_notifications" size={85} />
                </div>
              </div>
              <h2 className="club_message-title">No tienes nuevos Likes</h2>
              <p className="club_message-description">
                Cada vez que alguien te de like podrás verlo aquí, lo puedes borrar o regresarle el like para que se vuelva Match!
              </p>
              <button className="club_action-button" onClick={handleOnClick}>
                Ir a Inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikesContent;
