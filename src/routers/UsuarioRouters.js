const express = require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuarioController')

// Rotas de usuários
router.get('/usuarios',UsuarioController.listar)
router.get('/usuario/:id',UsuarioController.exibir)
router.post('/usuario',UsuarioController.criar)
router.put('/usuario/:id',UsuarioController.editar)
router.delete('/usuario/:id',UsuarioController.deletar)

module.exports = router