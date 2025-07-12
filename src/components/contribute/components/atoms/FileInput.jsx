import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import uploadLine from "../../../../assets/images/reportar_usuario/upload-2-line.svg";
import { ImagePreview, ImagePreviewContainer, RemoveImageButton } from "@/styles/shared/fileUploader";
import { Typography } from "@mui/material";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function FileInput({ name, label }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validationRules = {
    required: "La imagen es obligatoria",
    validate: {
      isCorrectType: (fileList) => {
        if (!fileList || !fileList[0]) return true;
        return ACCEPTED_TYPES.includes(fileList[0].type) || `Tipo de archivo no válido (PNG, JPG, WEBP)`;
      },
      isCorrectSize: (fileList) => {
        if (!fileList || !fileList[0]) return true;
        return fileList[0].size <= MAX_SIZE_BYTES || `El archivo excede los ${MAX_SIZE_MB}MB`;
      },
    },
  };

  const { ref: rhfRef, onChange: rhfOnChange, ...restRegister } = register(name, validationRules);

  const processFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    rhfOnChange(e);
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setValue(name, e.dataTransfer.files, { shouldValidate: true });
      processFile(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setValue(name, null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => fileInputRef.current?.click();

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

  const fieldError = errors[name];

  return (
    <div>
      <div
        className={`file-uploader-container ${isDragging ? "dragging" : ""} ${fieldError ? "error-border" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!imagePreview ? openFileDialog : undefined}
      >
        <input
          type="file"
          ref={(e) => {
            rhfRef(e);
            fileInputRef.current = e;
          }}
          onChange={handleFileChange}
          accept={ACCEPTED_TYPES.join(",")}
          style={{ display: "none" }}
          {...restRegister}
        />
        {imagePreview ? (
          <ImagePreviewContainer>
            <ImagePreview src={imagePreview} alt="Vista previa" />
            <RemoveImageButton onClick={handleRemoveImage} title="Cambiar imagen">
              &times;
            </RemoveImageButton>
          </ImagePreviewContainer>
        ) : (
          <div className="upload-content">
            <img src={uploadLine} alt="Upload Icon" className="upload-icon" width={24} height={24} />
            <div className="upload-message">
              <p className="main-text">Arrastra una imagen o haz clic para selecciona</p>
              <span className="sub-text">PNG, JPG o WEBP (máx. {MAX_SIZE_MB}MB)</span>
              <span className="select-file-button">Seleccionar archivo</span>
            </div>
          </div>
        )}
      </div>
      {fieldError && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {fieldError.message}
        </Typography>
      )}
    </div>
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
