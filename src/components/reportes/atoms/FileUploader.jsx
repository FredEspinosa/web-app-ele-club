import PropTypes from "prop-types";
import { useState, useRef } from "react";
import uploadLine from "../../../assets/images/reportar_usuario/upload-2-line.svg";

const FileUploader = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // Referencia para el input de archivo oculto

  const acceptedTypes = ["image/png", "image/jpeg", "image/webp"];
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Esto es necesario para que el evento onDrop funcione
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError("");

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    setError("");
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      setError(`Tipo de archivo no permitido. Solo PNG, JPG o WEBP.`);
      if (onFileSelect) onFileSelect(null, `Tipo de archivo no permitido. Solo PNG, JPG o WEBP.`);
      return;
    }
    if (file.size > maxSizeBytes) {
      setError(`El archivo excede el tamaño máximo de ${maxSizeMB}MB.`);
      if (onFileSelect) onFileSelect(null, `El archivo excede el tamaño máximo de ${maxSizeMB}MB.`);
      return;
    }
    // Si pasa la validación
    setError("");
    if (onFileSelect) onFileSelect(file, null); // Pasar el archivo al componente padre
    // Aquí podrías añadir lógica para previsualizar la imagen, etc.
    console.log("Archivo seleccionado:", file);
  };

  // Función para abrir el diálogo de selección de archivo al hacer clic
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`file-uploader-container ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog} // Permitir clic en toda el área también
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes.join(",")} // Ayuda al navegador a filtrar
        style={{ display: "none" }} // Ocultamos el input por defecto
      />
      <div className="upload-content">
        <img src={uploadLine} alt="Upload Icon" className="upload-icon" width={24} height={24} />
        <div className="upload-message">
          <p className="main-text">Arrastra una imagen o haz clic para seleccionar</p>
          <span className="sub-text">PNG, JPG o WEBP (máx. {maxSizeMB}MB)</span>
          <span className="select-file-button">Seleccionar archivo</span>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired, // Función para manejar el archivo seleccionado
};

export default FileUploader;
