// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// conectar a la base de datos desde src/config
require('./src/config/db');

const equipajeRoutes = require('./src/routes/equipaje.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Servidor funcionando con MongoDB Atlas');
});

// Rutas API
app.use('/api/equipaje', equipajeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
