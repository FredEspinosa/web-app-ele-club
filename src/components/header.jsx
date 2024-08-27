// eslint-disable-next-line no-unused-vars
import React from 'react'
// Importación de imágenes
import ImagenLogo from '../assets/images/react.svg'

const Header = () => {
  return (
    <div>
        <div className='d-flex align-items-center justify-content-center'>
            <img src={ImagenLogo} alt="" />
            <p className='margin_botom_0'>Header de prueba React Vite</p>
        </div>
    </div>
  )
}

export default Header