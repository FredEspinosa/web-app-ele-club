// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkout_form';
import { getClientSecret } from '../../services/api';
import Loader from '../loader/loader';
import { useLocation } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_wk6O7Cc5k3McBIG2Hut2irGs');    // Publishable key test stripe
const stripePromise = loadStripe('pk_test_51QK2i8GAVmU9n0M408CwGWO7mpzf0sUXaj8YlXUrVKga2b7Zn39YsyVfeDqCpJrp9gVGAx66fJgMnFaeqCruz5mK00HpdOxZV4');    // Publishable key my stripe

const PaymentForm = () => {

    const location = useLocation(); // Para acceder al estado pasado desde Suscripciones
    const { priceId } = location.state || {}; // Obtenemos el priceId del estado

    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        if (priceId) {
          // Obtener el clientSecret desde el backend usando el priceId
          console.log("priceId PaymentForm", priceId);
          async function fetchClientSecret() {
            const secret = await getClientSecret(priceId); // Pasa el priceId aquí
            setClientSecret(secret);
          }
    
          fetchClientSecret();
        }
      }, [priceId]);

    if (!clientSecret) {   
        console.log("clientSecret", clientSecret);
        return <Loader />;
    }

    const options = {
        clientSecret,
        locale:'es',
        appearance: {
            theme: 'flat',
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentForm;