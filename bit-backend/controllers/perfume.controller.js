const Perfume = require('../models/perfume.model');
const registrarLog = require('../utils/logger');

exports.getAll = async (req, res) => {
  const perfumes = await Perfume.find();
  registrarLog('Listado de perfumes', { cantidad: perfumes.length });
  res.json(perfumes);
};

exports.create = async (req, res) => {
  const nuevo = new Perfume(req.body);
  await nuevo.save();
  registrarLog('Perfume registrado', { id: nuevo._id, ...req.body });
  res.status(201).json(nuevo);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const actualizado = await Perfume.findByIdAndUpdate(id, req.body, { new: true });
  registrarLog('Perfume actualizado', { id, cambios: req.body });
  res.json(actualizado);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Perfume.findByIdAndDelete(id);
  registrarLog('Perfume eliminado', { id });
  res.json({ msg: 'Eliminado' });
};