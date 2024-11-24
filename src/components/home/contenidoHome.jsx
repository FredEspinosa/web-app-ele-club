// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../nav_bar/navBar'
import { TopBarClub } from '../top_bar/topBarClub'
import InputDinamico from '../inputs/inputsDinamico'
import { IoSearch } from 'react-icons/io5'
import { FiFilter } from 'react-icons/fi'
import TinderLikeCarouselV2 from '../swiper/v2_tinder-swiper'

export const ContenidoHome = () => {
    const formRef = useRef(null); // Crea la referencia al formulario

    const [formData, setFormData] = useState({
        Colonia: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const campos = [
        {
            type: 'text',
            name: 'Colonia',
            label: 'Colonia',
            placeholder: 'Alvaro Obregón',
            iconStart: true,
            iconNameStart: <IoSearch className="club_input_icon_izq" size={24} />,
            iconEnd: true,
            iconNameEnd: <FiFilter className="club_input_icon_der" size={24} />,
            help: false
        },
    ];

  return (
    <div id='clubHome'>
      <div className="club_contenedor_tres_secciones club_contenedor container-lg">
          <div className="club_contenido_top club_cont_info">
            <TopBarClub />
          </div>
          <div className="club_content_central">
                <div id='clubHome'>
                  <div className="col-12" style={{marginBottom:'10px'}}>
                    <form ref={formRef}>
                      {" "}
                      {campos.map((campo, index) => (
                        <InputDinamico
                          key={index}
                          config={campo}
                          value={formData[campo.name] || ""}
                          onChange={handleInputChange}
                        />
                      ))}
                    </form>
                  </div>
                  <TinderLikeCarouselV2 />
                </div>
          </div>
          <div className="club_contenido_bottom club_cont_info">
            <NavBar />
          </div>
      </div>
    </div>
  )
}
