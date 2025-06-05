import PropTypes from "prop-types";
import alertLineIcon from "../../../assets/images/reportar_usuario/alert-line.png";

const ReasonsForm = ({ reasons, selectedReason, handleReasonChange }) => {
  return (
    <>
      <p className="reason-question">¿Cuál es el motivo de tu reporte?</p>
      <form className="reson-question">
        {reasons.map((reason) => (
          <div key={reason} className="radio-option">
            <input type="radio" id={reason} name="blockReason" value={reason} checked={selectedReason === reason} onChange={handleReasonChange} />
            <label htmlFor={reason}>{reason}</label>
          </div>
        ))}
      </form>
      <div className="warning-message">
        <span role="img" aria-label="warning">
          <img src={alertLineIcon} alt="reportUser" width={18} height={18} />
        </span>
        <p>Los reportes falsos pueden resultar en la suspensión de tu cuenta. Por favor, asegúrate de que tu reporte es legítimo.</p>
      </div>
    </>
  );
};

ReasonsForm.propTypes = {
  reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedReason: PropTypes.string.isRequired,
  handleReasonChange: PropTypes.func.isRequired,
};

export default ReasonsForm;
