// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import OpcionesCheck from "../inputs/opciones_check";
import { getGender, getLookingFor, getPerception, getSexualIdentity } from "../../services/api";
import Loader from "../loader/loader";
import { FaCheck } from "react-icons/fa";

const EditProfileForm = ({ onSave, dataUser, cancelEdit }) => {
  // console.log("dataUser al carga componente EditProfileForm", dataUser);
  // console.log("onSave al carga componente EditProfileForm", onSave);
  // console.log("cancelEdit al carga componente EditProfileForm", cancelEdit);

  const [selectedValue, setSelectedValue] = useState(null);
  const [opcionesLookingFor, setOpcionesLookingFor] = useState([]);
  const [opcionesGenders, setOpcionesGenders] = useState([]);
  const [opcionesSexualIdentity, setOpcionesSexualIdentity] = useState([]);
  const [opcionesPerception, setOpcionesPerception] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    userId: dataUser.userId,
    userName: dataUser.userName,
    name: dataUser.name,
    lastName: dataUser.lastName,
    email: dataUser.email,
    phone: dataUser.phone,
    birthDate: dataUser.birthDate,
    height: dataUser.height,
    aboutMe: dataUser.aboutMe,
    match: dataUser.match,
    friend: dataUser.friend,
    friendRequest: dataUser.friendRequest,
    genders: dataUser.genders,
    lookingFors: dataUser.lookingFors,
    perceptions: dataUser.perceptions,
    pronouns: dataUser.pronouns,
    relationshipStatus: dataUser.relationshipStatus,
    sexualIdentities: dataUser.sexualIdentities,
    pets: dataUser.pets,
    roles: dataUser.roles,
    interests: dataUser.interests,
    zodiacs: dataUser.zodiacs,
    smokes: dataUser.smokes,
    userPhotos: dataUser.userPhotos[0].photo,
    delegation: dataUser.delegation,
    age: dataUser.age,
    phoneNumber: dataUser.phoneNumber,
    photoProfile: dataUser.photoProfile,
  });
  const iconoCheck = <FaCheck size={24} style={{ color: "#BC8D40" }} />;
  const [datosUsuario, setDatosUsuario] = useState({});

  const getServices = () => {
    listLookingFor();
    listGenders();
    listSexualIdentity();
    listPerception();
  };

  const getUserData = () => {
    const datosGuardados = localStorage.getItem("datosUsuario");
    // console.log("Editar perfil datosGuardados", datosGuardados);
    if (datosGuardados) {
      setDatosUsuario(JSON.parse(datosGuardados));
    }
  };

  useEffect(() => {
    getServices();
    getUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // console.log("Formulario handleSubmit:", formData); // Verifica el contenido antes de guardarlo
    onSave(formData); // Envía el formulario al componente padre o guarda en localStorage
  };

  const campos = [
    {
      type: "textArea",
      name: "aboutMe",
      label: "Expresa un pensamiento",
      placeholder: "Amante de los animales y la naturaleza, sporty spice, healthy lifestyle!",
      iconStart: false,
      iconNameStart: "",
      iconEnd: false,
      iconNameEnd: "",
      help: false,
    },
  ];

  const handleOptionSelect = (selectedOptions, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOptions, // Actualiza el campo específico en formData
    });
    console.log(`Opciones seleccionadas para ${fieldName}:`, selectedOptions);
  };

  const listLookingFor = async () => {
    // setShowLoader(true)
    try {
      const data = await getLookingFor();
      // console.log("data", data);
      if (!data.code) {
        setShowLoader(false);
        setOpcionesLookingFor(data.map((item) => ({ id: item.id, name: item.name })));
      } else {
        console.log("ocurrio un error ☠️");
      }
    } catch (err) {
      console.log(err);
      setShowLoader(false);
    }
  };

  const listGenders = async () => {
    setShowLoader(true);
    try {
      const data = await getGender();
      // console.log("data", data);
      if (!data.code) {
        setShowLoader(false);
        setOpcionesGenders(data.map((item) => ({ id: item.id, name: item.name })));
      } else {
        console.log("ocurrio un error ☠️");
      }
    } catch (err) {
      console.log(err);
      setShowLoader(false);
    }
  };

  const listSexualIdentity = async () => {
    setShowLoader(true);
    try {
      const data = await getSexualIdentity();
      // console.log("data", data);
      if (!data.code) {
        setShowLoader(false);
        setOpcionesSexualIdentity(data.map((item) => ({ id: item.id, name: item.name })));
      } else {
        console.log("ocurrio un error ☠️");
      }
    } catch (err) {
      console.log(err);
      setShowLoader(false);
    }
  };

  const listPerception = async () => {
    setShowLoader(true);
    try {
      const data = await getPerception();
      // console.log("data", data);
      if (!data.code) {
        setShowLoader(false);
        setOpcionesPerception(data.map((item) => ({ id: item.id, name: item.name })));
      } else {
        console.log("ocurrio un error ☠️");
      }
    } catch (err) {
      console.log(err);
      setShowLoader(false);
    }
  };

  return (
    <div>
      <div className="club_contenedor">
        <form onSubmit={handleSubmit}>
          <div className="club_cont_data_perfil">
            <h3 className="club_txt_titular">Acerca de mi</h3>
            <div className="col-12">
              {" "}
              {/* Agrega la referencia al formulario */}
              {campos.map((campo, index) => (
                <InputDinamico key={index} config={campo} value={formData[campo.name] || ""} onChange={handleChange} />
              ))}
            </div>
          </div>
          <div className="club_cont_data_perfil">
            <h3 className="club_txt_titular">Estoy buscando</h3>
            <div className="d-flex">
              <OpcionesCheck
                opciones={opcionesLookingFor}
                onOptionSelect={(selectedOptions) => handleOptionSelect(selectedOptions, "lookingFors")}
                tituloDeLista={"Estoy buscando"}
                iconoCheck={iconoCheck}
                multiselect={true}
                isDropList={true}
              />
            </div>
          </div>

          <div className="club_cont_data_perfil">
            <h3 className="club_txt_titular">Identidad de género</h3>
            <div className="d-flex">
              <OpcionesCheck
                opciones={opcionesGenders}
                onOptionSelect={(selectedOptions) => handleOptionSelect(selectedOptions, "genders")}
                tituloDeLista={"Identidad de género"}
                iconoCheck={iconoCheck}
                multiselect={true}
                isDropList={true}
              />
            </div>
          </div>

          <div className="club_cont_data_perfil">
            <h3 className="club_txt_titular">Identidad sexual</h3>
            <div className="d-flex">
              <OpcionesCheck
                opciones={opcionesSexualIdentity}
                onOptionSelect={(selectedOptions) => handleOptionSelect(selectedOptions, "sexualIdentities")}
                tituloDeLista={"Identidad sexual"}
                iconoCheck={iconoCheck}
                multiselect={true}
                isDropList={true}
              />
            </div>
          </div>

          <div className="club_cont_data_perfil">
            <h3 className="club_txt_titular">Percepción sexual</h3>
            <div className="d-flex">
              <OpcionesCheck
                opciones={opcionesPerception}
                onOptionSelect={(selectedOptions) => handleOptionSelect(selectedOptions, "perceptions")}
                tituloDeLista={"Percepción sexual"}
                iconoCheck={iconoCheck}
                multiselect={true}
                isDropList={true}
              />
            </div>
          </div>
          <br />
          <div className="club_cont_data_perfil">
            <div className="club_cont_btns_full club_notificaciones_btns">
              <button type="submit" className="btn club_btn club_btn_full club_btn_full_general club_bg_oro">
                Guardar
              </button>
            </div>
            <div className="club_cont_btns_full club_notificaciones_btns">
              <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={cancelEdit}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
      {showLoader && <Loader />}
    </div>
  );
};

export default EditProfileForm;
