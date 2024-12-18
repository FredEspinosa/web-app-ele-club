// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TextAreaDinamico from "../inputs/text_area";
import InputTelefono from "../inputs/input_telefono";
import { paises } from "../../services/paises";

const EditProfileForm = ({ user, onSave, dataUser, cancelEdit }) => {
    console.log("dataUser edit perfil", dataUser);
    
  const [formData, setFormData] = useState({
    lastName: dataUser.lastName,
    lookingFors: dataUser.lookingFors,
    codeCountry: dataUser.codeCountry,
    email: dataUser.email,
    relationshipStatus: dataUser.relationshipStatus,
    birthDate: dataUser.birthDate,
    genders: dataUser.genders,
    sexualIdentities: dataUser.sexualIdentities,
    name: dataUser.name,
    pronouns: dataUser.pronouns,
    phoneNumber: dataUser.phoneNumber,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const campos = [
    {
        type: 'text',
        name: 'name',
        label: 'Cuál es tu nombre?',
        placeholder: 'Nombre',
        iconStart: false,
        iconNameStart:'',
        iconEnd: false,
        iconNameEnd: '',
        help: false
    },
    {
        type: 'text',
        name: 'lastName',
        label: 'Cuál es tu apellido?',
        placeholder: 'Apellido',
        iconStart: false,
        iconNameStart:'',
        iconEnd: false,
        iconNameEnd: '',
        help: false
    },
    {
        type: 'text',
        name: 'birthDate',
        label: 'Cuando cumples años?',
        placeholder: 'Fecha de nacimiento',
        iconStart: false,
        iconNameStart:'',
        iconEnd: true,
        iconNameEnd: <IoIosArrowDown className='club_input_icon_der' size={24} />,
        help: false
    },
    {
        type: 'email',
        name: 'email',
        label: 'Cuál es tu email?',
        placeholder: 'email electrónico',
        iconStart: false,
        iconNameStart:'',
        iconEnd: false,
        iconNameEnd: '',
        help: false
    },
  ]

  const campoText = [
    {
        name: 'Bio',
        label: 'Expresa un pensamiento',
        placeholder: 'Expresa un pensamiento',
        help: false
    },
  ];

  const campoTel = [
    {
        type: 'tel',
        name: 'phoneNumber',
        label: 'Teléfono',
        placeholder: '55 23422 5235',
        iconStart: false,
        iconNameStart: '',
        iconEnd: true,
        iconNameEnd: <IoIosArrowForward className='club_input_icon_der' size={24} />,
        help: false
    },
  ]

  const handleCountryChange = (e) => {
    setFormData({
        ...formData,
        codeCountry: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="col-12 club_margin_top_56">
            <form>
                {" "}
                {/* Agrega la referencia al formulario */}
                {campos.map((campo, index) => (
                    <InputDinamico
                        key={index}
                        config={campo}
                        value={formData[campo.name] || ""}
                        onChange={handleChange}
                    />
                ))}
                {campoTel.map((campo, index) => (
                    <InputTelefono
                        key={index}
                        config={campo}
                        value={formData[campo.name] || ''}
                        onChange={handleChange}
                        paises={paises}
                        onCountryChange={handleCountryChange}
                        codeCountry={formData.codeCountry}
                    />
                ))}
                {campoText.map((campo, index) => (
                    <TextAreaDinamico
                        key={index}
                        config={campo}
                        value={formData[campo.name] || ""}
                        onChange={handleChange}
                    />
                ))}
            </form>
        </div>
        <br />
        <div className="club_cont_btns_full club_notificaciones_btns">
            <button
                type="submit"
                className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
            >
              Guardar
            </button>
        </div>
        <div className="club_cont_btns_full club_notificaciones_btns">
            <button
                className="btn club_btn club_btn_full club_btn_full_general club_bg_oro"
                onClick={cancelEdit}
            >
              Cancelar
            </button>
        </div>
    </form>
  );
};

export default EditProfileForm;
