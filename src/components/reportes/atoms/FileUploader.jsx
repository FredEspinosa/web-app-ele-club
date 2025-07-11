import PropTypes from "prop-types";
import { useState, useRef } from "react";
import uploadLine from "../../../assets/images/reportar_usuario/upload-2-line.svg";
import { ImagePreview, ImagePreviewContainer, RemoveImageButton } from "@/styles/shared/fileUploader";

const FileUploader = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  // Estado para la URL de la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const acceptedTypes = ["image/png", "image/jpeg", "image/webp"];
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // --- Funciones de Drag and Drop (sin cambios) ---
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

  // --- Manejo de selección de archivos ---
  const handleFileChange = (e) => {
    setError("");
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  // --- Función para enviar la imagen al backend ---
  const uploadImage = async (base64Image) => {
    try {
      const response = await fetch("/UploadPhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }), // Envía la imagen en un objeto JSON
      });

      if (!response.ok) {
        // Captura errores del servidor (ej: status 400, 500)
        const errorData = await response.json();
        throw new Error(errorData.message || "Error del servidor al subir la imagen.");
      }

      const result = await response.json();
      console.log("Imagen subida con éxito:", result);
      // Opcional: puedes manejar la respuesta exitosa aquí (ej: mostrar un mensaje)
    } catch (err) {
      console.error("Error en la subida:", err);
      setError(`Error al subir: ${err.message}`);
    }
  };

  // --- Validación y procesamiento del archivo ---
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
    setError("");

    // Usa FileReader para convertir el archivo a Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // 1. Actualiza el estado para mostrar la vista previa
      setImagePreview(base64String);
      // 2. Llama a la prop del padre con la imagen en Base64
      if (onFileSelect) onFileSelect(base64String, null);
      // 3. Envía la imagen al endpoint
      //   uploadImage(base64String);
    };
    reader.onerror = () => {
      console.error("Hubo un error al leer el archivo.");
      setError("No se pudo leer el archivo.");
    };
    reader.readAsDataURL(file); // Inicia la lectura del archivo
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // --- Función para remover la imagen y volver al estado inicial ---
  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Evita que se abra el diálogo de archivo al hacer clic
    setImagePreview(null);
    setError("");
    if (onFileSelect) onFileSelect(null, null);
    // Limpia el valor del input para poder seleccionar el mismo archivo de nuevo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`file-uploader-container ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      // Solo abre el diálogo si no hay imagen
      onClick={!imagePreview ? openFileDialog : undefined}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes.join(",")}
        style={{ display: "none" }}
      />

      {imagePreview ? (
        // --- VISTA PREVIA DE LA IMAGEN ---
        <ImagePreviewContainer>
          <ImagePreview src={imagePreview} alt="Vista previa" />
          <RemoveImageButton onClick={handleRemoveImage} title="Cambiar imagen">
            X
          </RemoveImageButton>
        </ImagePreviewContainer>
      ) : (
        // --- CONTENIDO ORIGINAL PARA SUBIR ---
        <div className="upload-content">
          <img src={uploadLine} alt="Upload Icon" className="upload-icon" width={24} height={24} />
          <div className="upload-message">
            <p className="main-text">Arrastra una imagen o haz clic para seleccionar</p>
            <span className="sub-text">PNG, JPG o WEBP (máx. {maxSizeMB}MB)</span>
            <span className="select-file-button">Seleccionar archivo</span>
          </div>
        </div>
      )}
      {/* Muestra el error fuera del área de upload para que sea visible con la vista previa */}
      {error && (
        <p className="error-text" style={{ marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileUploader;
