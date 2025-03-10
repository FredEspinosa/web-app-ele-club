// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import { useNavigate } from "react-router-dom";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const DatosPersonales = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosUsuario");
    if (datosGuardados) {
      setDatosUsuario(JSON.parse(datosGuardados));
    }
  }, []);

  const calcularEdad = (fechaNacimiento) => {
    console.log("fechaNacimiento", fechaNacimiento);

    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     // Verifica si es el campo de FechaNacimiento para calcular la edad
  //     let nuevosDatos = { ...formData, [name]: value };
  //     if (name === "birthDate") {
  //         const edad = calcularEdad(value);
  //         nuevosDatos = { ...nuevosDatos, age: edad };
  //     }
  //     setFormData(nuevosDatos);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let nuevosDatos = { ...formData };

    if (name === "birthDate" && value) {
      const edad = calcularEdad(value);
      nuevosDatos = { ...nuevosDatos, age: edad };

      // Mantener la fecha en formato ISO
      const isoDate = new Date(value).toISOString();
      nuevosDatos = { ...nuevosDatos, [name]: isoDate };
    } else {
      nuevosDatos = { ...nuevosDatos, [name]: value };
    }
    setFormData(nuevosDatos);
  };

  const campos = [
    {
      type: "text",
      name: "name",
      label: "Cuál es tu nombre?",
      placeholder: "Nombre",
    },
    {
      type: "text",
      name: "lastName",
      label: "Cuál es tu apellido?",
      placeholder: "Apellido",
    },
    {
      type: "date",
      name: "birthDate",
      label: "Cuando cumples años?",
      placeholder: "dd/mm/aaaa",
      max: new Date().toISOString().split("T")[0], // Establece la fecha máxima como el día de hoy
      iconEnd: true,
      iconNameEnd: <IoCalendarNumberOutline className="club_input_icon_der" size={24} />,
    },
    {
      type: "email",
      name: "email",
      label: "Cuál es tu Correo?",
      placeholder: "Correo electrónico",
    },
  ];

  const handleRegresar = () => {
    navigate("/crear_cuenta");
  };

  const handleContinuar = () => {
    const nuevosDatos = { ...datosUsuario, ...formData };
    localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
    console.log("Datos actualizados guardados:", nuevosDatos);
    setTimeout(() => {
      navigate("/primeras_fotos");
    }, 300);
  };

  return (
    <div>
      <div className="club_contenedor_full_height" id="clubDatosPersonales">
        <div className="club_contenedor container-lg club_sub_contenedor">
          <div className="club_crear_cuenta_btn_top">
            <IoIosArrowBack size={24} />
            <span onClick={() => handleRegresar()}>Atrás</span>
          </div>
          <div className="club_cont_info_grow_1">
            <div className="col-12 d-flex justify-content-start">
              <div className="club_cont_barra">
                <span className="club_color_fuente_blanco">Completa tu perfil</span>
                <div className="club_barra_progreso">
                  <div className="club_progreso active animate__animated animate__bounceIn"></div>
                  <div className="club_progreso"></div>
                  <div className="club_progreso"></div>
                  <div className="club_progreso"></div>
                </div>
              </div>
            </div>
            <div className="col-12 club_margin_top_56">
              <form ref={formRef}>
                {campos.map((campo, index) => (
                  <InputDinamico key={index} config={campo} value={formData[campo.name] || ""} onChange={handleInputChange} />
                ))}
              </form>
            </div>
          </div>
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro" onClick={() => handleContinuar()}>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;
