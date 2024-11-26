// eslint-disable-next-line no-unused-vars
import React from "react";
import { MdOutlineAdd } from "react-icons/md";

const PhotoGallery = ({ addPhoto, userPhotos, textoTitulo }) => {

  const handlePhotoUpload = (event) => {
    const newPhotos = Array.from(event.target.files).map((file) => 
      URL.createObjectURL(file)
    );

    // Añadir todas las fotos seleccionadas al componente padre
    newPhotos.forEach((photo) => addPhoto(photo));
  };

  return (
    <div>
        <div className='club_input'>
            <label className='club_input_label club_txt_footnote club_color_fuente_negro' htmlFor="fotos">{textoTitulo}</label>
            <div className='club_input_contenedor'>
                <input className='club_input_campo' 
                    type="file"
                    id="fotos"
                    name="fotos"
                    onChange={handlePhotoUpload}
                    multiple 
                />
                <MdOutlineAdd className='club_input_icon_der club_icon_add_fotos club_color_fuente_negro' size={24} onChange={handlePhotoUpload} />
            </div>
            {/* {help && <span className='club_input_span'>{msjHelp}</span>} */}
        </div>
        <div className="thumbnail-container">
            {userPhotos.map((photo, index) => (
            <img
                key={index}
                src={photo}
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

