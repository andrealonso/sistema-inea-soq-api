const express = require('express')
const router = express.Router()

const EmpresaController = require('../controllers/EmpresaController')

// Rotas de usuários
router.get('/empresas', EmpresaController.listar)
router.get('/empresa/:id', EmpresaController.exibir)
router.post('/empresa', EmpresaController.criar)
router.put('/empresa/:id', EmpresaController.editar)
router.delete('/empresa/:id', EmpresaController.deletar)

module.exports = router