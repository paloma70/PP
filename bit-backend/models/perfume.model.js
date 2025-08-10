const mongoose = require('mongoose');

const PerfumeSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  marca: { type: String, required: true, trim: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Perfume', PerfumeSchema);
