var prisma = require('../services/prisma')
var moment = require('moment')
class PropriedadeService {

    async create(payload) {
        try {
            const { enderecos } = payload
            delete payload.enderecos
            var data = { ...payload }
            if (enderecos)
                data = { ...data, enderecos: { create: enderecos } }
            const dados = await prisma.propriedades.create({
                data: {
                    ...payload,
                    dono_propri: { connect: { id: 34 } },
                    repre_propri: { connect: { id: 39 } },
                },
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
                        dono_propri: { select: { dono: { select: { nome: true } } } },
                        repre_propri: { select: { repre: true } }
                    },
                    skip,
                    take
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
            const dados = await prisma.propriedades.findUnique({
                where: { id },
                include: { enderecos: true }
            })
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload) {
        try {
            var data = {}
            const { enderecos } = payload
            delete payload.enderecos
            delete payload.id
            if (enderecos)
                data = { ...payload, enderecos: { update: { where: { id: enderecos.id }, data: enderecos } } }
            const dados = await prisma.repreDePropriedades.create({
                data: { repre_id: 39, propriedade_id: id },
                include: { propriedade: true, repre: true }
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
            const dados = await prisma.propriedades.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
}

module.exports = new PropriedadeService()