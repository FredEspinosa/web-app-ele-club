// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { AiFillMessage } from 'react-icons/ai';
import { BsChatSquareDotsFill } from 'react-icons/bs'
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import { useNavigate } from 'react-router-dom';

const ChatsContentPrivate = ({ handleOnClick, listChatsPrivates }) => {
    // Recordatory: In this component, a search was performed within the arrays and the current userId was found in order to discard the information from the array that contains the same userId and display the recipient's information.
    console.log("listChatsPrivates", listChatsPrivates);

    const navigate = useNavigate();
    const userIdActual = localStorage.getItem('userId'); // Esto debe ser dinámico

    const sendConversation = async (userId, perfilPhoto, nameUser, conversationId) => {

        navigate("/history_chat", {
            state: {
                membersIds: userId,
                photoUsers: perfilPhoto,
                name: nameUser,
                conversationsId: conversationId
            },
        });
    };

    return (
        <div>
            {listChatsPrivates && listChatsPrivates.length > 0 ?
                <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                    <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                        <div className="club_content_scroll club_scroll_y align-items-start">

                            {listChatsPrivates.map((chatList, index) => {
                                const otroUsuario = chatList.conversationMembers.find(
                                    (member) => member.user.userId !== userIdActual
                                );
                                return (
                                    <div className='club_new_request col-12' key={index} >
                                        <div className="col-12 d-flex justify-content-center flex-wrap align-items-center">
                                            <div className="col-10 d-flex align-items-center">
                                                <div className="club_requqest_content_photo">
                                                    <img className="club_cont_perfil_img"
                                                        src={otroUsuario?.user?.userPhotos?.[0]?.photo || PerfilDefault}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <p className="club_friends_name club_color_fuente_negro">{otroUsuario?.user?.name || "Usuario desconocido"}</p>
                                                </div>
                                            </div>
                                            <div className="col-2 d-flex align-items-center justify-content-end">
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        if (otroUsuario) {
                                                            sendConversation(
                                                                otroUsuario.user.userId,
                                                                otroUsuario.user.userPhotos?.[0]?.photo || PerfilDefault,
                                                                otroUsuario.user.name,
                                                                otroUsuario.conversationId
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <AiFillMessage className="club_color_fuente_violeta_04" size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                :
                <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                    <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                        <div className="club_content">
                            <div className="club_icon-container">
                                <div>
                                    <BsChatSquareDotsFill className='club_icon_card_no_notifications' size={85} />
                                </div>
                            </div>
                            <h2 className="club_message-title">No tienes chats todavía</h2>
                            <p className="club_message-description">
                                Ve a inicio para likear perfiles - una vez que te regresen el like se volverá match y podrás chatear aquí!
                            </p>
                            <button className="club_action-button" onClick={handleOnClick}>Ir a Inicio</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatsContentPrivate