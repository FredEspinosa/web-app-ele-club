// eslint-disable-next-line no-unused-vars
import React from 'react'

// animacionActive = Recibe un true o false para validar si hay o no animación
// animacionStyle = Recibe una cadena con el nombre del tipo de animacion ejemplo => animate__bounceInDown
// eslint-disable-next-line react/prop-types
export default function Template ({animacionActive, animacionStyle, children}) {

    const [showLoader, setShowLoader] = useState(false);
    const [opciones, setOpciones] = useState([]);

    const list = async () => {
        setShowLoader(true)
        try {
          const data = await ();
          console.log("data", data);
          if (!data.code) {
            setShowLoader(false);
            setOpciones(data.map(item => item.name))
          } else {
            console.log("ocurrio un error ☠️");
          }
        } catch (err) {
          console.log(err);
          setShowLoader(false);
        }
    };

    {(showLoader && <Loader /> )}



  return (
    <div className='club_contenedor_full_height'>
        <div className='club_contenedor container-lg club_sub_contenedor'>
            <div className={`club_cont_info ${animacionActive ? 'active animate__animated' : ''} ${animacionStyle} `}>
                {children}
            </div>
            <div className='club_cont_info_grow_1'>
                {children}
            </div>
            <div className='club_cont_info'>
                {children}
            </div>
        </div>
    </div>
  )
}