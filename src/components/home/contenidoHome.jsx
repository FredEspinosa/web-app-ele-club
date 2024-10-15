// eslint-disable-next-line no-unused-vars
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { CarrucelOpciones } from '../swiper/carrucelOpciones'

export const ContenidoHome = () => {
  return (
    <div id='clubHome'>
      <div className='club_contenedor container-lg club_margin_top_56 club_padding_top_26'>
        <div className="club_input">
          <label className="club_input_label" htmlFor="">
            Label
          </label>
          <div className="club_input_contenedor">
            <IoIosArrowForward className="club_input_icon_izq" size={24} />
            <input
              className="club_input_campo"
              type="text"
              placeholder="Alvaro Obregón"
            />
            <IoIosArrowForward className="club_input_icon_der" size={24} />
          </div>
          <span className="club_input_span">Ayuda</span>
        </div>
      </div>

      <CarrucelOpciones />
    </div>
  )
}
