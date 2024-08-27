import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import '../public/css/styles.css'
// import './assets/css/styles.css'
import Inicio from './pages/inicio';

function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Inicio />
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

