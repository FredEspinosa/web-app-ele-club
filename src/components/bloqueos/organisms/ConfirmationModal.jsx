import PropTypes from "prop-types";
import ModalContainer from "../atoms/ModalContainer";
import ModalHeader from "../atoms/ModalHeader";
import checkBoxCircleLine from "../../../assets/images/reportar_usuario/checkbox-circle-line.svg";
const ConfirmationModal = ({ onClose }) => {
  return (
    <ModalContainer width={332} height={283} top={267} borderRadius={16}>
      <ModalHeader onCancel={onClose} width={"auto"} marginBottom={"0px"} />
      <div id="confirmation-content">
        <div className="confirmation-title">
          <img src={checkBoxCircleLine} alt="checkbox-circle-line.svg" width={34} height={34} />
          <p>Usuario bloqueado</p> 
        </div>
        <div className="confirmation-message">
          <p>
            Queremos que en Helena tengas un espacio seguro.
            <br />
            Ya no verás al usuario.
          </p>
        </div>
      </div>
    </ModalContainer>
  );
};

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ConfirmationModal;
