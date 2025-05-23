//  Comando para iniciar el server: node server/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';

// Environment Variables
const secretKey = process.env.STRIPE_SECRET_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const urlOrigin = process.env.FRONTEND_ORIGIN;

// const stripe = new Stripe('sk_test_IKYCHOAmUhC7IPTdaoVtO58D'); // Key test stripe
const stripe = new Stripe(secretKey);  // Secret Key My Stripe

const app = express();
const port = 3001; // Usa un puerto disponible

// app.use(cors({origin:`http://localhost:5173`}))
// app.use(express.json());

app.use(cors({
  origin: urlOrigin, // Ajusta al dominio de tu frontend
  credentials: true, // Permite cookies y encabezados de autenticación
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json()); // Asegúrate de llamar express.json() correctamente

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

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

// Google Login
const CLIENT_ID = googleClientId; // Usa tu client_id
const client = new OAuth2Client(CLIENT_ID);

app.post('/crear_cuenta', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.status(200).json({ user: payload });
  } catch (error) {
    res.status(401).json({ error: 'Token verification failed' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`)
});

