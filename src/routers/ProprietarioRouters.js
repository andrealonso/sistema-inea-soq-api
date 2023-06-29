const express = require('express')
const router = express.Router()
const ProprietarioController = require('../controllers/ProprietarioController')

router.get('/proprietarios', ProprietarioController.listar)
router.get('/proprietario/:id', ProprietarioController.exibir)
router.post('/proprietario', ProprietarioController.criar)
router.put('/proprietario/:id', ProprietarioController.editar)
router.delete('/proprietario/:id', ProprietarioController.deletar)

module.exports = router