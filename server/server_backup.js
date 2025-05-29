// Backup de resolver el error en urls para el servicio de TripOriginRounded, agregar las variables de entorno en vercel

//  Comando para iniciar el server: node server/server.js
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);  // Usa tu clave secreta desde .env

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.get('/suscripcion', async (req, res) => {
  try {
    const products = await stripe.products.list();
    const prices = await stripe.prices.list();

    const productList = products.data.map(product => {
      const price = prices.data.find(p => p.product === product.id);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        priceId: price?.id,
        amount: price?.unit_amount,
        currency: price?.currency,
      };
    });

    res.json(productList);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  const { priceId } = req.body;
  if (!priceId) {
    return res.status(400).send({ error: 'Price ID is required' });
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    if (!price || !price.unit_amount) {
      return res.status(400).send({ error: 'Invalid price ID' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
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
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
