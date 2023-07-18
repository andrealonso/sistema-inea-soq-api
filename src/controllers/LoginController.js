const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const LoginService = require('../repositories/LoginService')

class LoginController {
    async autenticar(req, res) {
        await LoginService.autenticar(req, res)
    }

    async getUser(req, res) {
        await LoginService.getUser(req, res)
    }


}

module.exports = new LoginController()