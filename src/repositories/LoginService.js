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
            nome: usuario.nome,
            user_id: usuario.id,
            user_tipo_id: usuario.user_tipo_id,
            empresas_id: usuario?.empresas_id || null,
            parceira_inea: usuario.empresas?.parceira_inea
        }, config.secret, { expiresIn: 86000 })
        return token
    }
    async getUser(req, res) {
        try {
            return res.status(200).send({ erro: false, usuario: req.user })
        } catch (erro) {
            console.log(erro);
            return res.status(401).send({ erro: true, msg: 'Erro de autenticação!' })
        }
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

            if (usuario.ativo_status_id === 2)
                return res.status(401).send({ erro: true, msg: 'Conta inativa!' })

            if (!await this.senhaValida(senha, usuario.senha))
                return res.status(401).send({ erro: true, msg: 'Usuario ou senha inválida!' })
            delete usuario.senha
            delete usuario.cpf
            usuario.token = 'Bearer ' + this.gerarToken(usuario)
            return res.status(200).send({ erro: false, usuario: usuario })
        } catch (erro) {
            console.log(erro);
            return res.status(401).send({ erro: true, msg: 'Erro de autenticação!' })
        }
    }


}

module.exports = new LoginService()