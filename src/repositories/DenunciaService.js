var prisma = require('../services/prisma')
var moment = require('moment')
const documentos = require('./DocumentosService')
class DenunciaService {

    async create(payload) {
        try {
            payload.data = new Date(payload.data)
            const dados = await prisma.denuncias.create({
                data: payload,
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
                prisma.denuncias.count({ ...filtro }),
                prisma.denuncias.findMany({
                    ...filtro,
                    include: { documentos: true }

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
    async filtrar(filtro) {
        try {
            filtro.deleted_at = null
            const dados = await prisma.denuncias.findMany({
                where: {
                    AND: { ...filtro, deleted_at: null }
                },
                include: { documentos: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async getById(id) {
        try {
            const dados = await prisma.denuncias.findMany({
                where: { AND: { id, deleted_at: null } },
                include: { documentos: true }
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
            const dados = await prisma.denuncias.update({
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
            const dados = await prisma.denuncias.update({
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

module.exports = new DenunciaService()