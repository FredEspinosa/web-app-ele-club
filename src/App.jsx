import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Suscripción con Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// Estilos Globales
// import '../public/css/styles.css'
// import './assets/css/styles.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Páginas
import StyleGuide from './pages/style_guide';
import HomePage from './pages/home';
import PerfilPage from './pages/perfil';
import Bienvenida from './pages/bienvenida';
import Splash from './pages/splash';
import TipoDeCuentaPage from './pages/tipoCuenta';
import NotificacionesPage from './pages/notificaciones';
import PermisosUbi from './components/notificaciones/popupPermiosUbicacion';
import CrearCuenta from './pages/crearCuenta';
import DatosPersonalesPerfil from './pages/datos_personales';
import PronombresPage from './pages/set_up_perfil_pages/pronombres_page';
import IdentidadSexualPage from './pages/set_up_perfil_pages/identidad-sexual-page';
import IdentidadGeGeneroPage from './pages/set_up_perfil_pages/identidad_de_genero';
import EstatusDeRelacion from './components/set_up_perfil/estatus_relacion';
import QueBuscaPage from './pages/set_up_perfil_pages/que_busca_page';
import ConfiguracionCuenta from './pages/configuracion_cuenta';
import Chats from './pages/chats';
import CuantoMides from './pages/set_up_perfil_pages/cuanto_mides';
import CincoIntereses from './pages/set_up_perfil_pages/cinco_intereses';
import TienesMascotas from './pages/set_up_perfil_pages/tienes_mascotas';
import TuSignoZodiacal from './pages/set_up_perfil_pages/tu_signo_zodiacal';
import Tushabitos from './pages/set_up_perfil_pages/tus_habitos';
import ConfirmaCodigo from './pages/confirma_codigo';
import PrimeraFoto from './pages/set_up_perfil_pages/primeras_fotos';
import ComoTePercibes from './pages/set_up_perfil_pages/como_te_percibes';
import CualEsTuRol from './pages/set_up_perfil_pages/cual_es_tu_rol';
import Suscribete from './pages/suscribete';
import PerfilOtraPersona from './components/perfil_de_otra_persona/perfil_otra_persona';
import InformacionDeCuenta from './pages/informacion_de_cuenta';
import AlertasPagina from './pages/alertas_pagina';
import LikesPage from './pages/likes_page';
import PrivacitySecurityPage from './pages/config_pages/privacity_security_page';
import SupportPage from './pages/config_pages/tech_support_page';
import TermsConditionsPage from './pages/config_pages/terms_conditions_page';
import PrivacyPoliciesPage from './pages/config_pages/privacy_policies_page';
import AboutPage from './pages/config_pages/about_page';
import PaymentForm from './components/form_stripe/payment_form';
import ThankyouPage from './pages/thankyou_page';
import ChatsPrivate from './components/chats/chats_private';
import { NotificationProvider } from './components/notifications_context/notification_context';
import AlertaNotificacion from './components/notifications_context/alert_notification';


function App() {

  // const stripePromise = loadStripe('tu-public-key-de-stripe');

  // const options = {
  //   // passing the client secret obtained in step 3
  //   clientSecret: '{{CLIENT_SECRET}}',
  //   // Fully customizable with appearance API.
  //   appearance: {/*...*/},
  // };

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/bienvenida',
        element: <Bienvenida />
      },
      {
        path: '/tipo_de_cuenta',
        element: <TipoDeCuentaPage />
      },
      {
        path: '/crear_cuenta',
        element: <CrearCuenta />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/guia_de_estilos',
        element: <StyleGuide />
      },
      {
        path: '/codigo_de_confirmacion',
        element: <ConfirmaCodigo />
      },
      {
        path: '/mi_perfil',
        element: <PerfilPage />
      },
      {
        path: '/configuracion',
        element: <ConfiguracionCuenta />
      },
      {
        path: '/datos_personales',
        element: <DatosPersonalesPerfil />
      },
      {
        path: '/primeras_fotos',
        element: <PrimeraFoto />
      },
      {
        path: '/pronombres',
        element: <PronombresPage />
      },
      {
        path: '/identidad_sexual',
        element: <IdentidadSexualPage />
      },
      {
        path: '/como_te_percibes',
        element: <ComoTePercibes />
      },
      {
        path: '/identidad_de_genero',
        element: <IdentidadGeGeneroPage />
      },
      {
        path: '/estatus_de_relacion',
        element: <EstatusDeRelacion />
      },
      {
        path: '/que_buscas',
        element: <QueBuscaPage />
      },
      {
        path: '/tu_rol',
        element: <CualEsTuRol />
      },
      {
        path: '/cuanto_mides',
        element: <CuantoMides />
      },
      {
        path: '/tus_intereses',
        element: <CincoIntereses />
      },
      {
        path: '/tienes_mascotas',
        element: <TienesMascotas />
      },
      {
        path: '/signo_zodiacal',
        element: <TuSignoZodiacal />
      },
      {
        path: '/fumas',
        element: <Tushabitos />
      },
      {
        path: '/notificaciones',
        element: <NotificacionesPage />
      },
      {
        path: '/modal',
        element: <PermisosUbi />
      },
      {
        path: '/chatbox',
        element: <Chats />
      },
      {
        path: '/suscripcion',
        element: (
          // <Elements stripe={stripePromise} options={options}>
            <Suscribete />
          // </Elements>
        ),
      },
      {
        path: '/perfil_otra_persona',
        element: <PerfilOtraPersona />
      },
      {
        path: '/informacion_de_la_cuenta',
        element: <InformacionDeCuenta />
      },
      {
        path: '/alertas',
        element: <AlertasPagina />
      },
      {
        path: '/likes',
        element: <LikesPage />
      },
      {
        path: '/privacidad_y_seguridad',
        element: <PrivacitySecurityPage />
      },
      {
        path: '/soporte_tecnico',
        element: <SupportPage />
      },
      {
        path: '/terminos_y_condiciones',
        element: <TermsConditionsPage />
      },
      {
        path: '/politica_de_privacidad',
        element: <PrivacyPoliciesPage />
      },
      {
        path: '/acerca_de',
        element: <AboutPage />
      },
      {
        path: '/pago',
        element: <PaymentForm />
      },
      {
        path: '/gracias',
        element: <ThankyouPage />
      },
      {
        path: '/history_chat',
        element: <ChatsPrivate />
      }
    ]
  )

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <NotificationProvider>
        <AlertaNotificacion />
        <RouterProvider router={router} />
      </NotificationProvider>
    </>
  );
}

export default App;

