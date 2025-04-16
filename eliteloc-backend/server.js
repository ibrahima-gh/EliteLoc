const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/utilisateurs', require('./routes/utilisateurs'));
app.use('/api/voitures', require('./routes/voitures'));
app.use('/api/locations', require('./routes/locations'));

// main route
app.get('/', (req, res) => {
    res.send('API EliteLoc fonctionne correctement');
});

// lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});