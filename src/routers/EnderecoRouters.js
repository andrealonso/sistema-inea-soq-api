const express = require('express')
const router = express.Router()

const EnderecoController = require('../controllers/EnderecoController')

// Rotas de usuários
router.get('/enderecos', EnderecoController.listar)
router.get('/endereco/', EnderecoController.exibir)
router.post('/endereco', EnderecoController.criar)
router.put('/endereco/:id', EnderecoController.editar)
router.delete('/endereco/:id', EnderecoController.deletar)

module.exports = router