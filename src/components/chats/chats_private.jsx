// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import InputDinamico from '../inputs/inputsDinamico';
import { getMessage, messageSend } from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderConfiguration from '../headers/header_configuration';
import { FaArrowLeft } from 'react-icons/fa6';
import NavBar from '../nav_bar/navBar';
import Loader from '../loader/loader';
import PerfilDefault from "../../assets/images/perfil/blank-profile-picture.png"
import { json } from 'body-parser';


const ChatsPrivate = ({ handleOnClick }) => {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [tokenSesionStorage, setTokenSesionStorage] = useState("");
    const [formData, setFormData] = useState({ sendMessage: '' });
    const location = useLocation();
    const conversationsId = location.state?.conversationsId || null;
    const [showMessages, setShowMessages] = useState(true);
    const [userId, setUserId] = useState("");
    const [displayedMessages, setDisplayedMessages] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [page, setPage] = useState(1);
    const messagesContainerRef = useRef(null);
    const messagesPerPage = 10;
    const [dataUser, setDataUser] = useState([]);
    const photoUsers = location.state?.photoUsers || '';
    const nameId = location.state?.name || '';
    const category = location.state?.category || '';
    const isGroup = location.state?.isGroup || '';

    useEffect(() => {
        const tokenStorage = sessionStorage.getItem("AccessToken");
        const storedUserId = localStorage.getItem('userId');
        const dataUserMe = JSON.parse(localStorage.getItem("datosUsuario"));

        if (dataUserMe) {
            setDataUser(dataUserMe);
        }

        if (tokenStorage && !tokenSesionStorage) {
            setTokenSesionStorage(tokenStorage);
        }

        if (storedUserId && !userId) {
            setUserId(storedUserId);
        }

        if (tokenStorage && storedUserId) {
            console.log("storedUserId", storedUserId);

            allListChats(tokenStorage);
            setShowMessages(false);
        }
    }, [tokenSesionStorage, userId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const chatBox = document.querySelector(".chat-messages");
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]);

    useEffect(() => {
        const chatBox = messagesContainerRef.current;
        if (chatBox) {
            chatBox.addEventListener('scroll', handleScroll)
        }
        return () => {
            if (chatBox) {
                chatBox.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    useEffect(() => {
        /* ⚠️🪼 Para qué es este useEffect "Polling"
            Agregar un useEffect con setInterval para hacer getMessage periódicamente.
            Comparar los mensajes nuevos con los anteriores para evitar actualizaciones innecesarias.
            Limpiar el intervalo al desmontar el componente.
            Consulta getMessage cada 3 segundos para obtener los mensajes actualizados.
            Compara los mensajes nuevos con los actuales para evitar renders innecesarios.
            Limpia el setInterval al desmontar el componente.
        🪼⚠️ */
        const interval = setInterval(async () => {
            if (tokenSesionStorage && conversationsId) {
                try {
                    const response = await getMessage(tokenSesionStorage, conversationsId);
                    if (response?.data?.result?.length > 0) {
                        const historyMessages = response.data.result
                            .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
                            .reverse()
                            .map(item => ({
                                text: item.content,
                                sender: item.senderUserId === userId ? 'destinatario' : 'remitente',
                                timestamp: new Date(item.creationDate).toLocaleTimeString()
                            }));
    
                        // 📌 Solo actualizar si hay mensajes nuevos
                        if (JSON.stringify(historyMessages) !== JSON.stringify(messages)) {
                            setMessages(historyMessages);
                        }
                    }
                } catch (err) {
                    console.error("Error actualizando mensajes:", err);
                }
            }
        }, 3000); // 🔄 Consulta cada 3 segundos
    
        return () => clearInterval(interval); // 🚀 Limpia el intervalo al desmontar
    }, [tokenSesionStorage, conversationsId, messages]);    

    const allListChats = async (tokenStorage) => {
        try {
            setShowLoader(true)
            const response = await getMessage(tokenStorage, conversationsId);
            console.log("response", response);

            if (response?.data?.result?.length > 0) {
                setShowMessages(true);

                const historyMessages = response.data.result
                    .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))    // Asegura que los mensajes estén en orden cronológico (del más antiguo al más reciente).
                    .reverse()  // Invierte el orden para que el mensaje más reciente aparezca primero.
                    .map(item => ({
                        text: item.content,
                        sender: item.senderUserId === userId ? 'destinatario ' : 'remitente', // ✅ `userId` ya está definido
                        timestamp: new Date(item.creationDate).toLocaleTimeString()
                    }));

                setMessages(historyMessages);
                setDisplayedMessages(historyMessages.slice(0, messagesPerPage));
                setShowLoader(false)
            } else {
                setShowMessages(false);
                setShowLoader(false)
            }
        } catch (err) {
            console.log("Error obteniendo mensajes:", err);
            setShowLoader(false)
        }
    };

    // ✅ Enviar mensaje
    const handleSendMessage = async () => {
        if (formData.sendMessage.trim() === '') return;

        const newMessage = {
            text: formData.sendMessage,
            sender: 'destinatario',
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => [newMessage, ...prevMessages]); // Agrega el mensaje al inicio

        try {
            const tokenSesion = tokenSesionStorage;
            await messageSend(tokenSesion, { conversationId: conversationsId, content: formData.sendMessage });
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }

        setFormData({ sendMessage: '' });
    };

    const handleScroll = () => {
        console.log("Se activo el scroll");

        if (!messagesContainerRef.current) return;

        if (messagesContainerRef.current.scrollTop === 0) {
            loadMoreMessages();
        }
    };

    const loadMoreMessages = () => {
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            const newMessages = messages.slice(0, nextPage * messagesPerPage);
            setDisplayedMessages(newMessages)
            return nextPage
        })
    }

    const initCeonversation = () => {
        setShowMessages(true)
    }


    return (
        <div>
            <div id='chatBoxPrivate' className="club_contenedor_tres_secciones club_contenedor container-lg">
                <div className="club_contenido_top club_cont_info col-12">
                    <HeaderConfiguration
                        isBtnLeft={true}
                        handleOnclick={() => navigate('/chatbox')}
                        iconAction={<FaArrowLeft size={18} />}
                        nameHeader={
                            <div>{(isGroup) ?
                                <span>{category || "Chat grupal"}</span>
                                :
                                <span>{nameId || "Chat"}</span>
                            }
                            </div>
                        }
                        sizeF={'20px'}
                        isBtnRear={true}
                        // handleOnclickBtn2={redirectBack}
                        // iconActionBtn2={''}
                        txtButtonbtn2={
                            <div className="club_requqest_content_photo">
                                <img className="club_cont_perfil_img"
                                    src={photoUsers || PerfilDefault}
                                    alt=""
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </div>
                        }
                        bgColorBar={'club_bg_gris_07'}
                        textColor={'club_color_fuente_negro'}
                    />
                </div>

                {showMessages ? (
                    <div className="club_content_central club_force_scroll_y">
                        <div className="col-12 text-start d-flex align-items-center">
                            <div className="d-flex flex-wrap align-items-center justify-content-center w-100 chat-content">
                                <div className="chat-messages d-flex flex-column-reverse overflow-auto" ref={messagesContainerRef}>
                                    {messages.length > 0 ? (
                                        messages.map((msg, index) => (
                                            <div
                                                key={index}
                                                ref={messagesEndRef}
                                                className={`message p-2 rounded-lg max-w-75 d-flex flex-column ${msg.sender === 'remitente' ?
                                                    'align-self-start club_bg_gris_06 message_chat_dest' :
                                                    'align-self-end club_bg_oro text-white message_chat_rem'}`}
                                            >
                                                <span className='club_chat_name'>{msg.sender === 'remitente' ? nameId : dataUser.name}</span>
                                                <p className="m-0 club_message_content">{msg.text}</p>
                                                {/* <span className="small text-muted club_time_stamp">{msg.timestamp}</span> */}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay mensajes aún.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                <button className="club_action-button" onClick={initCeonversation}>Iniciar conversación</button>
                            </div>
                        </div>
                    </div>
                )}

                {showMessages &&
                    <div className="chat-input col-12 club_bg_blanco" style={{ paddingBottom: '15px' }}>
                        <div className="">
                            <InputDinamico
                                config={{
                                    type: 'textArea',
                                    name: 'sendMessage',
                                    // label: 'Escribe algo',
                                    placeholder: 'Mensaje nuevo',
                                    iconStart: false,
                                    iconEnd: false,
                                    help: false
                                }}
                                value={formData.sendMessage}
                                onChange={(e) => setFormData({ sendMessage: e.target.value })}
                            />
                            <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={handleSendMessage}>Enviar</button>
                        </div>
                    </div>
                }
                <div className="club_contenido_bottom club_cont_info">
                    <NavBar
                        currentPage={'any'}
                    // onOptionSelect={handleOptionSelect}
                    />
                </div>
            </div>
            {showLoader && <Loader />}
        </div>
    );
};

export default ChatsPrivate;
