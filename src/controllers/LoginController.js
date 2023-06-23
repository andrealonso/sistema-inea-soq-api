const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const LoginService = require('../repositories/LoginService')

class LoginController {
    async autenticar(req, res) {
        const dados = await LoginService.autenticar(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

}

module.exports = new LoginController()