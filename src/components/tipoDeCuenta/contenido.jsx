// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import Footer from './footer'
import { useNavigate } from 'react-router-dom';
import { limpiarTodoLocalStorage } from '../../services/data';

const TipoDeCuentaContenido = () => {
    const navigate = useNavigate();

    useEffect(() => {
        limpiarTodoLocalStorage();
    }, [])

    const siguientePagina = () => {
        navigate('/crear_cuenta')
    }

  return (
    <div className='club_contenedor_full_height'>
        <div className='club_contenedor container-lg'>
            <div className='club_cont_info club_margin_top_63 text-center'>
                <h1 className='club_titulo_general d-flex flex-wrap'>
                    Escoge un tipo de cuenta para empezar
                </h1>
                <p>We want you to make all kinds of connections! You’ll be able to switch modes once you’re all set up.</p>
            </div>
            <div className='club_tipo_cuenta_cont_btns d-flex justify-content-center flex-wrap'>
                <button className='club_tipo_cuenta_btn col-12' >Empresa</button>
                <button className='club_tipo_cuenta_btn col-12' onClick={siguientePagina}>Clubers</button>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default TipoDeCuentaContenido