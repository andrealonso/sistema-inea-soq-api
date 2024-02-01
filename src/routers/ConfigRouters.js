const ConfigController = require('../controllers/ConfigController')
const router = require('express').Router()

router.get('/config/:id', ConfigController.exibir)
router.put('/config/', ConfigController.editar)

module.exports = router