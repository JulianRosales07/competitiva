const express = require('express');
const router = express.Router();
const {
    getRutas,
    getRutaByCodigo,
    createRuta,
    updateRuta,
    deleteRuta
} = require('../controllers/rutaController');

//Rutas del API
router.get('/', getRutas);
router.get('/:codigo_ruta', getRutaByCodigo);
router.post('/', createRuta);
router.put('/:codigo_ruta', updateRuta);
router.delete('/:codigo_ruta', deleteRuta);

module.exports = router;