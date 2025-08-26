// src/controllers/equipaje.controller.js
const Equipaje = require('../models/equipaje.model');

exports.registrar = async (req, res) => {
  try {
    const { vuelo, propietario, peso } = req.body;
    const nuevo = await Equipaje.create({ vuelo, propietario, peso });
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const lista = await Equipaje.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    await Equipaje.findByIdAndUpdate(id, { estado });
    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await Equipaje.findByIdAndDelete(id);
    res.json({ message: 'Equipaje eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
