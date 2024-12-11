// eslint-disable-next-line no-unused-vars
import React from 'react'

const PerfilOtraPersona = () => {
  return (
    <div>
        <div className="club_contenedor_full_height">
            <div className="club_sub_contenedor">
                <div className="club_onboarding_img">
                    <img src="/src/assets/images/perfil-otras/Photo.jpg" alt="Foto-perfil-1" width="100%" />        
                </div>
                <div className="club_contenedor container-lg">
                    <div className="club_onboarding_bullets_cont justify-content-start">
                        <span className="club_onboarding_bullet active"></span>
                        <span className="club_onboarding_bullet"></span>
                        <span className="club_onboarding_bullet"></span>
                    </div>
                    <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
                        <div className="d-flex flex-wrap align-items-left justify-content-left w-100">
                            <h1 className="club_identity-h1">Julieta Sainz, 29 años<span className="club_status-verified"> ✔</span></h1>
                            <p className="club_location-profile">Ella - Benito Juárez</p>
                            <section className="club_about-me">
                                <h2>Acerca de mí</h2>
                                <p>
                                    The perfect T-shirt for when you want to feel comfortable but still stylish. Amazing for all occasions. 
                                    Made of 100% cotton fabric in four colours. Its modern style gives a lighter look to the outfit. Perfect for the warmest days.
                                </p>
                            </section>
                            <section className="club_preferences">
                                <h2 className="club_identity-h2">Estoy buscando</h2>
                                <span className="club_tag">Citas</span>
                                <span className="club_tag">Hacer amigas</span>

                                <h2 className="club_identity-h2">Identidad de Género</h2>
                                <span className="club_tag">Mujer</span>
                            
                                <h2 className="club_identity-h2">Identidad Sexual</h2>
                                <span className="club_tag">Lesbiana</span>
                            
                                <h2 className="club_identity-h2">Apariencia</h2>
                                <span className="club_tag">FEM</span>
                            </section>
                           
                        </div>
                    </div>
                    <div className="club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns">
                        <div className="col-12">
                            <button className="btn club_btn club_btn_full club_btn_full_general club_bg_oro">Agregar a amigas</button>
                        </div>
                    </div>
                    <div className="club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns">
                        <div className="col-12">
                            <button className="btn club_btn club_btn_full club_btn_full_general club_btn_borde_oro">Bloquear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PerfilOtraPersona