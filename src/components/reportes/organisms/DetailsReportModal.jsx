import { useState } from "react";
import PropTypes from "prop-types";
import ModalContainer from "../../bloqueos/atoms/ModalContainer";
import ModalHeader from "../../bloqueos/atoms/ModalHeader";
import ModalBody from "../../bloqueos/molecules/ModalBody";
import ModalFooter from "../../bloqueos/atoms/ModalFooter";

const DetailsReportModal = ({ onSubmit, onBack }) => {
  const [additionalText, setAdditionalText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {
    onSubmit(additionalText);
  };

  return (
    <ModalContainer height={522}>
      <ModalHeader text="Detalles del reporte" onCancel={onBack} />
      <ModalBody text={"Proporciona más información para ayudarnos a entender \n mejor la situación."}>
        <p className="reason-question">Describe la situación con más detalle</p>
        <textarea
          className="textAreaAddInfo"
          value={additionalText}
          onChange={(e) => setAdditionalText(e.target.value)}
          placeholder="Explica qué ocurrio y por qué consideras que viola nuestras normas..."
        />

        <div className="checkbox-agreement">
          <input 
            type="checkbox" 
            id="agreementCheckbox" 
            className="checkbox" 
            onChange={() => setIsDisabled(!isDisabled)} 
          />
          <label htmlFor="agreementCheckbox" className="checkbox-label">
            Tengo evidencia para respaldar este reporte
          </label>
        </div>
      </ModalBody>

      <ModalFooter
        handleBlock={handleSubmit}
        onCancel={onBack}
        isDisabled={isDisabled}
        forwardButton={"Enviar Reporte"}
        backwardButton={"Atras"}
        style={{ marginBottom: "20px" }}
      />
    </ModalContainer>
  );
};

DetailsReportModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DetailsReportModal;
