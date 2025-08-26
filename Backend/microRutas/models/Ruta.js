const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
    codigo_ruta:{type: String, required: true, unique: true},
    aerolinea: {type:String, required: true},
    origen: {type: String, required: true},
    aeropuerto_origen: {type: String, required: true},
    destino:{type: String, required: true},
    aeropuerto_destino: {type: String, required: true},
    duracion_min: {type: Number, required: true},
    distancia_km: {type: Number, required:true},
    precio_base: {type: String, required: true}
});

module.exports = mongoose.model('Ruta', rutaSchema);