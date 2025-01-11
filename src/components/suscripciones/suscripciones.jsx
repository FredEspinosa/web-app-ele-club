// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarruselPerfilUsuario from '../swiper/carrusel_perfil_usuario';
import FooterDinamico from '../footer/footer_dinamico';
import SuscripcionImg1 from '../../assets/images/suscripcion/suscripcion-1.jpg';
import SuscripcionImg2 from '../../assets/images/suscripcion/suscripcion-2.jpg';
import SuscripcionImg3 from '../../assets/images/suscripcion/suscripcion-3.jpg';

const Suscripciones = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedPriceId, setSelectedPriceId] = useState(null); // Estado para el plan seleccionado
  const [selectedPlanId, setSelectedPlanId] = useState(null); // Estado para el plan con borde
  const [btnDisabled, setBtnDisabled] = useState(true); 
  const imagesSuscription = [SuscripcionImg1, SuscripcionImg2, SuscripcionImg3];

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/suscripcion'); // Verifica esta URL
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    fetchProducts();
  }, []);

  const handlePayment = (planId, priceId) => {
    console.log("handlePayment", priceId)
    setBtnDisabled(false)
    setSelectedPlanId(planId); // Guarda el plan seleccionado
    setSelectedPriceId(priceId); // Guarda el priceId del plan
  };

  const handleContinue = () => {
    if (selectedPriceId) {
        console.log("handleContinue", selectedPriceId);
        navigate('/pago', { state: { priceId: selectedPriceId } }); // Pasa el priceId al siguiente paso
    }
  };

  return (
    <div id="Suscriptions">
      <div className="club_contenedor_full_height">
        <div className="club_sub_contenedor">
          <div className="club_onboarding_img">
            <CarruselPerfilUsuario
              userPhotos={imagesSuscription}
              infoPerfil={false}
              autoPlaySlide={true}
              autoplayInterval={4000}
            />
          </div>
          <div className="club_contenedor container-lg">
            <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
              <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                <div className="subscription-section">
                  {products.map((product) => (
                    <div 
                        key={product.id} 
                        className={`plan ${selectedPlanId === product.id ? 'selected' : ''}`} 
                        onClick={() => handlePayment(product.id, product.priceId)}
                    >
                      <div className="plan-title">
                        {product.name}
                      </div>
                      <div className="plan-price">
                        ${product.amount / 100} {product.currency.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='club_cont_btns_doble club_bienvenida_btns club_bienvenida_btns'>
                <div className='col-12'>
                    <button 
                        className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' 
                        onClick={handleContinue} // Llama a handleContinue al hacer clic
                        disabled={btnDisabled}
                    >
                        Continuar
                    </button>
                </div>
            </div>
            <FooterDinamico
              textoFooter={
                <p>
                  La suscripción Gold es auto-renovada que te da acceso a
                  distintas funcionalidades dentro de la app de{' '}
                  <b>HelenaSáfica®</b>.
                </p>
              }
              redirectLink={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suscripciones;
