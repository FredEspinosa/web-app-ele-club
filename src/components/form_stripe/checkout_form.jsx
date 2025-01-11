// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import AlertSuscribe from '../alertas/alert_suscribete';
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 
import FooterDinamico from '../footer/footer_dinamico';
import { useLocation, useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation(); // Accede a los datos pasados desde el componente anterior
    const { priceId } = location.state || {}; // Obtén el priceId

    const [errorMessage, setErrorMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      console.log("priceId PaymentForm", priceId);
    }, [priceId]);

    const handleSubmit = async (event) => {
        // No queremos permitir que se envíe el formulario predeterminado aquí, // lo que actualizaría la página.
        event.preventDefault();

      if (!stripe || !elements  || !priceId) {
          // Stripe.js aún no se ha cargado. // Asegúrese de deshabilitar el envío de formulario hasta que Stripe.js se haya cargado.
          return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
              // Puedes usar una página estática si Stripe lo maneja directamente, pero vamos a redirigir manualmente.
              return_url: 'http://localhost:5173/gracias',
          },
          redirect: "if_required", // Evita redireccionar automáticamente
      });

      if (error) {
          // Este punto solo se alcanzará si se produce un error inmediato al confirmar el pago. Mostrar el error a su cliente (por ejemplo, detalles del pago incompletos)
          setErrorMessage(error.message);
          setShowAlert(true)
      } else {
          // Su cliente será redirigido a su `return_url`. Para algunos métodos de pago como iDEAL, su cliente será redirigido a un sitio intermedio primero para autorizar el pago y luego será redirigido a `return_url`.
          navigate('/gracias');
      }
    };

    const closeModal = () => {
        setShowAlert(false)
    }

    return (
      <div>
          <div className="club_contenedor_full_height" id="">
              <div className="club_contenedor container-lg club_sub_contenedor">
                  <div className='club_bienvenida_logo active animate__animated animate__bounceInDown' style={{marginBottom:'30px'}}>
                      <img src={LogoClubTopBarBig} alt="Logo Club" style={{width:'150px'}} />
                  </div>
                  <div className='col-12 text-center club_bienvenida_info club_cont_info_grow_1'>
                    <h1 className='col-12'>Pago de suscripción<br /></h1>
                    <p className='col-12'>
                      Llena los campos necesarios para realizar tu pago.                    
                    </p>
                    <form id='ClubStripeForm' onSubmit={handleSubmit} style={{marginTop:'30px'}}>
                      <PaymentElement />
                      <button 
                        className='btn club_btn club_btn_full club_btn_full_general club_bg_oro' 
                        disabled={!stripe}
                        style={{marginTop:'30px'}}
                      >
                          Pagar
                      </button>
                    </form>
                  </div>
              </div>
              <FooterDinamico 
                  textoFooter={<p>Al continuar, aceptas a nuestros <b>términos y condiciones</b> y a la <br /> <b>política de privacidad</b>. HelenaSafica® 2024</p>}
                  redirectLink={true}
              />
          </div>

          {/* Mostrar mensaje de error a sus clientes */}
          {errorMessage && showAlert &&
              <AlertSuscribe 
                mensajeModal={errorMessage}
                btnAceptar={true}
                btnMsjButtom={'CERRAR'}
                handleOnclick={closeModal}
                bgColorButton={'club_bg_oro'}
              />
          }
      </div>
    )
};

export default CheckoutForm;