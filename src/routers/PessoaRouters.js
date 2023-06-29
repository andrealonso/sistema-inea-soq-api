const express = require('express')
const router = express.Router()
const PessoaController = require('../controllers/PessoaController')
const auth = require('../middlewares/auth')
// Rotas de usuários


router.get('/pessoas', PessoaController.listar)
router.get('/pessoa/:id', PessoaController.exibir)
router.post('/pessoa', PessoaController.criar)
router.put('/pessoa/:id', PessoaController.editar)
router.delete('/pessoa/:id', PessoaController.deletar)

module.exports = router