// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../components/header'
import Formulario from '../components/inputs/inputEjemploUso'

const Inicio = () => {
  return (
    <div>
        <Header />
        <div className='container'>
            <h1 className='clase_de_pueba'>Hola Bienvenido 🐶</h1>
            <Formulario />
        </div>
    </div>
  )
}

export default Inicio