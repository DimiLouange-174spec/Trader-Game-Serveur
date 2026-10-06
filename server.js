const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simulation de base de données pour Trader Game
let marketPrices = {
    GOLD: 1500,
    SILVER: 25,
    OIL: 75,
    BTC: 60000
};

// Route d'accueil
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur le serveur de Trader Game ! Le marché est ouvert." });
});

// Route pour récupérer les prix du marché
app.get('/api/market', (req, res) => {
    // Légère fluctuation aléatoire pour simuler le trading
    const keys = Object.keys(marketPrices);
    keys.forEach(asset => {
        const change = (Math.random() - 0.5) * (marketPrices[asset] * 0.02);
        marketPrices[asset] = parseFloat((marketPrices[asset] + change).toFixed(2));
    });
    res.json(marketPrices);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur Trader Game en cours d'exécution sur le port ${PORT}`);
});
