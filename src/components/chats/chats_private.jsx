// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import InputDinamico from '../inputs/inputsDinamico';
import { getMessage, messageSend } from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderConfiguration from '../headers/header_configuration';
import { FaArrowLeft } from 'react-icons/fa6';
import NavBar from '../nav_bar/navBar';

const ChatsPrivate = ({ handleOnClick }) => {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [tokenSesionStorage, setTokenSesionStorage] = useState("");
    const [formData, setFormData] = useState({ sendMessage: '' });
    const location = useLocation();
    const conversationsId = location.state?.conversationsId || null;
    const [showMessages, setShowMessages] = useState(true);

    useEffect(() => {
        const tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage && !tokenSesionStorage) {
            setTokenSesionStorage(tokenStorage);
            allListChats(tokenStorage);
            setShowMessages(false)
        }
    }, [tokenSesionStorage]);  // 🔥 Solo depende del token

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const chatBox = document.querySelector(".chat-messages");
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]);

    // ✅ Función para obtener mensajes del historial
    const allListChats = async (tokenStorage) => {
        try {
            const response = await getMessage(tokenStorage, conversationsId);
            if (response?.data?.result?.length > 0) {
                setShowMessages(true)
                const historyMessages = response.data.result.map(item => ({
                    text: item.content,
                    sender: 'otro',
                    timestamp: new Date(item.creationDate).toLocaleTimeString()
                }));

                // 🔥 Añadir solo si no están repetidos
                setMessages((prev) => [...prev, ...historyMessages]); // 🔥 Se agregan al final
            } else {
                setShowMessages(false)
            }
        } catch (err) {
            console.log("Error obteniendo mensajes:", err);
        }
    };

    // ✅ Enviar mensaje
    const handleSendMessage = async () => {
        if (formData.sendMessage.trim() === '') return;

        const newMessage = {
            text: formData.sendMessage,
            sender: 'yo',
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const tokenSesion = tokenSesionStorage;
            await messageSend(tokenSesion, { conversationId: conversationsId, content: formData.sendMessage });
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }

        setFormData({ sendMessage: '' });
    };

    // ✅ WebSocket para recibir mensajes en tiempo real
    useEffect(() => {
        const ws = new WebSocket(`https://lahplataforma.azurewebsites.net/Message?conversationId=${conversationsId}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.conversationId === conversationsId) {
                setMessages((prevMessages) => [...prevMessages, {
                    text: data.content,
                    sender: 'otro',
                    timestamp: new Date().toLocaleTimeString(),
                }]);
            }
        };

        return () => ws.close();  // 🔥 Cierra la conexión cuando el componente se desmonta
    }, [conversationsId, tokenSesionStorage]);

    return (
        <div>
            <div id='chatBoxPrivate' className="club_contenedor_tres_secciones club_contenedor container-lg">
                <div className="club_contenido_top club_cont_info col-12">
                    <HeaderConfiguration
                        isBtnLeft={true}
                        handleOnclick={() => navigate('/chatbox')}
                        iconAction={<FaArrowLeft size={24} />}
                        nameHeader={<span>{location.state?.name || "Chat"}</span>}
                        sizeF={'20px'}
                        isBtnRear={false}
                        bgColorBar={'club_bg_oro'}
                        textColor={'club_color_fuente_blanco'}
                    />
                </div>

                {showMessages ? (
                    <div className="club_content_central club_force_scroll_y">
                        <div className="col-12 text-start d-flex align-items-center">
                            <div className="d-flex flex-wrap align-items-center justify-content-center w-100 chat-content">
                                <div className="chat-messages d-flex flex-column-reverse overflow-auto">
                                    {messages.length > 0 ? (
                                        messages.map((msg, index) => (
                                            <div
                                                key={index}
                                                ref={messagesEndRef}
                                                className={`message p-2 rounded-lg max-w-75 d-flex flex-column ${msg.sender === 'yo' ?
                                                    'align-self-start club_bg_menta_06' :
                                                    'align-self-end club_bg_violeta_02 text-white'}`}
                                            >
                                                <p className="m-0">{msg.text}</p>
                                                <span className="small text-muted">{msg.timestamp}</span>
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
                                <button className="club_action-button" onClick={() =>{setShowMessages(true)}}>Escribe un mensaje</button>
                            </div>
                        </div>
                    </div>
                )}

                {showMessages &&
                    <div className="chat-input col-12 club_bg_blanco" style={{ paddingBottom: '10px' }}>
                        <div className="">
                            <InputDinamico
                                config={{
                                    type: 'textArea',
                                    name: 'sendMessage',
                                    label: 'Escribe algo',
                                    placeholder: 'Hola...',
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
        </div>
    );
};

export default ChatsPrivate;
