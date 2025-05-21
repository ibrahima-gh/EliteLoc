import express from 'express';
import cors from 'cors';
import session from 'express-session';

import authRoutes from './routes/authRoutes.js';
import carsRoutes from './routes/carsRoutes.js';
import rentsRoutes from './routes/rentsRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(session({
  secret: 'eliteloc-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.json());

// routes
app.use(authRoutes);
app.use(carsRoutes);
app.use(rentsRoutes);

// main route
app.get("/", (req, res) => {
    res.send('API EliteLoc fonctionne correctement');
});

// lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});