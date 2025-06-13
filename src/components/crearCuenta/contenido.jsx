// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { limpiarTodoLocalStorage, requestAndSetupNotifications } from '../../services/data';
import InputTelefono from '../inputs/input_telefono';
import { paises } from '../../services/paises';
import FooterDinamico from '../footer/footer_dinamico';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { getGoogleSecretLogin } from '../../services/api';
import { jwtDecode } from "jwt-decode";
import { loginGoogle } from '../../services/api';
import SignWithAppleButton from './SignWithAppleButton';

const CLIENT_ID = '30011618273-nh5igt93a24bu2juthi2e6hsbt6c9vfc.apps.googleusercontent.com';

const CrearCuentaContenido = () => {
    const navigate = useNavigate();
    const [activeOption, setActiveOption] = useState('Bienvenida');
    const [showCrearCuenta, setShowCrearCuenta] = useState(true);
    const [showInicioSesion, setShowInicioSesion] = useState(false);
    const [showIngresaNumTel, setShowIngresaNumTel] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(paises[0]); // País por defecto
    const [initSesion, setInitSesion] = useState(false); // País por defecto
    const [tokenFCM, setTokenFCM] = useState("");


    let pasoActual = ''

    const formRef = useRef(null); // Crea la referencia al formulario

    const [formData, setFormData] = useState({
        phoneNumber: '',
        codeCountry: '+52',
    });

    useEffect(() => {
        limpiarTodoLocalStorage();
    }, [])
    useEffect(() => {
        setTimeout(() => {
            requestAndSetupNotifications();
        }, 200);
    }, [])

    const handleLoginSuccess = async (credentialResponse) => {
        const tokentCodeGoogle = credentialResponse.credential;
        try {
            const tokenFirebase = sessionStorage.getItem("FCMToken")
            const response = await loginGoogle(tokentCodeGoogle, tokenFirebase);
            // console.log("response Google login", response);
            if (response.status == 200) {
                sessionStorage.setItem('AccessToken', response.data.accessToken);
                const loginTrue = localStorage.getItem('isLogin');
                const decoded = jwtDecode(tokentCodeGoogle);
                if (loginTrue) {
                    setTimeout(() => {
                        navigate("/home");
                    }, 300);
                } else {
                    setTimeout(() => {      
                        navigate("/datos_personales", {
                            state: {
                                nameIs: decoded.given_name,
                                lastNameIs: decoded.family_name,
                                emailIs: decoded.email,
                            },
                        });
                    }, 300);
                }
            } else {
                console.log("ocurrio un error ☠️");
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        const savedStep = localStorage.getItem('MostrarPaso');

        if (savedStep) {
            setActiveOption(savedStep);
            // Ajustar el estado de las vistas según el paso guardado
            switch (savedStep) {
                case 'Crear':
                    setShowCrearCuenta(true);
                    setShowInicioSesion(false);
                    setShowIngresaNumTel(false);
                    break;
                case 'Continuar':
                    setShowCrearCuenta(false);
                    setShowInicioSesion(false);
                    setShowIngresaNumTel(true);
                    break;
                case 'InicioSesion':
                    setShowInicioSesion(false);
                    setShowCrearCuenta(true);
                    setShowIngresaNumTel(false);
                    break;
                case 'ContinuarCelular':
                    setShowInicioSesion(true);
                    setShowCrearCuenta(false);
                    setShowIngresaNumTel(false);
                    break;
                default:
                    break;
            }
        }
    }, []);

    const handleClick = (option) => {
        setActiveOption(option);
        switch (option) {
            case 'Crear':
                pasoActual = 'Continuar';
                setShowCrearCuenta(false);
                setShowInicioSesion(true);
                setShowIngresaNumTel(false);
                setInitSesion('Continuar con celular')
                break;
            case 'Continuar':
                localStorage.setItem("datosUsuario", JSON.stringify(formData));
                setTimeout(() => {
                    navigate('/codigo_de_confirmacion');
                }, 1000)
                break;
            case 'Atras':
                pasoActual = 'Crear'
                setShowCrearCuenta(true);
                setShowInicioSesion(false);
                setShowIngresaNumTel(false);
                break;
            case 'InicioSesion':
                pasoActual = 'ContinuarCelular'
                localStorage.setItem("isLogin", true);
                setShowInicioSesion(true);
                setShowCrearCuenta(false);
                setShowIngresaNumTel(false);
                setInitSesion('Acceder con celular')
                break;
            case 'ContinuarCelular':
                pasoActual = 'Continuar'
                setShowInicioSesion(false);
                setShowCrearCuenta(false);
                setShowIngresaNumTel(true);
                break;
            default:
                break;
        }
        localStorage.setItem('MostrarPaso', pasoActual);
    };

    const handleInputChange = (e) => {
        const newNumber = e.target.value;
        const matchingCountries = paises.filter(pais => newNumber.startsWith(pais.codigo));

        if (matchingCountries.length === 1) {
            setSelectedCountry(matchingCountries[0]);
        }

        setFormData({
            ...formData,
            [e.target.name]: newNumber,
        });
    };

    const handleCountryChange = (e) => {
        const selectedCode = e.target.value; // Obtiene el prefijo telefónico
        const selectedCountry = paises.find((pais) => pais.codigo === selectedCode); // Busca por 'codigo'

        if (selectedCountry) {
            setFormData({
                ...formData,
                codeCountry: selectedCountry.codigo, // Actualiza el prefijo telefónico
            });
            setSelectedCountry(selectedCountry); // Actualiza el país seleccionado
        }
    };

    // Valores a los campos type, name, label, options, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd , help

    const campos = [
        {
            type: 'tel',
            name: 'phoneNumber',
            label: 'Teléfono',
            placeholder: '55 23422 5235',
            iconStart: false,
            iconNameStart: '',
            iconEnd: false,
            iconNameEnd: <IoIosArrowForward className='club_input_icon_der' size={24} />,
            help: false
        },
    ];

    return (
        <div>
            <div className='club_contenedor_full_height'>
                {showCrearCuenta && (
                    <div className='club_contenedor container-lg club_sub_contenedor'>
                        <div className='club_cont_info club_margin_top_63'>
                            <div className='club_bienvenida_logo active animate__animated animate__bounceInDown'>
                                <img src={LogoClubTopBarBig} alt="Logo Club" />
                            </div>
                        </div>
                        <div className='club_cont_info_grow_1 d-flex align-items-center'>
                            <div className='club_crear_cuenta_cont_btns col-12'>
                                <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => handleClick('Crear')}>Crear Cuenta</button>
                                <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => handleClick('InicioSesion')}>Iniciar Sesión</button>
                            </div>
                        </div>
                        {/* <Footer /> */}
                        <FooterDinamico
                            textoFooter={<p>Al continuar, aceptas a nuestros <b>términos y condiciones</b> y a la <br /> <b>política de privacidad</b>. HelenaSafica® 2024</p>}
                            redirectLink={true}
                        />
                    </div>
                )}
                {showIngresaNumTel && (
                    <div id='clubCrearCuentaTel' className='club_contenedor container-lg club_sub_contenedor'>
                        <div className='club_crear_cuenta_btn_top'>
                            <IoIosArrowBack size={24} />
                            <span onClick={() => handleClick('Atras')}>Atrás</span>
                        </div>
                        <div className='club_cont_info_grow_1'>
                            <div className='col-12 d-flex justify-content-start'>
                                <h1 className='club_titulo_2_size_22 club_font_regular text-center'>¿Cuál es tu teléfono?</h1>
                            </div>
                            <div className='col-12 d-flex justify-content-start'>
                                <p className='club_notificaciones_txt text-start'>
                                    ¿Empezar de nuevo? ¿Volver a iniciar sesión? De cualquier manera, comencemos con tus dígitos.
                                    Protegemos nuestra comunidad asegurándonos de que todos en Helena sean reales.
                                </p>
                            </div>
                            <div className='col-12 club_margin_top_56'>
                                <form ref={formRef}> {/* Agrega la referencia al formulario */}
                                    {campos.map((campo, index) => (
                                        <InputTelefono
                                            key={index}
                                            config={campo}
                                            value={formData[campo.name] || ''}
                                            onChange={handleInputChange}
                                            paises={paises}
                                            onCountryChange={handleCountryChange}
                                            codigoPais={formData.codeCountry}
                                        />
                                    ))}
                                </form>
                            </div>
                        </div>
                        <div className='club_cont_btns_full club_notificaciones_btns'>
                            <button className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' onClick={() => handleClick('Continuar')}>Continuar</button>
                        </div>
                    </div>
                )}
                {showInicioSesion && (
                    <div className='club_contenedor container-lg club_sub_contenedor'>
                        <div className='club_cont_info club_margin_top_63'>
                            <div className='club_bienvenida_logo active animate__animated animate__bounceInDown'>
                                <img src={LogoClubTopBarBig} alt="Logo Club" />
                            </div>
                        </div>
                        <div className='club_cont_info_grow_1 d-flex align-items-center'>
                            <div className='club_crear_cuenta_cont_btns col-12'>
                                <div style={{ marginBottom: '3%' }}>
                                    <GoogleOAuthProvider clientId={CLIENT_ID}>
                                        <div className="club_crear_cuenta_cont_btns">
                                            <GoogleLogin
                                                onSuccess={(credentialResponse) => { handleLoginSuccess(credentialResponse) }}
                                                // onSuccess={(credentialResponse) => {console.log(credentialResponse)}} 
                                                onError={() => console.error('Login Failed')}
                                                useOneTap
                                            />
                                        </div>
                                    </GoogleOAuthProvider>
                                </div>
                                {/* <button className='btn club_btn_negro' onClick={() => handleClick('ContinuarConGoogle')}>Continuar con Google</button> */}
                                {/*  <button className='btn club_btn_negro' >Continuar con Facebook</button> */}
                                <button className='btn club_btn_negro' onClick={() => handleClick('ContinuarCelular')}>{initSesion}</button>
                                <SignWithAppleButton/>
                            </div>
                        </div>
                        <FooterDinamico
                            textoFooter={<p>Al continuar, aceptas a nuestros <b>términos y condiciones</b> y a la <br /> <b>política de privacidad</b>. HelenaSafica® 2024</p>}
                            redirectLink={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrearCuentaContenido;
