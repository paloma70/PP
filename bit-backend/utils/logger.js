const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../bitacora.log');

function registrarLog(accion, datos) {
  const entrada = `[${new Date().toISOString()}] Acción: ${accion} | Datos: ${JSON.stringify(datos)}\n`;
  try {
    fs.appendFileSync(logPath, entrada);
  } catch (err) {
    console.error('Error al escribir en bitácora:', err);
  }
}

module.exports = registrarLog;