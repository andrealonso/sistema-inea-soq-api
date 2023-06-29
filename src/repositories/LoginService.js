var prisma = require('../services/prisma')
var moment = require('moment')
const config = require('../config/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class LoginService {
    async senhaValida(senha, hash) {
        return await bcrypt.compare(senha, hash)
    }
    gerarToken(usuario) {
        const token = jwt.sign({
            user_id: usuario.id,
            user_tipo_id: usuario.user_tipo_id,
            empresa_id: usuario?.empresa_id || null,
            parceira_inea: usuario.empresas?.parceira_inea || false
        }, config.secret, { expiresIn: 86000 })
        return token
    }

    async autenticar(req, res) {
        try {
            const { login, senha } = req.body

            const usuario = await prisma.user.findFirst({
                where: { login: login },
                include: { empresas: { select: { parceira_inea: true } } }
            })

            if (!usuario)
                return res.status(401).send({ erro: true, msg: 'Usuario ou senha inválida!' })

            if (!await this.senhaValida(senha, usuario.senha))
                return res.status(401).send({ erro: true, msg: 'Usuario ou senha inválida!' })
            delete usuario.senha
            delete usuario.cpf
            const token = this.gerarToken(usuario)
            return res.status(200).send({ erro: false, usuario: usuario, token })
        } catch (erro) {
            console.log(erro);
            return res.status(401).send({ erro: true, msg: 'Erro de autenticação!' })
        }
    }

}

module.exports = new LoginService()