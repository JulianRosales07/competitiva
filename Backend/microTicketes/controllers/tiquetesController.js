// controllers/tiquetesController.js
const Tiquete = require('../models/tiquetesModel');

// Obtener todos los tiquetes
exports.getAllTiquetes = async (req, res) => {
  try {
    const tiquetes = await Tiquete.find();
    res.json(tiquetes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tiquetes' });
  }
};

// Obtener tiquete por ID
exports.getTiqueteById = async (req, res) => {
  try {
    const tiquete = await Tiquete.findById(req.params.id);
    if (!tiquete) {
      return res.status(404).json({ message: 'Tiquete no encontrado' });
    }
    res.json(tiquete);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el tiquete por ID' });
  }
};

// Agregar un nuevo tiquete
exports.createTiquete = async (req, res) => {
  try {
    const nuevoTiquete = new Tiquete(req.body);
    await nuevoTiquete.save();
    res.status(201).json(nuevoTiquete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un tiquete por ID
exports.deleteTiquete = async (req, res) => {
  try {
    const tiqueteEliminado = await Tiquete.findByIdAndDelete(req.params.id);
    if (!tiqueteEliminado) {
      return res.status(404).json({ message: "Tiquete no encontrado" });
    }
    res.json({ message: "Tiquete Eliminado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un tiquete por ID
exports.updateTiquete = async (req, res) => {
  try {
    const tiqueteActualizado = await Tiquete.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tiqueteActualizado) {
      return res.status(404).json({ message: "Tiquete no encontrado" });
    }
    res.json(tiqueteActualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};