// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaCamera } from "react-icons/fa";

const ProfilePicture = ({ src, onEdit }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onEdit(reader.result); // Llama a la función de onEdit y pasa la URL de la nueva imagen
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex flex-wrap w-100">
        <div className='col-12 d-flex club_contenedor'>
            <div className="club_cont_perfil_foto club_margin_bar_40">
                <div className="col-12 d-flex justify-content-start text-start">
                    <span className="club_txt_footnote">Edita tu foto de perfil</span>
                </div>
                <div className="col-12 d-flex justify-content-center flex-wrap">
                    <div className="club_cont_perfil_img">
                        <img src={src} alt="Perfil" srcSet="Imagen de Perfil" onClick={() => document.getElementById("fileInput").click()} />
                        <FaCamera className="club_btn_edit_foto_perfil" onClick={() => document.getElementById("fileInput").click()} size={24}/>
                    </div>
                </div>
            </div>
        </div>
        <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
        />
    </div>
  );
};

export default ProfilePicture;
