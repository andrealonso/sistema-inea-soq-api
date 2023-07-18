const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const LoginController = require('../controllers/LoginController')

// Rotas de usuários
router.post('/login', LoginController.autenticar)
router.get('/login/getuser', auth, LoginController.getUser)



module.exports = router