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
    Apellidos: dataUser.Apellidos,
    Busca: dataUser.Busca,
    CodigoPais: dataUser.CodigoPais,
    Correo: dataUser.Correo,
    EstatusRelacion: dataUser.EstatusRelacion,
    FechaNacimiento: dataUser.FechaNacimiento,
    IdentidadDeGenero: dataUser.IdentidadDeGenero,
    IdentidadSexual: dataUser.IdentidadSexual,
    Nombres: dataUser.Nombres,
    Pronombre: dataUser.Pronombre,
    Telefono: dataUser.Telefono,
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
        name: 'Nombres',
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
        name: 'Apellidos',
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
        name: 'FechaNacimiento',
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
        name: 'Correo',
        label: 'Cuál es tu Correo?',
        placeholder: 'Correo electrónico',
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
        name: 'Telefono',
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
        CodigoPais: e.target.value
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
                        codigoPais={formData.CodigoPais}
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
