const express = require('express')
const router = express.Router()

const LoginController = require('../controllers/LoginController')

// Rotas de usuários
router.post('/login', LoginController.autenticar)



module.exports = router