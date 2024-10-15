// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import SplashCont from '../components/Splash/contenido'
import { limpiarTodoLocalStorage } from '../services/data'

const Splash = () => {

  useEffect(() => {
    limpiarTodoLocalStorage();
  }, [])
  
  return (
    <div>
      <SplashCont />
    </div>
  )
}

export default Splash