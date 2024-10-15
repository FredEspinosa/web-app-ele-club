import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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


function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/inicio',
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
        path: '/notificaciones',
        element: <NotificacionesPage />
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
        path: '/perfil',
        element: <PerfilPage />
      },
      {
        path: '/datos_personales',
        element: <DatosPersonalesPerfil />
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
        path: '/modal',
        element: <PermisosUbi />
      },
    ]
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

