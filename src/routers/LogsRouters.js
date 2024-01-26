const express = require('express')
const router = express.Router()

const LogsController = require('../controllers/LogsController')

router.get('/logs', LogsController.listar)
router.post('/logs/limpar', LogsController.limpar)

module.exports = router