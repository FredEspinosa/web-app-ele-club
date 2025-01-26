import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

// const stripe = new Stripe('sk_test_IKYCHOAmUhC7IPTdaoVtO58D'); // Key test stripe
const stripe = new Stripe('sk_test_51QK2i8GAVmU9n0M4XjML2UfAPvVM8X0917NV58VKzSUJoE3H2jMUKrxSMo2idRMKjVnRDhlS7Ax5tCwQ60duj6HG00AQtZKyLf');  // Secret Key My Stripe

const app = express();
const port = 3001; // Usa un puerto disponible

app.use(cors({origin:`http://localhost:5173`}))
app.use(express.json());

// Obtener los productos
app.get('/suscripcion', async (req, res) => {
  try {
    const products = await stripe.products.list();
    const prices = await stripe.prices.list();

    // Combina productos con precios
    const productList = products.data.map(product => {
      const price = prices.data.find(p => p.product === product.id);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        priceId: price?.id,
        amount: price?.unit_amount, // Stripe guarda el monto en centavos
        currency: price?.currency,
      };
    });

    res.json(productList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  console.log('Request body:', req.body); // Asegúrate de que priceId llega correctamente
  const { priceId } = req.body;
  if (!priceId) {
    return res.status(400).send({ error: 'Price ID is required' });
  }

  try {
    // Recupera el precio directamente desde Stripe
    const price = await stripe.prices.retrieve(priceId);
    if (!price || !price.unit_amount) {
      return res.status(400).send({ error: 'Invalid price ID' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount, // Monto en centavos
      currency: price.currency,  // Moneda del precio
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`)
});

