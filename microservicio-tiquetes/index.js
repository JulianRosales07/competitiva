import express from "express";
import conectarDB from "./src/config/db.js";
import tiqueteRoutes from "./src/routes/boletos.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// Conexión a MongoDB
conectarDB();

// Rutas
app.use("/api/boletos", tiqueteRoutes);
console.log("📋 Rutas de tiquetes cargadas en /api/boletos");

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en: http://localhost:${PORT}/api/boletos`);
});
