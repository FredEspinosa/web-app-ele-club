// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

const PhotoGallery = ({ addPhoto, userPhotosNew, textoTitulo, photos, onPhotoUpload }) => {

const [imgPrev, setImgPrev] = useState([])

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setImgPrev(base64)
        
        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
        addPhoto(cleanBase64);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="club_contenedor">
      <div className="club_input">
        <label className="club_input_label club_txt_footnote club_color_fuente_negro" htmlFor="fotos">
          <b>{textoTitulo}</b>
        </label>
        <div className="club_input_contenedor">
          <input className="club_input_campo" type="file" id="fotos" name="fotos" onChange={handlePhotoUpload} multiple />
          <MdOutlineAdd className="club_input_icon_der club_icon_add_fotos club_color_fuente_negro" size={24} />
        </div>
      </div>

      {/* Aquí renderizamos las imágenes desde el arreglo de URLs */}
      <div className="thumbnail-container">
      {Array.isArray(photos) &&
        photos?.map((photoObj, index) => (
          <img
            key={`${photoObj.userId}-${index}`}
            src={photoObj? photoObj.photo : imgPrev} // Accedemos a la URL de la imagen
            alt={`thumbnail-${index}`}
            className="thumbnail"
            style={{ width: "50px", height: "50px", margin: "5px" }}
          />
        ))}
      {Array.isArray(userPhotosNew) &&
        userPhotosNew?.map((photoObj, index) => (
          <img
            key={index}
            src={`data:image/*;base64,${photoObj}`} // Accedemos a la URL de la imagen
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
