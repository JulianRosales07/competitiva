// routes/tiquetesRouter.js
const express = require('express');
const router = express.Router();
const tiquetesController = require('../controllers/tiquetesController');

// Rutas de la API para tiquetes
router.get('/obtenerTodos', tiquetesController.getAllTiquetes);
router.get('/obtenerPorId/:id', tiquetesController.getTiqueteById);
router.post('/agregar', tiquetesController.createTiquete);
router.delete('/eliminar/:id', tiquetesController.deleteTiquete);
router.put('/putTiquete/:id', tiquetesController.updateTiquete);

module.exports = router;

