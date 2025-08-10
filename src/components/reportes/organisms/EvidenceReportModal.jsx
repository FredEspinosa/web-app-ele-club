import { useState } from "react";
import PropTypes from "prop-types";
import ModalContainer from "../../bloqueos/atoms/ModalContainer";
import ModalHeader from "../../bloqueos/atoms/ModalHeader";
import ModalBody from "../../bloqueos/molecules/ModalBody";
import ModalFooter from "../../bloqueos/atoms/ModalFooter";
import FileUploader from "../atoms/FileUploader";

const EvidenceReportModal = ({ onSubmit, onBack, onCancel }) => {
  const [additionalText, setAdditionalText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const handleSubmit = () => {
    onSubmit(additionalText);
  };

  const handleFileSelected = (file, error) => {
    if (error) {
      console.error("Error en la carga:", error);
      setFileError(error);
      setSelectedFile(null);
    } else if (file) {
      console.log("Archivo recibido en EvidenceReportModal: ", file);
      setSelectedFile(file);
      setFileError(null);

    }
  };

  return (
    <ModalContainer height={585}>
      <ModalHeader text="Adjuntar evidencia" onCancel={onCancel} />
      <ModalBody text={"Puedes adjuntar capturas de pantalla, mensajes u otra\n evidencia que respalde tu reporte."}>
        <FileUploader onFileSelect={handleFileSelected} />
        <div className="textarea">
          <p className="reason-question">Describe la evidencia adjunta</p>
          <textarea
            className="textAreaAddInfo"
            value={additionalText}
            onChange={(e) => (setAdditionalText(e.target.value), setIsDisabled(isDisabled))}
            placeholder="Explica qué muestran los archivos adjuntos y cómo se relacionan con el reporte..."
          />
        </div>
      </ModalBody>

      <ModalFooter
        handleBlock={handleSubmit}
        onCancel={onBack}
        isDisabled={isDisabled}
        forwardButton={"Enviar Reporte"}
        backwardButton={"Atras"}
      />

      {fileError && <p style={{ color: "red" }}>Error desde App: {fileError}</p>}
      {selectedFile && (
        <div className="modal-content" style={{ marginTop: "20px", width: "200px", height: "200px" }}>
          <h3>Archivo Seleccionado:</h3>
          <p>Nombre: {selectedFile.name}</p>
          <p>Tipo: {selectedFile.type}</p>
          <p>Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB</p>
          {selectedFile.type.startsWith("image/") && (
            <img src={URL.createObjectURL(selectedFile)} alt="Vista previa" style={{ maxWidth: "200px", marginTop: "10px" }} />
          )}
        </div>
      )}
    </ModalContainer>
  );
};

EvidenceReportModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EvidenceReportModal;
