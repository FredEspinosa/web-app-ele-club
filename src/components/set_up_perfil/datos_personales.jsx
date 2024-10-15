// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import InputDinamico from "../inputs/inputsDinamico";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DatosPersonales = () => {

    const formRef = useRef(null); // Crea la referencia al formulario
    const navigate = useNavigate();
    const [datosUsuario, setDatosUsuario] = useState({});

    useEffect(() => {
        // Obtener los datos guardados del localStorage al cargar el componente
        const datosGuardados = localStorage.getItem("datosUsuario");
        if (datosGuardados) {
            setDatosUsuario(JSON.parse(datosGuardados)); // Parsea y guarda los datos en el estado
        }
    }, []);

    const [formData, setFormData] = useState({
        Nombres: '',
        Apellidos: '',
        FechaNacimiento: '',
        Correo: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Valores a los campos type, name, label, options, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd , help

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
    ];

    const handleRegresar = () => {
        navigate('/crear_cuenta')
    }

    const handleContinuar = () => {
      if (formData) {
          const nuevosDatos = {
              ...datosUsuario, // Mantén los datos actuales
              Nombres: formData.Nombres,
              Apellidos: formData.Apellidos,
              FechaNacimiento: formData.FechaNacimiento,
              Correo: formData.Correo,
          };
          // Guarda los nuevos datos en el localStorage
          localStorage.setItem("datosUsuario", JSON.stringify(nuevosDatos));
          console.log("Datos actualizados guardados:", nuevosDatos);
          setTimeout(() => {
              navigate('/pronombres');
          }, 300);
      } else {
        console.log("No se ha seleccionado ninguna opción");
      }
        // localStorage.setItem("datosUsuario", JSON.stringify(formData));
        // const datosGuardados = localStorage.getItem("datosUsuario");
        // console.log(JSON.parse(datosGuardados));
        
    }

  return (
    <div>
      <div className="club_contenedor_full_height" id="clubDatosPersonales">
        <div className="club_contenedor container-lg club_sub_contenedor">
          <div className="club_crear_cuenta_btn_top">
            <span onClick={() => handleRegresar()}>Atrás</span>
          </div>
          <div className="club_cont_info_grow_1">
            <div className="col-12 d-flex justify-content-start">
              <div className="club_cont_barra">
                <span>Completa tu perfil</span>
                <div className='club_barra_progreso'>
                    <div className='club_progreso active animate__animated animate__bounceIn'></div>
                    <div className='club_progreso '></div>
                    <div className='club_progreso'></div>
                    <div className='club_progreso'></div>
                </div>
              </div>
            </div>
            <div className="col-12 club_margin_top_56">
              <form ref={formRef}>
                {" "}
                {/* Agrega la referencia al formulario */}
                {campos.map((campo, index) => (
                  <InputDinamico
                    key={index}
                    config={campo}
                    value={formData[campo.name] || ""}
                    onChange={handleInputChange}
                  />
                ))}
              </form>
            </div>
          </div>
          <div className="club_cont_btns_full club_notificaciones_btns">
            <button
              className="btn club_btn club_btn_full club_btn_full_general club_bg_violeta_08"
              onClick={() => handleContinuar()}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;
