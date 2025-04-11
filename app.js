const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Función para generar un código aleatorio de 7 caracteres sin repetir
function generateUniqueCode(length = 7) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  if (length > characters.length) {
    throw new Error('No hay suficientes caracteres para generar un código sin repetir.');
  }
  
  // Convertir la cadena en un array y mezclarlo (algoritmo Fisher–Yates)
  let charArray = characters.split('');
  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }
  
  // Tomar los primeros 'length' caracteres y unirlos
  return charArray.slice(0, length).join('');
}

// Endpoint para generar el código
app.get('/generate-code', (req, res) => {
  try {
    const code = generateUniqueCode();
    res.json({ code: code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
