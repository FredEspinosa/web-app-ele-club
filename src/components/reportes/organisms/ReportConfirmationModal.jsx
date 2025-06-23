import PropTypes from "prop-types";
import ModalContainer from "../../bloqueos/atoms/ModalContainer";
import ModalHeader from "../../bloqueos/atoms/ModalHeader";
import checkBoxCircleLine from "../../../assets/images/reportar_usuario/checkbox-circle-line.svg";

const ReportConfirmationModal = ({ onClose }) => {
  return (
    <ModalContainer width={332} height={283} top={267} borderRadius={16}>
      <ModalHeader onCancel={onClose} width={"auto"} marginBottom={"0px"} />
      <div id="confirmation-content">
        <div className="confirmation-title">
          <img src={checkBoxCircleLine} alt="checkbox-circle-line.svg" width={34} height={34} />
          <p>Reporte enviado</p>
        </div>
        <div className="confirmation-message">
          <p>
            Gracias por ayudarnos a mantener Helena como un espacio seguro. Revisaremos tu reporte lo antes posible.
          </p>
        </div>
      </div>
    </ModalContainer>
  );
};

ReportConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ReportConfirmationModal;
