const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
  nombre: String,
  marca: String,
  precio: Number
});

module.exports = mongoose.model('Perfume', perfumeSchema);

