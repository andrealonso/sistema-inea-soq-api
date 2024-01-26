var prisma = require('../services/prisma')
var logs = require('../repositories/LogsService')
var moment = require('moment')
class PropriedadeService {

    async create(payload, user) {
        try {
            const dados = await prisma.propriedades.create({
                data: payload,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll(skip, take, busca) {
        // await this.pausaTeste(0)

        var filtro = {
            where: { deleted_at: null }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.propriedades.count({ ...filtro }),
                prisma.propriedades.findMany({
                    ...filtro,
                    orderBy: { nome: "asc" },
                    include: {
                        representantes: { select: { nome: true } },
                        proprietarios: { select: { nome: true } }
                    },
                }),
            ])
            const qtdPaginas = Math.ceil(qtdRegistros / take)
            const dados = { qtdRegistros, qtdPaginas, registros }
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
    async getById(id) {
        try {
            const [representantes, proprietarios, propriedade] = await prisma.$transaction([
                prisma.representantes.findMany({
                    where: { deleted_at: null },
                    select: { id: true, nome: true }
                }),
                prisma.proprietarios.findMany({
                    where: { deleted_at: null },
                    select: { id: true, nome: true }
                }),
                prisma.propriedades.findMany({
                    where: { AND: { id, deleted_at: null } },
                    include: {
                        representantes: { select: { nome: true } },
                        proprietarios: { select: { nome: true } }
                    },
                })
            ])
            const dados = { representantes, proprietarios, propriedade: propriedade[0] }
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload, userId) {
        try {
            const dados = await prisma.propriedades.update({
                where: { id },
                data: payload,
                select: { id: true },
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar alterar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.propriedades.update({
                where: { id },
                data: { deleted_at: new Date() },
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
}

module.exports = new PropriedadeService()