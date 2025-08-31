const mongoose = require('mongoose');

const tiquetesSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId, // referencia al cliente
    required: true,
    ref: 'Cliente'
  },
  ruta_id: {
    type: mongoose.Schema.Types.ObjectId, // referencia a la ruta
    required: true,
    ref: 'Ruta'
  },
  numero: {
    type: String, // número de vuelo
    required: true
  },
  fecha_vuelo: {
    type: Date,
    required: true
  },
  clase: {
    type: String,
    enum: ['Económica', 'Ejecutiva', 'Premium'],
    required: true
  },
  reembolsable: {
    type: Boolean,
    default: false
  },
  asiento: {
    type: String,
    required: true
  },
  puerta_embarque: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  equipaje_incluido: {
    type: Boolean,
    default: false
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'abordado', 'cancelado'],
    default: 'pendiente'
  },
  creado_en: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tiquete', tiquetesSchema);