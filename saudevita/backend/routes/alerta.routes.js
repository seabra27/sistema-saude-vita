const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alerta.controller');

// Rota para cadastrar um novo alerta
router.post('/alertas', alertaController.createAlerta);

// Rota para consultar alertas
router.get('/alertas', alertaController.getAlertas);

module.exports = router; 