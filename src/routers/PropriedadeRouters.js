const express = require('express')
const router = express.Router()
const PropriedadeController = require('../controllers/PropriedadeController')

router.get('/propriedades', PropriedadeController.listar)
router.get('/propriedade/:id', PropriedadeController.exibir)
router.post('/propriedade', PropriedadeController.criar)
router.put('/propriedade/:id', PropriedadeController.editar)
router.delete('/propriedade/:id', PropriedadeController.deletar)

module.exports = router