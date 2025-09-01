// app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const perfumeRoutes = require('./routes/perfume.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/perfumes', perfumeRoutes);

// Test endpoint
app.get('/', (req, res) => res.send('API Perfumería OK'));

module.exports = app;