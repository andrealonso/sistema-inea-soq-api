var prisma = require('../services/prisma')
var moment = require('moment')
class UserService {

    async create(payload) {
        try {
            const dados = await prisma.user.create({ data: payload })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll(tipoId) {
        try {
            const dados = await prisma.user.findMany({ where: { deleted_at: null } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getById(id) {
        try {
            const dados = await prisma.user.findUnique({
                where: { id },
            })
            return { erro: false, dados }

        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload) {
        try {
            if (!payload?.senha) delete payload.senha
            const dados = await prisma.user.update({ where: { id }, data: payload })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar alterar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.user.update({ where: { id }, data: { deleted_at: new Date() } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
}

module.exports = new UserService()