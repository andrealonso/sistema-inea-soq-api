const express = require('express')
const router = express.Router()

const ProdutoController = require('../controllers/ProdutoController')

// Rotas de usuários
router.get('/produtos', ProdutoController.listar)
router.get('/produto/:id', ProdutoController.exibir)
router.post('/produto', ProdutoController.criar)
router.put('/produto/:id', ProdutoController.editar)
router.delete('/produto/:id', ProdutoController.deletar)

module.exports = router