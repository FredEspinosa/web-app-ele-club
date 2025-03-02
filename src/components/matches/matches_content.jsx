// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { IoClose, IoHeartCircleOutline } from 'react-icons/io5'
import { PiCheckCircleFill } from 'react-icons/pi';
import { matchesMyMatches } from '../../services/api';

const MatchesContent = ({ handleOnClick }) => {

    const [showFriends, setShowFriends] = useState(true)
    const [tokenSesionStorage, setTokenSesionStorage] = useState('');
    const [requests, setRequests] = useState([])

    useEffect(() => {
        let tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage) {
            setTokenSesionStorage(tokenStorage); // Guarda los datos en el estado
            getMatchesMyMatches(tokenStorage)
        }
    }, []);

    const getMatchesMyMatches = async (tokenStorage) => {
        try {
            const tokenSesion = tokenStorage;
            const response = await matchesMyMatches(tokenSesion);
            console.log("response getFriendsRequests", response);

            // La respuesta esperada está en `response.result`
            const result = response?.result;
            console.log("Contenido de result:", result);

            setRequests(Array.isArray(result) ? result : []);
            setShowFriends(result && result.length > 0);

        } catch (error) {
            console.log(error);
            setRequests([]); // En caso de error, evitar que `requests` sea undefined
        }
    };

    return (
        <div>
            <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                    {showFriends ? (
                        <div className="club_content club_scroll_y align-items-start">
                            {/* NOTA No se vizualizan los datos o la parte de solicitudes  */}
                            {requests.map((solicitud, index) => (
                                <div key={index} className="club_new_request col-12">
                                    <div className='col-12 d-flex justify-content-center flex-wrap align-items-center'>
                                        <div className='col-8 d-flex align-items-center'>
                                            <div className='club_requqest_content_photo'>
                                                <img
                                                    className='club_cont_perfil_img'
                                                    src={solicitud?.fromUser?.userPhotos?.length > 0 ? solicitud.fromUser?.userPhotos[0].photo : `data:image/jpeg;base64,${PerfilDefault}`}
                                                    alt=""
                                                    srcSet=""
                                                />
                                            </div>
                                            <div>
                                                <p className='club_friends_name '>{solicitud?.fromUser?.name || "Sin nombre"}</p>
                                            </div>
                                        </div>
                                        <div className='col-4 d-flex align-items-center'>
                                            <div>
                                                <button className='btn'><IoClose size={20} /></button>
                                                <button className='btn'><PiCheckCircleFill className='club_color_fuente_oro' size={20} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="club_content">
                            <div className="club_icon-container">
                                <div>
                                    <IoHeartCircleOutline className='club_icon_card_no_notifications' size={85} />
                                </div>
                            </div>
                            <h2 className="club_message-title">No tienes nuevos Matches</h2>
                            <p className="club_message-description">
                                Ve a inicio para likear perfiles - una vez que te regresen el like se volverá match y podrás verlo aquí!
                            </p>
                            <button className="club_action-button" onClick={handleOnClick}>Ir a Inicio</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MatchesContent