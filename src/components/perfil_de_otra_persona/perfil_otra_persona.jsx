import { useEffect, useState } from "react";
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
import { useBlockUser } from "@/hooks/blockedUsers/useBlockedUsers";

const PerfilOtraPersona = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);
  const [tokenSesionStorage, setTokenSesionStorage] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [userToBlock] = useState({ name: "Alex" });
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { blockUser, isBlocking, blockError } = useBlockUser();
  const [blockReasonSelected, setBlockReasonSelected] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDetailsReportModalOpen, setIsDetailsReportModalOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isReportConfirmationModalOpen, setIsReportConfirmationModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportData, setReportData] = useState({ reason: "", details: "", evidence: null });
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const location = useLocation();
  const {
    profileImages = [],
    nameProfile = "",
    age = "",
    aboutMe = "",
    lookingFors = [],
    genders = [],
    sexualIdentities = [],
    perceptions = [],
    relationshipStatus = [],
    tokenSesion = "",
    likedUserId = "",
    locations = [],
    pronouns = [],
  } = location.state || {};

  const toggleIcon = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToHome = () => {
    navigate("/home");
  };

  //   const goToSuscribe = () => {
  //     navigate("/suscripcion");
  //   };

  useEffect(() => {
    const tokenStorage = sessionStorage.getItem("AccessToken");
    if (tokenStorage && !tokenSesionStorage) {
      setTokenSesionStorage(tokenStorage);
    }
  }, []);

  const sendLikeProfile = async (liked) => {
    const data = {
      likedUserId: likedUserId,
      liked: liked,
    };
    try {
      const tokenSesion = tokenSesionStorage;
      const response = await likeSend(tokenSesion, data);
      // Validar la respuesta
      if (response?.isSuccess === true) {
        // Ajusta según el código esperado por tu API
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
        // setTimeout(() => {
        //   setShowAlert(false);
        // }, 5000);
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

  const submitReport = async (finalReportData) => {
    setIsSubmittingReport(true);
    console.log("Enviando reporte final a la API:", finalReportData);

    try {
      setIsDetailsReportModalOpen(false);
      setIsEvidenceModalOpen(false);
      setIsReportConfirmationModalOpen(true);
    } catch (error) {
      alert(`Error al enviar el reporte: ${error.message}`);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const handleOpenBlockModal = () => {
    setIsBlockModalOpen(true);
    setIsAdditionalInfoModalOpen(false);
    setIsConfirmationModalOpen(false);
  };

  const handleBlockReasonSelected = (reason) => {
    console.log(`Bloqueando a ${nameProfile} por: ${reason}`);
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

  const handleSubmitAdditionalInfo = async (additionalText) => {
    setIsAdditionalInfoModalOpen(false);
    try {
      console.log(`Bloqueando a ${likedUserId} por: ${blockReasonSelected}. Detalles: ${additionalText}`);
      await blockUser({
        targetUserId: likedUserId,
        reason: blockReasonSelected,
        additionalInfo: additionalText,
        token: tokenSesion,
      });
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error("Error al bloquear al usuario:", error.message);
      alert(`No se pudo bloquear al usuario: ${error.message}`);
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigate("/home");
  };

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  };

  const handleReportReasonSelected = (reason) => {
    setReportData({ ...reportData, reason: reason });
    setIsReportModalOpen(false);
    setIsDetailsReportModalOpen(true);
  };

  const handleBackFromDetailsReportModal = () => {
    setIsDetailsReportModalOpen(false);
    setIsReportModalOpen(true);
  };

  const handleSubmitDetailsReportModal = ({ details, hasEvidence }) => {
    // Actualizamos el estado con los detalles
    const currentReportData = { ...reportData, details };
    setReportData(currentReportData);
    setIsDetailsReportModalOpen(false);
    if (hasEvidence) {
      setIsEvidenceModalOpen(true);
    } else {
      submitReport(currentReportData);
    }
  };

  const handleBackFromEvidenceReportModal = () => {
    setIsEvidenceModalOpen(false);
    if (reportReason === "Otro motivo") {
      setIsDetailsReportModalOpen(true);
    } else {
      setIsReportModalOpen(true);
    }
  };

  const handleSubmitEvidenceReportModal = (evidence) => {
    const finalReportData = { ...reportData, evidence };
    console.log({finalReportData});
    
    setReportData(finalReportData);
    submitReport(finalReportData);
  };

  const handleCloseReportConfirmatioModal = () => {
    setIsReportConfirmationModalOpen(false);
    // navigate("/home");
  };

  const handleCloseAllModals = () => {
    // Cierra todos los modales de bloqueo
    setIsBlockModalOpen(false);
    setIsAdditionalInfoModalOpen(false);
    setIsConfirmationModalOpen(false);

    // Cierra todos los modales de reporte
    setIsReportModalOpen(false);
    setIsDetailsReportModalOpen(false);
    setIsEvidenceModalOpen(false);
    setIsReportConfirmationModalOpen(false);

    setBlockReasonSelected("");
    setReportReason("");
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
                      {Array.isArray(pronouns) &&
                        pronouns.map((item, index) => (
                          <p className="club_location-profile" key={index}>
                            {item.pronoun?.name || item.name}
                          </p>
                        ))}
                      <br />
                      <p className="club_location-profile">{locations}</p>
                    </p>
                  </div>
                  <div className="col-2"></div>
                </div>
                <section className="club_about-me col-12">
                  <h2 className="club_identity-h2">Acerca de mí</h2>

                  {aboutMe ? <p className="col-12">{aboutMe}</p> : <p className="col-12"></p>}
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
      {/* Bloquear */}
      {isBlockModalOpen && (
        <BlockUserModal
          userName={nameProfile}
          onBlock={handleBlockReasonSelected}
          onCancel={handleCloseAllModals}
          onOpenAdditionalInfoModal={handleOpenAdditionalInfo}
        />
      )}
      {isAdditionalInfoModalOpen && (
        <AdditionalInfoModal
          onSubmit={handleSubmitAdditionalInfo}
          onBack={handleBackFromAdditionalInfo}
          onCancel={handleCloseAllModals}
        />
      )}
      {isConfirmationModalOpen && <ConfirmationModal onClose={handleCloseConfirmationModal} />}

      {/* Reportar */}
      {isReportModalOpen && (
        <ReportUserModal
          userName={userToBlock.name}
          onReasonSubmit={handleReportReasonSelected}
          onCancel={handleCloseAllModals}
        />
      )}
      {isDetailsReportModalOpen && (
        <DetailsReportModal
          onSubmit={handleSubmitDetailsReportModal}
          onBack={handleBackFromDetailsReportModal}
          onCancel={handleCloseAllModals}
        />
      )}
      {isEvidenceModalOpen && (
        <EvidenceReportModal
          onSubmit={handleSubmitEvidenceReportModal}
          onBack={handleBackFromEvidenceReportModal}
          onCancel={handleCloseAllModals}
        />
      )}
      {isReportConfirmationModalOpen && <ReportConfirmationModal onClose={handleCloseReportConfirmatioModal} />}

      {showAlert && (
        <AlertSuscribe
          mensajeModal={mensajeModal}
          btnAceptar={true}
          btnMsjButtom={"CERRAR"}
          handleOnclick={closeModal}
          bgColorButton={"club_bg_oro"}
        />
      )}
    </div>
  );
};

export default PerfilOtraPersona;
