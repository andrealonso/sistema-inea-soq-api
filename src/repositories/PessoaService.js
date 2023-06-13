var prisma = require('../services/prisma')
var moment = require('moment')
class PessoaService {
    formatData(data) {
        if (!data) return null
        if (moment(data, 'YYYY-MM-DD', true).isValid())
            return moment(data).format('YYYY-MM-DD')
    }

    pausaTeste(tempo) {
        return new Promise((resolve) => {
            setTimeout(resolve, tempo)
        })
    }

    async create(payload) {
        try {
            const dados = await prisma.pessoas.create({ data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }


    async getAll(tipoId, skip, take, busca) {
        await this.pausaTeste(0)
        var filtro = {
            // where: {
            //     deleted_at: null,
            //     nome: {
            //         contains: busca
            //     },
            //     tipoIdtipo_id: tipoId
            // }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.pessoas.count({ ...filtro }),
                prisma.pessoas.findMany({
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
            const selDescricao = { select: { descricao: true } }
            const dados = await prisma.pessoas.findUnique({
                where: { id },
                include: { enderecos: true, usuario: true, empresas: true }
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
            const dados = await prisma.pessoas.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar atualizar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.pessoas.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar excluir o registro!' }
        }
    }
}

module.exports = new PessoaService()