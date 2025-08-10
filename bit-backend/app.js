const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
const authRoutes = require('./routes/auth.routes');
const perfumeRoutes = require('./routes/perfume.routes');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/perfumes', perfumeRoutes);

// test endpoint
app.get('/', (req, res) => res.send('API Perfumería OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));
