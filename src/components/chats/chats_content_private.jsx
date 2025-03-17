// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { AiFillMessage } from 'react-icons/ai';
import { BsChatSquareDotsFill } from 'react-icons/bs'
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import { conversationCreate } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ChatsContentPrivate = ({ handleOnClick, listChatsPrivates }) => {

    const navigate = useNavigate();

    console.log("listChatsPrivates", listChatsPrivates);

    const sendConversation = async (userIds, perfilPhoto, nameUser, isGroup, category) => {

        const conversationIds = listChatsPrivates.flatMap(chat => 
            chat.conversationMembers.map(member => member.conversationId)
        );
        
        console.log(conversationIds);


        navigate("/chat_privado", {
            state: {
                userIds,
                photoUsers: perfilPhoto,
                name: nameUser,
                conversationIds
            },
        });

        // console.log("userIds", userIds);
        // console.log("perfilPhoto", perfilPhoto);
        // console.log("nameUser", nameUser);
        // console.log("isGroup", isGroup);
        // console.log("category", category);

        
        // const data = {
        //     category: category,
        //     isGroup: isGroup,
        //     name: Array.isArray(nameUser) ? nameUser.join(', ') : String(nameUser), // 🔥 Convertido a string
        //     membersIds: Array.isArray(userIds) ? userIds : [userIds],
        // };

        // console.log("sendConversation data ", data);
        

        // try {
        //     const tokenSesion = sessionStorage.getItem("AccessToken");
        //     const response = await conversationCreate(tokenSesion, data);
        //     console.log("response sendConversation", response);

        //     if (response.status === 200 && response.data?.conversations?.length > 0) {
        //         const conversationsId = response.data.conversations[0].id;
        //         navigate("/chat_privado", {
        //             state: {
        //                 userIds,
        //                 photoUsers: perfilPhoto,
        //                 name: nameUser,
        //                 conversationsId
        //             },
        //         });
        //     } else {
        //         console.log("Ocurrió un error al crear la conversación");
        //     }
        // } catch (error) {
        //     console.error("Error al crear conversación:", error);
        // }
    };
    

    return (
        <div>
            {listChatsPrivates ?
                <div>
                    {listChatsPrivates.map((chatList, index) => (
                        <div key={index} >
                            <div className="col-12 d-flex justify-content-center flex-wrap align-items-center">
                                <div className="col-10 d-flex align-items-center">
                                    <div className="club_requqest_content_photo">
                                        {/* src={chatList?.userPhotos?.length> 0 ? chatList.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`} */}
                                        <img className="club_cont_perfil_img"
                                            src={chatList?.conversationMembers?.length > 0 ?
                                                chatList.conversationMembers[0].user?.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <p className="club_friends_name">{chatList?.name || "Sin nombre"}</p>
                                    </div>
                                </div>
                                <div className="col-2 d-flex align-items-center justify-content-end">
                                    <button
                                        className="btn"
                                        // onClick={() => sendConversation(chatList.conversationMembers.userId, chatList?.userPhotos[0]?.photo, chatList?.name, false, "Privado")}
                                        onClick={() => {
                                            const userIds = chatList.conversationMembers.map(member => member.user.userId);
                                            const perfilPhoto = chatList.conversationMembers.map(member => member.user.userPhotos[0].photo);
                                            const nameUser = chatList.conversationMembers.map(member => member.user.name);
                                            sendConversation(
                                                userIds,
                                                perfilPhoto,
                                                nameUser,
                                                false,
                                                "Privado",
                                            );
                                        }}
                                    >
                                        <AiFillMessage className="club_color_fuente_oro" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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