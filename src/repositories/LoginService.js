var prisma = require('../services/prisma')
var moment = require('moment')
const config = require('../config/auth')
const jwt = require('jsonwebtoken')

class LoginService {

    async autenticar(payload) {
        try {
            console.log(config);
            const { login, senha } = payload
            const usuario = await prisma.user.findFirst({
                where: { login: login }
            })

            const token = jwt.sign({ id: usuario.id, tipo_id: usuario.pessoas_tipo_id }, config.secret, { expiresIn: 86000 })

            return { erro: false, usuario: usuario, token }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

}

module.exports = new LoginService()