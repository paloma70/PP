const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const perfumeController = require('../controllers/perfume.controller'); // ← Se agregó
const Perfume = require('../models/perfume.model'); // ← Conservado para GET by ID

// GET all (public)
router.get('/', perfumeController.getAll); // ← Usa controlador con logger

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
router.post('/', verifyToken, perfumeController.create); // ← Usa controlador con logger

// PUT update (protected)
router.put('/:id', verifyToken, perfumeController.update); // ← Usa controlador con logger

// DELETE (protected)
router.delete('/:id', verifyToken, perfumeController.remove); // ← Usa controlador con logger

module.exports = router;
