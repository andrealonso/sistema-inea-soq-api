var prisma = require('../services/prisma')
var moment = require('moment')
class ContratoService {

    async create(payload) {
        const data = await prisma.contrato.create({ data: payload })
        return data
    }
    async getAll(tipoId) {
        const dados = await prisma.contrato.findMany({


        })
        return dados
    }
    async getById(id) {
        const selDescricao = { select: { descricao: true } }
        const dados = await prisma.contrato.findUnique({
            where: { id },
            select: {
                id: true,
                login: true,
                user_nivel_id: true
            }

        })
        return dados
    }
    async update(id, payload) {
        if (payload.senha) {
            payload.senha = this.criptSenha(payload.senha)
        }
        const dados = await prisma.contrato.update({ where: { id }, data: payload })
        return dados
    }
    async delete(id) {
        const dados = await prisma.contrato.delete({ where: { id } })
        return dados
    }
}

module.exports = new ContratoService()