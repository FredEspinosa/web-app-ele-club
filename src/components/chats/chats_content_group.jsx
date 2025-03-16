// eslint-disable-next-line no-unused-vars
import React from 'react'
import { AiFillMessage } from 'react-icons/ai';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png";


const ChatsContentGroup = ({ handleOnClick, listChatsGroup }) => {

    console.log("listChatsGroup", listChatsGroup);

    return (
        <div>
            {listChatsGroup ?
                <div>
                    {listChatsGroup.map((chatList, index) => (
                        <div key={index} >
                            <div className="col-12 d-flex justify-content-center flex-wrap align-items-center">
                                <div className="col-10 d-flex align-items-center">
                                    <div className="club_requqest_content_photo">
                                        <img className="club_cont_perfil_img" src={chatList?.userPhotos?.length > 0 ? chatList.userPhotos[0].photo :
                                            `data:image/jpeg;base64,${PerfilDefault}`}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <p className="club_friends_name">{chatList?.name || "Sin nombre"}</p>
                                    </div>
                                </div>
                                <div className="col-2 d-flex align-items-center justify-content-end">
                                    <button className="btn" >
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

export default ChatsContentGroup