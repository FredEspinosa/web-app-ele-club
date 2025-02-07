// eslint-disable-next-line no-unused-vars
import React from "react";
import { MdOutlineAdd } from "react-icons/md";

const PhotoGallery = ({ addPhoto, userPhotosNew, textoTitulo }) => {

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    // Convertir cada archivo a base64 y agregarlo
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result; // Contenido en base64
        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, ""); // Quitar el prefijo
        addPhoto(cleanBase64); // Pasar la imagen al padre
      };
      reader.readAsDataURL(file); // Iniciar la lectura en base64
    });
  };

  return (
    <div>
      <div className="club_input">
        <label
          className="club_input_label club_txt_footnote club_color_fuente_negro"
          htmlFor="fotos"
        >
          {textoTitulo}
        </label>
        <div className="club_input_contenedor">
          <input
            className="club_input_campo"
            type="file"
            id="fotos"
            name="fotos"
            onChange={handlePhotoUpload}
            multiple
          />
          <MdOutlineAdd
            className="club_input_icon_der club_icon_add_fotos club_color_fuente_negro"
            size={24}
          />
        </div>
      </div>
      <div className="thumbnail-container">
        {userPhotosNew.map((photo, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${photo}`}
            alt={`thumbnail-${index}`}
            className="thumbnail"
            style={{ width: "50px", height: "50px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;

