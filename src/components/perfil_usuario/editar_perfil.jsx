import React, { useEffect, useState, useCallback } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import OpcionesCheck from "../inputs/opciones_check";
import { getGender, getLookingFor, getPerception, getSexualIdentity } from "../../services/api";
import Loader from "../loader/loader";
import { FaCheck } from "react-icons/fa";

const EditProfileForm = ({ onSave, dataUser, cancelEdit }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({ ...dataUser, userPhotos: dataUser.userPhotos[0]?.photo || "" });
  const [opciones, setOpciones] = useState({ lookingFor: [], genders: [], sexualIdentity: [], perception: [] });
  const [datosUsuario, setDatosUsuario] = useState({});
  const iconoCheck = <FaCheck size={24} style={{ color: "#BC8D40" }} />;

  const fetchOptions = useCallback(async () => {
    setShowLoader(true);
    try {
      const [lookingFor, genders, sexualIdentity, perception] = await Promise.all([getLookingFor(), getGender(), getSexualIdentity(), getPerception()]);
      setOpciones({
        lookingFor: lookingFor?.map((item) => ({ id: item.id, name: item.name })) || [],
        genders: genders?.map((item) => ({ id: item.id, name: item.name })) || [],
        sexualIdentity: sexualIdentity?.map((item) => ({ id: item.id, name: item.name })) || [],
        perception: perception?.map((item) => ({ id: item.id, name: item.name })) || [],
      });
    } catch (error) {
      console.error("Error fetching options", error);
    } finally {
      setShowLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
    const savedData = localStorage.getItem("datosUsuario");
    if (savedData) setDatosUsuario(JSON.parse(savedData));
  }, [fetchOptions]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleOptionSelect = (selectedOptions, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: selectedOptions }));
  };

  const campos = [
    {
      type: "textArea",
      name: "aboutMe",
      label: "Expresa un pensamiento",
      placeholder: "Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!",
    },
  ];

  return (
    <div className="club_contenedor">
      <form onSubmit={handleSubmit}>
        <div className="club_cont_data_perfil">
          <h3 className="club_txt_titular">Acerca de mí</h3>
          {campos.map((campo, index) => (
            <InputDinamico key={index} config={campo} value={formData[campo.name] || ""} onChange={handleChange} />
          ))}
        </div>
        {[
          { label: "Estoy buscando", field: "lookingFors", opciones: opciones.lookingFor },
          { label: "Identidad de género", field: "genders", opciones: opciones.genders },
          { label: "Identidad sexual", field: "sexualIdentities", opciones: opciones.sexualIdentity },
          { label: "Percepción sexual", field: "perceptions", opciones: opciones.perception },
        ].map(({ label, field, opciones }) => (
          <div className="club_cont_data_perfil" key={field}>
            <h3 className="club_txt_titular">{label}</h3>
            <OpcionesCheck
              opciones={opciones}
              onOptionSelect={(selectedOptions) => handleOptionSelect(selectedOptions, field)}
              tituloDeLista={label}
              iconoCheck={iconoCheck}
              multiselect={true}
              isDropList={true}
            />
          </div>
        ))}
        <br />
        <div className="club_cont_data_perfil">
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button type="submit" className="btn club_btn club_btn_full club_btn_full_general club_bg_oro">
              Guardar
            </button>
          </div>
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button type="button" className="btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
      {showLoader && <Loader />}
    </div>
  );
};

export default EditProfileForm;
