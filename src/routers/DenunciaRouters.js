const express = require('express')
const router = express.Router()
const DenunciaController = require('../controllers/DenunciaController')

router.get('/denuncias', DenunciaController.listar)
router.get('/denuncias/filtrar', DenunciaController.filtrar)
router.get('/denuncia/:id', DenunciaController.exibir)
router.post('/denuncia', DenunciaController.criar)
router.put('/denuncia/:id', DenunciaController.editar)
router.delete('/denuncia/:id', DenunciaController.deletar)

module.exports = router