var prisma = require('../services/prisma')
var moment = require('moment')
var bcrypt = require('bcryptjs')

class UserService {
    async encryptarSenha(senha) {
        return await bcrypt.hash(senha, 10)
    }

    async create(payload) {

        try {
            payload.senha = await this.encryptarSenha(payload.senha)

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
            const dados = await prisma.user.findMany({
                where: { deleted_at: null },
                select: {
                    id: true, nome: true, cpf: true, tel: true, ativo_status_id: true, user_tipo_id: true, empresas_id: true, login: true,
                    empresas: { select: { nome: true, parceira_inea: true } }, user_tipo: { select: { descricao: true } }
                },

            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async filtrar(filtro) {
        try {
            Object.keys(filtro).forEach(key => filtro[key] === null ? delete filtro[key] : null)
            let { empresas_id, user_tipo_id } = filtro
            const dados = await prisma.user.findMany({
                where: {
                    AND: [
                        { deleted_at: null },
                        { empresas_id },
                        { user_tipo_id }
                    ]
                },
                select: {
                    id: true, nome: true, cpf: true, tel: true, ativo_status_id: true, user_tipo_id: true, empresas_id: true, login: true,
                    empresas: { select: { nome: true, parceira_inea: true } }, user_tipo: { select: { descricao: true } }
                },

            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getById(id) {
        try {
            const usuario = await prisma.user.findUnique({
                where: { id },
                include: {
                    empresas: { select: { nome: true, parceira_inea: true } },
                    user_tipo: { select: { descricao: true } }
                }
            })
            delete usuario.senha
            const dados = usuario
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload) {
        try {
            if (payload?.senha)
                payload.senha = await this.encryptarSenha(payload.senha)
            else
                delete payload.senha

            const dados = await prisma.user.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar alterar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.user.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }


}

module.exports = new UserService()