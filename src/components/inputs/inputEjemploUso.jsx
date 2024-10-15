// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import InputDinamico from './inputsDinamico';
import { IoIosArrowDown } from 'react-icons/io';

const Formulario = () => {

    const formRef = useRef(null); // Crea la referencia al formulario  para poder cachar el clic del botón
    // Nombres de los campos, estos deben coincidir con el name del campo creado
    const [formData, setFormData] = useState({
        Nombres: '',
        Apellidos: '',
        FechaNacimiento: '',
        Correo: '',
        Genero: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Valores a los campos type, name, label, options, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd, help, msjHelp

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
        {
            type: 'select',
            name: 'Genero',
            label: 'Género',
            options: [
                { label: 'Seleccionar', value: '' },
                { label: 'Masculino', value: 'masculino' },
                { label: 'Femenino', value: 'femenino' }
            ],
            iconStart: false,
            iconNameStart:'',
            iconEnd: true,
            iconNameEnd: <IoIosArrowDown className='club_input_icon_der' size={24} />,
            help: false
        }
    ];

    const continuar = () => {
        // Guarda los datos en el local Storage y los convierte a una cadena formato JSON
        localStorage.setItem("datosUsuario", JSON.stringify(formData));
        // Se obtienen los datos del LS y los guardamos los datos en una variable 
        const datosGuardados = localStorage.getItem("datosUsuario");
        console.log(JSON.parse(datosGuardados));
        // Si hay que cambiar página se hace el cambio
        // navigate('/completa_tu_perfil');
    }

    return (
        <div>
            <form ref={formRef}>
                {" "}
                {/* Agrega la referencia al formulario para poder usar el botón en cualquier parte del código */}
                {campos.map((campo, index) => (
                  <InputDinamico
                    key={index}
                    config={campo}
                    value={formData[campo.name] || ""}
                    onChange={handleInputChange}
                  />
                ))}
            </form>

            <div>
                <button className='btn' onClick={() => continuar()}>Continuar</button>
            </div>

        </div>
    );
};

export default Formulario;


// Explicación del Formulario:
// Estado formData:

// Este estado maneja los valores del formulario, un campo por cada tipo de input.
// campos Array:

// Aquí definimos las configuraciones de cada campo, incluyendo el tipo de input, nombre, etiqueta, y las opciones para el select.
// handleInputChange:

// Esta función actualiza el estado formData cuando cualquier input cambia.
// Renderización:

// Usamos map para iterar sobre los objetos de configuración del array campos, y para cada uno se renderiza un InputDinamico.
// Resultado:
// Con esta configuración, el formulario puede tener campos dinámicos que cambian de tipo según las configuraciones que les pases (texto, número, email, select, etc.) sin necesidad de duplicar código.

// Este enfoque es muy flexible y fácil de escalar a medida que agregas más tipos de inputs o campos personalizados.