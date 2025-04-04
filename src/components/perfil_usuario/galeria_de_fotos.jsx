/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { deleteUserPhoto, userProfileMe } from "../../services/api";
import { enviarDatosUsuario } from "../../services/data";

const PhotoGallery = ({ addPhoto, userPhotosNew, textoTitulo, photos, onPhotoUpload, token, dataUser, type }) => {
  const [imgPrev, setImgPrev] = useState([]);
  const [localPhotos, setLocalPhotos] = useState(photos || []);
  const [localUserPhotosNew, setLocalUserPhotosNew] = useState(userPhotosNew || []);

  const handlePhotoUpload = (event) => {
    // document.body.style.transition = "opacity 0.1s ease";
    // document.body.style.opacity = 0;
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
        addPhoto(cleanBase64);
        setLocalUserPhotosNew((prevPhotos) => [...prevPhotos, cleanBase64]);
        const updatedDataUser = { ...dataUser, userPhotos: [cleanBase64] };
        if (type === "") {
          return;
        }
        try {
          const respuesta = await enviarDatosUsuario(token, type, updatedDataUser, true);
          console.log("Respuesta de enviarDatosUsuario:", respuesta);
          if (respuesta.isSuccess) {
            userProfileMe(token).then((response) => {
              if (response.isSuccess) {
                localStorage.setItem("datosUsuario", JSON.stringify(response.userProfile));
                // window.location.reload();
              }
            });
          }
        } catch (error) {
          console.error("Error al enviar datos:", error);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = async (indexToRemove, arrayName) => {
    try {
      console.log("Eliminando imagen en la base de datos...", indexToRemove, arrayName);
      let imgId;
      if (arrayName === "photos") {
        imgId = localPhotos[indexToRemove]?.id;
      } else if (arrayName === "userPhotosNew") {
        imgId = localUserPhotosNew[indexToRemove]?.id;
      }

      if (!imgId) {
        console.log("no hay fotos");
        if (arrayName === "photos") {
          setLocalPhotos(localPhotos.filter((_, index) => index !== indexToRemove));
        } else if (arrayName === "userPhotosNew") {
          setLocalUserPhotosNew(localUserPhotosNew.filter((_, index) => index !== indexToRemove));
        }
        return;
      }

      await deleteUserPhoto(imgId, token);

      let updatedPhotos, updatedUserPhotos;

      if (arrayName === "photos") {
        updatedPhotos = localPhotos.filter((_, index) => index !== indexToRemove);
        setLocalPhotos(updatedPhotos);
      } else if (arrayName === "userPhotosNew") {
        updatedUserPhotos = localUserPhotosNew.filter((_, index) => index !== indexToRemove);
        setLocalUserPhotosNew(updatedUserPhotos);
      }

      const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || {};
      localStorage.setItem(
        "datosUsuario",
        JSON.stringify({
          ...datosUsuario,
          userPhotos: [...(updatedPhotos || localPhotos), ...(updatedUserPhotos || localUserPhotosNew)],
        })
      );
    } catch (error) {
      console.error("Error eliminando la foto:", error);
    }
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

      <div className="thumbnail-container">
        {Array.isArray(localPhotos) &&
          localPhotos?.map((photoObj, index) => (
            <div key={`${photoObj.userId}-${index}`} style={{ position: "relative", display: "inline-block" }}>
              <img
                src={photoObj ? photoObj.photo : imgPrev}
                alt={`thumbnail-${index}`}
                className="thumbnail"
                style={{ width: "65px", height: "65px", margin: "5px", objectFit: "cover" }}
              />
              <FaTimes
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  backgroundColor: "rgb(0, 0, 0, .7)",
                  color: "rgb(255, 255, 255, .7)",
                }}
                onClick={() => handleRemovePhoto(index, "photos")} // Agrega la función para eliminar
              />
            </div>
          ))}

        {Array.isArray(localUserPhotosNew) &&
          localUserPhotosNew?.map((photoObj, index) => (
            <div key={index} style={{ position: "relative", display: "inline-block" }}>
              <img
                src={`data:image/*;base64,${photoObj}`}
                alt={`thumbnail-${index}`}
                className="thumbnail"
                style={{ width: "65px", height: "65px", margin: "5px", objectFit: "cover" }}
              />
              <FaTimes
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  backgroundColor: "rgb(0, 0, 0, .7)",
                  color: "rgb(255, 255, 255, .7)",
                }}
                onClick={() => handleRemovePhoto(index, "userPhotosNew")} // Agrega la función para eliminar
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
