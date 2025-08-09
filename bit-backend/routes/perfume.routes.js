const express = require('express');
const router = express.Router();

const perfumes = [
  { nombre: 'Euphoria', marca: 'Calvin Klein', precio: 89.99 },
  { nombre: 'Light Blue', marca: 'Dolce & Gabbana', precio: 75.50 }
];

router.get('/', (req, res) => {
  console.log("📢 GET /api/perfumes ejecutado");
  res.json(perfumes);
});

module.exports = router;
