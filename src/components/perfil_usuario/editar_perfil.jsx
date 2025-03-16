import React, { useEffect, useState, useCallback, useRef } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import OpcionesCheck from "../inputs/opciones_check";
import { getGender, getLookingFor, getPerception, getSexualIdentity, userProfileMe } from "../../services/api";
import Loader from "../loader/loader";
import { FaCheck } from "react-icons/fa";
import { enviarDatosUsuario } from "../../services/data";

const EditProfileForm = ({ onSave, dataUser, cancelEdit, token, setShowLoader, setMensajeModal, setShowAlert }) => {
  const [formData, setFormData] = useState({ ...dataUser });
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

  const handleOptionSelect = (selectedOptions, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: selectedOptions }));
  };

  const updateDataUserInfo = async () => {
    setShowLoader(true);
    const type = "update";
    try {
      const tokenSesion = token;
      const response = await enviarDatosUsuario(tokenSesion, type, { ...formData });
      if (response?.isSuccess) {
        setShowAlert(true);
        setMensajeModal(
          <p>
            Información actualizada <b>correctamente</b>.
          </p>
        );
        userProfileMe(token).then((response) => {
          if (response.isSuccess) {
            localStorage.setItem('datosUsuario', JSON.stringify(response.userProfile))
          }
        });
        setShowLoader(false);
      } else {
        console.error("Ocurrió un error en la API:", response);
      }
    } catch (err) {
      console.error("Error al enviar datos del usuario:", err);
      setShowAlert(true);
      setMensajeModal(
        <p>
          ¡Lo sentimos! ocurrió un problema al enviar tu información, estamos trabajando para <b>resolverlo</b>.
        </p>
      );
    } finally {
      setShowLoader(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setTimeout(() => {
      updateDataUserInfo();
    }, 3000);
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
              dataUser={dataUser}
              opciones={opciones}
              onOptionSelect={(selectedOptions) => handleOptionSelect(...selectedOptions, field)}
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
    </div>
  );
};

export default EditProfileForm;
