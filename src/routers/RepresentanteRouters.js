const express = require('express')
const router = express.Router()
const RepresentanteController = require('../controllers/RepresentanteController')
const usuariosLiberados = require('../middlewares/auth')
// Rotas de usuários

//router.use(usuariosLiberados)
router.get('/representantes', RepresentanteController.listar)
router.get('/representante/:id', RepresentanteController.exibir)
router.post('/representante', RepresentanteController.criar)
router.put('/representante/:id', RepresentanteController.editar)
router.delete('/representante/:id', RepresentanteController.deletar)

module.exports = router