require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

jest.setTimeout(20000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Pruebas de integración de autenticación', () => {
  it('Debe responder con un token al registrarse', async () => {
    const res = await request(app).post('/api/auth/register').send({
      nombre: 'Juan',
      email: 'juan@example.com',
      password: 'password'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('Debe responder con un token al iniciar sesión', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'juan@example.com',
      password: 'password'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Debe cerrar la sesión al hacer logout', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Sesión cerrada con éxito');
  });

  it('Debe listar los usuarios registrados', async () => {
    const res = await request(app).get('/api/auth/users');

    console.log('USUARIOS:', res.body); // 👀 para debug

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThan(0);
  });
});