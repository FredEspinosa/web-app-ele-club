// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import NavBar from '../nav_bar/navBar';
import AlertSuscribe from '../alertas/alert_suscribete';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarDinamicButtons from '../nav_bar/navBarDinamicButtons';
import HeaderConfiguration from '../headers/header_configuration';
import Loader from '../loader/loader';
import { conversationGetAll } from '../../services/api';
import ChatsContentGroup from './chats_content_group';
import ChatsContentPrivate from './chats_content_private';

const ChatBox = () => {

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [vista, setVista] = useState("chatsPrivados"); // Vista inicial
  const [showLoader, setShowLoader] = useState(false);
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [privateConversations, setPrivateConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);

  const location = useLocation();

  const listaBotones = [
    { texto: "Chats Privados", evento: "chatsPrivados" },
    { texto: "Sala de Chats", evento: "salaDeChats" },
  ];

  useEffect(() => {
    const tokenStorage = sessionStorage.getItem("AccessToken");
    if (tokenStorage && !tokenSesionStorage) {
      setTokenSesionStorage(tokenStorage);
    }
  }, []);

  useEffect(() => {
    if (tokenSesionStorage) {
      conversationsAll()
    }
  }, [tokenSesionStorage])

  const conversationsAll = async () => {
    setShowLoader(true);
    try {
      const tokenSesion = tokenSesionStorage;
      const response = await conversationGetAll(tokenSesion);

      if (response.isSuccess === true && response.conversations) { // Verifica que response.conversations existe
        setShowLoader(false);
        // Separa las conversaciones en privadas y de grupo
        const prvConversations = [];
        const grpConversations = [];

        response.conversations.forEach((conversation) => { // Aquí es donde estaba el error
          if (conversation.isGroup === false) {
            prvConversations.push(conversation);
          } else if (conversation.isGroup) {
            grpConversations.push(conversation);
          }
        });
        // Guardar en el estado
        setPrivateConversations(prvConversations);
        setGroupConversations(grpConversations);
      } else {
        console.log("Ocurrió un error ☠️");
      }
    } catch (err) {
      console.error("Error en conversationsAll:", err);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const goToSuscribe = () => {
    navigate('/suscripcion')
  }

  const handleButtonClick = (evento) => {
    setVista(evento); // Actualizar la vista activa
    // console.log("Vista activa:", evento); // Debug
  };

  const redirectBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <div id='chatsBox' className="club_contenedor_tres_secciones club_contenedor container-lg">
        <div className="club_contenido_top club_cont_info">
          <HeaderConfiguration
            isBtnLeft={false}
            txtButton={"Volver"}
            nameHeader={<span style={{textTransform: 'uppercase'}}>CHATS</span>}
            sizeF={"20px"}
            isBtnRear={false}
            bgColorBar={"club_bg_blanco"}
            textColor={"club_color_fuente_negro"}
          />
        </div>
        <div className="club_content_central club_force_scroll_y">
          <NavBarDinamicButtons
            buttonsList={listaBotones}
            onButtonClick={handleButtonClick}
            activeButton={vista} // Sincronización con el estado padre
            colBtns={'col-6'}
          />
          <div style={{ marginTop: "20px" }}>
            {/* Renderiza contenido basado en la vista */}
            {vista === "chatsPrivados" && <ChatsContentPrivate handleOnClick={redirectBack} listChatsPrivates={privateConversations} />}
            {vista === "salaDeChats" && <ChatsContentGroup handleOnClick={redirectBack} listChatsGroup={groupConversations} />}
          </div>
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
      {(showLoader && <Loader />)}
    </div>
  );
};

export default ChatBox;
