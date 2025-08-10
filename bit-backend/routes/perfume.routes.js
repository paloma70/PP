const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const Perfume = require('../models/perfume.model');

// GET all (public)
router.get('/', async (req, res) => {
  try {
    const perfumes = await Perfume.find().sort({ createdAt: -1 });
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener perfumes' });
  }
});

// GET by id (public)
router.get('/:id', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) return res.status(404).json({ msg: 'No encontrado' });
    res.json(perfume);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener perfume' });
  }
});

// POST create (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const nuevo = new Perfume(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ msg: 'Error al crear perfume', error: err.message });
  }
});

// PUT update (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const actualizado = await Perfume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ msg: 'No encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ msg: 'Error al actualizar perfume', error: err.message });
  }
});

// DELETE (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const eliminado = await Perfume.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ msg: 'No encontrado' });
    res.json({ msg: 'Perfume eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar perfume' });
  }
});

module.exports = router;
