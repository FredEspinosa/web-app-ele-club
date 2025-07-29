import PropTypes from "prop-types";
import closeButton from "../../../assets/images/reportar_usuario/Close.png";

const ModalHeader = ({ text, userName, onCancel, width, marginBottom, iconWidth = 24, iconHeight = 24 }) => {
  const headerStyle = {
    ...(width ? { width: width } : ""),
    ...(marginBottom ? { marginBottom: marginBottom } : ""),
  };
  return (
    <div className="modal-header" style={headerStyle}>
      {(text || userName) && (
        <div>
          {text && text}
          {userName && ` ${userName}`}
        </div>
      )}
      {onCancel && (
        <button onClick={onCancel} className="close-button">
          <img src={closeButton} alt="Cerrar" height={iconHeight} width={iconWidth} />
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
  iconWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ModalHeader;
