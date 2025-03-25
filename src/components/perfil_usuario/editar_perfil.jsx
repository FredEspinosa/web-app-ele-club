/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import OpcionesCheck from "../inputs/opciones_check";
import {
  getGender,
  getInterest,
  getLookingFor,
  getPerception,
  getPet,
  getPronouns,
  getRelationshipStatus,
  getRole,
  getSexualIdentity,
  getSmoke,
  getZodiac,
  userProfileMe,
} from "../../services/api";
import { FaCheck } from "react-icons/fa";
import { enviarDatosUsuario } from "../../services/data";

const EditProfileForm = ({ onSave, dataUser, cancelEdit, token, setShowLoader, setMensajeModal, setShowAlert }) => {
  const [formData, setFormData] = useState({ ...dataUser });
  const [options, setOptions] = useState({
    lookingFor: [],
    genders: [],
    sexualIdentity: [],
    perception: [],
    interests: [],
    pets: [],
    pronouns: [],
    relationshipStatus: [],
    roles: [],
    smokes: [],
    zodiacs: [],
  });
  const [storedOptionName, setStoredOptionName] = useState({});

  const fieldsValue = [
    "lookingFors",
    "genders",
    "sexualIdentities",
    "perceptions",
    "interests",
    "pets",
    "pronouns",
    "relationshipStatus",
    "roles",
    "smokes",
    "zodiacs",
  ];

  const checkIcon = <FaCheck size={24} style={{ color: "#BC8D40" }} />;

  const fetchOptions = useCallback(async () => {
    setShowLoader(true);
    try {
      const [lookingFor, genders, sexualIdentity, perception, interests, pets, pronouns, relationshipStatus, roles, smokes, zodiacs] = await Promise.all([
        getLookingFor(),
        getGender(),
        getSexualIdentity(),
        getPerception(),
        getInterest(),
        getPet(),
        getPronouns(),
        getRelationshipStatus(),
        getRole(),
        getSmoke(),
        getZodiac(),
      ]);

      setOptions({
        lookingFor: lookingFor?.map((item) => ({ id: item.id, name: item.name })) || [],
        genders: genders?.map((item) => ({ id: item.id, name: item.name })) || [],
        sexualIdentity: sexualIdentity?.map((item) => ({ id: item.id, name: item.name })) || [],
        perception: perception?.map((item) => ({ id: item.id, name: item.name })) || [],
        interests: interests?.map((item) => ({ id: item.id, name: item.name })) || [],
        pets: pets?.map((item) => ({ id: item.id, name: item.name })) || [],
        pronouns: pronouns?.map((item) => ({ id: item.id, name: item.name })) || [],
        relationshipStatus: relationshipStatus?.map((item) => ({ id: item.id, name: item.name })) || [],
        roles: roles?.map((item) => ({ id: item.id, name: item.name })) || [],
        smokes: smokes?.map((item) => ({ id: item.id, name: item.name })) || [],
        zodiacs: zodiacs?.map((item) => ({ id: item.id, name: item.name })) || [],
      });
    } catch (error) {
      console.error("Error fetching options", error);
    } finally {
      setShowLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  function buscarNombreEnObjeto(objeto) {
    if (objeto && typeof objeto === "object") {
      if (Object.prototype.hasOwnProperty.call(objeto, "name") && typeof objeto.name === "string") {
      // if (objeto.hasOwnProperty("name") && typeof objeto.name === "string") {
        return objeto.name;
      } else {
        for (const key in objeto) {
          const nombre = buscarNombreEnObjeto(objeto[key]);
          if (nombre) {
            return nombre;
          }
        }
      }
    }
    return null;
  }

  function extraerNombres(objeto, campos) {
    const resultados = {};

    campos.forEach((campo) => {
      resultados[campo] = [];

      if (objeto && Object.prototype.hasOwnProperty.call(objeto, campo)) {
        const valorCampo = objeto[campo];

        if (Array.isArray(valorCampo)) {
          valorCampo.forEach((item) => {
            if (item && typeof item === "object") {
              const nombre = buscarNombreEnObjeto(item);
              if (nombre) {
                resultados[campo].push(nombre);
              }
            }
          });
        } else if (typeof valorCampo === "object") {
          const nombre = buscarNombreEnObjeto(valorCampo);
          if (nombre) {
            resultados[campo].push(nombre);
          }
        }
      }
    });

    return resultados;
  }

  useEffect(() => {
    const extractedOptionName = extraerNombres(formData, fieldsValue);
    if (extractedOptionName) {
      setStoredOptionName(extractedOptionName);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOptionSelect = useCallback((selectedOptions, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: selectedOptions }));
  }, []);

  const updateDataUserInfo = async () => {
    setShowLoader(true);
    const type = "update";
    try {
      const response = await enviarDatosUsuario(token, type, { ...formData });
      if (response?.isSuccess) {
        setShowAlert(true);
        setMensajeModal(
          <p>
            Información actualizada <b>correctamente</b>.
          </p>
        );
        const userProfileResponse = await userProfileMe(token);
        if (userProfileResponse.isSuccess) {
          localStorage.setItem("datosUsuario", JSON.stringify(userProfileResponse.userProfile));
          onSave(userProfileResponse.userProfile);
        }
      } else {
        console.error("API error:", response);
      }
    } catch (err) {
      console.error("Error sending user data:", err);
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
    updateDataUserInfo();
  };

  const fields = [
    {
      type: "textArea",
      name: "aboutMe",
      label: "Expresa un pensamiento",
      placeholder: "Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!",
    },
  ];

  const optionFields = [
    { label: "Estoy buscando", field: "lookingFors", options: options.lookingFor, initialValue: storedOptionName.lookingFors },
    { label: "Identidad de género", field: "genders", options: options.genders, initialValue: storedOptionName.genders },
    { label: "Identidad sexual", field: "sexualIdentities", options: options.sexualIdentity, initialValue: storedOptionName.sexualIdentities },
    { label: "Percepción sexual", field: "perceptions", options: options.perception, initialValue: storedOptionName.perceptions },
    { label: "Intereses", field: "interests", options: options.interests, initialValue: storedOptionName.interests },
    { label: "Tienes mascotas?", field: "pets", options: options.pets, initialValue: storedOptionName.pets },
    { label: "Cuál es tu pronombre?", field: "pronouns", options: options.pronouns, initialValue: storedOptionName.pronouns },
    { label: "Estatus de relación", field: "relationshipStatus", options: options.relationshipStatus, initialValue: storedOptionName.relationshipStatus },
    { label: "Cuál es tu rol?", field: "roles", options: options.roles, initialValue: storedOptionName.roles },
    { label: "Fumas?", field: "smokes", options: options.smokes, initialValue: storedOptionName.smokes },
    { label: "Cuál es tu signo zodiacal?", field: "zodiacs", options: options.zodiacs, initialValue: storedOptionName.zodiacs },
  ];

  return (
    <div className="club_contenedor">
      <form onSubmit={handleSubmit}>
        <div className="club_cont_data_perfil">
          <h3 className="club_txt_titular">Acerca de mí</h3>
          {fields.map((field, index) => (
            <InputDinamico key={index} config={field} value={formData[field.name] || ""} onChange={handleChange} />
          ))}
        </div>
        {optionFields.map(({ label, field, options, initialValue }) => (
          <div className="club_cont_data_perfil" key={field}>
            <h3 className="club_txt_titular">{label}</h3>
            <OpcionesCheck
              storedOptions={initialValue}
              opciones={options}
              onOptionSelect={(selectedOptions) => handleOptionSelect(selectedOptions, field)}
              tituloDeLista={label}
              iconoCheck={checkIcon}
              multiselect={false}
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
