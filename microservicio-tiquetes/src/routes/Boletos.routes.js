import express from "express";
import Tiquete from "../models/Tiquete.js";

const router = express.Router();

// Obtener todos los tiquetes
router.get("/", async (req, res) => {
  try {
    console.log("🔍 Buscando tiquetes en la base de datos...");
    const tiquetes = await Tiquete.find();
    console.log(`📊 Encontrados ${tiquetes.length} tiquetes`);
    res.json(tiquetes);
  } catch (error) {
    console.error("❌ Error al obtener tiquetes:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Crear un tiquete
router.post("/", async (req, res) => {
  try {
    const nuevoTiquete = new Tiquete(req.body);
    await nuevoTiquete.save();
    res.status(201).json(nuevoTiquete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un tiquete por ID
router.get("/:id", async (req, res) => {
  try {
    const tiquete = await Tiquete.findById(req.params.id);
    if (!tiquete) return res.status(404).json({ error: "Tiquete no encontrado" });
    res.json(tiquete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un tiquete
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Tiquete.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Tiquete no encontrado" });
    res.json({ mensaje: "Tiquete eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
