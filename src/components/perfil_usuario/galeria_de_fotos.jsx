import React from "react";
import { MdOutlineAdd } from "react-icons/md";

const PhotoGallery = ({ addPhoto, userPhotosNew, textoTitulo }) => {
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
        addPhoto(cleanBase64);
      };
      reader.readAsDataURL(file);
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

      {/* Aquí renderizamos las imágenes desde el arreglo de URLs */}
      <div className="thumbnail-container">
        {userPhotosNew.map((photoObj, index) => (
          <img
            key={index}
            src={photoObj.photo} // Accedemos a la URL de la imagen
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