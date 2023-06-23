const express = require('express')
const router = express.Router()
const PessoaController = require('../controllers/PessoaController')
const usuariosLiberados = require('../middlewares/usuariosLiberados')
// Rotas de usuários

//router.use(usuariosLiberados)
router.get('/pessoas', PessoaController.listar)
router.get('/pessoa/:id', PessoaController.exibir)
router.post('/pessoa', PessoaController.criar)
router.put('/pessoa/:id', PessoaController.editar)
router.delete('/pessoa/:id', PessoaController.deletar)

module.exports = router