// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import SuscripcionImg1 from '../../assets/images/suscripcion/suscripcion-1.jpg' 
import SuscripcionImg2 from '../../assets/images/suscripcion/suscripcion-2.jpg' 
import SuscripcionImg3 from '../../assets/images/suscripcion/suscripcion-3.jpg' 
import FooterDinamico from '../footer/footer_dinamico'
import CarruselPerfilUsuario from '../swiper/carrusel_perfil_usuario'

const Suscripciones = () => {

    const [imagesSuscription, setImagesSuscription] = useState([
        SuscripcionImg1,
        SuscripcionImg2,
        SuscripcionImg3
    ])

  return (
    <div id='Suscriptions'>
        <div className="club_contenedor_full_height">
            <div className='club_sub_contenedor'>
                <div className='club_onboarding_img'>
                    <CarruselPerfilUsuario
                        userPhotos={imagesSuscription}
                        infoPerfil={false}
                        autoPlaySlide={true}
                        autoplayInterval={4000}
                    />
                </div>
                <div className='club_contenedor container-lg'>
                    <div className='col-12 text-start club_onboarding_info d-flex align-items-center'>
                        <div className='d-flex flex-wrap align-items-center justify-content-center w-100'>
                            <div className="subscription-section">
                                <div className="plan">
                                    <div className="plan-title">1<br /> <span>mes</span></div>
                                    <div className="plan-price">$150.00</div>
                                </div>
                                <div className="plan">
                                    <div className="plan-title">6<br /><span>meses</span> </div>
                                    <div className="plan-price">$140.00/mes <span>($840.00 anual)</span></div>
                                </div>
                                <div className="plan">
                                    <div className="plan-title">12<br /><span>meses</span></div>
                                    <div className="plan-price">$130.00/mes <span>($1,560.00 anual)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns'>
                        <div className='col-12'>
                            <button 
                                className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' 
                                // onClick={() => { handleClick('Chats'); }} 
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterDinamico 
                textoFooter={      
                    <p>La suscripción Gold es auto-renovada que te da acceso a distintas funcionalidades dentro de la app de <b>HelenaSáfica®</b>.</p>
                }
            />
        </div>
    </div>
  )
}

export default Suscripciones