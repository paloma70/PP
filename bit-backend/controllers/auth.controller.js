const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registrarLog = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Faltan datos' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hash });
    await user.save();

    registrarLog('Usuario registrado', {
      id: user._id,
      nombre,
      email,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { _id: user._id, nombre: user.nombre, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Faltan datos' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    registrarLog('Usuario inició sesión', {
      id: user._id,
      email,
      ip
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { _id: user._id, nombre: user.nombre, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.logout = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  registrarLog('Usuario cerró sesión', {
    ip,
    id: req.user?.id || 'desconocido'
  });
  res.json({ message: 'Sesión cerrada con éxito' });
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id nombre email');
    registrarLog('Listado de usuarios', {
      cantidad: users.length,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al listar usuarios' });
  }
};