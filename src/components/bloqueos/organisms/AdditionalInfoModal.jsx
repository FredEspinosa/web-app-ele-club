import { useState } from "react";
import PropTypes from "prop-types";
import ModalContainer from "../atoms/ModalContainer";
import ModalHeader from "../atoms/ModalHeader";
import ModalBody from "../molecules/ModalBody";
import ModalFooter from "../atoms/ModalFooter";
import shieldLineIcon from "../../../assets/images/reportar_usuario/shield-line.png";


const AdditionalInfoModal = ({ onSubmit, onBack }) => {
  const [additionalText, setAdditionalText] = useState("");
  const isDisabled = false;

  const handleSubmit = () => {
    onSubmit(additionalText);
  };

  return (
    <ModalContainer height={522} top={331}>
      <ModalHeader text="Información adicional" onCancel={onBack} />
      <ModalBody text="Proporcionar más detalles nos ayuda a mejorar la experiencia para todos los usuarios.">
        <p className="reason-question">¿Hay algo más que quisieras contarnos?</p>
        <textarea className="textAreaAddInfo" value={additionalText} onChange={(e) => setAdditionalText(e.target.value)} placeholder="Describe la situación..."/>

        <div className="warning-message">
          <span role="img" aria-label="warning">
            <img src={shieldLineIcon} alt="reportUser" width={18} height={18} />
          </span>
          <p>Tu privacidad es importante. Esta información solo será utilizada para mejorar nuestros sistemas de seguridad.</p>
        </div>
      </ModalBody>

      <ModalFooter handleBlock={handleSubmit} onCancel={onBack} isDisabled={isDisabled} forwardButton={"Bloquear usuario"} backwardButton={"Atras"} />
    </ModalContainer>
  );
};

AdditionalInfoModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AdditionalInfoModal;
