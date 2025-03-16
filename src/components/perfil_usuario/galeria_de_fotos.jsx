// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const PhotoGallery = ({ addPhoto, userPhotosNew, textoTitulo, photos, onPhotoUpload }) => {
  const [imgPrev, setImgPrev] = useState([]);

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setImgPrev(base64);

        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
        addPhoto(cleanBase64);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index, arrayName) => {
    console.log("eliminando...", index, arrayName);

    // if (arrayName === 'photos') {
    //   setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    // } else if (arrayName === 'userPhotosNew') {
    //   setUserPhotosNew(prevUserPhotosNew => prevUserPhotosNew.filter((_, i) => i !== index));
    // }
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
            <div key={`${photoObj.userId}-${index}`} style={{ position: "relative", display: "inline-block" }}>
              <img
                src={photoObj ? photoObj.photo : imgPrev}
                alt={`thumbnail-${index}`}
                className="thumbnail"
                style={{ width: "65px", height: "65px", margin: "5px", objectFit:"cover" }}
              />
              <FaTimes
                style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", borderRadius:"50%", backgroundColor: "rgb(0, 0, 0, .7)", color:"rgb(255, 255, 255, .7)" }}
                onClick={() => handleRemovePhoto(index, "photos")} // Agrega la función para eliminar
              />
            </div>
          ))}

        {Array.isArray(userPhotosNew) &&
          userPhotosNew?.map((photoObj, index) => (
            <div key={index} style={{ position: "relative", display: "inline-block" }}>
              <img
                src={`data:image/*;base64,${photoObj}`}
                alt={`thumbnail-${index}`}
                className="thumbnail"
                style={{ width: "65px", height: "65px", margin: "5px", objectFit:"cover" }}
              />
              <FaTimes
                style={{ position: "absolute", top: "0px", right: "0px", cursor: "pointer", borderRadius:"50%", backgroundColor: "rgb(0, 0, 0, .7)", color:"rgb(255, 255, 255, .7)" }}
                onClick={() => handleRemovePhoto(index, "userPhotosNew")} // Agrega la función para eliminar
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
