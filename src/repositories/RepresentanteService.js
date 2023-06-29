var prisma = require('../services/prisma')

class RepresentanteService {

    async create(payload) {
        try {
            const dados = await prisma.representantes.create({
                data: payload,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }


    async getAll(skip, take, busca) {
        var filtro = {
            where: { deleted_at: null }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.representantes.count({ ...filtro }),
                prisma.representantes.findMany({
                    ...filtro,
                    orderBy: { nome: "asc" },
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
            const dados = await prisma.representantes.findUnique({
                where: { id },
                include: { propriedade: true }

            })
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro no banco.' }
        }
    }

    async update(id, payload) {
        try {
            const dados = await prisma.representantes.update({
                where: { id },
                data: payload,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar atualizar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.representantes.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar excluir o registro!' }
        }
    }
}

module.exports = new RepresentanteService()