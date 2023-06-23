var prisma = require('../services/prisma')
var moment = require('moment')
class EmpresaService {

    async create(payload) {
        try {
            const dados = await prisma.empresas.create({ data: payload })
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
            where: {
                AND: {
                    deleted_at: null,
                }
            }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.empresas.count({ ...filtro }),
                prisma.empresas.findMany({
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
            const dados = await prisma.empresas.findUnique({
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
            const dados = await prisma.empresas.update({ where: { id }, data: payload })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar alterar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.empresas.delete({ where: { id } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
}

module.exports = new EmpresaService()