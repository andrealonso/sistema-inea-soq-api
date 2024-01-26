const prisma = require("../services/prisma");
const moment = require('moment')
const acoes = ['Criação', 'Alteração', 'Exclusão', 'Login']

class LogsService {
    async create(user_id, entidade, registro_id, acaoIndex) {
        try {
            const data_hora = new Date(moment().utc(true))
            const dados = await prisma.logs.create({ data: { user_id, entidade, registro_id, acao: acoes[acaoIndex], data_hora } })
            return { erro: false, dados }
        } catch (error) {
            console.log(error);
            return { erro: true, msg: 'Erro ao tentar criar o log!' }
        }
    }
    async listAll() {
        try {
            const dados = await prisma.logs.findMany({
                include: { user: { select: { nome: true } } },
                orderBy: { id: 'desc' }
            })
            return { erro: false, dados }
        } catch (error) {
            console.log(error);
            return { erro: true, msg: 'Erro ao tentar listar os logs!' }

        }

    }
    async listFilter(filtro) {
        try {
            const dados = await prisma.logs.findMany({ where: filtro })
            console.log(dados);
            return { erro: false, dados }
        } catch (error) {
            console.log(error);
            return { erro: true, msg: 'Erro ao tentar filtrar os logs!' }
        }
    }
    async limparLogs() {
        try {
            const dados = await prisma.logs.deleteMany()
            return { erro: false, dados }
        } catch (error) {
            console.log(error);
            return { erro: true, msg: 'Erro ao tentar limpar os logs' }
        }
    }
}

module.exports = new LogsService()