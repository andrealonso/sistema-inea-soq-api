var prisma = require('../services/prisma')
class EnderecoService {
    async create(payload) {
        try {
            const dados = await prisma.enderecos.create({ data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll() {
        try {
            const dados = await prisma.enderecos.findMany({
                include: { pessoas: { select: { id: true, nome: true } } }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getById(filtro) {
        try {
            const dados = await prisma.enderecos.findMany({ where: filtro })
            console.log('testes ' + filtro);
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async update(id, payload) {
        try {
            const dados = await prisma.enderecos.update({ where: { id }, data: payload, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.enderecos.delete({ where: { id }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }

        return dados
    }
}

module.exports = new EnderecoService()