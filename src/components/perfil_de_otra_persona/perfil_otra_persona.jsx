import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CarruselPerfilUsuario from "../swiper/carrusel_perfil_usuario";
import { IoMdCheckmark, IoMdHeartEmpty } from "react-icons/io";
import { IoClose, IoHeart } from "react-icons/io5";
import AlertSuscribe from "../alertas/alert_suscribete";
import { friendsInvite, likeSend } from "../../services/api";
import BlockUserModal from "../bloqueos/organisms/BlockUserModal";
import AdditionalInfoModal from "../bloqueos/organisms/AdditionalInfoModal";
import ConfirmationModal from "../bloqueos/organisms/ConfirmationModal";
import ReportUserModal from "../reportes/organisms/ReportUserModal";
import DetailsReportModal from "../reportes/organisms/DetailsReportModal";
import EvidenceReportModal from "../reportes/organisms/EvidenceReportModal";
import ReportConfirmationModal from "../reportes/organisms/ReportConfirmationModal";

const PerfilOtraPersona = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [userToBlock] = useState({ name: "Alex" });
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [blockReasonSelected, setBlockReasonSelected] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDetailsReportModalOpen, setIsDetailsReportModalOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isReportConfirmationModalOpen, setIsReportConfirmationModalOpen] = useState(false);

  const location = useLocation();
  const profileImages = location.state?.profileImages || [];
  const nameProfile = location.state?.nameProfile || "";
  const age = location.state?.age || "";
  const aboutMe = location.state?.aboutMe || "";
  const lookingFors = location.state?.lookingFors || "";
  const genders = location.state?.genders || "";
  const sexualIdentities = location.state?.sexualIdentities || "";
  const perceptions = location.state?.perceptions || "";
  const relationshipStatus = location.state?.relationshipStatus || "";
  const tokenSesionStorage = location.state?.tokenSesion || "";
  const likedUserId = location.state.likedUserId || "";

  const toggleIcon = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToHome = () => {
    navigate("/home");
  };

  //   const goToSuscribe = () => {
  //     navigate("/suscripcion");
  //   };

  const sendLikeProfile = async (liked) => {
    const data = {
      likedUserId: likedUserId,
      liked: liked,
    };
    try {
      const tokenSesion = tokenSesionStorage;
      const response = await likeSend(tokenSesion, data);
      console.log("response", response);

      // Validar la respuesta
      if (response?.isSuccess === true) {
        // Ajusta según el código esperado por tu API
        console.log("Datos enviados correctamente:", response);
        setShowAlert(true);
        setMensajeModal(<p>Tu like se ha enviado correctamente.</p>);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        // getDataProfileMe(tokenSesion)
      } else {
        console.error("Ocurrió un error en la API:", response);
      }
    } catch (err) {
      console.error("Error al enviar datos del usuario:", err);
      setShowAlert(true);
      setMensajeModal(<p>Ocurrio un error al enviar tu solicitud.</p>);
    } finally {
      // setShowLoader(false); // Asegurarse de ocultar el loader siempre
      // setShowAlert(true);
      //setMensajeModal(<p>¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.</p>);
    }
  };

  const sendFriendRequest = async () => {
    setBtnDisabled(true);
    try {
      const tokenSesion = tokenSesionStorage;
      const response = await friendsInvite(tokenSesion, likedUserId);

      if (response?.isSuccess === true) {
        console.log("solicitud enviada correctamente");
        setShowAlert(true);
        setMensajeModal(<p>Tu solicitud se ha enviado correctamente.</p>);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        console.log("ocurrio un error en enviar solicitud");
      }
    } catch (error) {
      console.log(error);
      setShowAlert(true);
      setMensajeModal(<p>Ocurrio un error al enviar tu solicitud.</p>);
    }
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  const handleOpenBlockModal = () => {
    setIsBlockModalOpen(true);
    setIsAdditionalInfoModalOpen(false);
    setIsConfirmationModalOpen(false);
  };

  const handleCloseBlockModal = () => {
    setIsBlockModalOpen(false);
  };

  const handleBlockReasonSelected = (reason) => {
    console.log(`Bloqueando a ${userToBlock.name} por: ${reason}`);
    setIsBlockModalOpen(false);
    setBlockReasonSelected(reason);
  };

  const handleOpenAdditionalInfo = () => {
    setIsBlockModalOpen(false);
    setIsAdditionalInfoModalOpen(true);
  };

  const handleBackFromAdditionalInfo = () => {
    setIsAdditionalInfoModalOpen(false);
    setIsBlockModalOpen(true);
  };

  const handleSubmitAdditionalInfo = (additionalText) => {
    console.log(`Bloqueando a ${userToBlock.name} por: ${blockReasonSelected}. Detalles: ${additionalText}`);
    setIsAdditionalInfoModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    // setIsAdditionalInfoModalOpen(false);
    // setIsBlockModalOpen(false);
  };

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  };

  const handleReportReasonSelected = (reason) => {
    console.log(`Bloqueando a ${userToBlock.name} por: ${reason}`);
    setIsReportModalOpen(false);
    // setBlockReasonSelected(reason);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleOpenDetailsReportModal = () => {
    setIsReportModalOpen(false);
    setIsDetailsReportModalOpen(true);
  };

  const handleBackFromDetailsReportModal = () => {
    setIsDetailsReportModalOpen(false);
    setIsReportModalOpen(true);
  };

  const handleSubmitDetailsReportModal = (additionalText) => {
    console.log(`Bloqueando a ${userToBlock.name} por: ${blockReasonSelected}. Detalles: ${additionalText}`);
    setIsDetailsReportModalOpen(false);
    setIsEvidenceModalOpen(true);
  };

  const handleBackFromEvidenceReportModal = () => {
    setIsDetailsReportModalOpen(true);
    setIsEvidenceModalOpen(false);
  };

  const handleSubmitEvidenceReportModal = (additionalText) => {
    console.log(`Reportando a ${userToBlock.name} por: ${blockReasonSelected}. Detalles: ${additionalText}`);
    setIsEvidenceModalOpen(false);
    setIsReportConfirmationModalOpen(true);
  };

  const handleCloseReportConfirmatioModal = () => {
    setIsReportConfirmationModalOpen(false);
  };

  return (
    <div id="profileOtherPerson">
      <div className="club_contenedor_full_height">
        <div className="club_sub_contenedor">
          <div className="club_btn_close_float">
            <IoClose size={24} onClick={goToHome} />
          </div>
          <div className="club_onboarding_img">
            <CarruselPerfilUsuario
              // setNombres={nameProfile}
              // setEdad={age}
              // setPronombres={}
              userPhotos={profileImages}
              infoPerfil={false}
            />
          </div>
          <div className="club_contenedor container-lg">
            <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
              <div className="d-flex flex-wrap align-items-left justify-content-left w-100">
                <div className="col-12 d-flex align-items-center">
                  <div className="col-10 d-flex align-items-center">
                    <div className="col-11">
                      <h1 className="club_identity-h1">
                        {nameProfile}, {age} años
                      </h1>
                    </div>
                    <div className="col-1 d-flex justify-content-end align-items-center">
                      <IoMdCheckmark className="club_identity-h1 club_color_fuente_violeta_05" size={24} />
                    </div>
                  </div>
                  <div className="col-2 d-flex justify-content-end" onClick={toggleIcon}>
                    {isMenuOpen ? (
                      <IoHeart
                        className="club_identity-h1 club_color_fuente_violeta_05"
                        size={24}
                        onClick={() => {
                          sendLikeProfile(false);
                        }}
                      />
                    ) : (
                      <IoMdHeartEmpty
                        className="club_identity-h1"
                        size={24}
                        onClick={() => {
                          sendLikeProfile(true);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 d-flex align-items-center club_identity_icon_container">
                  <div className="col-10">
                    <p className="club_location-profile">
                      Ella <br />
                      Benito Juárez
                    </p>
                  </div>
                  <div className="col-2"></div>
                </div>
                <section className="club_about-me col-12">
                  <h2 className="club_identity-h2">Acerca de mí</h2>

                  {aboutMe ? (
                    <p className="col-12">{aboutMe}</p>
                  ) : (
                    <p className="col-12">
                      The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions. Made of 100% cotton fabric in four
                      colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.
                    </p>
                  )}
                </section>
                <section className="club_preferences col-12">
                  <h2 className="club_identity-h2">Estoy buscando</h2>
                  {Array.isArray(lookingFors) &&
                    lookingFors.map((item, index) => (
                      <span className="club_tag" key={index}>
                        {item.lookingFor?.name || item.name}
                      </span>
                    ))}

                  <h2 className="club_identity-h2">Identidad de Género</h2>
                  {Array.isArray(genders) &&
                    genders.map((item, index) => (
                      <span className="club_tag" key={index}>
                        {item.gender?.name || item.name}
                      </span>
                    ))}

                  <h2 className="club_identity-h2">Identidad Sexual</h2>
                  {Array.isArray(sexualIdentities) &&
                    sexualIdentities.map((item, index) => (
                      <span className="club_tag" key={index}>
                        {item.sexualIdentity?.name || item.name}
                      </span>
                    ))}

                  <h2 className="club_identity-h2">Apariencia</h2>
                  {Array.isArray(perceptions) &&
                    perceptions.map((item, index) => (
                      <span className="club_tag" key={index}>
                        {item.perception?.name || item.name}
                      </span>
                    ))}

                  <h2 className="club_identity-h2">Estado de Relación</h2>
                  {Array.isArray(relationshipStatus) &&
                    relationshipStatus.map((item, index) => (
                      <span className="club_tag" key={index}>
                        {item.relationshipStatus?.name || "Sin estado"}
                      </span>
                    ))}
                </section>
              </div>
            </div>
            <div className="club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns">
              <div className="col-12">
                <button
                  className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
                  disabled={btnDisabled}
                  onClick={() => {
                    // setShowAlert(true);
                    sendFriendRequest();
                  }}
                >
                  Agregar a amigas
                </button>
              </div>
            </div>
            <div className="club_cont_btns_doble club_bienvenida_btns gap-3">
              <button
                className="btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta"
                onClick={() => {
                  handleOpenBlockModal(true);
                }}
              >
                Bloquear
              </button>

              <button
                className="btn club_btn club_btn_full club_btn_full_general club_btn_borde_violeta"
                onClick={() => {
                  handleOpenReportModal();
                }}
              >
                Reportar
              </button>
            </div>
          </div>
        </div>
      </div>
      {isBlockModalOpen && (
        <BlockUserModal
          userName={userToBlock.name}
          onBlock={handleBlockReasonSelected}
          onCancel={handleCloseBlockModal}
          onOpenAdditionalInfoModal={handleOpenAdditionalInfo}
        />
      )}
      {isAdditionalInfoModalOpen && <AdditionalInfoModal onSubmit={handleSubmitAdditionalInfo} onBack={handleBackFromAdditionalInfo} />}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          // appName={userToBlock.appName} // Si quieres pasar el nombre de la app al modal
          onClose={handleCloseConfirmationModal}
        />
      )}
      {isReportModalOpen && (
        <ReportUserModal
          userName={userToBlock.name}
          onBlock={handleReportReasonSelected}
          onCancel={handleCloseReportModal}
          onOpenAdditionalInfoModal={handleOpenDetailsReportModal}
        />
      )}
      {isDetailsReportModalOpen && <DetailsReportModal onSubmit={handleSubmitDetailsReportModal} onBack={handleBackFromDetailsReportModal} />}
      {isEvidenceModalOpen && <EvidenceReportModal onBack={handleBackFromEvidenceReportModal} onSubmit={handleSubmitEvidenceReportModal} />}
      {isReportConfirmationModalOpen && <ReportConfirmationModal onClose={handleCloseReportConfirmatioModal} />}

      {showAlert && (
        <AlertSuscribe mensajeModal={mensajeModal} btnAceptar={true} btnMsjButtom={"CERRAR"} handleOnclick={closeModal} bgColorButton={"club_bg_oro"} />
      )}
    </div>
  );
};

export default PerfilOtraPersona;
