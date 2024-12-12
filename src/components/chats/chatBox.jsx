// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import NavBar from '../nav_bar/navBar';
import AlertSuscribe from '../alertas/alert_suscribete';
import { useNavigate } from 'react-router-dom';
import NavBarDinamicButtons from '../nav_bar/navBarDinamicButtons';
import ChatsContent from './chats_content';
import HeaderConfiguration from '../headers/header_configuration';

const ChatBox = () => {

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [vista, setVista] = useState("chatsPrivados"); // Vista inicial
  const [vistaActual, setVistaActual] = useState(""); // Vista inicial
  
  const listaBotones = [
    { texto: "Chats Privados", evento: "chatsPrivados" },
    { texto: "Sala de Chats", evento: "salaDeChats" },
  ];

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        text: newMessage,
        sender: auth.currentUser.uid,
        timestamp: new Date(),
      };
      await addDoc(collection(db, 'messages'), messageData);
      setNewMessage("");
    }
  };

  const goToSuscribe = () => {
    navigate('/suscripcion')
  }

  const handleButtonClick = (evento) => {
    setVista(evento); // Actualizar la vista activa
    console.log("Vista activa:", evento); // Debug
  };

  const redirectBack = () => {
    navigate("/home");
  };

  return (
    // <div className="club_contenedor_full_height">
      <div id='chatsBox' className="club_contenedor_tres_secciones club_contenedor container-lg">
        <div className="club_contenido_top club_cont_info">
          <HeaderConfiguration
            isBtnLeft={false}
            txtButton={"Volver"}
            nameHeader={"Chats"}
            sizeF={"20px"}
            isBtnRear={false}
            bgColorBar={"club_bg_blanco"}
            textColor={"club_color_fuente_negro"}
          />
        </div>
        <div className="club_content_central">
          <NavBarDinamicButtons
            buttonsList={listaBotones}
            onButtonClick={handleButtonClick}
            activeButton={vista} // Sincronización con el estado padre
            colBtns={'col-6'}
          />
          <div style={{ marginTop: "20px" }}>
            {/* Renderiza contenido basado en la vista */}
            {vista === "chatsPrivados" && <ChatsContent handleOnClick={redirectBack} />}
            {vista === "salaDeChats" && <ChatsContent handleOnClick={redirectBack} />}
          </div>
          {/* <div className="message-list">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender === auth.currentUser.uid ? 'my-message' : 'other-message'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={sendMessage}>Enviar</button> */}
        </div>
        <div className="club_contenido_bottom club_cont_info">
          <NavBar currentPage={"Chats"} />
        </div>
        {(showAlert && 
          <AlertSuscribe 
            mensajeModal={<p>¿Quieres tener todas las funciones de manera ilimitada?</p>}
            btnAceptar={true}
            btnMsjButtom={'SUSCRIBETE'}
            handleOnclick={goToSuscribe}
            bgColorButton={'club_bg_violeta_05'}
          />
        )}
      </div>
    // </div>
  );
};

export default ChatBox;
