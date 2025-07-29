import { useState } from "react";
import PropTypes from "prop-types";
import ModalHeader from "../atoms/ModalHeader";
import ModalFooter from "../atoms/ModalFooter";
import ModalBody from "../molecules/ModalBody";
import ReasonsForm from "../atoms/ReasonsForm";
import ModalContainer from "../atoms/ModalContainer";

const BlockUserModal = ({ userName, onBlock, onCancel, onOpenAdditionalInfoModal }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const isDisabled = !selectedReason;

  const reasons = ["Comportamiento inapropiado", "Acoso o mensajes no deseados", "Perfil falso o suplantación", "Otro motivo"];

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleBlock = () => {
    if (selectedReason) {
      onOpenAdditionalInfoModal();
      onBlock(selectedReason);
    } else {
      alert("Por favor, selecciona un motivo para bloquear.");
    }
  };

  return (
    <ModalContainer>
      <ModalHeader text="Bloquear a" userName={userName} onCancel={onCancel} />
      <ModalBody text="Al bloquear a esta persona, no podrá ver tu perfil ni contactarte. Tú tampoco verás su contenido.">
        <ReasonsForm reasons={reasons} selectedReason={selectedReason} handleReasonChange={handleReasonChange} />
      </ModalBody>
      <ModalFooter handleBlock={handleBlock} onCancel={onCancel} isDisabled={isDisabled} />
    </ModalContainer>
  );
};
BlockUserModal.propTypes = {
  userName: PropTypes.string.isRequired,
  onBlock: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpenAdditionalInfoModal: PropTypes.func.isRequired,
};

export default BlockUserModal;
