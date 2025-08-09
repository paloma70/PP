const Perfume = require('../models/perfume.model');

exports.getAll = async (req, res) => {
  const perfumes = await Perfume.find();
  res.json(perfumes);
};

exports.create = async (req, res) => {
  const nuevo = new Perfume(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const actualizado = await Perfume.findByIdAndUpdate(id, req.body, { new: true });
  res.json(actualizado);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Perfume.findByIdAndDelete(id);
  res.json({ msg: 'Eliminado' });
};
