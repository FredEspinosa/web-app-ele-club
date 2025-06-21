import PropTypes from "prop-types";
import closeButton from "../../../assets/images/reportar_usuario/Close.png";

const ModalHeader = ({ text, userName, onCancel, width, marginBottom }) => {
  const headerStyle = {
    ...(width ? { width: width } : ""),
    ...(marginBottom ? { marginBottom: marginBottom } : ""),
  };
  return (
    <div className="modal-header" style={headerStyle}>
      <div>
        {text}
        {userName && ` ${userName}`}
      </div>
      {onCancel && (
        <button onClick={onCancel} className="close-button">
          <img src={closeButton} alt="Cerrar" height={24} width={24} />
        </button>
      )}
    </div>
  );
};

ModalHeader.propTypes = {
  text: PropTypes.string,
  userName: PropTypes.string,
  onCancel: PropTypes.func,
  width: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default ModalHeader;
