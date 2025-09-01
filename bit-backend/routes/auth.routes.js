const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { registrarLog } = require('../utils/logger'); // ← Asegúrate que esta ruta sea correcta
const authController = require('../controllers/auth.controller');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// 📌 Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Faltan datos' });

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hash });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // 📝 Log de registro
    registrarLog('Usuario registrado', { nombre, email });

    res.status(201).json({ token, user: { _id: user._id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en servidor' });
  }
});

// 📌 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Faltan datos' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // 📝 Log de login
    registrarLog('Usuario inició sesión', { email });

    res.json({ token, user: { _id: user._id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en servidor' });
  }
});

// 📌 Logout
router.post('/logout', async (req, res) => {
  try {
    const { email } = req.body;
    registrarLog('Usuario cerró sesión', { email });
    res.json({ msg: 'Sesión cerrada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en logout' });
  }
});

// 📌 Listado de usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '_id nombre email');
    registrarLog('Listado de usuarios', { total: users.length });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al listar usuarios' });
  }
});

module.exports = router;