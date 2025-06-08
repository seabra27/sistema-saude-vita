const express = require('express');
const router = express.Router();
const indicadorController = require('../controllers/indicador.controller');

// Rota para cadastrar um novo indicador
router.post('/indicadores', indicadorController.createIndicador);

// Rota para consultar indicadores
router.get('/indicadores', indicadorController.getIndicadores);

module.exports = router; 