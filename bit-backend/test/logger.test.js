const fs = require('fs');
const path = require('path');
const registrarLog = require('../utils/logger');

const logPath = path.join(__dirname, '../bitacora.log');

// 🔄 Acciones simuladas
const pruebas = [
  { accion: 'Usuario registrado', datos: { nombre: 'Andrés', email: 'andres@example.com', id: 'user123' } },
  { accion: 'Usuario inició sesión', datos: { email: 'andres@example.com', ip: '192.168.1.10' } },
  { accion: 'Usuario cerró sesión', datos: { email: 'andres@example.com' } },
  { accion: 'Perfume registrado', datos: { id: 'perfume001', nombre: 'Dior Sauvage', precio: 320000 } },
  { accion: 'Perfume actualizado', datos: { id: 'perfume001', cambios: { nombre: 'Bleu de Chanel', precio: 350000 } } },
  { accion: 'Perfume eliminado', datos: { id: 'perfume001' } },
  { accion: 'Listado de usuarios', datos: { cantidad: 5 } },
  { accion: 'Listado de perfumes', datos: { cantidad: 12 } }
];

// 🧪 Ejecutar pruebas
console.log('🔍 Iniciando test de bitácora...\n');

pruebas.forEach(({ accion, datos }, i) => {
  registrarLog(accion, datos);
  console.log(`✅ Acción ${i + 1}: "${accion}" registrada`);
});

// 📄 Verificar que se escribió
setTimeout(() => {
  const contenido = fs.readFileSync(logPath, 'utf8');
  console.log('\n📄 Contenido actual de bitacora.log:\n');
  console.log(contenido.split('\n').slice(-pruebas.length - 1).join('\n'));
}, 500);