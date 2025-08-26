// src/models/equipaje.model.js
const mongoose = require('mongoose');

const EquipajeSchema = new mongoose.Schema({
  vuelo: { type: String, required: true },
  propietario: { type: String, required: true },
  peso: { type: Number, required: true },
  estado: { type: String, default: 'registrado' },
}, { timestamps: true });

module.exports = mongoose.model('Equipaje', EquipajeSchema);
