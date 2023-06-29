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
                    id: true, nome: true, cpf: true, tel: true, ativo_status_id: true, user_tipo_id: true, empresas_id: true,
                    empresas: { select: { nome: true } }, user_tipo: { select: { descricao: true } }
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
            const [usuario, empresas] = await prisma.$transaction([
                prisma.user.findUnique({
                    where: { id },
                }),
                prisma.empresas.findMany({ where: { deleted_at: null }, select: { nome: true } })
            ])
            delete usuario.senha
            const dados = { usuario, empresas }

            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload) {
        try {
            if (payload?.senha) delete payload.senha
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