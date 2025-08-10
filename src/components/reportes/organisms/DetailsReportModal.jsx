import { useState } from "react";
import PropTypes from "prop-types";
import ModalContainer from "../../bloqueos/atoms/ModalContainer";
import ModalHeader from "../../bloqueos/atoms/ModalHeader";
import ModalBody from "../../bloqueos/molecules/ModalBody";
import ModalFooter from "../../bloqueos/atoms/ModalFooter";

const DetailsReportModal = ({ onSubmit, onBack, onCancel }) => {
  const [additionalText, setAdditionalText] = useState("");
  const [hasEvidence, setHasEvidence] = useState(false);
  const isDisabled = !additionalText.trim();

  const handleSubmit = () => {
    onSubmit({ details: additionalText, hasEvidence });
  };

  return (
    <ModalContainer height={522}>
      <ModalHeader text="Detalles del reporte" onCancel={onCancel} />
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
            checked={hasEvidence}
            onChange={(e) => setHasEvidence(e.target.checked)}
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
  onCancel: PropTypes.func.isRequired,
};

export default DetailsReportModal;
