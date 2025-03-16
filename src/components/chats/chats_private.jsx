// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import InputDinamico from '../inputs/inputsDinamico';
import { getMessage, messageSend } from '../../services/api';
import { useLocation } from 'react-router-dom';

const ChatsPrivate = ({ handleOnClick }) => {
    const [chatExists, setChatExists] = useState(true);
    const [messages, setMessages] = useState([]);  // Lista de mensajes
    const [tokenSesionStorage, setTokenSesionStorage] = useState("");
    const [formData, setFormData] = useState({
        sendMessage: '',
    });

    const location = useLocation();
    const membersIds = location.state?.membersIds || [];
    const photoUsers = location.state?.photoUsers || [];
    const name = location.state?.name || [];
    const conversationsId = location.state?.conversationsId || [];

    console.log('membersIds', membersIds)
    console.log('photoUsers', photoUsers)
    console.log('name', name)

    useEffect(() => {
        const tokenStorage = sessionStorage.getItem("AccessToken");
        if (tokenStorage && !tokenSesionStorage) {
            setTokenSesionStorage(tokenStorage);
            allListChats(tokenStorage)
        }
    }, []);

    const campos = [
        {
            type: 'textArea',
            name: 'sendMessage',
            label: 'Escribe algo',
            placeholder: 'Hola...',
            iconStart: false,
            iconNameStart: '',
            iconEnd: false,
            iconNameEnd: '',
            help: false
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const allListChats = async (tokenStorage) => {
        try {
            const response = await getMessage(tokenStorage, conversationsId);
            console.log("data", response.data.result);
            if (response?.data?.result?.length > 0) {
                const historyMessages = response?.data?.result.map(item => ({
                    content: item.content,
                    creationDate: item.creationDate,
                    status: item.status
                }))
                console.log("Mensajes procesados:", historyMessages);
                // Aquí puedes setearlos en un estado si lo necesitas
                // setOpciones(messages);
            } else {
                console.log("ocurrio un error ☠️");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSendMessage = async () => {
        if (formData.sendMessage.trim() === '') return;

        const newMessage = {
            text: formData.sendMessage,
            sender: 'yo',
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages([...messages, newMessage]);  // Agregar el mensaje al estado

        try {
            const tokenSesion = tokenSesionStorage
            const response = await messageSend(tokenSesion, { conversationId: conversationsId, content: formData.sendMessage });
            console.log("response", response.data);

            if (response.isSuccess === true) {
                console.log("Accediste al servicio de solicitudes de amigos");
            } else {
                console.log("No se pudo acceder al servicio");
            }

        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }

        setFormData({ sendMessage: '' }); // Limpiar input
    };

    return (
        <div id='chatBoxPrivate' className="chat-container">
            {chatExists ? (
                <div className="chat-content">
                    {/* 📌 Sección de Mensajes */}
                    <div className="chat-messages">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className={`message club_bg_oro ${msg.sender === 'yo' ? 'sent' : 'received'}`}>
                                    <p>{msg.text}</p>
                                    <span>{msg.timestamp}</span>
                                </div>
                            ))
                        ) : (
                            <p>No hay mensajes aún.</p>
                        )}
                    </div>

                    {/* 📌 Input de Mensaje */}
                    <div className="chat-input">
                        {campos.map((campo, index) => (
                            <InputDinamico
                                key={index}
                                config={campo}
                                value={formData[campo.name] || ""}
                                onChange={handleChange}
                            />
                        ))}
                        <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={handleSendMessage}>Enviar</button>
                    </div>
                </div>
            ) : (
                <div className="chat-empty">
                    <BsChatSquareDotsFill className="chat-icon" size={85} />
                    <h2>No tienes chats todavía</h2>
                    <p>Ve a inicio para likear perfiles y hacer match.</p>
                    <button onClick={handleOnClick}>Ir a Inicio</button>
                </div>
            )}
        </div>
    );
};

export default ChatsPrivate;
