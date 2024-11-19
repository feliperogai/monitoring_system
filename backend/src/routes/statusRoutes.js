const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Rota para obter o status de recarga
router.get('/', statusController.getStatus);

// Rota para adicionar um novo status de recarga
router.post('/', statusController.addStatus);

module.exports = router;
