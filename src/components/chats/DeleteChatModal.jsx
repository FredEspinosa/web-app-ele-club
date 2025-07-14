import PropTypes from "prop-types";
import ModalContainer from "../bloqueos/atoms/ModalContainer";
import ModalHeader from "../bloqueos/atoms/ModalHeader";
import ModalFooter from "../bloqueos/atoms/ModalFooter";
import ModalBody from "../bloqueos/molecules/ModalBody";
import alertLineIcon from "../../assets/images/reportar_usuario/alert-line.png";

const DeleteChatModal = ({ onConfirmDelete, onCancel, ChatName }) => {
  return (
    <ModalContainer width={332} height={283} borderRadius={16} top={220}>
      <ModalHeader text={"¿Estás seguro que deseas eliminar esta conversación?"} width={"auto"} marginBottom={"30px"} />
      <ModalBody>
        <div className="d-flex justify-content-center align-items-center" style={{gap:'8px'}}>
          <span role="img" aria-label="warning">
            <img src={alertLineIcon} alt="reportUser" width={20} height={20} />
          </span>
          <p>Ya no podrás ver la conversación con {ChatName}</p>
        </div>
      </ModalBody>
      <ModalFooter handleBlock={onConfirmDelete} onCancel={onCancel} />
    </ModalContainer>
  );
};

DeleteChatModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  ChatName: PropTypes.string.isRequired,
};

export default DeleteChatModal;
