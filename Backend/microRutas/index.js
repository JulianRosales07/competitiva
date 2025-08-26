const express = require('express');
const connectDB = require('./src/config/database');
const rutaRoutes = require('./src/routes/rutaRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB Atlas
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas del API
app.use('/rutas', rutaRoutes);

// Ruta principal para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Backend de rutas de vuelos funcionando correctamente');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
