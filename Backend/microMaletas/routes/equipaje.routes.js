// src/routes/equipaje.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/equipaje.controller');

router.post('/registrar', controller.registrar);
router.get('/', controller.listar);
router.put('/:id', controller.actualizarEstado);
router.delete('/:id', controller.eliminar);

module.exports = router;
