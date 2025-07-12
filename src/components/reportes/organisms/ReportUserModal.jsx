import { useState } from "react";
import PropTypes from "prop-types";
import ModalContainer from "../../bloqueos/atoms/ModalContainer";
import ModalHeader from "../../bloqueos/atoms/ModalHeader";
import ModalBody from "../../bloqueos/molecules/ModalBody";
import ModalFooter from "../../bloqueos/atoms/ModalFooter";
import ReasonsForm from "../atoms/ReasonsForm";

const ReportUserModal = ({ userName, onBlock, onCancel, onOpenAdditionalInfoModal }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const isDisabled = !selectedReason;

  const reasons = [
    "Perfil falso o suplantación", 
    "Contenido inapropiado", 
    "Acoso o comportamiento amenazante", 
    "Estafa o actividad sospechosa", 
    "Otro motivo"
  ];

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
    <ModalContainer height={641}>
      <ModalHeader text="Reportar a" userName={userName} onCancel={onCancel} />
      <ModalBody text="Los reportes nos ayudan a identificar comportamientos que violan nuestras normas comunitarias.">
        <ReasonsForm reasons={reasons} selectedReason={selectedReason} handleReasonChange={handleReasonChange} />
      </ModalBody>
      <ModalFooter handleBlock={handleBlock} onCancel={onCancel} isDisabled={isDisabled} />
    </ModalContainer>
  );
};
ReportUserModal.propTypes = {
  userName: PropTypes.string.isRequired,
  onBlock: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpenAdditionalInfoModal: PropTypes.func,
};

export default ReportUserModal;
