const Ruta = require('../models/Ruta');

//obtener todas las rutas 
const getRutas = async (req, res) => {
    try {
    const rutas = await Ruta.find();
    res.json(rutas);
    } catch (error){
    res.status(500).json({ error: error.message });
    }
};

// GET:  Buscar una ruta por código
const getRutaByCodigo = async (req, res) => {
  try {
    const ruta = await Ruta.findOne({ codigo_ruta: req.params.codigo_ruta });
    if (!ruta) return res.status(404).json({ message: "Ruta no encontrada" });
    res.json(ruta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: nueva ruta
const createRuta = async (req, res) => {
  try {
    const nuevaRuta = new Ruta(req.body);
    await nuevaRuta.save();
    res.status(201).json(nuevaRuta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT: actualizar ruta
const updateRuta = async (req, res) => {
  try {
    const ruta = await Ruta.findOneAndUpdate(
      { codigo_ruta: req.params.codigo_ruta },
      req.body,
      { new: true }
    );
    if (!ruta) return res.status(404).json({ message: "Ruta no encontrada" });
    res.json(ruta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE: eliminar ruta
const deleteRuta = async (req, res) => {
  try {
    const ruta = await Ruta.findOneAndDelete({ codigo_ruta: req.params.codigo_ruta });
    if (!ruta) return res.status(404).json({ message: "Ruta no encontrada" });
    res.json({ message: "Ruta eliminada", ruta });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRutas, getRutaByCodigo, createRuta, updateRuta, deleteRuta };
